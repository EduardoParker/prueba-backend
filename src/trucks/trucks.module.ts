import { Module } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { TrucksController } from './trucks.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { TruckSchema } from './schema/truck.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:"Truck", schema: TruckSchema}
  ])],
  providers: [TrucksService],
  controllers: [TrucksController]
})
export class TrucksModule {}
