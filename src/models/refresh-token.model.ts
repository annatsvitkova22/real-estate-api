import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenModel {
    @ApiProperty()
    refreshToken?: string;
}
