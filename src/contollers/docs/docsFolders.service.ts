import { ApiPaginationController } from '../../axios/paginationAPI';

export interface IDocFolder {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  name: string;
  parentFolder: string;
  slug: string;
  path: string;
  url: string;
  subFolders: string | IDocFolder[];
}
export class DocFolderApis extends ApiPaginationController<IDocFolder> {
  protected urlPath: string = '/api/docs/folders';

  async getTree(folder?: string) {
    const query: {
      folder?: string;
    } = {};
    if (folder) query['folder'] = folder;
    const result = await this.get(`${this.urlPath}/tree`, query, {});
    return result.data as any;
  }
}
