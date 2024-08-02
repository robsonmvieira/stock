import { Chance } from 'chance'
import { EmployeeId } from '../valueObjects/employee.uuid'
import { Employee } from '../entities/employee.entity'

type PropertyOrFactory<T> = T | ((index: number) => T)

export class EmployeeFakeBuilder<TBuild = any> {
  private countsObjs: number
  private chance: Chance.Chance

  private constructor(counts: number = 1) {
    this.countsObjs = counts
    this.chance = new Chance()
  }
  private _id: PropertyOrFactory<EmployeeId> | undefined = undefined
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _firstName: PropertyOrFactory<string> | undefined = _index =>
    this.chance.name({ nationality: 'en' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _lastName: PropertyOrFactory<string> | undefined = _index =>
    this.chance.name({ nationality: 'en' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _email: PropertyOrFactory<string> | undefined = _index =>
    this.chance.email({ domain: 'example.com' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _phone: PropertyOrFactory<string> | undefined = _index =>
    this.chance.phone({ country: 'uk', mobile: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _hireDate: PropertyOrFactory<Date> | undefined = _index =>
    this.chance.date()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _credencialNumber: PropertyOrFactory<string> | undefined = _index =>
    this.chance.guid({ version: 4 })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _gestorId: PropertyOrFactory<string> | undefined = _index =>
    this.chance.guid({ version: 4 })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _document: PropertyOrFactory<string> | undefined = _index =>
    this.chance.cpf()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _jobPosition: PropertyOrFactory<string> | undefined = _index =>
    this.chance.guid({ version: 4 })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _vacationDays: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 0, max: 30 })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _vacationDaysUsed: PropertyOrFactory<number> | undefined = _index =>
    this.chance.integer({ min: 0, max: 20 })

  private _vacationDaysRemaining: PropertyOrFactory<number> | undefined =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _index => this.chance.integer({ min: 0, max: 15 })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _vactionInUsed: PropertyOrFactory<boolean> | undefined = _index =>
    this.chance.bool()
  private _fireDate: PropertyOrFactory<Date> | undefined = undefined

  static aEmployee(): EmployeeFakeBuilder {
    return new EmployeeFakeBuilder()
  }

  static theEmployees(counts: number): EmployeeFakeBuilder {
    return new EmployeeFakeBuilder<Employee[]>(counts)
  }

  withEmployeeId(employeeId: PropertyOrFactory<EmployeeId>): this {
    this._id = employeeId
    return this
  }

  withFirstName(firstName: PropertyOrFactory<string>): this {
    this._firstName = firstName
    return this
  }

  withLastName(lastName: PropertyOrFactory<string>): this {
    this._lastName = lastName
    return this
  }

  withEmail(email: PropertyOrFactory<string>): this {
    this._email = email
    return this
  }

  withPhone(phone: PropertyOrFactory<string>): this {
    this._phone = phone
    return this
  }

  withHireDate(hireDate: PropertyOrFactory<Date>): this {
    this._hireDate = hireDate
    return this
  }

  withCredencialNumber(credencialNumber: PropertyOrFactory<string>): this {
    this._credencialNumber = credencialNumber
    return this
  }

  withGestorId(gestorId: PropertyOrFactory<string>): this {
    this._gestorId = gestorId
    return this
  }

  withDocument(document: PropertyOrFactory<string>): this {
    this._document = document
    return this
  }

  withJobPosition(jobPosition: PropertyOrFactory<string>): this {
    this._jobPosition = jobPosition
    return this
  }

  withVacationDays(vacationDays: PropertyOrFactory<number>): this {
    this._vacationDays = vacationDays
    return this
  }

  withVacationDaysUsed(vacationDaysUsed: PropertyOrFactory<number>): this {
    this._vacationDaysUsed = vacationDaysUsed
    return this
  }

  withVacationDaysRemaining(
    vacationDaysRemaining: PropertyOrFactory<number>
  ): this {
    this._vacationDaysRemaining = vacationDaysRemaining
    return this
  }

  withVactionInUsed(vactionInUsed: PropertyOrFactory<boolean>): this {
    this._vactionInUsed = vactionInUsed
    return this
  }

  withFireDate(fireDate: PropertyOrFactory<Date>): this {
    this._fireDate = fireDate
    return this
  }

  build(): TBuild {
    const employees = new Array(this.countsObjs)
      .fill(undefined)
      .map((_, index) => {
        const employee = new Employee({
          id: !this._id ? undefined : this.callFactory(this._id, index),
          firstName: this.callFactory(this._firstName, index),
          lastName: this.callFactory(this._lastName, index),
          email: this.callFactory(this._email, index),
          phone: this.callFactory(this._phone, index),
          hireDate: this.callFactory(this._hireDate, index),
          credencialNumber: this.callFactory(this._credencialNumber, index),
          gestorId: this.callFactory(this._gestorId, index),
          document: this.callFactory(this._document, index),
          jobPosition: this.callFactory(this._jobPosition, index),
          vacationDays: this.callFactory(this._vacationDays, index),
          vacationDaysUsed: this.callFactory(this._vacationDaysUsed, index),
          vacationDaysRemaining: this.callFactory(
            this._vacationDaysRemaining,
            index
          ),
          vactionInUsed: this.callFactory(this._vactionInUsed, index),
          fireDate: this.callFactory(this._fireDate, index)
        })

        return employee
      })
    return this.countsObjs === 1 ? (employees[0] as any) : employees
  }

  private callFactory(factoryOrValue: PropertyOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue
  }

  private getValue(prop: any) {
    const optional = ['id', 'created_at']
    const privateProp = `_${prop}` as keyof this
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(`Property ${prop} not have a factory, use 'with' methods`)
    }
    return this.callFactory(this[privateProp], 0)
  }

  // getters

  get id() {
    return this.getValue('id')
  }

  get firstName() {
    return this.getValue('firstName')
  }

  get lastName() {
    return this.getValue('lastName')
  }

  get email() {
    return this.getValue('email')
  }

  get phone() {
    return this.getValue('phone')
  }

  get hireDate() {
    return this.getValue('hireDate')
  }

  get credencialNumber() {
    return this.getValue('credencialNumber')
  }

  get gestorId() {
    return this.getValue('gestorId')
  }

  get document() {
    return this.getValue('document')
  }

  get jobPosition() {
    return this.getValue('jobPosition')
  }

  get vacationDays() {
    return this.getValue('vacationDays')
  }

  get vacationDaysUsed() {
    return this.getValue('vacationDaysUsed')
  }

  get vacationDaysRemaining() {
    return this.getValue('vacationDaysRemaining')
  }

  get vactionInUsed() {
    return this.getValue('vactionInUsed')
  }

  // generate others properties getters

  get fireDate() {
    return this.getValue('fireDate')
  }

  get created_at() {
    return this.getValue('created_at')
  }
}
