import { BookmarkStore } from "types/common/bookmarkTypes";

import { ACCESS_TOKEN, ENDPOINTS } from "constants/api";

import axiosInstance from "api/axiosInstance";

const fetchBookmarkList = async () => {
  const accessToken = window.sessionStorage.getItem(ACCESS_TOKEN);

  if (!accessToken) {
    window.sessionStorage.removeItem(ACCESS_TOKEN);
    window.alert("다시 로그인 해주세요");
    window.location.href = "/";
    return;
  }

  const { data } = await axiosInstance.get<BookmarkStore[]>(
    ENDPOINTS.BOOKMARKS,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export default fetchBookmarkList;
