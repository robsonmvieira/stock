import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  validateSync,
  IsArray
} from 'class-validator'
import { CreateSupplierAddressesDtoProps, CreateSupplierDtoProps } from '.'

export class CreateSupplierDto {
  @ApiProperty({ description: 'Name of supplier' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: 'Name of supplier' })
  @IsNotEmpty()
  @IsString()
  lastName: string

  @ApiProperty({ description: 'Email of supplier' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string

  @ApiProperty({ description: 'employee of supplier' })
  @IsNotEmpty()
  @IsString()
  phone: string

  @ApiProperty({ description: 'document' })
  @IsNotEmpty()
  @IsString()
  document: string

  @ApiProperty({
    description: 'list of address ',
    type: CreateSupplierAddressesDtoProps
  })
  @IsNotEmpty()
  @IsArray({ message: 'addresses must be an array' })
  addresses: CreateSupplierAddressesDtoProps[]

  constructor(props: CreateSupplierDtoProps) {
    if (!props) return

    Object.assign(this, props)
  }
}

export class CreateSupplierDtoPropsValidator {
  static validate(props: CreateSupplierDtoProps) {
    const entity = new CreateSupplierDto(props)
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
