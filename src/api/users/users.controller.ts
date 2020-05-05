import { Controller, Get, Query, ValidationPipe, UseGuards, ParseIntPipe, Param, Post, Patch, Delete, UsePipes, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserFilterDto } from './dto/get-users-filter.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiResponse } from '../interfaces/api-response.interface';
import { SuccessResponse, ErrorResponse } from '../dto/api-response.dto';

@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getUsers(@Query(ValidationPipe) filterDto: GetUserFilterDto) : Promise<ApiResponse> {
        try {
            const data = await this.usersService.getUsers(filterDto);
            return new SuccessResponse("", data)   
        } catch (error) {
            return new ErrorResponse("Ups.. something went wrong..", error);
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse> {
        try {
            const data = await this.usersService.getUserById(id);
            return new SuccessResponse("", data)   
        } catch (error) {
            return new ErrorResponse("Ups.. something went wrong..", error);
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUserDto: CreateUserDto) : Promise<ApiResponse> {
        try {
            const data = await this.usersService.createUser(createUserDto);
            return new SuccessResponse("User created!!", data)   
        } catch (error) {
            return new ErrorResponse("Ups.. something went wrong..", error);
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Patch('/:id/update')
    async updateUserStatus( @Param('id', ParseIntPipe) id: number ) : Promise<ApiResponse> {
        try {
            const data = await this.usersService.updateUser(id);
            return new SuccessResponse("User updated!!", data)   
        } catch (error) {
            return new ErrorResponse("Ups.. something went wrong..", error);
        }
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Delete('/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) : Promise<ApiResponse> {
        try {
            await this.usersService.deleteUser(id);
            return new SuccessResponse("User deleted!!", null)   
        } catch (error) {
            return new ErrorResponse("Ups.. something went wrong..", error);
        }
    }
    
}
