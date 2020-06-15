export class UserModel {
    id?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    email?: string;
    salt?: string;
    role?: string;
    passwordHash?: string;
}
