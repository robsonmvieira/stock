import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

export interface AddEmailCommand {
  to: string
  subject: string
  text: string
  html?: string
}

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async execute({
    to,
    subject,
    text,
    html = '<b>Hello world!</b>'
  }: AddEmailCommand) {
    await this.mailerService.sendMail({
      from: 'Robson Maia - <robson@amazing.com>',
      to,
      subject,
      text,
      html
    })
  }
}
