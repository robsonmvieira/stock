import { Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { IEncryptPort } from '@modules/session/domain/repositories/encrypt.port'

@Injectable()
export class LoginUseCase {
  constructor(private hashRepository: IEncryptPort) {}

  async execute(loginData: LoginDto): Promise<string> {
    console.log('useCase => ', loginData)
    const hash = await this.hashRepository.encrypt(loginData.password)
    console.log('hash => ', hash)
    debugger
    return 'login'
  }
}
