import { ApiPaginationController } from '../../axios/paginationAPI';

export interface IAccount {
  id: string;
  _id: string;
  provider: string;
  type: string;
  providerAccountId: string;
  expires_at: number;
  scope: string;
  userId: string;
  lastSignIn: string;
}
export interface IAuthSupportedMethod {
  id: string;
  type: 'form' | 'button';
  name: string;
  description: string;
  url: string;
  icon: string;
  formDetails?: {
    fields: {
      id: string;
      type: string;
      name: string;
      required: boolean;
      placeholder: string;
    }[];
    clientRedirectUrl: string;
    button: {
      title: string;
    };
  };
}

export interface ITokenResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      name: string;
    };
    token: string;
  };
}

export class AuthApis extends ApiPaginationController<IAccount> {
  protected urlPath: string = '/api/organizations/auth';

  async getSupportedMethods(
    screen: 'login' | 'register' | 'forgot-password' | 'reset-password',
  ): Promise<IAuthSupportedMethod[]> {
    const result = await this.get(
      `${this.urlPath}/supported-methods`,
      { screen: screen },
      {},
    );
    return result.data.data as IAuthSupportedMethod[];
  }

  async verifyEmail(code: number): Promise<ITokenResponse> {
    const response = await this.post(
      `${this.urlPath}/verify-email`,
      {},
      {},
      { code },
    );
    return response.data;
  }
}
