import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common'
import { CreateSupplierUseCase, ListSupplierUseCase } from '../../use-cases'
import { CreateSupplierDto } from '../../use-cases/create-supplier-use-case/dto'
import { Response } from 'express'
@Controller('suppliers')
export class SupplierController {
  @Inject() private readonly createSupplierUseCase: CreateSupplierUseCase
  @Inject() private readonly listSupplierUseCase: ListSupplierUseCase
  @Inject() private readonly getByIdSupplierUseCase: CreateSupplierUseCase
  @Inject() private readonly updateSupplierUseCase: CreateSupplierUseCase
  @Inject() private readonly deleteSupplierUseCase: CreateSupplierUseCase

  @Post()
  async create(@Res() response: Response, @Body() dto: CreateSupplierDto) {
    const data = await this.createSupplierUseCase.execute(dto)

    if (data.hasError) {
      return response.status(400).json(data)
    }
    return response.status(201).json(data)
  }

  @Get()
  async list(@Res() response: Response) {
    const data = await this.listSupplierUseCase.execute()
    return response.status(200).json(data)
  }
}
