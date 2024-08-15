import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Endpoint List')
    .addCookieAuth('Authorization', {
      type: 'apiKey',
      in: 'cookie',
      name: 'Authorization',
      description: 'Cookie with the auth token'
    })
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  app.use(cookieParser())

  await app.listen(3000)
}
bootstrap()
