import { Processor, Process, OnQueueActive } from '@nestjs/bull'
import { Job } from 'bull'
import { AddEmailCommand } from '../welcome-handler/welcome-handler.service'
import { EmailService } from '../email.service'

@Processor('EMAIL')
export class WelcomeQueueConsummerService {
  constructor(private emailService: EmailService) {}
  @Process('EMAIL')
  async execute({ data }: Job<AddEmailCommand>) {
    const { to, subject, text, html } = data

    await this.emailService.execute({ to, subject, text, html })
  }

  @OnQueueActive()
  onActive(job: Job<AddEmailCommand>) {
    console.log(`Processor ${job.id} is active!`)
  }

  async onCompleted(job: Job<AddEmailCommand>) {
    console.log(`Processor ${job.id} completed!`)
  }

  async onFailed(job: Job<AddEmailCommand>, err: Error) {
    console.log(`Processor ${job.id} failed with ${err.message}`)
  }
}
