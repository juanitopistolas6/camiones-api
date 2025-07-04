import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { Authorization } from 'src/decorators/authorization'
import { AuthService } from './auth.service'
import { SomeService } from 'src/utils/some-services'
import { GetUser } from 'src/decorators'
import { IResponse, IUser, Token } from 'src/interfaces'
import { User } from 'src/entities'
import { UserDto } from 'src/dto'
import { LoginDto } from 'src/dto/login'
import { AuthGuard } from 'src/guards/auth.guard'

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(
    private authService: AuthService,
    private someService: SomeService,
  ) {}

  @Get()
  @Authorization(true)
  async getUser(@GetUser() user: IUser): Promise<IResponse<User>> {
    try {
      const data = await this.authService.User(user.user)

      return this.someService.FormateData<User>({
        data,
        message: 'USER_FOUND',
      })
    } catch (e) {
      return this.someService.FormateData({ error: true, message: e.message })
    }
  }

  @Post()
  @Authorization(false)
  async createUser(@Body() user: UserDto): Promise<IResponse<User>> {
    try {
      console.log('ok???')
      const newUser = await this.authService.createUser(user)

      delete newUser.password
      delete newUser.salt

      return this.someService.FormateData<User>({
        data: newUser,
        message: 'USER_CREATED',
      })
    } catch (e) {
      return this.someService.FormateData({ error: true, message: e.message })
    }
  }

  @Post('login')
  @Authorization(false)
  async login(@Body() login: LoginDto): Promise<IResponse<Token>> {
    const { user, password } = login

    const client = await this.authService.User(user)

    const isVerified = await this.someService.verifyPassword(
      client.password,
      password,
      client.salt,
    )

    if (!isVerified)
      return this.someService.FormateData({
        error: true,
        message: 'UNATHORIZED',
      })

    delete client.password
    delete client.salt

    const token = await this.someService.generateSignature({ ...client })

    return this.someService.FormateData<Token>({
      data: { token, user: client },
      message: 'TOKEN_GENERATED',
    })
  }

  @Post('token')
  @Authorization(true)
  async verifyToken(@GetUser() user: IUser): Promise<IResponse<User>> {
    try {
      const data = await this.authService.User(user.user)

      return this.someService.FormateData<User>({
        data,
        message: 'TOKEN_VERIFIED',
      })
    } catch {
      return this.someService.FormateData({
        error: true,
        message: 'UNATHORIZED',
      })
    }
  }
}
