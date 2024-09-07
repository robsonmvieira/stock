import { Controller, Get, Res } from '@nestjs/common'
import { GenerateDumbDataService } from '../generate-dumb-data-service/generate-dumb-data.service'
import { ApiTags } from '@nestjs/swagger'

import { Response } from 'express'
@ApiTags('Fake')
@Controller('fake-data')
export class DumbDataController {
  constructor(private generateDumbDataService: GenerateDumbDataService) {}

  @Get()
  async generate(@Res() response: Response) {
    const data = await this.generateDumbDataService.execute()
    return response.status(200).json({ data })
  }
}
