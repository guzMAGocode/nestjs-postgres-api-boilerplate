import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInCredentialsDto {
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}