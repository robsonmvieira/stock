import { Body, Controller, Inject, Post, Res } from '@nestjs/common'
import { LoginDto } from '../usecases/login/dto/login.dto'
import { LoginUseCase } from '../usecases/login/login.usecase'
import { Response } from 'express'
import { Public } from '@modules/shared/is-public-decorator'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Auth')
@Controller('login')
export class SessionController {
  @Inject() private loginUseCase: LoginUseCase

  @Public()
  @Post()
  async login(@Res() response: Response, @Body() dto: LoginDto) {
    const data = await this.loginUseCase.execute(dto, response)
    if (data.hasError) {
      return response.status(400).json(data)
    }
    return response.status(200).json(data)
  }
}
