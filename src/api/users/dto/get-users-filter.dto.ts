import { IsOptional, IsNotEmpty } from "class-validator";


export class GetUserFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsNotEmpty()
    company: string;
}