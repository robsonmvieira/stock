import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, validateSync, IsOptional } from 'class-validator'
import { CreateJobPositionProps } from './create-job-postion.props.dto'

export class CreateJobPositionDto {
  @ApiProperty({ description: 'Job Name' })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({ description: 'Description job' })
  @IsString()
  @IsOptional()
  description?: string

  constructor(props: CreateJobPositionProps) {
    if (!props) return

    Object.assign(this, props)
  }
}

export class CreateJobPositionDtoPropsValidator {
  static validate(props: CreateJobPositionProps) {
    const entity = new CreateJobPositionDto(props)
    const result = validateSync(entity)

    const convertErrorsToObject = errors => {
      const formattedErrors = {}
      errors.forEach(error => {
        const { property, constraints } = error
        formattedErrors[property] = Object.values(constraints)
      })
      return formattedErrors
    }
    return convertErrorsToObject(result)
  }
}
