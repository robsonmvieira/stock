import { IStorage } from '@modules/core/domain/repositories/storage.port'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config'
export class S3FileUpload implements IStorage {
  private s3Client: S3Client
  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_KEY')
      }
    })
  }
  async createObject(
    folder: string,
    key: string,
    value: Buffer
  ): Promise<void> {
    console.log(key, value)

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Key: `${folder}/${key}-${Date.now()}`,
          Body: value
        })
      )
    } catch (error) {
      console.log(error)
    }
  }
  async get(key: string): Promise<string> {
    return 'key' + key
  }
  async delete(key: string): Promise<void> {
    console.log(key)
  }
}
