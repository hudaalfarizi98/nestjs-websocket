import { Controller, Post, Body } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  @Post('send')
  sendNotification(@Body() body: { token: string; message: string }) {
    this.notificationGateway.sendNotificationToToken(body.token, body.message);
    return { success: true, message: 'Notification sent' };
  }
}
