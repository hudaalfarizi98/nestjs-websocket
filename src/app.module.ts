import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { NotificationController } from './notification/notification.controller';

@Module({
  imports: [ConfigModule.forRoot(), NotificationModule],
  controllers: [AppController, NotificationController],
  providers: [AppService],
})
export class AppModule {}
