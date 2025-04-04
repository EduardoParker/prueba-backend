import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './schema/location.schema';

@Injectable()
export class LocationsService {
  private readonly googleMapsApiKey: string = 'API_KEY';

  constructor(@InjectModel("Location") private locationModel: Model<Location>) {}

  async createLocationByPlaceId(place_id: string): Promise<Location> {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${this.googleMapsApiKey}`;

      const response = await axios.get(url);

      if (response.data.status === 'OK') {
        const result = response.data.result;
        const latitude = result.geometry.location.lat;
        const longitude = result.geometry.location.lng;
        const address = result.formatted_address;

        const newLocation = new this.locationModel({
          place_id,
          address,
          latitude,
          longitude,
        });
        return await newLocation.save();
      } else {
        throw new Error('No se pudo obtener la información del lugar.');
      }
    } catch (error) {
      throw new Error(`Error al obtener la ubicación: ${error.message}`);
    }
  }

  async deleteLocation(id: string): Promise<void> {
    const location = await this.locationModel.findByIdAndDelete(id).exec();
    if (!location) {
      throw new NotFoundException(`Ubicación con el ID ${id} no encontrada.`);
    }
  }

  async getLocations(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  async updateLocation(id: string, place_id: string): Promise<Location> {
    const existingLocation = await this.locationModel.findOne({ place_id }).exec();
    if (existingLocation) {
      throw new ConflictException('Esta ubicación ya ha sido registrada.');
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${this.googleMapsApiKey}`;
    
    const response = await axios.get(url);

    if (response.data.status === 'OK') {
      const result = response.data.result;
      const latitude = result.geometry.location.lat;
      const longitude = result.geometry.location.lng;
      const address = result.formatted_address;

      const updatedLocation = await this.locationModel.findByIdAndUpdate(
        id,
        { place_id, address, latitude, longitude },
        { new: true }
      ).exec();

      if (!updatedLocation) {
        throw new NotFoundException(`Ubicación con el ID ${id} no encontrada.`);
      }

      return updatedLocation;
    } else {
      throw new Error('No se pudo obtener la información del lugar.');
    }
  }

}