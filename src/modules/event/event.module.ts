import { Global, Module } from '@nestjs/common'
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter'
import { DomainEventMediator } from './domain'

@Global()
@Module({
  imports: [EventEmitterModule.forRoot({ wildcard: true })],
  providers: [
    {
      provide: DomainEventMediator,
      useFactory: (ev: EventEmitter2) => new DomainEventMediator(ev),
      inject: [EventEmitter2]
    }
  ],
  exports: [DomainEventMediator]
})
export class EventModule {}
