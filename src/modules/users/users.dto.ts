import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description:"Username"})
  // Solo permite letras, números y guiones bajos
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username contains invalid characters' })  
  username: string;

  @IsString()
  @IsEmail()
  @ApiProperty({description:"User email"})
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description:"User birthday yyyy/mm/dd"})
  birthday: string;
}



export class UpdateUserDto extends PartialType(CreateUserDto) {}
