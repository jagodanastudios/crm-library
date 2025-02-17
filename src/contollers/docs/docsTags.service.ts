import { ApiPaginationController } from '../../axios/paginationAPI';

export interface IDocTag {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  title: string;
  slug: string;
  public: boolean;
}
export class DocTagsApis extends ApiPaginationController<IDocTag> {
  protected urlPath: string = '/api/docs/tags';
}
