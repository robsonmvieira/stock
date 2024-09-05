import { Reflector } from '@nestjs/core'

import { AuthGuard } from './auth.guard'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@modules/session/application/services'

describe('AuthGuard', () => {
  let jwtService: JwtService
  let reflector: Reflector
  let configService: ConfigService

  beforeEach(() => {
    configService = new ConfigService()
    jwtService = new JwtService(configService)
    reflector = new Reflector()
  })

  it('should be defined', () => {
    expect(new AuthGuard(jwtService, reflector)).toBeDefined()
  })
})
