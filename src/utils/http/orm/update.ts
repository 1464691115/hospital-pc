import { queryParamsStr } from '@/utils'
import { SelectQuery } from './interface'
import { getUserRoleId } from '@/utils/auth'
import { omit } from 'lodash-es'
import { defHttp } from '../axios'

export class UpdateClass<T = Recordable> extends SelectQuery {
  public update = {} as T

  public isAddRoleId = true

  constructor(private search_db: string) {
    super()
  }

  public execute() {
    return this.request()
  }

  public delRoleIdParams() {
    this.isAddRoleId = false
    return this
  }

  public set(params = {} as T) {
    this.update = params
    return this
  }

  private request() {
    return defHttp.put({
      url:
        '/update' +
        queryParamsStr({
          search_db: this.search_db,
          userrole_id: getUserRoleId(),
        }),
      data: {
        query: [
          ...this.query,
          ...(this.isAddRoleId
            ? [
                {
                  fild: { userrole_id: getUserRoleId() },
                  type: '=',
                  condition: '&&',
                },
              ]
            : []),
        ],
        // update: this.update,
        update: omit(this.update || {}, 'id'),
      },
    })
  }
}
