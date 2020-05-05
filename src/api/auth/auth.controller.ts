import { Controller, Post, Body, UseGuards, Get, UseInterceptors, ClassSerializerInterceptor, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiResponse } from '../interfaces/api-response.interface';
import { SuccessResponse, ErrorResponse } from '../dto/api-response.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/signup')
    async signUp(@Body() createUserDto : CreateUserDto) : Promise<ApiResponse> {
        try {
            const data = await this.authService.signUp(createUserDto);
            return new SuccessResponse("Account created !! :)", data);    
        } catch (error) {
            return new ErrorResponse("Error creating new user account !! :(", error)
        }
    }

    @Post('/signin')
    async signIn(@Body() signInCredentialsDto : SignInCredentialsDto) : Promise<ApiResponse> { //{accessToken: string}
        try {
            const data = await this.authService.signIn(signInCredentialsDto);
            return new SuccessResponse("Logged in !!", data);
        } catch (error) {
            return new ErrorResponse("Access error !!", error);
        }        
    }

    //TODO: Endpoints to change forgotten password sending an email link
    
    // @Get('email/forgot-password/:email')
    // async sendEmailForgotPassword(@Param('email') email : string): Promise<ApiResponse> {
    //     try {
    //         const isEmailSent = await this.authService.sendEmailForgotPassword(email);
    //         if(isEmailSent) return new SuccessResponse("The email with the instructions should be in your mail inbox.", null);
            
    //         return new ErrorResponse("Error sending forgot password email..");
            
    //     } catch(error) {
    //         return new ErrorResponse("Error sending forgot password email..", error);
    //     }
    // }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/test')
    async test(@GetUser() user : User) {
        console.log("User recovered from JWT: ", user);
    }
}
