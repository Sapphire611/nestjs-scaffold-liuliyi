export interface PaginateResult<T> {
  data: T[];
  metadata: {
    total: number;
    perPage: number | undefined;
    page: number | undefined;
    lastPage: number;
  };
}

export interface PaginationOptions {
  perPage?: number;
  page?: number;
}