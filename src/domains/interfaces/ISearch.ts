export interface ISearch {
    q: string;
    perPage: number;
    page: number;
    status: string;
    sort: string;
    sortColumn: string;
    sortBy?: string;
}