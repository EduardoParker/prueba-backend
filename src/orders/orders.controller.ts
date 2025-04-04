import { Controller, Get, Param, Put, Body, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './schema/order.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getOrders(): Promise<Order[]> {
    return this.ordersService.getOrders();
  }

  @Post()
  async create(
    @Body('user') user: string,
    @Body('truck') truck: string,
    @Body('pickup') pickup: string,
    @Body('dropoff') dropoff: string,
    @Body('status') status: 'created' | 'in transit' | 'completed' = 'created',
  ): Promise<Order> {
    return this.ordersService.createOrder(user, truck, pickup, dropoff, status);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'created' | 'in transit' | 'completed',
  ): Promise<Order> {
    return this.ordersService.updateStatusOrder(id, status);
  }
}