import { ApiProperty } from '@nestjs/swagger';

export class StripeModel {
    @ApiProperty()
    message?: string;
    @ApiProperty()
    id?: string;
    @ApiProperty()
    status?: string;
}