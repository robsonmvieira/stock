import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { CreateEmployeeUsecase, CreateEmployeeDto } from '../use-cases/employee'

@Controller('employee')
export class EmployeeController {
  // @Inject() private listCheckListUseCase: ListCheckListUseCase
  @Inject() private createEmployeeUseCase: CreateEmployeeUsecase
  // @Inject() private getCheckListByIdUseCase: GetCheckListByIdUseCase

  @Get()
  // async findAll() {
  //   return this.listCheckListUseCase.execute()
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.getCheckListByIdUseCase.execute(id)
  // }
  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    return this.createEmployeeUseCase.execute(dto)
  }
}
