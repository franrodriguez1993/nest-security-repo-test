import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  // Solo permite letras, números y guiones bajos
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username contains invalid characters' })  
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  birthday: string;
}



export class UpdateUserDto extends PartialType(CreateUserDto) {}
