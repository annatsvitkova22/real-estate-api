import { ApiProperty } from '@nestjs/swagger';

export class OrderItemModel {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    productId?: string;
    @ApiProperty()
    orderId?: string;
    @ApiProperty()
    startTime?: Date;
    @ApiProperty()
    endTime?: Date;
    @ApiProperty()
    userId?: string;
}
