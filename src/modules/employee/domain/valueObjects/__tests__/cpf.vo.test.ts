import { CPFVO } from '../cpf.vo'
import Chance from 'chance'
describe('CPF Value Object Unit Tests', () => {
  let chance: Chance.Chance
  beforeEach(() => {
    chance = new Chance()
  })
  it('should be not create when sequencial numbers are passed', () => {
    const cpf = '111.111.111-11'
    const cpfVO = CPFVO.create(cpf)
    expect(cpfVO.isValid()).not.toBeTruthy()
  })

  it('should create when sequencial valid sequencial numbers are passed', () => {
    const cpfVO = CPFVO.create(chance.cpf())
    expect(cpfVO.isValid()).toBeTruthy()
  })
})
