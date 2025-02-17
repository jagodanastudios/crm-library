import { ApiPaginationController } from '../../axios/paginationAPI';
import { IAsset } from '../../types';
import { IBlogAuthor } from './blogsAuthors.service';
import { IBlogFolder } from './blogsFolders.service';
import { IBlogTag } from './blogsTags.service';

export interface IBlogPost {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  authors: string[] | IBlogAuthor[];
  folder: string | IBlogFolder;
  image: string;
  assetFile: string | IAsset;
  slug: string;
  url: string;
  tags: string[] | IBlogTag[];
  published: boolean;
  publishedAt: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  title: string;
  description: string;
  content: string;
  suggestedBlogs: string[] | IBlogPost[];
}
export class BlogPostApis extends ApiPaginationController<IBlogPost> {
  protected urlPath: string = '/api/blogs';

  async getByPath(
    path: string,
    draftPreview: boolean = false,
  ): Promise<IBlogPost> {
    const query: {
      path: string;
      draftPreview?: boolean;
    } = {
      path: path,
    };
    if (draftPreview) {
      query.draftPreview = draftPreview;
    }
    const result = await this.get(`${this.urlPath}/path`, query, {});
    return result.data;
  }
}
