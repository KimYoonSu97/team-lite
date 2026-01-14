import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class AwsService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
      throw new Error('AWS credentials are not properly configured');
    }
    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    this.bucketName = bucketName;
  }

  getS3Client() {
    return this.s3Client;
  }

  async getPresignedUrl(fileName: string, contentType: string) {
    const key = `${uuidv4()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 300 });
    return { url, key };
  }
}
