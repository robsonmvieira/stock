import Chance from 'chance'

import {
  createEmployeeUsingConstructor,
  createEmployeeUsingStaticMethod,
  createEmployeeWithInvalidEmail,
  createEmployeeWithInvalidId
} from '../testDataBuilder/employee.tdb'
import { UuidException } from 'src/modules/core/domain/exceptions'
import { Employee } from './employee.entity'

describe('Employee Entity Unit Tests', () => {
  let chance: Chance.Chance
  beforeEach(() => {
    chance = new Chance()
  })
  it('should create a new employee using static create method', () => {
    const employee = createEmployeeUsingStaticMethod()
    expect(employee).toBeTruthy()
  })
  it('should create a employee using constructor ', () => {
    const employee = createEmployeeUsingConstructor()

    expect(employee).toBeTruthy()
  })

  it('should throw an error when invalid id is passed', () => {
    expect(createEmployeeWithInvalidId).toThrow(UuidException)
  })

  it('should not be able to create a employee when invalid email is passed', () => {
    const employee = createEmployeeWithInvalidEmail()
    expect(employee.notification.hasError()).toBeTruthy()
    expect(employee.emailIsValid()).toBeFalsy()
    expect(employee.notification.count()).toBe(1)
  })

  it('should be able to update email using updateEmail method', () => {
    const employee = createEmployeeUsingConstructor()
    const email = chance.email()
    employee.updateEmail(email)
    expect(employee.toJSON().email).toBe(email)
  })

  it('should return true when document is valid', () => {
    const employee = createEmployeeUsingConstructor()
    expect(employee.documentIsValid()).toBeTruthy()
  })

  it('should call addErrorOnContainer function when document is invalid is passed as argument', () => {
    const employee = createEmployeeUsingConstructor()
    employee.updateDocument('123')
    expect(employee.notification.hasError()).toBeTruthy()
    expect(employee.documentIsValid()).toBeFalsy()
    expect(employee.notification.count()).toBe(1)
  })

  it('should call addErrorOnContainer function when email is invalid is passed as argument', () => {
    const fakeEntity = Employee.fake()

    const employeeWithEmailError = fakeEntity
      .aEmployee()
      .withEmail('123')
      .build()

    expect(employeeWithEmailError.notification.hasError()).toBeTruthy()
    expect(employeeWithEmailError.emailIsValid()).toBeFalsy()
    expect(employeeWithEmailError.notification.count()).toBe(1)
  })

  it('should return a value object when entity_id is called', () => {
    const employee = createEmployeeUsingConstructor()

    expect(employee.entity_id).toBe(employee.id)
  })
})
