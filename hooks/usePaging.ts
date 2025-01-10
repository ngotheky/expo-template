import { PagingResponse } from '@/api/interface/general';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';

interface IPaging<T> {
    requestPaging: (config: AxiosRequestConfig) => Promise<PagingResponse<T>>;
    initialParams?: any;
    enabled?: boolean;
    queryKey?: string;
}

const SIZE_LIMIT = 10;
/**
 * Custom hook for handling paginated data fetching using `useInfiniteQuery`.
 *
 * @template T - The type of the data being fetched.
 * @param {Object} params - The parameters for the hook.
 * @param {Function} params.requestPaging - The function to request paginated data.
 * @param {Object} [params.initialParams={}] - Initial parameters to be passed to the request function.
 * @param {boolean} params.enabled - Flag to enable or disable the query.
 * @param {string} params.queryKey - The key to uniquely identify the query.
 * @returns {Object} - The result of the query including the paginated data.
 * @returns {Array<T>} data - The flattened array of paginated data.
 */
function usePaging<T>({ requestPaging, initialParams = {}, enabled, queryKey }: IPaging<T>) {
    const fetchData = async ({ pageParam = 0 }): Promise<PagingResponse<T>> => {
        const res: PagingResponse<T> = await requestPaging({
            pageSize: SIZE_LIMIT,
            pageIndex: pageParam,
            ...initialParams,
        });
        return res;
    };

    const { data, ...res } = useInfiniteQuery({
        queryKey: [queryKey, initialParams],
        queryFn: async ({ pageParam = 1 }: any) => {
            const data = await fetchData({ pageParam });
            return data;
        },
        getNextPageParam: lastPage => {
            if (lastPage && lastPage.pageIndex < lastPage.totalPages) {
                return lastPage.pageIndex + 1;
            }
        },
        initialPageParam: 1,
        enabled: enabled,
    });

    const queryData = useMemo(() => {
        if (!data) {
            return [];
        }
        return data?.pages
            .flat()
            ?.map(item => item.data)
            .flat();
    }, [data]);

    return {
        ...res,
        data: queryData,
    };
}

export default usePaging;
