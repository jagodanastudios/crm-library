import axios, { AxiosProgressEvent, AxiosResponse } from 'axios';
import CryptoJS from 'crypto-js';

import { IMAGE_MIME_TYPES, IRequestHeader } from './types';
import SiteConfig from '../siteConfig';

const handleResponse = <T = any>(data: string) => {
  const bytes = CryptoJS.AES.decrypt(
    data,
    SiteConfig.internalSecretKey,
  ).toString(CryptoJS.enc.Utf8);
  return JSON.parse(bytes) as T;
};

const encryptData = (data: Object) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SiteConfig.internalSecretKey,
  ).toString();
  return {
    v2: true,
    data: encrypted,
  };
};

function getAuthHeaders(): IRequestHeader {
  let header: {
    authorization?: string;
    'internal-key'?: string;
  } = {};
  if (SiteConfig.serviceAccountKey?.length > 0) {
    header = {
      authorization: SiteConfig.serviceAccountKey,
    };
  } else {
    console.error('env SERVICE_ACCOUNT_KEY not found');
  }
  // } else if (typeof window === 'undefined') {
  //   header = {
  //     'internal-key': SiteConfig.internalSecretKey,
  //   };
  // } else {
  //   header = {
  //     authorization: `Bearer ${localStorage.getItem(
  //       SiteConfig.storageKeys.TOKEN,
  //     )}`,
  //   };
  // }
  return header;
}

const request = async (
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
  url: string,
  _query: object,
  headers: IRequestHeader = {},
  data: any | Object | FormData = {},
  fileUpload: boolean = false,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  const authHeaders = getAuthHeaders();
  try {
    let body = data;
    let query = _query;
    if (!fileUpload) {
      if (SiteConfig.encryptData) {
        body = encryptData(body);
        query = encryptData(query);
      }
    }
    const responseType = headers?.responseType ?? 'json';
    let finalUrl = url;
    if (url.startsWith('http')) {
      finalUrl = url;
    } else {
      finalUrl = SiteConfig.serverUrl + '' + url;
    }
    const response = await axios.request({
      method: method,
      url: finalUrl,
      params: query,
      responseType,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onUploadProgress) {
          onUploadProgress(progressEvent);
        }
      },
      headers: {
        //TODO add auth header
        ...authHeaders,
        ...headers,
      },
      data: body,
    });
    if (!fileUpload && SiteConfig.encryptData) {
      const imageResponse = IMAGE_MIME_TYPES;
      const isFile = imageResponse.includes(response.headers['content-type']);
      if (!isFile) {
        response.data = handleResponse(response.data.data);
      }
    }
    return response;
  } catch (error) {
    let response: AxiosResponse = error as AxiosResponse;
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 401) {
        response = error.response;
        if (error.response?.data.error?.name == 'TokenExpiredError') {
          localStorage.removeItem(SiteConfig.storageKeys.TOKEN);
          window.location.reload();
        }
      }
    }
    throw response;
  }
};

const get = async (url: string, query: object, headers: object = {}) => {
  const result = await request('GET', url, query, headers);
  return result;
};

async function post<T>(
  url: string,
  query: any,
  headers: IRequestHeader = {},
  data: T | FormData,
  isFile: boolean = false,
  progress?: (event: AxiosProgressEvent) => void,
): Promise<AxiosResponse<any>> {
  const result = await request(
    'POST',
    url,
    query,
    headers,
    data,
    isFile,
    progress,
  );
  return result;
}

const upload = async (
  url: string,
  query: object,
  headers: IRequestHeader = {},
  data: FormData,
) => {
  const authHeaders = getAuthHeaders();
  try {
    return await axios.request({
      method: 'POST',
      url: SiteConfig.serverUrl + '' + url,
      params: query,
      headers: {
        //TODO add auth header
        ...authHeaders,
        ...headers,
      },
      data: data,
    });
  } catch (error) {
    let response: AxiosResponse = error as AxiosResponse;
    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 401) {
        response = error.response;
        if (error.response?.data.error?.name == 'TokenExpiredError') {
          localStorage.removeItem(SiteConfig.storageKeys.TOKEN);
          window.location.reload();
        }
      }
    }
    return response;
  }
};

const patch = async (
  url: string,
  query: object = {},
  headers: IRequestHeader = {},
  data: object = {},
) => {
  const result = await request('PATCH', url, query, headers, data);
  return result;
};

const put = async (
  url: string,
  query: object = {},
  headers: IRequestHeader = {},
  data: object = {},
) => {
  const result = await request('PUT', url, query, headers, data);
  return result;
};

const _delete = async (
  url: string,
  query: object = {},
  headers: IRequestHeader = {},
  data: object = {},
) => {
  const result = await request('DELETE', url, query, headers, data);
  return result;
};

export { get, post, patch, put, _delete, upload };
