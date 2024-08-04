import { Inject, Injectable } from '@nestjs/common'
import { IEmployeeRepository } from 'src/modules/employee/domain/repositories'

@Injectable()
export class CreateEmployeeUseCase {
  @Inject('IEmployeeRepository')
  private repo: IEmployeeRepository

  async execute(command: any) {
    console.log(command)
  }
}
