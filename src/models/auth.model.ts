import { ApiProperty } from '@nestjs/swagger';

export class AuthModel {
    @ApiProperty()
    username?: string;
    @ApiProperty()
    password?: string;
}