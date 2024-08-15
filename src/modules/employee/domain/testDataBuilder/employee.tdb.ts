import chance from 'chance'
import { Employee } from '../entities/employee.entity'
import { EmployeeId } from '../valueObjects/employee.uuid'

const Chance = new chance()

// Função para criar um objeto Employee usando o construtor
function createEmployeeUsingConstructor(): Employee {
  return new Employee({
    firstName: Chance.first(),
    lastName: Chance.last(),
    email: Chance.email(),
    phone: Chance.phone(),
    hireDate: new Date(),
    credencialNumber: Chance.guid({ version: 4 }),
    gestorId: Chance.guid({ version: 4 }),
    document: Chance.cpf(),
    jobPosition: Chance.guid({ version: 4 }),
    initialPassword: '123456'
  })
}

// Função para criar um objeto Employee usando o método estático create
function createEmployeeUsingStaticMethod(): Employee {
  return Employee.create({
    firstName: Chance.first(),
    lastName: Chance.last(),
    email: Chance.email(),
    phone: Chance.phone(),
    hireDate: new Date(),
    credencialNumber: Chance.guid({ version: 4 }),
    gestorId: Chance.guid({ version: 4 }),
    document: Chance.cpf(),
    jobPosition: Chance.guid({ version: 4 }),
    initialPassword: '123456'
  })
}

// employee with invalid uuid

function createEmployeeWithInvalidId(): Employee {
  return new Employee({
    firstName: Chance.first(),
    lastName: Chance.last(),
    email: Chance.email(),
    phone: Chance.phone(),
    hireDate: new Date(),
    credencialNumber: Chance.guid({ version: 4 }),
    gestorId: Chance.guid({ version: 4 }),
    document: Chance.cpf(),
    id: new EmployeeId('invalid'),
    jobPosition: Chance.guid({ version: 4 }),
    initialPassword: '123456'
  })
}

// generate employee with invalid email

function createEmployeeWithInvalidEmail(): Employee {
  return new Employee({
    firstName: Chance.first(),
    lastName: Chance.last(),
    email: 'invalid',
    phone: Chance.phone(),
    hireDate: new Date(),
    credencialNumber: Chance.guid({ version: 4 }),
    gestorId: Chance.guid({ version: 4 }),
    document: Chance.cpf(),
    jobPosition: Chance.guid({ version: 4 }),
    initialPassword: '123456'
  })
}

// Função para gerar uma coleção de objetos Employee
function generateEmployeeCollection(
  count: number,
  useStaticMethod = false
): Employee[] {
  return Array.from({ length: count }, () =>
    useStaticMethod
      ? createEmployeeUsingStaticMethod()
      : createEmployeeUsingConstructor()
  )
}

// Exporta as funções para uso externo
export {
  createEmployeeUsingConstructor,
  createEmployeeUsingStaticMethod,
  generateEmployeeCollection,
  createEmployeeWithInvalidId,
  createEmployeeWithInvalidEmail
}
