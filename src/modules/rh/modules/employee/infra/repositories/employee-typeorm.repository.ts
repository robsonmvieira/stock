import { BaseRepository } from 'src/modules/core/infra'
import { EmployeeModel } from '../../domain/models'
import { IEmployeeRepository } from '../../domain/repositories'

export class EmployeeTypeORMRepository
  extends BaseRepository<EmployeeModel>
  implements IEmployeeRepository
{
  async findByEmail(email: string): Promise<EmployeeModel> {
    return await this.repo.findOne({ where: { email } })
  }

  async findByDocument(document: string): Promise<EmployeeModel> {
    return await this.repo.findOne({ where: { document } })
  }

  async fetchDashboardDataById(id: string): Promise<EmployeeModel> {
    return await this.repo.findOne({
      select: [
        'id',
        'created_at',
        'updated_at',
        'is_deleted',
        'deleted_at',
        'firstName',
        'lastName',
        'document',
        'email',
        'phone',
        'jobPosition',
        'department'
      ],
      where: { id }
    })
  }
}
