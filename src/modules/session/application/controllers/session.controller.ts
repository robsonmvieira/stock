import { Body, Controller, Inject, Post } from '@nestjs/common'
import { LoginDto } from '../usecases/login/dto/login.dto'
import { LoginUseCase } from '../usecases/login/login.usecase'

@Controller('login')
export class SessionController {
  @Inject() private loginUseCase: LoginUseCase

  @Post()
  async login(@Body() dto: LoginDto): Promise<string> {
    console.log('controller', dto)
    this.loginUseCase.execute(dto)
    return 'login'
  }
}
