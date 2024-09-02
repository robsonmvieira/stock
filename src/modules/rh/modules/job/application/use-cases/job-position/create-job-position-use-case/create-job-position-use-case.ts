import { IJobPositionRepository } from '@modules/rh/modules/job/domain/repositories'
import { Inject, Injectable } from '@nestjs/common'
import { CreateJobPositionDtoPropsValidator } from './dto/create-job-position.props'
import { ModelOutput } from '@modules/core/application/usecases/common'
import { JobPositionMapper } from '../../../mappers/job-position.mapper'
import { CreateJobPositionProps } from './dto/create-job-postion.props.dto'

@Injectable()
export class CreateJobPositionUseCase {
  @Inject('IJobPositionRepository')
  private repo: IJobPositionRepository

  async execute(command: CreateJobPositionProps) {
    //CreateJobPositionProps
    const validate = CreateJobPositionDtoPropsValidator.validate(command)
    if (Object.keys(validate).length !== 0) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: validate
      })
    }

    const jobPosition = await this.repo.findByTitle(command.title)
    if (jobPosition) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: {
          email: 'job Position already exists'
        }
      })
    }

    const payload = JobPositionMapper.fromInputToEntity(command)
    if (payload.notification.hasError()) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: payload.notification
      })
    }

    const toModel = JobPositionMapper.fromEntityToModel(payload)

    await this.repo.save(toModel)
    return new ModelOutput({
      hasError: false,
      data: null,
      error: null
    })
  }
}
