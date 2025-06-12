import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsOptional()
  @IsNumber()
  saldo: number = 0
}
