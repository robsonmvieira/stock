import { IRepository } from 'src/modules/core/domain/repositories'
import { EmployeeModel } from '../models'

export interface IEmployeeRepository extends IRepository<EmployeeModel> {
  findByEmail(email: string): Promise<EmployeeModel>
  fetchDashboardDataById(email: string): Promise<EmployeeModel>

  findByDocument(document: string): Promise<EmployeeModel>
}
