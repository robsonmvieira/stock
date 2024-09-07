import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import {
  BlockProductUseCase,
  CreateProductUseCase,
  ListProductUseCase
} from '../../../use-cases'
import { Response } from 'express'
import { CreateProductDto } from '../../../use-cases/product/create-product-use-case/dto'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
@ApiTags('Product')
@Controller('product')
export class ProductController {
  @Inject() private readonly createProductUseCase: CreateProductUseCase
  @Inject() private readonly blockeProductUseCase: BlockProductUseCase
  @Inject() private readonly listProductUseCase: ListProductUseCase

  @Post()
  @UseInterceptors(FileInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        invoiceNumber: { type: 'string' },
        price: { type: 'integer' },
        description: { type: 'string' },
        details: { type: 'string' },
        stockQuantity: { type: 'integer' },
        images: { type: 'array', items: { type: 'string', format: 'binary' } },
        status: { type: 'string' },
        supplierId: { type: 'string' },
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

  @Get()
  async list(@Res() response: Response) {
    const data = await this.listProductUseCase.execute()
    return response.status(200).json(data)
  }

  @Get('block-product/:id')
  async blockeProduct(@Res() response: Response, @Param('id') id: string) {
    const data = await this.blockeProductUseCase.execute(id)

    if (data.hasError) {
      return response.status(400).json(data)
    }
    return response.status(200).json(data)
  }
}
