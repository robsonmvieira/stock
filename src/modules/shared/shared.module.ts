import { Module, Scope } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { UnitOfWorkTypeORM } from './infra/repositories'
import { DatabaseModule } from '@modules/database/database.module'
import { S3FileUpload } from './infra'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [
    {
      provide: 'IUnitOfWork',
      useFactory: (data: DataSource) => new UnitOfWorkTypeORM(data),
      inject: ['dbConnectionTypeOrm'],
      scope: Scope.REQUEST
    },
    {
      provide: 'IStorage',
      useFactory: (configService: ConfigService) =>
        new S3FileUpload(configService),
      inject: [ConfigService]
    }
  ],
  exports: ['IUnitOfWork', 'IStorage']
})
export class SharedModule {}
