import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date
}
