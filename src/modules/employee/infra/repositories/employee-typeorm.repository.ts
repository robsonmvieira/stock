import { BaseRepository } from 'src/modules/core/infra'
import { EmployeeModel } from '../../domain/models'
import { IEmployeeRepository } from '../../domain/repositories'

export class EmployeeTypeORMRepository
  extends BaseRepository<EmployeeModel>
  implements IEmployeeRepository {}
