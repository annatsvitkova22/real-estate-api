import { ApiProperty } from '@nestjs/swagger';

export class AuthUserModel {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    userId?: string;
    @ApiProperty()
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
