declare type Nullable<T> = T | null;
declare type Recordable<T = any> = Record<string, T>;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};

declare type TargetContext = '_self' | '_blank';
declare type Constructor = new (...args: any[]) => any
