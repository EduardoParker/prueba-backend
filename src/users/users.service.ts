import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, PreMiddlewareFunction } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
//import { User } from "./interfaces/users.interfaces";
import { User } from "./schemas/user.schema"; 
//import { CreateuserDto } from "./dto/users.dto";


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel : Model<User>){}
    

    async getUsers() : Promise<User[]> {
        return this.userModel.find().exec()  
    }

    async getUser(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
          throw new NotFoundException(`Usuario no encontrado`);
        }
        return user;
      }

    
    async createUser(email:string, password:string) : Promise<User>{
        const newUser = new this.userModel({email,password});
        return newUser.save()
    }

    async updateUser(id: string, password: string): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(
          { id }, 
          { password }, 
          { new: true } 
        ).exec()
        if (!user) {
            throw new NotFoundException(`Usuario no encontrado`);
          }
          return user;
        }

    async deleteUser(id: string): Promise<User> {
        const user = await this.userModel.findByIdAndDelete(id).exec();
            if (!user) {
              throw new NotFoundException(`Usuario no encontrado`);
            }
            return user;
          }

}
