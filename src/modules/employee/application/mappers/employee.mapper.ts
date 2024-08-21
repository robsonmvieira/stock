import { EmployeeModel } from '@modules/employee/domain/models'
import { CreateEmployeeDto } from '../use-cases/employee'
import { Employee } from '@modules/employee/domain/entities'

export class EmployeeMapper {
  static fromDtoToEntity(dto: CreateEmployeeDto): Employee {
    return new Employee({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      hireDate: dto.hireDate,
      credencialNumber: dto.credencialNumber,
      gestorId: dto.gestorId,
      document: dto.document,
      jobPosition: dto.jobPosition,
      initialPassword: dto.password
    })
  }

  static fromEntityToModel(entity: Employee): EmployeeModel {
    return new EmployeeModel({
      id: entity.id.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email.value,
      phone: entity.phone,
      hireDate: entity.hireDate,
      credencialNumber: entity.credencialNumber,
      gestorId: entity.gestorId,
      document: entity.document.value,
      jobPosition: entity.jobPosition,
      password: entity.password,
      initialPassword: entity.initialPassword,
      userChangePassword: entity.userChangePassword,
      isManager: entity.isManager,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      deleted_at: entity.deleted_at,
      is_blocked: entity.is_blocked,
      is_deleted: entity.is_deleted,
      vacationDays: entity.vacationDays,
      vacationDaysUsed: entity.vacationDaysUsed,
      vacationDaysRemaining: entity.vacationDaysRemaining,
      vactionInUsed: entity.vactionInUsed,
      fireDate: entity.fireDate
    })
  }

  static fromModelToOutput(model: EmployeeModel): any {
    return {
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      phone: model.phone,
      hireDate: model.hireDate,
      credencialNumber: model.credencialNumber,
      gestorId: model.gestorId,
      document: model.document,
      jobPosition: model.jobPosition,
      isManager: model.isManager,
      created_at: model.created_at,
      updated_at: model.updated_at,
      deleted_at: model.deleted_at,
      is_blocked: model.is_blocked,
      is_deleted: model.is_deleted,
      vacationDays: model.vacationDays,
      vacationDaysUsed: model.vacationDaysUsed,
      vacationDaysRemaining: model.vacationDaysRemaining,
      vactionInUsed: model.vactionInUsed
    }
  }
}
