import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({

    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET, 
            signOptions: {
                expiresIn: process.env.JWT_EXPIRES_IN, 
            }
        }),
        TypeOrmModule.forFeature([UserRepository])
    ],
    providers: [
        AuthService,
        JwtStrategy
    ],
    controllers: [AuthController],
    exports: [
        JwtStrategy,
        PassportModule
    ]
})
export class AuthModule {}
