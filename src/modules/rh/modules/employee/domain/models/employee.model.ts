import { Model } from 'src/modules/core/domain/entities'
import { Column, Entity } from 'typeorm'
import { DepartamentsEnum } from '../enums/departaments.enum'

export type EmployeeModelProps = {
  firstName: string
  lastName: string
  email: string
  phone: string
  hireDate: Date
  credencialNumber: string
  gestorId: string
  document: string
  jobPosition: string
  vacationDays?: number
  vacationDaysUsed?: number
  vacationDaysRemaining?: number
  vactionInUsed?: boolean
  fireDate?: Date
  password: string
  initialPassword: string | null
  userChangePassword: boolean

  id?: string
  created_at?: Date
  updated_at?: Date
  isManager?: boolean
  department?: string
  is_deleted?: boolean
  deleted_at?: Date
  is_blocked?: boolean
}
@Entity({ name: 'employee' })
export class EmployeeModel extends Model {
  @Column()
  firstName: string

  @Column({ default: DepartamentsEnum.LOGISTICA })
  department: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column({ type: 'date' })
  hireDate: Date

  @Column({ type: 'uuid' })
  credencialNumber: string

  @Column({ type: 'uuid' })
  gestorId: string

  @Column()
  document: string

  @Column({ type: 'uuid' })
  jobPosition: string

  @Column({ type: 'int', nullable: true })
  vacationDays?: number

  @Column({ type: 'int', nullable: true })
  vacationDaysUsed?: number

  @Column({ type: 'int', nullable: true })
  vacationDaysRemaining?: number

  @Column({ type: 'date', nullable: true })
  fireDate?: Date

  @Column({ type: 'boolean' })
  vactionInUsed?: boolean

  @Column({ type: 'boolean', default: false })
  isManager?: boolean

  @Column({ nullable: true })
  password?: string

  @Column({ nullable: true })
  initialPassword?: string

  @Column({ type: 'boolean' })
  userChangePassword: boolean

  constructor(props: EmployeeModelProps) {
    super({
      id: props?.id,
      created_at: props?.created_at,
      updated_at: props?.updated_at,
      is_deleted: props?.is_deleted,
      deleted_at: props?.deleted_at,
      is_blocked: props?.is_blocked
    })
    this.firstName = props?.firstName
    this.lastName = props?.lastName
    this.email = props?.email
    this.phone = props?.phone
    this.hireDate = props?.hireDate
    this.credencialNumber = props?.credencialNumber
    this.gestorId = props?.gestorId
    this.document = props?.document
    this.jobPosition = props?.jobPosition
    this.vacationDays = props?.vacationDays
    this.vacationDaysUsed = props?.vacationDaysUsed
    this.vacationDaysRemaining = props?.vacationDaysRemaining
    this.vactionInUsed = props?.vactionInUsed
    this.fireDate = props?.fireDate
    this.password = props?.password
    this.initialPassword = props?.initialPassword
    this.userChangePassword = props?.userChangePassword
    this.isManager = props?.isManager
    this.department = props?.department
  }
}
