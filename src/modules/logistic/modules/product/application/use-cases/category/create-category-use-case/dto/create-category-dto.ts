import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
  validateSync,
  IsArray,
  IsOptional
} from 'class-validator'
import { CreateCategoryDtoProps } from '.'

export class CreateCategoryDto {
  @ApiProperty({ description: 'Name of category' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: 'Description of category' })
  @IsOptional()
  @IsString()
  description: string

  @ApiProperty({
    description: 'list of products Id '
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  products: string[]

  constructor(props: CreateCategoryDtoProps) {
    if (!props) return

    Object.assign(this, props)
  }
}

export class CreateCategoryDtoPropsValidator {
  static validate(props: CreateCategoryDtoProps) {
    const entity = new CreateCategoryDto(props)
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
