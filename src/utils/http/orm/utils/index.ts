export function returnApiEntityObject<T extends (...arg) => Promise<any>>(
  fn: T,
) {
  return {} as ReturnPromiseType<typeof fn>
}
