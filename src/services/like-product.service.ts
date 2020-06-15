import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { LikeProduct } from '../entity';
import { LikeProductModel } from '../models';

@Injectable()
export class LikeProductService {

    constructor( 
        @InjectRepository(LikeProduct) private likeProductRepository: Repository<LikeProduct>
    ) { }

    public async getLikeProduct(): Promise<LikeProductModel[]> {
        const getLikeProducts: LikeProductModel[] = await this.likeProductRepository.find();

        return getLikeProducts;
    }

    public async createLikeProduct(createLikeProduct: LikeProductModel): Promise<LikeProductModel> {
        const getLikeProduct: LikeProduct = {} as LikeProduct;
        getLikeProduct.userId = createLikeProduct.userId;
        getLikeProduct.productId = createLikeProduct.productId;
        const product: LikeProductModel = await this.likeProductRepository.save(getLikeProduct);

        return product;
    }

    public async deleteLikeProduct(likeProductId: string): Promise<DeleteResult> {
        const result: DeleteResult = await this.likeProductRepository.delete(likeProductId);
        
        return result;
    }
}
