export interface IPagination {
    page: number;
    limit: number;
}

export interface IPaginationQuery {
    page?: string;
    limit?: string;
}

export interface IPartialPagination {
    page?: number;
    limit?: number;
}
