import { Module } from '@nestjs/common'
import { PassageController } from './passage.controller'
import { PassageService } from './passage.service'
import { AuthGuard } from 'src/guards/auth.guard'
import { SomeService } from 'src/utils/some-services'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Passage, User } from 'src/entities'
import { AuthService } from 'src/auth/auth.service'

@Module({
  imports: [TypeOrmModule.forFeature([Passage, User])],
  controllers: [PassageController],
  providers: [PassageService, AuthGuard, SomeService, AuthService],
})
export class PassageModule {}
