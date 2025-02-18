export interface IRequestHeader {
  responseType?:
    | 'json'
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'text'
    | 'stream';
  [key: string]: any;
}

// export interface IApiResponse {
//   data: any[] | any
//   error: any[]
//   message: string
//   success: boolean
// }

export interface PaginationResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export const IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/jpg',
  'image/svg+xml',
];

// import { SortingState } from "@tanstack/react-table"

// import { IDataTableFilter } from "@/components/table/DataTableFilter"

export type ColumnSort = {
  id: string;
  desc: boolean;
};

export type SortingState = ColumnSort[];

export interface IDataTableFilter {
  [key: string]: any;
}
