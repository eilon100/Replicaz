import React, { useRef, useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { apiService } from '../../../../../utills/apiService';
import useIntersectionObserver from '../../../../../utills/useIntersectionObserver';
import MenuItemContainer from './MenuItem';
import NotificationsLoading from '../../../../../UI/loadings/NotificationsLoading';

type AllNotificationsProps = {
  seen: boolean;
};

function AllNotifications({ seen }: AllNotificationsProps) {
  const fetchItems = async ({ pageParam = 0 }: any) => {
    const data = { seen, pageParam };
    const res = await apiService.get.GET_ALL_NOTIFICATIONS(data);
    return res;
  };

  const {
    data: { pages } = {},
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ['notifications', { seen }],
    (queryFunctionContext) => fetchItems(queryFunctionContext),
    {
      getNextPageParam: (_lastPage, currentPage) => {
        const isLastPage = !currentPage[currentPage.length - 1]?.data[0];

        if (isLastPage) {
          return undefined;
        }
        return currentPage.length;
      },
    }
  );

  const loadMoreRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    status,
  });

  if (isLoading) {
    return (
      <>
        {Array(3)
          .fill(0)
          .map((_, i) => {
            return <NotificationsLoading key={i} />;
          })}
      </>
    );
  }

  if (isError) {
    return <h1>Could not get notifications</h1>;
  }

  return (
    <>
      {pages?.map((page, pageNumber) => (
        <React.Fragment key={pageNumber}>
          {page.data?.map((notifications: any) => {
            console.log(notifications);

            return (
              <div key={notifications._id}>
                <MenuItemContainer notifications={notifications} />
              </div>
            );
          })}
        </React.Fragment>
      ))}
      <div ref={loadMoreRef} className={`${!hasNextPage ? 'hidden' : ''}`}>
        {isFetchingNextPage ? <NotificationsLoading /> : ''}
      </div>
      <div>
        {!hasNextPage && (
          <div>
            {pages && pages[0].data.length === 0 ? (
              <div className=" flex justify-center my-8 ">
                <p>You have no {!seen ? 'new' : ''} notifications</p>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AllNotifications;
