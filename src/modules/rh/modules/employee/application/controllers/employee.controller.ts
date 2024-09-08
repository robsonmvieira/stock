import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  Res,
  Sse,
  MessageEvent
} from '@nestjs/common'
import {
  CreateEmployeeUseCase,
  CreateEmployeeDto,
  GetInfoUseCase
} from '../use-cases/employee'
import { Response, Request } from 'express'
import { defer, Observable, of } from 'rxjs'
import { map, repeat } from 'rxjs/operators'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Employee')
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
  @Sse('notifications/:id')
  notifications(
    @Param('id') id: string
    // @Res() response: Response
  ): Observable<MessageEvent> {
    // return interval(1000).pipe(
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   map(_ => ({ data: { hello: 'world' } }) as MessageEvent)
    // )
    return defer(() => of({ id: '51' } as MessageEvent)).pipe(
      repeat({
        delay: 1000
      }),
      // tap(report => {
      //   if (report.status === Status.DONE || report.status === Status.ERROR) {
      //     setTimeout(() => {
      //       response.end()
      //     }, 1000)
      //   }
      // }),
      map(report => {
        console.log('employee controller => ', id)

        return {
          type: 'message',
          data: report
        }
      })
    )
  }
}
