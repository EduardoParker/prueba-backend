import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schema/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  async createOrder(
    user: string,
    truck: string,
    pickup: string,
    dropoff: string,
    status: 'created' | 'in transit' | 'completed' = 'created',
  ): Promise<Order> {
    const newOrder = new this.orderModel({
      user, 
      truck,
      status,
      pickup,
      dropoff
    });
    return await newOrder.save();
  }

  async getOrders(): Promise<Order[]> {
    return this.orderModel.find().populate('user truck pickup dropoff').exec();
  }

  
  async updateStatusOrder(id: string, status: 'created' | 'in transit' | 'completed'): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).exec();

    if (!updatedOrder) {
      throw new NotFoundException(`Orden no encontrada.`);
    }

    return updatedOrder;
  }
}