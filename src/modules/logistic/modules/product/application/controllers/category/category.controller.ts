import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common'
import {
  CreateCategoryUseCase,
  ListCategoryUseCase,
  CreateCategoryDto
} from '../../use-cases'

import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  @Inject() private readonly createCategoryUseCase: CreateCategoryUseCase
  @Inject() private readonly listCategoryUseCase: ListCategoryUseCase

  @Post()
  async create(@Res() response: Response, @Body() dto: CreateCategoryDto) {
    const data = await this.createCategoryUseCase.execute(dto)

    if (data.hasError) {
      return response.status(400).json(data)
    }
    return response.status(201).json(data)
  }

  @Get()
  async list(@Res() response: Response) {
    const data = await this.listCategoryUseCase.execute()
    return response.status(200).json(data)
  }
}
