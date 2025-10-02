import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { type Response } from 'express';
import { ClientIp, UserAgent } from './common/decorators';

@ApiTags()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':code')
  async getLinkByShortCode(
    @Param('code') shortCode: string,
    @Res({ passthrough: true }) res: Response,
    @ClientIp() ip: string,
    @UserAgent() userAgent: string,
  ) {
    const link = await this.appService.getLinkByShortCode(shortCode);

    await this.appService.trackClick(shortCode, ip, userAgent);

    return res.redirect(link.originalUrl);
  }
}
