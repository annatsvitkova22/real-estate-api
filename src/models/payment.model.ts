import { ApiProperty } from '@nestjs/swagger';

export class PaymentModel {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    email?: string;
    @ApiProperty()
    source?: string;
    @ApiProperty()
    currency?: string;
    @ApiProperty()
    orderId?: string;
    @ApiProperty()
    amount?: number;
    @ApiProperty()
    transactionId?: string;
}
