import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from "class-validator";

export class UserModel {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    firstName?: string;
    @ApiProperty()
    lastName?: string;
    @ApiProperty()
    password?: string;
    @ApiProperty()
    @IsEmail()
    email?: string;
    salt?: string;
    @ApiProperty()
    role?: string;
    passwordHash?: string;
}
