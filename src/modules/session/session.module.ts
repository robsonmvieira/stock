import { Module } from '@nestjs/common'
import { SessionController } from './application/controllers/session.controller'
import { LoginUseCase } from './application/usecases/login/login.usecase'
import { ConfigModule } from '@modules/config/config.module'
import { JwtService } from './application/services/jwt.service'

import { IEncryptPort } from '@modules/encrypt/domain/repositories/encrypt.port'
import { EncryptModule } from '@modules/encrypt/encrypt.module'
import { EmailModule } from '@modules/email/email.module'

import { WelcomeQueueHandlerPublisher } from '@modules/email/handlers/welcome-handler/welcome-handler.service'
import { IEmployeeRepository } from '@modules/rh/modules/employee/domain/repositories'
import { EmployeeModule } from '@modules/rh/modules/employee/employee.module'

@Module({
  imports: [ConfigModule, EmployeeModule, EncryptModule, EmailModule],
  controllers: [SessionController],
  providers: [
    JwtService,
    {
      provide: LoginUseCase,
      useFactory: (
        JwtService: JwtService,
        encryptPort: IEncryptPort,
        employeeRepository: IEmployeeRepository,
        welcomeQueueHandlerPublisher: WelcomeQueueHandlerPublisher
      ) =>
        new LoginUseCase(
          encryptPort,
          JwtService,
          employeeRepository,
          welcomeQueueHandlerPublisher
        ),
      inject: [
        JwtService,
        'IEncryptPort',
        'IEmployeeRepository',
        WelcomeQueueHandlerPublisher
      ]
    }
  ],
  exports: [JwtService]
})
export class SessionModule {}
