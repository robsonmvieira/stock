import { Module } from '@nestjs/common'
import { SessionController } from './application/controllers/session.controller'
import { LoginUseCase } from './application/usecases/login/login.usecase'
import { ConfigModule } from '@modules/config/config.module'
import { JwtService } from './application/services/jwt.service'
import { EmployeeModule } from '@modules/employee/employee.module'
import { IEmployeeRepository } from '@modules/employee/domain/repositories'
import { IEncryptPort } from '@modules/encrypt/domain/repositories/encrypt.port'
import { EncryptModule } from '@modules/encrypt/encrypt.module'

@Module({
  imports: [ConfigModule, EmployeeModule, EncryptModule],
  controllers: [SessionController],
  providers: [
    JwtService,
    {
      provide: LoginUseCase,
      useFactory: (
        JwtService: JwtService,
        encryptPort: IEncryptPort,
        employeeRepository: IEmployeeRepository
      ) => new LoginUseCase(encryptPort, JwtService, employeeRepository),
      inject: [JwtService, 'IEncryptPort', 'IEmployeeRepository']
    }
  ],
  exports: [JwtService]
})
export class SessionModule {}
