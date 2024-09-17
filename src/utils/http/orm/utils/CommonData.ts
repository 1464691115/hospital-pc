export class CommonData {
  /** id  **/
  public id = Date.now().toString()
  /** 用户角色id  **/
  public userrole_id?: string
  /** 状态, 0 未启用, 1已启用  **/
  public state?: any

  public created_at?: string
  public updated_at?: string
  public deleted?: string

  constructor(arg = {}) {
    Object.assign(this, arg)
  }
}
