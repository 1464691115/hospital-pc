import { defHttp } from '@/utils/http/axios'
import { UserApi } from './ApiEnum'
import type {
  LoginParams,
  RegisterAccountParams,
  RegisterAccountResultModel,
} from './model/userModel'

export function loginApi(params: LoginParams) {
  return getTokenApi(params)
}

export function sendPhoneCodeApi(phone) {
  return defHttp.get({
    url: UserApi.SMS + phone,
  }, {
    domain: 'http://ashfire.cn:51100'
  })
}

export function registerAccountApi(params: RegisterAccountParams) {
  return defHttp.post<RegisterAccountResultModel>({
    url: UserApi.REGISTER_USER,
    data: { user: params, code: params.code },
  }, {
    domain: 'http://ashfire.cn:51100'
  })
}

export function getTokenApi(params: RegisterAccountParams) {
  return defHttp.post({
    url: UserApi.GET_TOKEN,
    data: {
      auth: params,
    },
  }, {
    domain: 'http://ashfire.cn:51100'
  })
}

export function getUserInfoApi() {
  return defHttp.get({
    url: UserApi.GET_USERINFO,
  })
}

export function getUserRoleApi(role_model = 'doctor') {
  return defHttp.get({
    url: UserApi.GET_USER_ROLE,
    data: {
      role_model,
    },
  })
}

export function getRoleApi(role_model = 'doctor') {
  return defHttp.get({
    url: UserApi.GET_ROLE,
    data: {
      role_model,
    },
  })
}

export function createUserAuthenticationApi(
  data = {
    name: '用户',
    age: '18',
    sex: '男',
    identity: '150627201705318315',
  },
) {
  return defHttp.post({
    url: UserApi.ADD_USER_AUTH,
    data: {
      user: data,
    },
  })
}

export function bindUserRoleApi(role_id) {
  return defHttp.post({
    url: UserApi.BIND_USER_ROLE,
    data: {
      role: { role_id },
    },
  })
}
