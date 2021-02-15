import { Query, Mutation, Resolver, Args, Int } from '@nestjs/graphql';

import { Roles, AuthGuard } from '../common';
import { UseGuards, Inject, forwardRef } from '@nestjs/common';
import { UserService, ProductService } from '../services';
import { CreateUser } from 'src/inputType/create-user.inputType';
import { UserModel, ProductModel } from 'src/models';
import { PaginationModel } from 'src/models/pagination.model';

@Resolver() 
export class MessagesResolver {
    constructor(
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        @Inject(forwardRef(() => ProductService)) private productService: ProductService,
    ) {}
    
    messagesThstReallyShouldBeInADB = [
        { id: 0, description: 'the test test'},
        { id: 1, description: 'tfsdfsdfds'},
    ]

    @Query()
    // @Roles('user')
    getMessages(@Args('id', { type: () => Int }) id: number) {
        return this.messagesThstReallyShouldBeInADB.filter(mes => mes.id == id);
    }

    @Query()
    // @UseGuards(AuthGuard)
    async users(): Promise<UserModel[]> {
        return await this.userService.getUsersGraph();
    }

    @Query()
    async product(@Args('id', { type: () => String }) id: string): Promise<ProductModel> {
        return await this.productService.getProductByIdGraph(id);
    }

    @Query()
    async products(): Promise<ProductModel[]> {
        return await this.productService.getProducts();
    }

    @Query()
    async getProductsByPagination(@Args() {take, skip}: PaginationModel): Promise<ProductModel[]> {
        return await this.productService.getProductsByPagination(take, skip);
    }

    @Mutation()
    async createUser(@Args('createUser', { type: () => CreateUser } ) createUser: CreateUser): Promise<UserModel> {
        return await this.userService.singUp(createUser);
    }

    @Mutation()
    async deleteProduct(@Args('id', { type: () => String } ) id: string): Promise<boolean> {
        return await this.productService.deleteProductById(id);
    }
}
