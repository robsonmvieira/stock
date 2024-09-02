import { ValueObject } from 'src/modules/core/domain/valueObject'

export class CNPJVO extends ValueObject {
  private readonly cnpj: string
  constructor(data: string) {
    super()
    this.validate(data)
    this.cnpj = data
  }

  static create(data: string): CNPJVO {
    return new CNPJVO(data)
  }

  validate(cnpj: string): boolean {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]/g, '')

    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) {
      return false
    }

    // Verifica se todos os dígitos são iguais (ex: 11.111.111/1111-11)
    if (/^(\d)\1{13}$/.test(cnpj)) {
      return false
    }

    // Validação do primeiro dígito verificador
    let soma = 0
    let peso = 5
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso
      peso = peso === 2 ? 9 : peso - 1
    }
    let resto = soma % 11
    const digitoVerificador1 = resto < 2 ? 0 : 11 - resto

    if (parseInt(cnpj.charAt(12)) !== digitoVerificador1) {
      return false
    }

    // Validação do segundo dígito verificador
    soma = 0
    peso = 6
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso
      peso = peso === 2 ? 9 : peso - 1
    }
    resto = soma % 11
    const digitoVerificador2 = resto < 2 ? 0 : 11 - resto

    if (parseInt(cnpj.charAt(13)) !== digitoVerificador2) {
      return false
    }

    return true
  }

  isValid(): boolean {
    return this.validate(this.cnpj)
  }

  get value(): string {
    return this.cnpj
  }
}
