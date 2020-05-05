import { ApiProperty } from "@nestjs/swagger";

export class SignInResponseDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;
}