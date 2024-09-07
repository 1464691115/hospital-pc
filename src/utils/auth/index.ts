import {
  CHAT_USER_SIG_KEY,
  DOCTOR_ID_KEY,
  TOKEN_KEY,
  USER_ID_KEY,
  USER_ROLE_ID_KEY,
} from '@/enums/cacheEnum'
import { Persistent } from '@/utils/cache/persistent'

export function getToken() {
  return Persistent.getLocal(TOKEN_KEY)
}

export function getUserRoleId() {
  return Persistent.getLocal(USER_ROLE_ID_KEY)
}

export function getUserId() {
  return Persistent.getLocal(USER_ID_KEY)
}

export function getDoctorId() {
  return Persistent.getLocal(DOCTOR_ID_KEY)
}

export function getChatUserSig() {
  return Persistent.getLocal(CHAT_USER_SIG_KEY)
}
