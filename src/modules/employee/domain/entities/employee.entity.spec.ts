import { UuidException } from 'src/modules/core/exceptions'
import {
  createEmployeeUsingConstructor,
  createEmployeeUsingStaticMethod,
  createEmployeeWithInvalidEmail,
  createEmployeeWithInvalidId
} from '../testDataBuilder/employee.tdb'

describe('Employee Entity Unit Tests', () => {
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
})
