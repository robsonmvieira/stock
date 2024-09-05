import { ProductId } from '@modules/logistic/modules/product/domain/valueObject'
import { Chance } from 'chance'
type PropertyOrFactory<T> = T | ((index: number) => T)

export class ProductFakeBuilder<TBuild = any> {
  private countsObjs: number
  private chance: Chance.Chance

  private constructor(counts: number = 1) {
    this.countsObjs = counts
    this.chance = new Chance()
  }

  private _id: PropertyOrFactory<ProductId> | undefined = undefined

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _name: PropertyOrFactory<string> | undefined = _index =>
    this.nameGenerate()

  private nameGenerate() {
    const firstName = this.chance.capitalize(this.chance.word({ length: 5 }))
    const lastName = this.chance.capitalize(this.chance.word({ length: 8 }))
    return `${firstName} ${lastName}`
  }
}
