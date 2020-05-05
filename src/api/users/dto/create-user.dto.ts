import { IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(5)
    @MaxLength(15)
    username: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    company: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(15)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, //RegExp at least 1 upper case letter, 1 lower case letter, 1 number or special char 
        { message: 'Password is too weak.'}
    )
    password: string;
}