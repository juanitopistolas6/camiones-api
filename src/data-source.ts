import 'dotenv/config'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'mysql',
  url: 'mysql://root:TdOgGzYnVviiRZaOYAABehiXEPHaIqje@crossover.proxy.rlwy.net:54367/railway',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
})
