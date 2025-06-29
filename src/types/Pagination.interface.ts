export type Pagination = {
    page: number;
    size: number;
};

export type PaginationResponse<T> = {
    message: string;
    data: T[];
    pagination: {
        page: number;
        size: number;
        total: number;
        totalPages: number;
    };
};

