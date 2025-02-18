import { ApiPaginationController } from '../../axios/paginationAPI';

export interface IBlogFolder {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  name: string;
  parentFolder: string;
  slug: string;
  path: string;
  url: string;
  subFolders: string | IBlogFolder[];
}
export class BlogFolderApis extends ApiPaginationController<IBlogFolder> {
  protected urlPath: string = '/api/blogs/folders';

  async getTree(folder?: string) {
    const query: {
      folder?: string;
    } = {};
    if (folder) query['folder'] = folder;
    const result = await this.get(`${this.urlPath}/tree`, query, {});
    return result.data as any;
  }
}
