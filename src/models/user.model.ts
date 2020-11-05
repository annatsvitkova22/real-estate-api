import { ApiProperty } from '@nestjs/swagger';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
    @Field()
    id?: string;
    @Field()
    firstName?: string;
    @Field()
    lastName?: string;
    @Field()
    password?: string;
    @Field()
    email?: string;
    // salt?: string;
    @Field()
    role?: string;
    // passwordHash?: string;
}
