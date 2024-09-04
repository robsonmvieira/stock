export interface IUnitOfWork {
  commit(): Promise<void>
  rollback(): Promise<void>
  start(): Promise<void>
  do<T>(fn: (uow: IUnitOfWork) => Promise<T>): Promise<T>
}
