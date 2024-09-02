import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreateSupplierAddressesDtoProps {
  @ApiProperty({ description: 'Street of the address.' })
  @IsString()
  street: string

  @ApiProperty({
    description: 'Number of the address.'
  })
  @IsOptional()
  @IsString()
  number?: string

  @ApiProperty({
    description: 'Complement of the address.'
  })
  @IsOptional()
  @IsString()
  complement?: string

  @ApiProperty({
    description: 'Neighborhood of the address.'
  })
  @IsString()
  neighborhood: string

  @ApiProperty({
    description: 'City of the address.'
  })
  @IsString()
  city: string

  @ApiProperty({
    description: 'State of the address.'
  })
  @IsString()
  state: string

  @ApiProperty({
    description: 'Country of the address.'
  })
  @IsString()
  country: string

  @ApiProperty({
    description: 'Postal code of the address.'
  })
  @IsString()
  postalCode: string

  @ApiProperty({
    description: 'Supplier is active.'
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}

export type CreateSupplierDtoProps = {
  name: string
  lastName: string
  email: string
  phone: string
  document: string
  isActive?: boolean
  addresses: CreateSupplierAddressesDtoProps[]
  products?: string[]
}
