import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { CreateProductUseCase } from '../../../use-cases'
import { Response } from 'express'
import { CreateProductDto } from '../../../use-cases/product/create-product-use-case/dto'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
@ApiTags('Product')
@Controller('product')
export class ProductController {
  @Inject() private readonly createProductUseCase: CreateProductUseCase

  @Post()
  @UseInterceptors(FileInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        stockQuantity: { type: 'integer' },
        unitPrice: { type: 'string' },
        totalAmount: { type: 'string' },
        QuantityPurchased: { type: 'integer' },
        images: { type: 'array', items: { type: 'string', format: 'binary' } },
        status: { type: 'string' },
        supplierId: { type: 'string' },
        sku: { type: 'string' },
        categoryId: { type: 'string' }
      }
    }
  })
  async create(
    @Res() response: Response,
    @Body() dto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const data = await this.createProductUseCase.execute(dto, file.buffer)

    if (data.hasError) {
      return response.status(400).json(data)
    }
    return response.status(201).json(data)
  }
}
