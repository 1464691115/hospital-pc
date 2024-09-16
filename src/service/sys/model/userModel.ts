import { UserInfo } from '#/store'

export interface LoginParams {
  username?: string
  code?: string
  password?: string
}

export interface GetUserInfoModel extends UserInfo { }

export interface LoginResultModel extends UserInfo {
  user_id: string;
  token: string;
  username: string;
  serviceAPI: any[];
}

export interface RegisterAccountParams extends LoginParams { }
export interface RegisterAccountResultModel extends UserInfo {
  id: string
}
