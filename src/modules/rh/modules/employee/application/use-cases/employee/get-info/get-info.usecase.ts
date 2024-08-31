import { ModelOutput } from '@modules/core/application/usecases/common/model.output'
import { IEmployeeRepository } from '@modules/rh/modules/employee/domain/repositories'

import { Inject } from '@nestjs/common'
import { EmployeeMapper } from '../../../mappers/employee.mapper'

export class GetInfoUseCase {
  @Inject('IEmployeeRepository')
  private repo: IEmployeeRepository
  async execute(id: string) {
    const employee = await this.repo.fetchDashboardDataById(id)
    if (!employee) {
      return new ModelOutput({
        hasError: true,
        data: null,
        error: {
          email: 'User not found'
        }
      })
    }

    const response = EmployeeMapper.fromModelToOutput(employee)

    return new ModelOutput({
      hasError: false,
      data: response,
      error: null
    })
  }
}
