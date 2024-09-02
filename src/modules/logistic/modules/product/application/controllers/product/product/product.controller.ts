import { Body, Controller, Inject, Post, Res } from '@nestjs/common'
import { CreateCategoryDto, CreateProductUseCase } from '../../../use-cases'
import { Response } from 'express'
@Controller('product')
export class ProductController {
  @Inject() private readonly createCategoryUseCase: CreateProductUseCase

  @Post()
  async create(@Res() response: Response, @Body() dto: CreateCategoryDto) {
    const data = await this.createCategoryUseCase.execute(dto)

    if (data.hasError) {
      return response.status(400).json(data)
    }
    return response.status(201).json(data)
  }
}
