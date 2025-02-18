import { ApiPaginationController } from '../../axios/paginationAPI';
import { IAsset } from '../../types';

export interface IAuthConfig {
  _id: string;
  id: string;
  name: string;
  smallName: string;
  description: string;
  logoFallBack: string;
  logo: IAsset | string;
  privacyPolicy: string;
  termsOfService: string;
  screen: {
    login: {
      title: string;
      description: string;
    };
    registration: {
      title: string;
      description: string;
    };
    forgotPassword: {
      title: string;
      description: string;
    };
    resetPassword: {
      title: string;
      description: string;
    };
    verifyEmail: {
      title: string;
      description: string;
    };
    magicLink: {
      title: string;
      description: string;
    };
  };
}

export class AuthConfigsApis extends ApiPaginationController<IAuthConfig> {
  protected urlPath: string = '/api/auth/configs';
}
