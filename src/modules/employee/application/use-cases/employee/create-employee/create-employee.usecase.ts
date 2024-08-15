import { Inject, Injectable } from '@nestjs/common'
import { IEmployeeRepository } from 'src/modules/employee/domain/repositories'
import { CreateEmployeeDto, CreateEmployeeDtoPropsValidator } from './dto'
import { ModelOutput } from '@modules/core/application/usecases/common/model.output'

import { EmployeeMapper } from '@modules/employee/application/mappers/employee.mapper'
import { IEncryptPort } from '@modules/encrypt/domain/repositories/encrypt.port'

@Injectable()
export class CreateEmployeeUseCase {
  @Inject('IEmployeeRepository')
  private repo: IEmployeeRepository

  @Inject('IEncryptPort')
  private hash: IEncryptPort

  async execute(command: CreateEmployeeDto) {
    const validate = CreateEmployeeDtoPropsValidator.validate(command)
    if (Object.keys(validate).length !== 0) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: validate
      })
    }

    const employee = await this.repo.findByEmail(command.email)
    if (employee) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: {
          email: 'email already exists'
        }
      })
    }

    const documentAlreadyExists = await this.repo.findByDocument(
      command.document
    )
    if (documentAlreadyExists) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: {
          document: 'document already exists'
        }
      })
    }

    command.password = await this.hash.encrypt(command.password)
    const payload = EmployeeMapper.fromDtoToEntity(command)
    if (payload.notification.hasError()) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: payload.notification
      })
    }

    const toModel = EmployeeMapper.fromEntityToModel(payload)

    await this.repo.save(toModel)
    return new ModelOutput({
      hasError: false,
      data: null,
      error: null
    })
  }
}
