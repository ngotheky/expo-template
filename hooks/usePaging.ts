import { PagingResponse } from '@/api/interface/general';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useRef, useState } from 'react';

interface IPaging<T> {
    refreshing: boolean;
    loadingMore: boolean;
    pageIndex: number;
    list: T[];
    noMore: boolean;
}

const SIZE_LIMIT = 10;

/**
 * Custom hook for handling paging functionality.
 *
 * @template T - The type of data being paged.
 * @param {function} requestPaging - A function that makes a paging request and returns a promise with the paging response.
 * @param {any} [initialParams] - Initial parameters for the paging request.
 * @param {boolean} [disabled] - Flag to disable the paging functionality.
 * @returns {object} - An object containing paging data and functions to handle refresh and load more actions.
 * @returns {IPaging<T>} pagingData - The current paging data.
 * @returns {function} onRefresh - Function to refresh the paging data.
 * @returns {function} onLoadMore - Function to load more data.
 * @returns {any} params - The current parameters for the paging request.
 * @returns {function} setParams - Function to set new parameters for the paging request.
 * @returns {function} setPagingData - Function to set new paging data.
 * @returns {boolean} loadingMore - Flag indicating if more data is being loaded.
 */
function usePaging<T>(
    requestPaging: (config: AxiosRequestConfig) => Promise<PagingResponse<T>>,
    initialParams?: any,
    disabled?: boolean,
) {
    const [pagingData, setPagingData] = useState<IPaging<T>>({
        refreshing: false,
        loadingMore: false,
        pageIndex: 1,
        list: [],
        noMore: false,
    });
    const [params, setParams] = useState<any>(initialParams);
    const isFirstRun = useRef<any>(true);
    useEffect(() => {
        runRequest(pagingData.pageIndex, SIZE_LIMIT, params);
    }, [pagingData.pageIndex, disabled]);

    useEffect(() => {
        if (isFirstRun?.current) {
            isFirstRun.current = false;
            return;
        }
        onRefresh();
    }, [params]);

    const handleOnSuccess = (data: PagingResponse<T>) => {
        const responseData = data || {};
        const newList = responseData.data || [];
        if (pagingData.pageIndex === 1) {
            setPagingData({
                ...pagingData,
                list: newList,
                noMore: pagingData.pageIndex >= responseData?.totalPages,
                refreshing: false,
                loadingMore: false,
            });
        } else if (newList.length > 0) {
            setPagingData({
                ...pagingData,
                list: [...pagingData.list, ...newList],
                noMore: pagingData.pageIndex >= responseData?.totalPages,
                refreshing: false,
                loadingMore: false,
            });
        }
    };

    const runRequest = async (requestPageIndex: number, pageSize?: number, otherParams?: any) => {
        if (disabled) return;
        setPagingData({
            ...pagingData,
            noMore: true,
        });
        const res = await requestPaging({
            params: {
                pageIndex: requestPageIndex,
                pageSize: pageSize || SIZE_LIMIT,
                ...otherParams,
            },
        });
        handleOnSuccess(res);
    };

    const onRefresh = () => {
        if (pagingData.pageIndex > 1) {
            setPagingData({ ...pagingData, refreshing: true, pageIndex: 1 });
        } else {
            runRequest(1, SIZE_LIMIT, params);
        }
    };

    const onLoadMore = () => {
        if (!pagingData.noMore && pagingData?.list?.length > 0) {
            setPagingData({
                ...pagingData,
                loadingMore: true,
                pageIndex: pagingData.pageIndex + 1,
            });
        }
    };

    return {
        pagingData,
        onRefresh,
        onLoadMore,
        params,
        setParams,
        setPagingData,
        loadingMore: pagingData.loadingMore,
    };
}

export default usePaging;
