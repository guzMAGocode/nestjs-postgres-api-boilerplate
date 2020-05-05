import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(createUserDto : CreateUserDto) : Promise<User> {
        return this.userRepository.createUser(createUserDto);
    }

    async sendEmailForgotPassword(email : string) : Promise<boolean> {
        //TODO: The funny part
        return false;
    }

    async signIn(signInCredentialsDto : SignInCredentialsDto) : Promise<{accessToken: string}> {
        // return this.userRepository.signIn(signInCredentialsDto);
        const userData = await this.userRepository.validateUserPassword(signInCredentialsDto);

        if(!userData) throw new UnauthorizedException('Invalid credentials');

        const {username, email} = userData;

        const payload : JwtPayload = { username, email};
        const accessToken = await this.jwtService.sign(payload);

        return {accessToken}
    }
}
