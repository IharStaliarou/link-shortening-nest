import { Injectable, NotFoundException } from '@nestjs/common';
import { lookup } from 'geoip-country';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class StatisticsService {
  private readonly parser: UAParser;
  constructor(private readonly prismaService: PrismaService) {
    this.parser = new UAParser();
  }

  async getBrowserStats(id: string) {
    const clicks = await this.getClicks(id);

    const stats = clicks.reduce((acc: Record<string, number>, click) => {
      const { browser } = this.getBrowserByUserAgent(click.userAgent);

      if (acc[browser]) {
        acc[browser] += 1;
      } else {
        acc[browser] = 1;
      }

      return acc;
    }, {});

    return stats;
  }

  async getCountryStats(id: string) {
    const clicks = await this.getClicks(id);

    const stats = clicks.reduce((acc: Record<string, number>, click) => {
      const { country } = this.getCountryByIp(click.ipAddress);

      const countryName = country || 'Unknown';

      if (acc[countryName]) {
        acc[countryName] += 1;
      } else {
        acc[countryName] = 1;
      }

      return acc;
    }, {});

    return stats;
  }

  private async getClicks(linkId: string) {
    const clicks = await this.prismaService.click.findMany({
      where: { linkId },
    });

    return clicks;
  }

  private getBrowserByUserAgent(userAgent: string) {
    this.parser.setUA(userAgent);

    const result = this.parser.getResult();

    return { browser: result.browser.name ?? 'Unknown' };
  }

  private getCountryByIp(ip: string) {
    const geo = lookup(ip);
    console.log(JSON.stringify(geo));
    return {
      // ts-ignore
      country: geo?.country || 'Unknown',
    };
  }
}
