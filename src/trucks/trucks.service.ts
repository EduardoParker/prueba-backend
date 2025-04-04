import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Truck } from "./schema/truck.schema";

@Injectable()
export class TrucksService {
    constructor(@InjectModel("Truck") private truckModel : Model<Truck>){}

    async createTruck(user:string, year:string, color:string, plates:string) : Promise<Truck>{
        const newTruck = new this.truckModel({user, year, color, plates})
        return newTruck.save()
    }

    async getTrucks():Promise<Truck[]>{
        return this.truckModel.find().populate("user").exec()
    }

    async updateTruck(id: string, year: string, color: string, plates: string): Promise<Truck> {
        const truck = await this.truckModel.findByIdAndUpdate(
          id,
          { year, color, plates },
          { new: true }
        ).exec();
    
        if (!truck) {
          throw new NotFoundException(`Camión no encontrado`);
        }
        return truck;
      }

    async deleteTruck(id: string): Promise<Truck> {
        const truck = await this.truckModel.findByIdAndDelete(id).exec();
    
        if (!truck) {
          throw new NotFoundException(`Camión no encontrado`);
        }
    
        return truck;
      }


}

