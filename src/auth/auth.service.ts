import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserDto } from 'src/dto'
import { User } from 'src/entities'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    })

    if (!user) throw new NotFoundException('USER_NOT_FOUND')

    return user
  }

  async createUser(user: UserDto): Promise<User> {
    const newUser = this.userRepository.create({ ...user })

    await this.userRepository.save(newUser)

    return newUser
  }

  async User(name: string): Promise<User> {
    const client = await this.userRepository.findOne({
      where: {
        name,
      },
    })

    if (!client) throw new NotFoundException('USER_NOT_FOUND')

    return client
  }
}
