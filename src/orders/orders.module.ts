import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order, OrderSchema } from "./schema/order.schema";
import { UsersModule } from "src/users/users.module";
import { TrucksModule } from "src/trucks/trucks.module";
import { LocationsModule } from "src/locations/locations.module";

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    UsersModule,
    TrucksModule,
    LocationsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
