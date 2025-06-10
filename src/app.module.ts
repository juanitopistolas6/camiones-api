import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Passage, User } from './entities'
import { ConfigModule } from '@nestjs/config'
import { PassageModule } from './passage/passage.module'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: 'mysql://root:TdOgGzYnVviiRZaOYAABehiXEPHaIqje@crossover.proxy.rlwy.net:54367/railway',
      entities: [User, Passage],
      synchronize: false,
    }),
    PassageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
