import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { PassageService } from './passage.service'
import { SomeService } from 'src/utils/some-services'
import { AuthGuard } from 'src/guards/auth.guard'
import { CreatePassageDto } from 'src/dto'
import { Authorization } from 'src/decorators'

@Controller('passage')
@UseGuards(AuthGuard)
export class PassageController {
  constructor(
    private passageService: PassageService,
    private SomeService: SomeService,
  ) {}

  @Get()
  @Authorization(true)
  async getAllPasages() {
    try {
      const data = await this.passageService.getAllPassages()

      return this.SomeService.FormateData({
        data,
        message: 'PASSAGES_FETCHED',
      })
    } catch (e) {
      return this.SomeService.FormateData({
        error: true,
        message: e.message,
      })
    }
  }

  @Get(':id')
  @Authorization(true)
  async getPassageById(@Param('id') id: string) {
    try {
      const data = await this.passageService.getPassageById(id)

      return this.SomeService.FormateData({
        data,
        message: 'PASSAGE_FETCHED',
      })
    } catch (e) {
      return this.SomeService.FormateData({
        error: true,
        message: e.message,
      })
    }
  }

  @Post()
  @Authorization(false)
  async createPassage(@Body() passageData: CreatePassageDto) {
    try {
      const data = await this.passageService.createPassage(passageData)

      return this.SomeService.FormateData({
        data,
        message: 'PASSAGE_CREATED',
      })
    } catch (e) {
      return this.SomeService.FormateData({
        error: true,
        message: e.message,
      })
    }
  }
}
