/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Campus } from "types/campus";

import { AUTH_LINK } from "constants/api";
import { getOtherCampus } from "constants/campus";
import { MESSAGES } from "constants/messages";
import { PATHNAME } from "constants/routes";

import { campusContext, setCampusContext } from "context/CampusContextProvider";

import useLogin from "hooks/useLogin";

import Button from "components/common/Button/Button";
import Text from "components/common/Text/Text";

import * as S from "components/layout/MenuDrawer/MenuDrawer.style";

interface MenuDrawerProps {
  closeMenu: () => void;
  isLoggedIn: boolean;
}

function MenuDrawer({ closeMenu, isLoggedIn }: MenuDrawerProps) {
  const campus = useContext(campusContext);
  const otherCampus = getOtherCampus(campus as Campus);
  const setCampus = useContext(setCampusContext);
  const navigate = useNavigate();

  const { logout } = useLogin();

  const handleCampusChangeRequest = () => {
    if (
      !window.confirm(
        MESSAGES.CAMPUS_CHANGE_CONFIRM(campus as Campus, otherCampus)
      )
    ) {
      return;
    }
    setCampus(otherCampus);
    closeMenu();
  };

  const handleLogout = () => {
    if (!window.confirm(MESSAGES.LOGOUT_CONFIRM)) {
      return;
    }

    logout();
    closeMenu();
    window.alert(MESSAGES.LOGOUT_COMPLETE);
    navigate(PATHNAME.HOME);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return ReactDOM.createPortal(
    <S.Container>
      <S.Backdrop onClick={closeMenu} />
      <S.Content>
        {isLoggedIn ? (
          <>
            <Text css={S.titleStyle} size="lg">
              어서오세요
            </Text>
            <Button variant="textButton" onClick={handleCampusChangeRequest}>
              캠퍼스 변경하기
            </Button>
            <Button variant="textButton" onClick={handleLogout}>
              로그아웃
            </Button>
            <S.CustomLink to={PATHNAME.MY_PAGE}>마이페이지</S.CustomLink>
          </>
        ) : (
          <>
            <Text css={S.titleStyle} size="lg">
              로그인을 해주세요
            </Text>
            <Button variant="textButton" onClick={handleCampusChangeRequest}>
              캠퍼스 변경하기
            </Button>
            <S.LoginLink href={AUTH_LINK}>로그인</S.LoginLink>
          </>
        )}
        <S.CustomLink to={PATHNAME.STORE_DEMAND}>
          식당 추가 요청하기
        </S.CustomLink>
      </S.Content>
    </S.Container>,
    document.querySelector("#app") as HTMLElement
  );
}

export default MenuDrawer;
