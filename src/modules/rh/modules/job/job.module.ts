import { DatabaseModule } from '@modules/database/database.module'
import { Module } from '@nestjs/common'
import { JobPositionTypeORMRepository } from './infra/repositories'
import { JobPositionModel } from './domain/models'
import { DataSource } from 'typeorm'
import {
  CreateJobPositionUseCase,
  DeleteJobPositionUseCase,
  GetByIdJobPositionUseCase,
  JobPositionController,
  ListJobPositionUseCase,
  UpdateJobPositionUseCase
} from './application'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: 'IJobPositionRepository',
      useFactory: (data: DataSource) =>
        new JobPositionTypeORMRepository(data.getRepository(JobPositionModel)),
      inject: ['dbConnectionTypeOrm']
    },
    ListJobPositionUseCase,
    CreateJobPositionUseCase,
    GetByIdJobPositionUseCase,
    UpdateJobPositionUseCase,
    DeleteJobPositionUseCase
  ],
  exports: ['IJobPositionRepository'],
  controllers: [JobPositionController]
})
export class JobModule {}
