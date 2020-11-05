import { ApiProperty } from '@nestjs/swagger';
import { ObjectType, Field } from '@nestjs/graphql';
import { UserModel } from './user.model';
@ObjectType()
export class ProductModel {
    @ApiProperty()
    @Field()
    id?: string;
    @ApiProperty()
    @Field()
    name?: string;
    @ApiProperty()
    @Field()
    address?: string;
    @ApiProperty()
    @Field()
    description?: string;
    @ApiProperty()
    @Field()
    status?: boolean;
    @ApiProperty()
    @Field()
    price?: number;
    @ApiProperty()
    @Field()
    currency?: string;
    @ApiProperty()
    @Field()
    userId?: string;
}
