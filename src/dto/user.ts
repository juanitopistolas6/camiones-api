import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsNumber()
  saldo: number
}
