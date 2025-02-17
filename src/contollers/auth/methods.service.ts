import { ApiPaginationController } from '../../axios/paginationAPI';
import { IUser } from '../../types';

export const AUTH_METHOD = {
  MAGIC_LINK: 'magic-link',
  GOOGLE: 'google',
  LINKEDIN: 'linkedIn',
};

export interface IAuthMethod {
  _id: string;
  id: string;
  title: string;
  methodId: string;
  method: string; // AUTH_METHOD
  orgId: string;
  google?: {
    clientId: string;
    clientSecret: string;
    scopes: string[];
  };
  linkedIn?: {
    clientId: string;
    clientSecret: string;
    scopes: string[];
  };
  creator: string | IUser;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export class AuthMethodsApis extends ApiPaginationController<IAuthMethod> {
  protected urlPath: string = '/api/auth/methods';

  async createMagicLink(values: Partial<IAuthMethod>) {
    const url = `${this.urlPath}/magic-link`;
    const response = await this.post(url, {}, {}, values);
    return response.data;
  }
  async updateMagicLink(id: string, values: Partial<IAuthMethod>) {
    const url = `${this.urlPath}/magic-link/${id}`;
    const response = await this.patch(url, {}, {}, values);
    return response.data;
  }

  async createGoogle(values: Partial<IAuthMethod>) {
    const url = `${this.urlPath}/social/google`;
    const response = await this.post(url, {}, {}, values);
    return response.data;
  }
  async updateGoogle(id: string, values: Partial<IAuthMethod>) {
    const url = `${this.urlPath}/social/google/${id}`;
    const response = await this.patch(url, {}, {}, values);
    return response.data;
  }

  async createLinkedIn(values: Partial<IAuthMethod>) {
    const url = `${this.urlPath}/social/linkedin`;
    const response = await this.post(url, {}, {}, values);
    return response.data;
  }
  async updateLinkedIn(id: string, values: Partial<IAuthMethod>) {
    const url = `${this.urlPath}/social/linkedin/${id}`;
    const response = await this.patch(url, {}, {}, values);
    return response.data;
  }
}
