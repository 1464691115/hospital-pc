export class EntityClass<T extends Constructor> {
  public values = {} as InstanceType<T>
  constructor(data, classModel: T) {
    const ClassModel = new classModel()
    for (const key in data) {
      if (
        Object.prototype.hasOwnProperty.call(data, key) &&
        Object.prototype.hasOwnProperty.call(ClassModel, key) &&
        ['created_at', 'updated_at', 'deleted'].indexOf(key) === -1
      ) {
        const element = data[key]
        this.values[key] = element
      }
    }
  }

  public getValues() {
    return this.values
  }
}
