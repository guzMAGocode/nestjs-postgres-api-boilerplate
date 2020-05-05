import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiResponse } from '../interfaces/api-response.interface';
import { SuccessResponse, ErrorResponse } from '../dto/api-response.dto';

@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {

    private logger = new Logger('TasksController');

    constructor(private tasksService: TasksService){}

    @Get()
    async getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<ApiResponse> {   
    
        try {
            const data = await this.tasksService.getTasks(filterDto);
            return new SuccessResponse("", data)   
        } catch (error) {
            return new ErrorResponse("Ups.. something went wrong..", error);
        }
    }

    @Get('/user')
    async getUserTasks(
        @Query(ValidationPipe) filterDto: GetTaskFilterDto,
        @GetUser() user : User    
    ): Promise<ApiResponse> {   
        this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: "${JSON.stringify(filterDto)}"`);
        try {
            const data = await this.tasksService.getUserTasks(filterDto, user);
            return new SuccessResponse("", data);
        } catch (error) {
            return new ErrorResponse("Ups.. something went wrong..", error);
        }
    }

    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse> {
        try {
            const data = await this.tasksService.getTaskById(id);
            return new SuccessResponse("", data );
        } catch (error) {
            return new ErrorResponse("Ups.. something went wrong..", error);
        }
    }

    @Get('/:id/user')
    async getUserTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user : User
    ): Promise<ApiResponse> {

        try {
            const data = await this.tasksService.getUserTaskById(id, user);
            return new SuccessResponse("", data );
        } catch (error) {
            return new ErrorResponse("Ups.. something went wrong..", error);
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user : User
        ) : Promise<ApiResponse> {
        this.logger.log(`User "${user.username}" creating a new task. DTO: ${JSON.stringify(createTaskDto)}`)
        try {
            const data = await this.tasksService.createTask(createTaskDto, user);
            return new SuccessResponse("Task created!!", data );
        } catch (error) {
            return new ErrorResponse("Ups.. something went wrong..", error);
        }
    }

    @Patch('/:id/status')
    async updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', new TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user : User
    ) : Promise<ApiResponse> {
        try {
            const data = await this.tasksService.updateTaskStatus(id, status, user);
            return new SuccessResponse("Task status updated!!", data );
        } catch (error) {
            return new ErrorResponse("Ups.. something went wrong..", error);
        }
    }

    @Delete('/:id')
    async deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user : User
    ) : Promise<ApiResponse> {
        try {
            this.tasksService.deleteTask(id, user);
            return new SuccessResponse("Task deleted!!", null);
        } catch (error) {
            return new ErrorResponse("Ups.. something went wrong..", error);
        }
        
    }
    
}
