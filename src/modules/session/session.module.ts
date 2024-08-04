import { Module } from '@nestjs/common'
import { EncryptRepository } from './infra/repository/encrypt.repository'

@Module({
  providers: [
    {
      provide: 'IEncryptPort',
      useClass: EncryptRepository
    }
  ]
})
export class SessionModule {}
