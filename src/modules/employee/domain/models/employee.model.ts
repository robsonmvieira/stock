import { Model } from 'src/modules/core/domain/entities'
import { Column, Entity } from 'typeorm'

export type EmployeeModelProps = {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  hireDate: Date
  credencialNumber: string
  gestorId: string
  created_at?: Date
  updated_at?: Date
  document: string
  jobPosition: string
  vacationDays?: number
  vacationDaysUsed?: number
  vacationDaysRemaining?: number
  vactionInUsed?: boolean
  fireDate?: Date
  is_deleted?: boolean
  deleted_at?: Date
  is_blocked?: boolean
  password: string
  initialPassword: string | null
  userChangePassword: boolean
}
@Entity({ name: 'employee' })
export class EmployeeModel extends Model {
  @Column()
  firstName: string

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

  @Column({ type: 'int' })
  vacationDays?: number

  @Column({ type: 'int' })
  vacationDaysUsed?: number

  @Column({ type: 'int' })
  vacationDaysRemaining?: number

  @Column({ type: 'date' })
  fireDate?: Date

  @Column({ type: 'boolean' })
  vactionInUsed?: boolean

  @Column({ nullable: true })
  password?: string

  @Column({ nullable: true })
  initialPassword: string

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
  }
}
