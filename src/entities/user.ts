import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: true })
  salt: string

  @Column()
  name: string

  @Column()
  saldo: number

  @BeforeInsert()
  async setPassword() {
    this.salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, this.salt)
  }
}
