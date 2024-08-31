import { BaseRepository } from 'src/modules/core/infra'
import { JobPositionModel } from '../../domain/models'
import { IJobPositionRepository } from '../../domain/repositories'

export class JobPositionTypeORMRepository
  extends BaseRepository<JobPositionModel>
  implements IJobPositionRepository
{
  async findByTitle(title: string): Promise<JobPositionModel> {
    const model = await this.repo.findOne({ where: { title } })
    return model
  }
}
