import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  sendNotification(token: string, message: string) {
    this.notificationGateway.sendNotificationToToken(token, message);
    return { success: true, message: `Notification sent to ${token}` };
  }
}
