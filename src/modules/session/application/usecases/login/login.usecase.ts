import { Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '../../services/jwt.service'
import { IEmployeeRepository } from '@modules/employee/domain/repositories'
import { ModelOutput } from '@modules/core/application/usecases/common/model.output'
import { IEncryptPort } from '@modules/encrypt/domain/repositories/encrypt.port'
import { Response } from 'express'
@Injectable()
export class LoginUseCase {
  constructor(
    private hashRepository: IEncryptPort,
    private jwtService: JwtService,
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(loginData: LoginDto, response: Response): Promise<ModelOutput> {
    const user = await this.employeeRepository.findByEmail(loginData.email)
    if (!user) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: 'email or password is invalid'
      })
    }
    const isPasswordValid = await this.hashRepository.compare(
      loginData.password,
      user.initialPassword ? user.initialPassword : user.password
    )

    if (!isPasswordValid) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: 'email or password is invalid'
      })
    }
    const payload = { email: loginData.email, userId: user.id }
    const token = await this.jwtService.signAsync(payload)
    response.cookie('Authorization', token, {
      secure: true,
      httpOnly: true
    })
    return new ModelOutput({
      hasError: false,
      data: token,
      error: null
    })
  }
}
