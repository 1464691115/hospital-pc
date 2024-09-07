import {
  CHAT_USER_SIG_KEY,
  DOCTOR_ID_KEY,
  TOKEN_KEY,
  USER_ID_KEY,
  USER_INFO_KEY,
  USER_ROLE_ID_KEY,
} from '@/enums/cacheEnum'

export interface BasicStore {
  [TOKEN_KEY]: string
  [USER_INFO_KEY]: any
  [USER_ID_KEY]: string
  [USER_ROLE_ID_KEY]: string
  [DOCTOR_ID_KEY]: string
  [CHAT_USER_SIG_KEY]: string
}

export type BasicKeys = keyof BasicStore;


export class Persistent {

  static getLocal<T extends BasicKeys>(key: T): BasicStore[T] {
    return localStorage.getItem(key) || ''
  }

  static setLocal<T extends BasicKeys>(key: T, data: any): void {
    localStorage.setItem(key, data)
  }


}