import { queryParamsStr } from '@/utils'
import { getUserRoleId } from '@/utils/auth'
import { isArray } from '@/utils/is'
import { defHttp } from '../axios'
export class CreateClass<T = Recordable> {
  public infos = [] as T[]

  constructor(private search_db: string) {}

  public execute() {
    return this.infos.length > 1
      ? Promise.all(this.infos.map((el) => this.request(el)))
      : this.request(this.infos[0])
  }

  public values(params = {} as T | T[]) {
    if (isArray(params)) this.infos.push(...params)
    else this.infos.push(params)

    return this
  }

  public reset() {
    this.infos = []
    return this
  }

  private request(data = {} as any) {
    return defHttp.post({
      url:
        '/created' +
        queryParamsStr({
          search_db: this.search_db,
          userrole_id: getUserRoleId(),
        }),
      data: {
        created: data,
      },
    })
  }
}
