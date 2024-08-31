import { JobPosition } from '../../domain/entities'
import { JobPositionModel } from '../../domain/models'
import { CreateJobPositionDto } from '../use-cases/job-position/create-job-position-use-case/dto/create-job-position.props'

export class JobPositionMapper {
  static fromModelToOutput(model: JobPositionModel) {
    return {
      id: model.id,
      title: model.title,
      description: model?.description,
      createdAt: model?.created_at,
      updatedAt: model?.updated_at
    }
  }

  static fromInputToEntity(model: CreateJobPositionDto): JobPosition {
    return JobPosition.create({
      title: model.title,
      description: model?.description
    })
  }

  static fromEntityToModel(entity: JobPosition): JobPositionModel {
    return new JobPositionModel({
      id: entity.id.id,
      title: entity.title,
      description: entity.description
    })
  }
}
