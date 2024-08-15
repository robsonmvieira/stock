import { Body, Controller, Inject, Post, Res } from '@nestjs/common'
import { CreateEmployeeUseCase, CreateEmployeeDto } from '../use-cases/employee'
import { Response } from 'express'
@Controller('employee')
export class EmployeeController {
  @Inject() private createEmployeeUseCase: CreateEmployeeUseCase

  @Post()
  async create(@Res() response: Response, @Body() dto: CreateEmployeeDto) {
    const data = await this.createEmployeeUseCase.execute(dto)

    if (data.hasError) {
      return response.status(400).json(data)
    }

    return response.status(201).json(data)
  }
}
