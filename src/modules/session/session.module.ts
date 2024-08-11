import { Module } from '@nestjs/common'
import { EncryptRepository } from './infra/repository/encrypt.repository'
import { SessionController } from './application/controllers/session.controller'
import { LoginUseCase } from './application/usecases/login/login.usecase'
import { IEncryptPort } from './domain/repositories/encrypt.port'

@Module({
  controllers: [SessionController],
  providers: [
    {
      provide: 'IEncryptPort',
      useClass: EncryptRepository
    },

    {
      provide: LoginUseCase,
      useFactory: (encryptPort: IEncryptPort) => new LoginUseCase(encryptPort),
      inject: ['IEncryptPort']
    }
  ]
})
export class SessionModule {}
