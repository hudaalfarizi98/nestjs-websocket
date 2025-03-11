import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get apiKey(): string {
    return this.configService.get<string>('API_KEY', 'default_secret');
  }
}
