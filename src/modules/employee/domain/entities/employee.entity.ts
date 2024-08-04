import { Entity } from 'src/modules/core/domain/entities/entity'
import { ValueObject } from 'src/modules/core/domain/valueObject'
import { EmployeeId } from '../valueObjects/employee.uuid'
import { EmailVO } from '../valueObjects/email.vo'
import { CPFVO } from '../valueObjects/cpf.vo'
import { EmployeeFakeBuilder } from '../tests/employee.fake-builder'

export type CreateEmployeeCommand = {
  firstName: string
  lastName: string
  email: string
  phone: string
  hireDate: Date
  credencialNumber: string
  gestorId: string
  document: string
  jobPosition: string
}

export type EmployeeProps = {
  id?: EmployeeId
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
}

export class Employee extends Entity {
  firstName: string
  lastName: string
  email: EmailVO
  phone: string
  hireDate: Date
  credencialNumber: string
  gestorId: string
  document: CPFVO
  jobPosition: string
  vacationDays?: number
  vacationDaysUsed?: number
  vacationDaysRemaining?: number
  vactionInUsed?: boolean
  fireDate?: Date

  constructor({
    firstName,
    lastName,
    email,
    phone,
    hireDate,
    credencialNumber,
    gestorId,
    document,
    jobPosition,
    vacationDays,
    vacationDaysUsed,
    vacationDaysRemaining,
    vactionInUsed,
    fireDate,
    id,
    created_at,
    updated_at
  }: EmployeeProps) {
    super(id, created_at, updated_at)

    this.phone = phone
    this.lastName = lastName
    this.hireDate = hireDate
    this.gestorId = gestorId
    this.firstName = firstName
    this.jobPosition = jobPosition
    this.email = EmailVO.create(email)
    this.document = CPFVO.create(document)
    this.credencialNumber = credencialNumber
    // eslint-disable-next-line prettier/prettier
    this.vacationDays = vacationDays ?? 30,
      // eslint-disable-next-line prettier/prettier
    this.vacationDaysUsed = vacationDaysUsed ?? 0
    this.vacationDaysRemaining = vacationDaysRemaining ?? 30
    this.vactionInUsed = vactionInUsed ?? false
    this.fireDate = fireDate
    this.validate()
  }

  static create(command: CreateEmployeeCommand) {
    const employee = new Employee({
      email: command.email,
      phone: command.phone,
      lastName: command.lastName,
      hireDate: command.hireDate,
      gestorId: command.gestorId,
      document: command.document,
      firstName: command.firstName,
      jobPosition: command.jobPosition,
      credencialNumber: command.credencialNumber
    })
    return employee
  }

  validate() {
    this.emailIsValid()
  }

  static fake() {
    return EmployeeFakeBuilder
  }

  emailIsValid(): boolean {
    if (!this.email.isValid()) {
      this.addErrorOnContainer('E-Mail inválido', 'email')
      return false
    }

    return true
  }

  updateEmail(email: string) {
    const newEmail = EmailVO.create(email)
    if (!newEmail.isValid()) {
      this.addErrorOnContainer('E-Mail inválido', 'email')
    }
    this.email = EmailVO.create(email)
    this.validate()
  }

  documentIsValid(): boolean {
    if (!this.document.isValid()) {
      this.addErrorOnContainer('Documento informado inválido', 'document')
      return false
    }
    return true
  }
  updateDocument(document: string) {
    const newDocument = CPFVO.create(document)
    if (!newDocument.isValid()) {
      this.addErrorOnContainer('Documento informado inválido', 'document')
    }
    this.document = newDocument
    this.validate()
  }

  private addErrorOnContainer(key: string, value: string): void {
    this.notification.addError(value, key)
  }

  get entity_id(): ValueObject {
    return this.id
  }
  toJSON() {
    return {
      id: this.id.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email.value,
      phone: this.phone,
      hireDate: this.hireDate,
      credencialNumber: this.credencialNumber,
      gestorId: this.gestorId,
      document: this.document.value,
      jobPosition: this.jobPosition
    }
  }
}
