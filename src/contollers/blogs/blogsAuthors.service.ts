import { ApiPaginationController } from '../../axios/paginationAPI';

export interface IBlogAuthor {
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
export class BlogAuthorsApis extends ApiPaginationController<IBlogAuthor> {
  protected urlPath: string = '/api/blogs/authors';
}
