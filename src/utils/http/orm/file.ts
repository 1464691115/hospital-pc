import { queryParamsStr } from '@/utils'
import { getToken, getUserRoleId } from '@/utils/auth'
import { getAppEnvConfig } from '@/utils/env'
import { defHttp } from '../axios'
import { isHttpUrl } from '@/utils/is'

export const OperateFileApi = '/Files'

export class FileClass {
  constructor(private static_path: string) { }

  public upload(filePath) {
    return defHttp.file({
      url:
        OperateFileApi +
        queryParamsStr({
          static_path: this.static_path,
          userrole_id: getUserRoleId(),
        }),
      ['filePath']: filePath,
    })
  }

  public getPath(file_name: string) {
    const regFileName = /\[(.*)\]/.exec(file_name)
    if (regFileName) {
      const [_, val] = regFileName
      const arr_file = val.replace(/["']/g, '').split(',')
      if (arr_file.length == 1) {
        return this.getPath(arr_file[0])
      } else if (arr_file.length) {
        return arr_file.map((el) => this.getPath(el))
      }
    }

    if (!file_name) return ''
    if (
      isHttpUrl(file_name) ||
      ['wxfile://', 'data:image/png;base64,', '/static/images/'].some((el) =>
        file_name.includes(el),
      )
    )
      return file_name

    const { VITE_GLOB_IMG_PREFIX } = getAppEnvConfig()

    return (
      VITE_GLOB_IMG_PREFIX +
      OperateFileApi +
      queryParamsStr({
        static_path: this.static_path,
        userrole_id: getUserRoleId(),
        file_name,
        token: getToken(),
      })
    )
  }
}
