import { Model } from '../entities/model'

export interface IRepository<T extends Model> {
  save(entity: T): Promise<void>
  update(modelId: string, entity: T): Promise<void>
  delete(entity: T): Promise<void>
  findById(id: string): Promise<T>
  findAll(): Promise<T[]>
}
