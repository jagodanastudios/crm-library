import { ApiPaginationController } from '../../axios/paginationAPI';

export interface IBlogTag {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  title: string;
  slug: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  public: boolean;
}
export class BlogTagsApis extends ApiPaginationController<IBlogTag> {
  protected urlPath: string = '/api/blogs/tags';
}
