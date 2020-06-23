import { ApiProperty } from '@nestjs/swagger';

export class LikeProductModel {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    userId?: string;
    @ApiProperty()
    productId?: string;
}