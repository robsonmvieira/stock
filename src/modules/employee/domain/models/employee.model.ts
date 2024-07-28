import { Model } from 'src/modules/core/domain/entities'

export class EmployeeModel extends Model {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public position: string,
    public department: string,
    public salary: number,
    public created_at: Date,
    public updated_at: Date,
    public deleted_at: Date | null,
    public is_deleted: boolean
  ) {
    super()
  }
}
