import { ApiPaginationController } from '../../axios/paginationAPI';

export interface IDocAuthor {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  name: string;
  username: string;
  image: string;
  links: {
    [key: string]: string;
  };
}
export class DocAuthorsApis extends ApiPaginationController<IDocAuthor> {
  protected urlPath: string = '/api/docs/authors';
}
