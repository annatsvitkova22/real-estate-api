import { ApiProperty } from '@nestjs/swagger';

export class UserInRoleModel {
    @ApiProperty()
    id?: string;
    @ApiProperty()
    roleId?: string;
    @ApiProperty()
    userId?: string;
}
