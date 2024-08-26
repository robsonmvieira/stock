import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
export interface AddEmailCommand {
  to: string
  subject: string
  text: string
  html?: string
}
@Injectable()
export class WelcomeQueueHandlerPublisher {
  constructor(@InjectQueue('EMAIL') private readonly emailQueue: Queue) {}

  async execute({ to, subject, text, html }: AddEmailCommand) {
    await this.emailQueue.add('EMAIL', { to, subject, text, html })
  }
}
