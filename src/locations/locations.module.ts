import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { MongooseModule } from "@nestjs/mongoose";
import { LocationSchema } from "./schema/location.schema";

@Module({
  imports:[MongooseModule.forFeature([
      {name:"Location", schema: LocationSchema}
    ])],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
