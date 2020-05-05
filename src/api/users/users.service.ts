import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { GetUserFilterDto } from './dto/get-users-filter.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ) {}

    async getUsers(filterDto : GetUserFilterDto) : Promise<User[]> {
        return this.userRepository.getUsers(filterDto);
    }

    async getUserById(id : number) : Promise<User> {
        
        const found = await this.userRepository.findOne(id);

        if(!found) throw new NotFoundException(`User with ID '${id}' not found`);

        return found;
    }

    async createUser(createUserDto: CreateUserDto) : Promise<User> {

        return this.userRepository.createUser(createUserDto);
    }

    async updateUser(id : number) : Promise<User> {
        const user = await this.getUserById(id);
        
        await user.save();

        return user;
    }

    async deleteUser(id : number) : Promise<void> {
        
        const result = await this.userRepository.delete(id);

        if (result.affected === 0) throw new NotFoundException(`User with ID '${id}' not found`);

    }
}
