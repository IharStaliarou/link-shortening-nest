import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    description: 'JWT access token',
    example:
      'eyJhbGciOiJIUzI1pXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNT',
  })
  accessToken: string;
}
