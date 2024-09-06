import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'
@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}

  async signAsync(payload: any): Promise<string> {
    return jwt.sign(payload, this.configService.get<string>('JWT_SECRET'), {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN')
    })
  }

  async verifyAsync(token: string): Promise<any> {
    try {
      // return jwt.verify(token, this.configService.get<string>('JWT_SECRET'))
      console.log('token => ', token)
      return true
    } catch (error) {
      throw new Error('Invalid token')
    }
  }
}
