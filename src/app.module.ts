import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from "@nestjs/mongoose";
import { TrucksModule } from './trucks/trucks.module';
import { OrdersModule } from './orders/orders.module';
import { LocationsModule } from './locations/locations.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, MongooseModule.forRoot("mongodb://localhost:27017/BeGo"), TrucksModule, OrdersModule, LocationsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
