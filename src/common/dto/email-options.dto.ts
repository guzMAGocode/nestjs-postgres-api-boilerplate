import { IsString, IsNotEmpty } from "class-validator";
//TODO: review this

export class EmailOptionsDto {

    @IsString()
    templateFile: string;
    
    @IsString()
    name: string;
    
    @IsString()
    emailTo: string;

    @IsString()
    subject: string;

    @IsNotEmpty()
    mailData: any

};