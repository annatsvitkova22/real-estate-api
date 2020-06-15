import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { LikeProductService } from '../services';
import { LikeProductModel } from '../models';

@Controller('like-product')
export class LikeProductController {

    constructor(
        private likeProductService: LikeProductService,
        ) { }

    @Get()
    public async getLikeProductAll(): Promise<LikeProductModel[]> {
        const likeProducts: LikeProductModel[] = await this.likeProductService.getLikeProduct();

        return likeProducts;
    }

    @Post()
    public async createLikeProduct(@Body() product: LikeProductModel): Promise<LikeProductModel> {
        const createdLikeProduct: LikeProductModel = await this.likeProductService.createLikeProduct(product);

        return createdLikeProduct;
    }

    @Delete(':id')
    public async deleteLikeProduct(@Param() params): Promise<DeleteResult> {
        const result: DeleteResult = await this.likeProductService.deleteLikeProduct(params.id);

        return result;
    }
}
