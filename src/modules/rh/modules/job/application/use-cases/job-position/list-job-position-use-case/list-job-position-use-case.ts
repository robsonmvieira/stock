import { ModelCollectionOutput } from '@modules/core/application/usecases/common'
import { IJobPositionRepository } from '@modules/rh/modules/job/domain/repositories'
import { Inject } from '@nestjs/common'
import { JobPositionMapper } from '../../../mappers/job-position.mapper'

export class ListJobPositionUseCase {
  @Inject('IJobPositionRepository')
  private repo: IJobPositionRepository

  async execute() {
    const jobPosition = await this.repo.findAll()
    const response = jobPosition.map(job =>
      JobPositionMapper.fromModelToOutput(job)
    )

    return new ModelCollectionOutput({
      hasError: false,
      data: response,
      error: null
    })
  }
}
