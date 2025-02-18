import { ApiPaginationController } from '../../axios/paginationAPI';
import { IUser } from '../../types';
import { IAuthMethod } from './methods.service';

export const IAuthSettingType = {
  NORMAL: 'normal',
  OAUTH2: 'oauth2',
};

export interface IAuthSetting {
  _id: string;
  id: string;
  type: string;
  title: string;
  orgId: string;
  clientId: string;
  clientSecret: string;
  creator: string | IUser;
  redirectUrls: string[];
  methods: string[] | IAuthMethod[];
  applicationTokenUrl: string;
  applicationProfileUrl: string;
}

export class AuthSettingsApis extends ApiPaginationController<IAuthSetting> {
  protected urlPath: string = '/api/auth/settings';

  async getLoginUrl(
    id: string,
    redirect: {
      success: string;
      error: string;
    },
  ) {
    try {
      const result = await this.post<{
        success: boolean;
        data: {
          redirectUrl: string;
        };
      }>(
        `${this.urlPath}/${id}/get-login-url`,
        {},
        {},
        {
          redirect: redirect,
        },
      );
      const data = result.data;
      if (!data) return null;
      if (!data.success) return null;
      return data.data.redirectUrl;
    } catch (e) {
      return null;
    }
  }
}
