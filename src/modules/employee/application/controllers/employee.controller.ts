import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common'
import {
  CreateEmployeeUseCase,
  CreateEmployeeDto,
  GetInfoUseCase
} from '../use-cases/employee'
import { Response, Request } from 'express'
@Controller('employee')
export class EmployeeController {
  @Inject() private createEmployeeUseCase: CreateEmployeeUseCase
  @Inject() private getInfoUseCase: GetInfoUseCase

  @Post()
  async create(@Res() response: Response, @Body() dto: CreateEmployeeDto) {
    const data = await this.createEmployeeUseCase.execute(dto)
    if (data.hasError) {
      return response.status(400).json(data)
    }
    return response.status(201).json(data)
  }

  @Get('getinfo')
  async getInfo(@Req() request: Request, @Res() response: Response) {
    const { user } = request
    const data = await this.getInfoUseCase.execute(user.id)
    return response.status(200).json(data)
  }
}
