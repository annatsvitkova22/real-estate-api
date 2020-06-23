import { ApiProperty } from '@nestjs/swagger';

export class OrderModel {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    amount?: number;
    @ApiProperty()
    currency?: string;
    @ApiProperty()
    count?: number;
    @ApiProperty()
    userId?: string;
    @ApiProperty()
    paymentId?: string;
}