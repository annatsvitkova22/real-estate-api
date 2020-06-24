import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from "class-validator";

export class AuthUserModel {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    userId?: string;
    @ApiProperty()
    @IsEmail()
    username: string;
    @ApiProperty()
    password?: string;
    @ApiProperty()
    firstName?: string;
    @ApiProperty()
    role?: string;
    @ApiProperty()
    name?: string;
    @ApiProperty()
    passwordHash?: string;
}
