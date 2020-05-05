import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { SignInCredentialsDto } from "../auth/dto/signin-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { SignInResponseDto } from "../auth/dto/signin-response.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserFilterDto } from "./dto/get-users-filter.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    async getUsers(filterDto : GetUserFilterDto) : Promise<User[]> {
        const {search, company} = filterDto;

        const query = this.createQueryBuilder('user');

        if(search) query.andWhere('user.username LIKE :search OR user.email LIKE :search', {search: `%${search}%`});

        if(company) query.andWhere('user.company = :company', {company});

        const users = await query.getMany();

        return users;
    }
    
    async createUser(createUserDto : CreateUserDto) : Promise<User>{

        const { username, email, company, password } = createUserDto;

        const user = new User();
        user.username = username;
        user.email = email;
        user.company = company;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
            return user;
        } catch (error) {
            //Error code for duplicate attribute: 23505 TODO: Refactor this to make it cleaner
            if(error.code === '23505') throw new ConflictException('Username or email already exists')
            throw new InternalServerErrorException();
        }

    }

    async validateUserPassword(signInCredentialsDto : SignInCredentialsDto) : Promise<SignInResponseDto> {
        const { email, password } = signInCredentialsDto;

        const user = await this.findOne({ email });

        if (user && await user.validatePassword(password)) {
            const response = new SignInResponseDto();
            response.username = user.username;
            response.email = user.email;
            return response;
        } 

        return null;

    }

    private async hashPassword(password: string, salt: string) : Promise<string> {
        return bcrypt.hash(password, salt);
    }
}