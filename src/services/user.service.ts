import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { User, UserInRole, Role, Product, LikeProduct } from '../entity';
import { UserModel, UserInRoleModel, RoleModel } from '../models';
import { OrderService } from './order.service';

@Injectable()
export class UserService {
    public saltRounds = 10;
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(UserInRole) private userInRoleRepository: Repository<UserInRole>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(LikeProduct) private likeProductRepository: Repository<LikeProduct>,
        @Inject(forwardRef(() => OrderService)) private orderService: OrderService,
    ) { }

    public async getUsers(): Promise<UserModel[]> {
        const query: string = 'SELECT "user".id, "user"."firstName", "user"."lastName", "user".email, "role".name as "role" FROM "user_in_role" INNER JOIN "role" ON "user_in_role".role_id = "role".id INNER JOIN "user" ON "user_in_role".user_id = "user".id';
        const getUsers: UserModel[] = await this.userInRoleRepository.query(query);

        return getUsers;
    }

    public async getUserById(id: number): Promise<UserModel> {
        const user: UserModel = await this.userRepository.findOne({
            select: ['firstName', 'lastName', 'email'],
            where: [{ id: id }],
        });

        return user;
    }

    public async createUser(createUser: UserModel): Promise<UserModel | string> {
        const getUser: User = {} as User;
        getUser.firstName = createUser.firstName;
        getUser.lastName = createUser.lastName;
        getUser.email = createUser.email;
        let userRole: string = '';
        let user: UserModel = await this.userRepository.findOne({ email: getUser.email });
        if (user) {
            const message: string = 'user with this email already exists';

            return message;
        }
        
        const randomSalt: string = await this.getRandomSalt();
        getUser.salt = randomSalt;
        const pass: string = await this.getHash(createUser.password, randomSalt);
        getUser.passwordHash = pass;
        user = await this.userRepository.save(getUser);
        if (!user) {
            const message: string = 'user not created';

            return message;
        }
        if (createUser.role) {
            userRole = createUser.role;
        }
        if (!createUser.role) {
            userRole = 'user';
        }
        const findRole: RoleModel = await this.roleRepository.findOne({ name: userRole });
        let roleId: string = '';
        
        if (findRole) {
            roleId = findRole.id;
        }
        if (!findRole) {
            const role: RoleModel = {} as RoleModel;
            role.name = userRole;
            const createRole: RoleModel = await this.roleRepository.save(role);
            if (!createRole) {
                const message: string = 'role not created';
    
                return message;
            }
            roleId = createRole.id;
        }

        const userInRole: UserInRoleModel = {} as UserInRoleModel;
        userInRole.roleId = roleId;
        userInRole.userId = user.id;
        const createdUserInRole: UserInRole = await this.userInRoleRepository.save(userInRole);
        if (!createdUserInRole) {
            const message: string = 'user role not created';

            return message;
        }
        user.role = userRole;        
        delete user.passwordHash;
        delete user.salt;
    
        return user;
    }

    public async updateUser(updateUser: any): Promise<UserModel | string> {
        const getUser: User = {} as User;
        getUser.id = updateUser.id;
        getUser.firstName = updateUser.firstName;
        getUser.lastName = updateUser.lastName;
        getUser.passwordHash = updateUser.passwordHash;
        getUser.email = updateUser.email;
        const toUpdate: User = await this.userRepository.findOne(getUser.id);
        if(!toUpdate) {
            const message: string = 'user not found';

            return message;
        }
        delete toUpdate.firstName;
        delete toUpdate.lastName;
        delete toUpdate.passwordHash;
        delete toUpdate.email;
        delete getUser.id;
        const updated: UserModel = Object.assign(toUpdate, getUser);
        const user: UserModel = await this.userRepository.save(updated);

        return user;
    }

    public async deleteUser(userId: string): Promise<DeleteResult | string> {
        const userInRoles: UserInRole[] = await this.userInRoleRepository.find({
            where: [{userId: userId}]
        });

        if (userInRoles) {
            userInRoles.forEach(async userInRole => {
                const deletedUserInRoles: DeleteResult = await this.userInRoleRepository.delete(userInRole.id);
                if(!deletedUserInRoles.affected) {
                    const message: string = 'removal not completed, try again';
    
                    return message;
                }
            });
        }
        
        const likeProductsByUserId: LikeProduct[] = await this.likeProductRepository.find({
            where: [{userId: userId}]
        });

        if (likeProductsByUserId) {
            likeProductsByUserId.forEach(async likeProductByUserId => {
                const deletedLikeProduct: DeleteResult = await this.likeProductRepository.delete(likeProductByUserId.id);
                if(!deletedLikeProduct.affected) {
                    const message: string = 'removal not completed, try again';
    
                    return message;
                }
            });
        }

        const productsByUserId: Product[] = await this.productRepository.find({
            where: [{userId: userId}]
        });

        if (productsByUserId) {
            productsByUserId.forEach(async productByUserId => {
                const deletedProduct: DeleteResult = await this.productRepository.delete(productByUserId.id);
                if(!deletedProduct.affected) {
                    const message: string = 'removal not completed, try again';
    
                    return message;
                }
            });
        }

        const deletedOrder: string | boolean = await this.orderService.deleteOrderByUser(userId);
        if (deletedOrder !== true) {
            const message: string = 'removal not completed, try again';
            
            return message;
        }

        const result: DeleteResult = await this.userRepository.delete(userId);

        return result;
    }

    public async getRandomSalt(): Promise<string> {
        const randomSalt: string = await bcrypt.genSalt(this.saltRounds);
        
        return randomSalt;
    }

    public async getHash(password: string, randomSalt: string) {
        const result: string = bcrypt.hash(password, randomSalt);

        return result;
    }
}
