import { ApiController } from '.';
import { IDataTableFilter, PaginationResponse, SortingState } from './types';

export interface IPageFilter {
  $limit: number;
  $page: number;
  populate?: {
    path: string;
    select: string;
  }[];
  sorting?: SortingState;
  filter?: IDataTableFilter;
}
export abstract class ApiPaginationController<T> extends ApiController {
  protected abstract urlPath: string;

  async create<T>(data: Partial<T>): Promise<T> {
    return (await this.post<T>(`${this.urlPath}`, {}, {}, data)).data;
  }

  async update<T>(id: string, data: Partial<T>) {
    return await this.patch(`${this.urlPath}/${id}`, {}, {}, data);
  }

  async remove(id: string) {
    return await this.delete(`${this.urlPath}/${id}`, {}, {});
  }
  async getOne(id: string): Promise<T> {
    return (await this.get(`${this.urlPath}/${id}`, {}, {})).data;
  }

  async getPage(
    filter: IPageFilter,
    url?: string, //  used when collection is part of another collection example usersList contains users
  ): Promise<PaginationResponse<T>> {
    const sort: {
      [key: string]: -1 | 1 | 0;
    } = {};
    if (filter.sorting) {
      filter.sorting.map((_sort) => {
        sort[_sort.id] = _sort.desc ? -1 : 1;
      });
    }
    const response = await this.get(
      url ?? `${this.urlPath}`,
      {
        $limit: filter.$limit || 10,
        $page: filter.$page || 1,
        populate: filter.populate || [],
        sort: sort,
        filter: filter.filter,
      },
      {},
    );
    return response.data;
  }

  async getAll(filter: any): Promise<PaginationResponse<T>> {
    try {
      const response = await this.get(`${this.urlPath}`, {
        filter,
        pagination: false,
      });
      return response.data;
    } catch (err) {
      return Promise.resolve({
        docs: [],
        totalDocs: 0,
        limit: 10,
        totalPages: 0,
        page: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      });
    }
  }
  async getChart(filter: any, url?: string) {
    const response = await this.get(
      url ? url : `${this.urlPath}/chart`,
      filter,
    );
    return response.data;
  }
}
