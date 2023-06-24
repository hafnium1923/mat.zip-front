import { useContext } from "react";
import { Store } from "types/common";
import { getRandomEmptyReviewMessage } from "util/randomUtils";

import { campusContext } from "context/CampusContextProvider";

import Heading from "components/common/Heading/Heading";
import Star from "components/common/Star/Star";
import Text from "components/common/Text/Text";

import * as S from "components/pages/StoreDetailPage/StoreDetailTitle/StoreDetailTitle.style";

function StoreDetailTitle({
  storeInfo: { name, rating, reviewCount, address, distance, kakaoMapUrl },
}: {
  storeInfo: Store;
}) {
  const campus = useContext(campusContext);

  return (
    <S.TitleContainer>
      <Heading size="sm">{name}</Heading>
      <S.RatingContainer>
        <Star isFilled={rating > 0} />
        <S.RatingWrapper>
          {rating > 0 ? (
            <Text css={S.ratingTextStyle}>{rating.toFixed(1)}</Text>
          ) : (
            <Text css={S.subTextStyle}>{getRandomEmptyReviewMessage()}</Text>
          )}
          {rating > 0 && <Text>({reviewCount})</Text>}
        </S.RatingWrapper>
      </S.RatingContainer>
      <S.DescriptionWrapper>
        <Text size="sm">{address}</Text>
        <Text size="sm">
          {campus} 캠퍼스 기준 도보 {distance}분
        </Text>
        <div>
          <S.KakaoLink href={kakaoMapUrl} target="_blank">
            카카오 맵으로 열기
          </S.KakaoLink>
        </div>
      </S.DescriptionWrapper>
    </S.TitleContainer>
  );
}

export default StoreDetailTitle;