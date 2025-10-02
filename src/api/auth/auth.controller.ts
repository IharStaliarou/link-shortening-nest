import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import { type Request, type Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { Authorization, Authorized } from '../../common/decorators/index';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User registration',
    description: 'Creating a new user and adding the account to the database',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({ description: 'Uncorrect email or password' })
  @ApiConflictResponse({ description: 'User with this email already exists' })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return this.authService.register(res, dto);
  }

  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({ description: 'Uncorrect email or password' })
  @ApiNotFoundResponse({ description: 'User with this email not found' })
  @ApiOperation({
    summary: 'User login',
    description: 'Authorizes the user and issues an access token',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Logout from system',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @ApiOperation({
    summary: 'Update access token',
    description: 'Generates a new access token',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req, res);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('@me')
  async me(@Authorized('id') id: string) {
    return id;
  }
}
