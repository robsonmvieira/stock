import { IRepository } from 'src/modules/core/domain/repositories'
import { EmployeeModel } from '../models'

export interface IEmployeeRepository extends IRepository<EmployeeModel> {}
