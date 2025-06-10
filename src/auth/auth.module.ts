import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SomeService } from 'src/utils/some-services'
import { AuthGuard } from 'src/guards/auth.guard'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entities'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, SomeService, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
