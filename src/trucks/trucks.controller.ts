import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TrucksService } from "./trucks.service";
import { Truck } from "./schema/truck.schema";

@Controller('trucks')
export class TrucksController {
    constructor(private readonly trucksService : TrucksService){}

    @Get()
    async getTrucks() : Promise<Truck[]>{
        return this.trucksService.getTrucks();
    }

    @Post()
    async createTruks(@Body() createTruckDto : {user:string, year: string, color:string, plates: string}) : Promise <Truck>{
        return this.trucksService.createTruck(createTruckDto.user, createTruckDto.year, createTruckDto.color, createTruckDto.plates)
    }

    @Put(":id")
    async updateTruck(@Param("id") id: string, @Body() updateTruckDto:{year:string, color:string, plates: string }) : Promise <Truck>{
        return this.trucksService.updateTruck(id, updateTruckDto.year, updateTruckDto.color, updateTruckDto.plates)
    }

    @Delete(":id")
    async deleteTruck(@Param("id") id: string) : Promise<Truck>{
        return this.trucksService.deleteTruck(id)
    }
}
