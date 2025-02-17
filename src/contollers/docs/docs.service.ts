import { ApiPaginationController } from '../../axios/paginationAPI';
import { IAsset } from '../../types';
import { IDocAuthor } from './docsAuthors.service';
import { IDocFolder } from './docsFolders.service';
import { IDocTag } from './docsTags.service';

export interface IDocPost {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  authors: string[] | IDocAuthor[];
  folder: string | IDocFolder;
  image: string;
  assetFile: string | IAsset;
  slug: string;
  url: string;
  tags: string[] | IDocTag[];
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
  suggestedDocs: string[] | IDocPost[];
}
export class DocPostApis extends ApiPaginationController<IDocPost> {
  protected urlPath: string = '/api/docs';

  async getByPath(path: string): Promise<IDocPost> {
    const result = await this.get(
      `${this.urlPath}/path`,
      {
        path: path,
      },
      {},
    );
    return result.data;
  }
}
