import { IUnitOfWork } from '@modules/core/domain/repositories'
import { DataSource, QueryRunner } from 'typeorm'

export class UnitOfWorkTypeORM implements IUnitOfWork {
  private transaction: QueryRunner | null
  constructor(private readonly manager: DataSource) {}

  async start(): Promise<void> {
    if (this.transaction && this.transaction.isTransactionActive) {
      throw new Error('Transaction already started')
    }
    if (!this.transaction) {
      this.transaction = this.manager.createQueryRunner()
      await this.transaction.startTransaction()
    }
  }

  async commit(): Promise<void> {
    this.validationTransaction()
    await this.transaction.commitTransaction()
    await this.close()
  }

  async rollback(): Promise<void> {
    this.validationTransaction()
    await this.transaction.rollbackTransaction()
    await this.close()
  }

  getTransaction(): any {
    return this.transaction
  }

  // async do<T>(fn: (uow: IUnitOfWork) => Promise<T>): Promise<T> {
  //   try {
  //     if (this.transaction) {
  //       const returnValue = await fn(this)
  //       this.transaction = null
  //       return returnValue
  //     }

  //     return await fn(this)
  //   } catch (e) {
  //     if (this.transaction) {
  //       await this.transaction?.rollbackTransaction()
  //       this.transaction = null
  //     }
  //     throw e
  //   }
  // }

  async do<T>(fn: (uow: IUnitOfWork) => Promise<T>): Promise<T> {
    await this.start()
    try {
      const returnValue = await fn(this)
      await this.commit()
      return returnValue
    } catch (e) {
      await this.rollback()
      throw e
    } finally {
      await this.close()
    }
  }

  private validationTransaction() {
    if (!this.transaction || !this.transaction.isTransactionActive) {
      throw new Error('Transaction not started or already completed')
    }
  }

  async close(): Promise<void> {
    if (this.transaction) {
      await this.transaction.release()
      this.transaction = null
    }
  }
}
