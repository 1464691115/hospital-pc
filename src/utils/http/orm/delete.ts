import { queryParamsStr } from '@/utils'
import { SelectQuery } from './interface'
import { getUserRoleId } from '@/utils/auth'
import { defHttp } from '../axios'

export class DeleteClass extends SelectQuery {
  constructor(private search_db: string) {
    super()
  }

  public execute() {
    return this.request()
  }

  private request() {
    return defHttp.put({
      url:
        '/delete' +
        queryParamsStr({
          search_db: this.search_db,
          userrole_id: getUserRoleId(),
        }),
      data: {
        query: this.query,
      },
    })
  }
}
