import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDERS_SERVICE') private client: ClientProxy,
    @Inject(NotificationsService) private notifications: NotificationsService,
  ) {}

  createOrder(orderDto: any) {
    this.client.emit('order_created', {
      order: orderDto,
      createdAt: new Date().toISOString(),
    });

    this.notifications.notify('order_created', { order: orderDto });

    return { status: 'Order accepted', order: orderDto };
  }
}