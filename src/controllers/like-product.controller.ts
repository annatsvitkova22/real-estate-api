import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

import { LikeProductService } from '../services';
import { LikeProductModel } from '../models';
import { Roles } from '../common';

@Controller('likeProduct')
export class LikeProductController {

    constructor(
        private likeProductService: LikeProductService,
        ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @Roles('user')
    public async getLikeProductAll(): Promise<LikeProductModel[]> {
        const likeProducts: LikeProductModel[] = await this.likeProductService.getLikeProduct();

        return likeProducts;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @Roles('user')
    public async createLikeProduct(@Body() product: LikeProductModel): Promise<LikeProductModel> {
        const createdLikeProduct: LikeProductModel = await this.likeProductService.createLikeProduct(product);

        return createdLikeProduct;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Roles('user')
    public async deleteLikeProduct(@Param() params): Promise<DeleteResult> {
        const result: DeleteResult = await this.likeProductService.deleteLikeProduct(params.id);

        return result;
    }
}
