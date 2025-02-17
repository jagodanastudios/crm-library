import { ApiPaginationController } from '../../axios/paginationAPI';
import { ICollection, ICollectionVersion, IUser } from '../../types';

export interface IForm {
  _id: string;
  name: string;
  title: string;
  description: string;
  formId: string;
  collectionId: string | ICollection;
  collectionVersionId: string | ICollectionVersion;
  archived: boolean;
  submissions: number;
  published: boolean;
  publishedAt: Date;
  creator: string | IUser;

  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class FormsApis extends ApiPaginationController<IForm> {
  protected urlPath: string = '/api/forms';

  async getForm(formId: string): Promise<any> {
    const prommises = [this.getByFormId(formId), this.getFields(formId)];
    const [form, fields] = await Promise.all(prommises);
    return { form, fields };
  }

  async getByFormId(formId: string): Promise<any> {
    const url = `${this.urlPath}/public/${formId}`;
    return this.get(url, {});
  }

  async getFields(formId: string): Promise<any> {
    try {
      const url = `${this.urlPath}/public/${formId}/fields`;
      return this.get(url, {});
    } catch (e) {
      return null;
    }
  }

  async submitForm(formId: string, data: any) {
    const url = `${this.urlPath}/public/${formId}/submit`;
    return this.post(url, {}, {}, data);
  }
}
