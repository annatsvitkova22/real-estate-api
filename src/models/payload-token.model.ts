import { ApiProperty } from '@nestjs/swagger';

export class PayloadTokenModel {
    @ApiProperty()
    firstName?: string;
    @ApiProperty()
    userId?: string;
    @ApiProperty()
    role?: string;
    @ApiProperty()
    iat?: number;
    @ApiProperty()
    exp?: number;
}
