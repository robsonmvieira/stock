import { Module } from '@nestjs/common'
import { EncryptRepository } from './infra/repository/encrypt.repository'
import { SessionController } from './application/controllers/session.controller'
import { LoginUseCase } from './application/usecases/login/login.usecase'
import { IEncryptPort } from './domain/repositories/encrypt.port'
import { ConfigModule } from '@modules/config/config.module'
import { JwtService } from './application/services/jwt.service'

@Module({
  imports: [ConfigModule],
  controllers: [SessionController],
  providers: [
    {
      provide: 'IEncryptPort',
      useClass: EncryptRepository
    },
    JwtService,

    {
      provide: LoginUseCase,
      useFactory: (JwtService: JwtService, encryptPort: IEncryptPort) =>
        new LoginUseCase(encryptPort, JwtService),
      inject: [JwtService, 'IEncryptPort']
    }
  ]
})
export class SessionModule {}
