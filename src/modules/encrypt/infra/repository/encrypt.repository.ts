import bcrypt from 'bcrypt'
import { IEncryptPort } from '../../domain/repositories/encrypt.port'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EncryptRepository implements IEncryptPort {
  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }
  async encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, 10)
  }
}
