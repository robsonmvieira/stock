import { ImageVO } from '@modules/shared/domain/valueObjects/image.vo'
import crypto from 'crypto'
export class ProductImageVO extends ImageVO {
  static maxSize = 2 * 1024 * 1024 // 2MB
  static allowedExtensions = ['jpg', 'jpeg', 'png']
  static allowedMimeTypes = ['image/jpeg', 'image/png']

  static create({
    raw_name,
    min_type,
    size
  }: {
    raw_name: string
    min_type: string
    size: number
  }): ProductImageVO {
    this.validateSize(size)
    this.validateExtension(min_type)
    return new ProductImageVO({
      name: ProductImageVO.generateRandomName(raw_name),
      url: min_type
    })
  }

  private static validateSize(size: number) {
    if (size > ProductImageVO.maxSize) {
      throw new Error(
        'Image size is too big. Max size is 2MB, but received ' + size
      )
    }
  }

  private static validateExtension(extension: string) {
    if (!ProductImageVO.allowedExtensions.includes(extension)) {
      throw new Error('Image extension is not allowed, received ' + extension)
    }
  }

  private static generateRandomName(name: string) {
    const extension = name.split('.').pop()

    return (
      crypto
        .createHash('md5')
        .update(name + Math.random() + Date.now())
        .digest('hex') +
      '.' +
      extension
    )
  }
}
