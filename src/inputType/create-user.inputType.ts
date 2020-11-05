import { InputType, Field } from "@nestjs/graphql";

import { User } from "../entity";
import { IsEmail } from "class-validator";

@InputType({description: 'Create user'})
export class CreateUser implements Partial<User> {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    password: string;

    @Field()
    role?: string;
}
