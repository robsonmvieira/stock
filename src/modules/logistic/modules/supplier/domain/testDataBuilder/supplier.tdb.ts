import chance from 'chance'
import { Supplier } from '../entities'
import { SupplierId } from '../valueObjects'

const Chance = new chance()

// Função para criar um objeto Employee usando o construtor
function createSupplierUsingConstructor(): Supplier {
  return new Supplier({
    name: Chance.first(),
    lastName: Chance.last(),
    email: Chance.email(),
    phone: Chance.phone(),
    addresses: [],
    products: [],
    document: Chance.cpf()
  })
}

// Função para criar um objeto Employee usando o método estático create
function createEmployeeUsingStaticMethod(): Supplier {
  return Supplier.create({
    name: Chance.first(),
    lastName: Chance.last(),
    email: Chance.email(),
    phone: Chance.phone(),
    addresses: [],
    document: Chance.cpf()
  })
}

// employee with invalid uuid

function createSupplierWithInvalidId(): Supplier {
  return new Supplier({
    name: Chance.first(),
    lastName: Chance.last(),
    email: Chance.email(),
    phone: Chance.phone(),
    addresses: [],
    products: [],
    document: Chance.cpf(),
    id: new SupplierId('invalid')
  })
}

// generate employee with invalid email

function createSupplierWithInvalidEmail(): Supplier {
  return new Supplier({
    name: Chance.first(),
    lastName: Chance.last(),
    email: 'invalid',
    phone: Chance.phone(),
    addresses: [],
    products: [],
    document: Chance.cpf()
  })
}

// Função para gerar uma coleção de objetos Employee
function generateSupplierCollection(
  count: number,
  useStaticMethod = false
): Supplier[] {
  return Array.from({ length: count }, () =>
    useStaticMethod
      ? createEmployeeUsingStaticMethod()
      : createSupplierUsingConstructor()
  )
}

// Exporta as funções para uso externo
export {
  createSupplierUsingConstructor,
  createEmployeeUsingStaticMethod,
  generateSupplierCollection,
  createSupplierWithInvalidId,
  createSupplierWithInvalidEmail
}
