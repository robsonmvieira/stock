import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsDate,
  IsEmail,
  validateSync
} from 'class-validator'
import { CreateEmployeeProps } from './create-employee-props.dto'

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Name of employee' })
  @IsNotEmpty()
  @IsString()
  firstName: string

  @ApiProperty({ description: 'Name of employee' })
  @IsNotEmpty()
  @IsString()
  lastName: string

  @ApiProperty({ description: 'Email of employee' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string

  @ApiProperty({ description: 'employee of employee' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  phone: string

  @ApiProperty({ description: 'Hire date' })
  @IsNotEmpty()
  @IsDate()
  hireDate: Date

  @ApiProperty({ description: 'gestorId id' })
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  gestorId: string

  @ApiProperty({ description: 'document ' })
  @IsNotEmpty()
  @IsString()
  document: string

  @ApiProperty({ description: 'jobPosition id ' })
  @IsNotEmpty()
  @IsString()
  jobPosition: string

  @ApiProperty({ description: 'user initial password' })
  @IsNotEmpty()
  @IsString()
  password: string

  constructor(props: CreateEmployeeProps) {
    if (!props) return

    Object.assign(this, props)
  }
}

export class CreateEmployeeDtoPropsValidator {
  static validate(props: CreateEmployeeProps) {
    const entity = new CreateEmployeeDto(props)
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
