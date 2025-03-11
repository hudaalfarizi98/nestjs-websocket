import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string | undefined;

    if (!apiKey) {
      throw new Error('Undefined x-api-key');
    }

    if (apiKey !== this.configService.apiKey) {
      throw new UnauthorizedException('Unauthorized: Invalid API Key');
    }

    return true;
  }
}
