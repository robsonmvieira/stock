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
  async create(@Res() response: Response, @Body() dto: CreateProductDto) {
    const data = await this.createProductUseCase.execute(dto)

    if (data.hasError) {
      return response.status(400).json(data)
    }
    return response.status(201).json(data)
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() dto: any,
    @Res() response: Response,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log(file.fieldname, file.originalname, file.encoding, file.mimetype)
    console.log(dto)
    return response.status(201).json({ data: 'ok' })
  }
}
