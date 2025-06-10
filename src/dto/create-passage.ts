import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreatePassageDto {
  @IsNotEmpty()
  @IsNumber()
  cost: number

  @IsNotEmpty()
  @IsString()
  route: string

  @IsNotEmpty()
  @IsString()
  user: string
}
