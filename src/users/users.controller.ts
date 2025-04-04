import { Body, Controller, Get,  Param, Post, Put, Delete, NotFoundException } from '@nestjs/common';
import {UsersService} from "./users.service"
import {CreateuserDto} from "./dto/users.dto"
import { User } from "./schemas/user.schema";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService){}
    
    @Get()
    async getUsers (): Promise<User[]>{
        return this.usersService.getUsers()
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
      try {
        return await this.usersService.getUser(id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error
        }
        throw console.log(new Error);
      }
    }

    @Post()
   async  CreateUser( @Body() createUserDto : {email:string, password:string}): Promise<User>{
       return this.usersService.createUser(createUserDto.email, createUserDto.password)
    }

    @Put()
    async updateUser(
      @Body() updateUserDto: {id: string, password: string },
    ): Promise<User> {
      try {
        return await this.usersService.updateUser(updateUserDto.id, updateUserDto.password);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error; 
        }
        throw new Error('Error inesperado');
      }
    }
  
  
    @Delete(":id")
    async deleteUser(@Param("id") id : string): Promise<User> {
      try {
        return await this.usersService.deleteUser(id);
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw console.log(new Error);
      }
    }

}
