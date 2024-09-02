import { IRepository } from 'src/modules/core/domain/repositories'
import { JobPositionModel } from '../models/job-position.model'

export interface IJobPositionRepository extends IRepository<JobPositionModel> {
  findByTitle(title: string): Promise<JobPositionModel>
}
