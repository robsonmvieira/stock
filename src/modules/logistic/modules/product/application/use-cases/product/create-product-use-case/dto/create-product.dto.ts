import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
  validateSync,
  IsArray,
  IsOptional,
  IsNumber,
  IsUUID
} from 'class-validator'
import { CreateProductDtoProps } from '.'

export class CreateProductDto {
  @ApiProperty({ description: 'Name of category' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ description: 'Description of category' })
  @IsOptional()
  @IsString()
  description: string

  @ApiProperty({ description: 'Price of product' })
  @IsNumber()
  price: number

  @ApiProperty({ description: 'Stock quantity of product' })
  @IsNumber()
  stockQuantity: number

  @ApiProperty({ description: 'Unit price of product' })
  @IsNumber()
  unitPrice: number

  @ApiProperty({ description: 'Total Value already purchased product' })
  @IsOptional()
  @IsNumber()
  totalAmount: number

  @ApiProperty({
    description: 'Total Quantity  already purchased product'
  })
  @IsOptional()
  @IsNumber()
  QuantityPurchased: number

  @ApiProperty({
    description: 'list of products Id '
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[]

  @ApiProperty({ description: 'Status of product' })
  @IsOptional()
  @IsString()
  status: string

  @ApiProperty({ description: 'Id of supplier' })
  @IsNotEmpty()
  @IsUUID()
  supplierId: string

  @ApiProperty({ description: 'sku of product' })
  @IsNotEmpty()
  @IsUUID()
  sku: string

  @ApiProperty({ description: 'Id of category' })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string

  constructor(props: CreateProductDtoProps) {
    if (!props) return

    Object.assign(this, props)
  }
}

export class CreateProductDtoPropsValidator {
  static validate(props: CreateProductDtoProps) {
    const entity = new CreateProductDto(props)
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
