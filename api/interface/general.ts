export interface TypeParamsPaging {
    params: {
        take: number;
        pageIndex: number;
        [key: string]: any;
    };
    [key: string]: any;
}

export interface PagingResponse<T> {
    data: T[];
    pageIndex: number;
    totalPages: number;
    totalItems: number;
}
