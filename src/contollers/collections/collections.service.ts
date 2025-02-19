import {
  ApiPaginationController,
  IPageFilter,
} from '../../axios/paginationAPI';
import {
  ICollectionField,
  IForm,
  IUser,
  PaginationResponse,
} from '../../types';

export const ICollectionFieldType = {
  TEXT: 'text',
  RICH_TEXT: 'rich-text',
  NUMBER: 'number',
  BOOLEAN: 'bool',
  DATE: 'date',
  COLOR: 'color',
  LINK: 'link',
  EMAIL: 'email',
};

export const COLLECTION_FIELD_TYPES: string[] = [
  ICollectionFieldType.TEXT,
  ICollectionFieldType.RICH_TEXT,
  ICollectionFieldType.NUMBER,
  ICollectionFieldType.BOOLEAN,
  ICollectionFieldType.DATE,
  ICollectionFieldType.COLOR,
  ICollectionFieldType.LINK,
  ICollectionFieldType.EMAIL,
];

export interface ICollectionVersion {
  _id: string;
  name: string;
  version: number;
  collectionId: string;
  live: boolean;
  deprecated: boolean;
  creator: string | IUser;
  fields: ICollectionField[];

  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICollectionRecord {
  _id: string;
  collectionId: string;
  versionId: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  creator: string | IUser;
  formId: string | IForm;
  data: {
    [key: string]: any;
  };
}

export interface ICollection {
  _id: string;
  name: string;
  slug: string;
  collectionId: string;
  archived: boolean;
  creator: string | IUser;
  latest: string;
  versions: string[];

  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class CollectionsApis extends ApiPaginationController<ICollection> {
  protected urlPath: string = '/api/collections';

  async getData(
    slug: string,
    latest: boolean = false,
    version?: number,
  ): Promise<PaginationResponse<ICollectionRecord>> {
    const url = `${this.urlPath}/data/${slug}?latest=${latest}&version=${version}`;
    const result = await this.get(url, {});
    return result.data as PaginationResponse<ICollectionRecord>;
  }

  // records
  async getRecords(
    collectionId: string,
    versionId: string,
    filter: IPageFilter,
  ): Promise<PaginationResponse<ICollectionRecord>> {
    const url = `${this.urlPath}/${collectionId}/versions/${versionId}/records`;
    return this.getPage(
      filter,
      url,
    ) as unknown as PaginationResponse<ICollectionRecord>;
  }
  async getRecordById(
    collectionId: string,
    versionId: string,
    recordId: string,
  ) {
    const url = `${this.urlPath}/${collectionId}/versions/${versionId}/records/${recordId}`;
    const result = await this.get(url, {});
    return result.data as ICollectionVersion;
  }
}
