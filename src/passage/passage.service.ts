import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service'
import { CreatePassageDto } from 'src/dto'
import { Passage, User } from 'src/entities'
import { Repository } from 'typeorm'

@Injectable()
export class PassageService {
  constructor(
    @InjectRepository(Passage) private PassageRepository: Repository<Passage>,
    @InjectRepository(User) private UserRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async getAllPassages(): Promise<Passage[]> {
    return this.PassageRepository.find()
  }

  async getPassageById(id: string): Promise<Passage> {
    const passage = await this.PassageRepository.findOne({
      where: { id },
    })

    if (!passage) throw new NotFoundException('PASSAGE_NOT_FOUND')

    return passage
  }

  async createPassage(passageData: CreatePassageDto): Promise<Passage> {
    try {
      const user = await this.authService.getUser(passageData.user)

      if (passageData.cost > user.saldo)
        throw new NotFoundException('INSUFFICIENT_FUNDS')

      await this.UserRepository.update(
        { id: user.id },
        { saldo: user.saldo - passageData.cost },
      )

      const newPassage = this.PassageRepository.create({
        ...passageData,
        user,
      })

      return this.PassageRepository.save(newPassage)
    } catch {
      throw new NotFoundException('ERROR_CREATING_PASSAGE')
    }
  }
}
