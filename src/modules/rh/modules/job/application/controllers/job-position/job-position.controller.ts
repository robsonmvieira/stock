import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common'
import {
  CreateJobPositionUseCase,
  ListJobPositionUseCase
} from '../../use-cases/job-position'
import { Response, Request } from 'express'
import { CreateJobPositionDto } from '../../use-cases/job-position/create-job-position-use-case/dto/create-job-position.props'
@Controller('job-position')
export class JobPositionController {
  @Inject() private listJobPositionUseCase: ListJobPositionUseCase

  @Inject() private createJobPositionUseCase: CreateJobPositionUseCase

  @Get()
  async list(@Req() request: Request, @Res() response: Response) {
    const data = await this.listJobPositionUseCase.execute()
    return response.status(200).json(data)
  }

  @Post()
  async create(@Res() response: Response, @Body() dto: CreateJobPositionDto) {
    const data = await this.createJobPositionUseCase.execute(dto)
    if (data.hasError) {
      return response.status(400).json(data)
    }
    return response.status(201).json(data)
  }
}
