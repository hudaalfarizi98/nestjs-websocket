import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateway';
import { ConfigAppModule } from '../config/config.module';

@Module({
  imports: [ConfigAppModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  exports: [NotificationGateway],
})
export class NotificationModule {}
