import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './schema/location.schema';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Post()
  async create(@Body('place_id') place_id: string): Promise<Location> {
    return this.locationService.createLocationByPlaceId(place_id);
  }
s
  @Get()
  async findAll(): Promise<Location[]> {
    return this.locationService.getLocations();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('place_id') place_id: string,
  ): Promise<Location> {
    return this.locationService.updateLocation(id, place_id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.locationService.deleteLocation(id);
  }
}