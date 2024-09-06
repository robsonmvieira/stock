import { JwtService } from '@modules/session/application/services/jwt.service'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { Reflector } from '@nestjs/core'
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.cookies['Authorization']

    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }

    // if (!token) return false
    try {
      const payload = await this.jwtService.verifyAsync(token)
      request.user = { id: payload.userId, email: payload.email }
      return true
    } catch (e) {
      return false
    }
  }
}
