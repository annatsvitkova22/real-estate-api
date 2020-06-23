import { ApiProperty } from '@nestjs/swagger';

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
    email?: string;
    salt?: string;
    @ApiProperty()
    role?: string;
    passwordHash?: string;
}
