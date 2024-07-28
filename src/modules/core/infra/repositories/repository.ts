import { FindOneOptions } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { Repository } from 'typeorm/repository/Repository'
import { Model } from '../../domain/entities'
import { IRepository } from '../../domain/repositories'

export abstract class BaseRepository<T extends Model>
  implements IRepository<T>
{
  constructor(protected repo: Repository<T>) {}

  async save(entity: T): Promise<void> {
    await this.repo.save(entity)
  }
  async update(modelId: string, entity: Partial<T>): Promise<void> {
    let oldEntity = await this.findById(modelId)

    oldEntity = {
      ...oldEntity,
      ...entity
    }
    await this.repo.update(modelId, oldEntity as QueryDeepPartialEntity<T>)
  }
  async delete(entity: T): Promise<void> {
    // soft delete
    entity.deleted_at = new Date()
    entity.is_deleted = true
    await this.repo.update(entity.id, entity as QueryDeepPartialEntity<T>)
  }
  async findById(id: string): Promise<T> {
    const options: FindOneOptions<T> = {
      where: { id } as Partial<FindOneOptions<T>['where']>
    }

    return await this.repo.findOne(options)
  }
  async findAll(): Promise<T[]> {
    return await this.repo.find({ where: { deleted_at: null } })
  }
}
