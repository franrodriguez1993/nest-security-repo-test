import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    birthday: string;
}
