import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user'

@Entity('passage')
export class Passage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  cost: number

  @Column({ nullable: false })
  route: string

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
