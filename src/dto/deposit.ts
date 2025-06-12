import { IsNotEmpty, IsNumber } from 'class-validator'

export class DepositDto {
  @IsNumber()
  @IsNotEmpty()
  deposit
}
