import { ApiProperty } from '@nestjs/swagger';

export class ProductModel {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    name?: string;
    @ApiProperty()
    address?: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    status?: boolean;
    @ApiProperty()
    price?: number;
    @ApiProperty()
    currency?: string;
    @ApiProperty()
    userId?: string;
}
