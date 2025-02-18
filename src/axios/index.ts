import { AxiosProgressEvent } from 'axios';

import { _delete, get, patch, post, put } from './base';
import { IRequestHeader } from './types';

interface IApiBase {
  get(path: string, query: object, headers: IRequestHeader): any;
  post(
    path: string,
    query: object,
    headers: object,
    data: object,
    isFile: boolean,
  ): any;
  put(path: string, query: object, headers: IRequestHeader, data: object): any;
  patch(
    path: string,
    query: object,
    headers: IRequestHeader,
    data: object,
  ): any;
  delete(
    path: string,
    query: object,
    headers: IRequestHeader,
    data: object,
  ): any;
}

export abstract class ApiController implements IApiBase {
  protected abstract urlPath: string;
  get(path: string, query: object, headers: IRequestHeader = {}) {
    return get(path, query, headers);
  }
  post<T>(
    path: string,
    query: object,
    headers: object,
    data: any,
    isFile: boolean = false,
    progress?: (event: AxiosProgressEvent) => void,
  ): any {
    return post<T>(path, query, headers, data, isFile, progress);
  }
  patch(path: string, query: object, headers: IRequestHeader, data: object) {
    return patch(path, query, headers, data);
  }
  put(path: string, query: object, headers: IRequestHeader, data: object) {
    return put(path, query, headers, data);
  }
  delete(
    path: string,
    query: object,
    headers: IRequestHeader,
    data: object = {},
  ) {
    return _delete(path, query, headers, data);
  }
}
