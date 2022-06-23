/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useInfiniteQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { NETWORK, SIZE } from "constants/api";
import type { Campus } from "constants/campus";
import { getCampusId } from "constants/campus";

import { campusContext } from "context/CampusContextProvider";

import fetchStoreList from "api/fetchStoreList";
import getNextPageParam from "api/getNextPageParam";

import InfiniteScroll from "components/common/InfiniteScroll/InfiniteScroll";
import SectionHeader from "components/common/SectionHeader/SectionHeader";
import Spinner from "components/common/Spinner/Spinner";
import StoreList from "components/common/StoreList/StoreList";

import * as S from "components/pages/CategoryDetailPage/CategoryDetailPage.style";

import type { Store } from "mock/data";

function SearchResultPage() {
  const navigate = useNavigate();
  const campusName = useContext(campusContext);
  const campusId = getCampusId(campusName as Campus);

  const [searchParam] = useSearchParams();
  const name = searchParam.get("name");

  const fetchParams = {
    size: SIZE.LIST_ITEM,
    campusId,
    name,
    type: "/search",
  };

  const { data, error, isLoading, isError, fetchNextPage, isFetching } =
    useInfiniteQuery(["categoryStore", fetchParams], fetchStoreList, {
      getNextPageParam,
      retry: NETWORK.RETRY_COUNT,
    });

  const loadMoreStores = () => {
    fetchNextPage();
  };

  return (
    <S.CategoryDetailPageContainer>
      <SectionHeader
        leadingIcon={<MdArrowBackIos />}
        onClick={() => {
          navigate(-1);
        }}
      >
        {`${name} 검색결과 입니다.`}
      </SectionHeader>
      <InfiniteScroll handleContentLoad={loadMoreStores} hasMore={true}>
        {(isLoading || isFetching) && <Spinner />}
        {isError && <div>{error instanceof Error && error.message}</div>}
        <StoreList
          stores={
            data &&
            data.pages.reduce<Store[]>(
              (stores, page) => [...stores, ...page.restaurants],
              []
            )
          }
        />
      </InfiniteScroll>
    </S.CategoryDetailPageContainer>
  );
}

export default SearchResultPage;
