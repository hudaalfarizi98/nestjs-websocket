import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationGateway {
  // sendNotification(token: string, message: string) {
  //   throw new Error('Method not implemented.');
  // }
  @WebSocketServer()
  server: Server;

  private clients = new Map<string, string>(); // Menyimpan token dan socket ID

  // Saat client terkoneksi
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Saat client disconnect
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    for (const [token, socketId] of this.clients.entries()) {
      if (socketId === client.id) {
        this.clients.delete(token);
        break;
      }
    }
  }

  @SubscribeMessage('register_token')
  handleRegisterToken(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { token?: string },
  ) {
    if (!client) {
      console.error('Client is undefined!');
      return;
    }

    if (!payload || !payload.token) {
      console.error('Invalid token payload:', payload);
      return;
    }
    this.clients.set(payload.token, client.id);
    console.log(`Client connected: ${client.id}, Token: ${payload.token}`);
  }

  // Mengirim notifikasi ke token tertentu
  sendNotificationToToken(token: string, message: string) {
    const socketId = this.clients.get(token);
    if (socketId) {
      this.server.to(socketId).emit('notification', { message });
      console.log(`Sent notification to ${token}`);
    } else {
      console.log(`Token ${token} not found`);
    }
  }
}
