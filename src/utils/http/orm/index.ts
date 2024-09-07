import { CreateClass } from './create'
import { DeleteClass } from './delete'
import { FileClass } from './file'
import { SelectBuilderClass } from './query'
import { UpdateClass } from './update'

export class OrmClass<T extends Recordable = Recordable> {
  public entity = {} as T
  constructor(public search_db) {}
  public select = () => new SelectBuilderClass<T>(this.search_db)
  public insert = () => new CreateClass<T>(this.search_db)
  public file = () => new FileClass(this.search_db)

  public delete = () => new DeleteClass(this.search_db)
  public update = () => new UpdateClass<T>(this.search_db)
}
