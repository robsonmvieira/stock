import { ValueObject } from 'src/modules/core/valueObject'

export class CPFVO extends ValueObject {
  private readonly cpf: string
  constructor(data: string) {
    super()
    this.validate(data)
    this.cpf = data
  }

  static create(data: string): CPFVO {
    return new CPFVO(data)
  }

  validate(cpf: string) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '')

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
      return false
    }

    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false
    }

    // Validação do primeiro dígito verificador
    let soma = 0
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let resto = soma % 11
    const digitoVerificador1 = resto < 2 ? 0 : 11 - resto

    if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
      return false
    }

    // Validação do segundo dígito verificador
    soma = 0
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i)
    }
    resto = soma % 11
    const digitoVerificador2 = resto < 2 ? 0 : 11 - resto

    if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
      return false
    }

    return true
  }
  isValid(): boolean {
    return this.validate(this.cpf)
  }

  get value(): string {
    return this.cpf
  }
}
