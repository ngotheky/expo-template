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
