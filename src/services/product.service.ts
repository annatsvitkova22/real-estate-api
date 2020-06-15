import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Product } from '../entity';
import { ProductModel } from '../models';

@Injectable()
export class ProductService {

    constructor( 
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) { }

    public async getProduct(): Promise<ProductModel[]> {
        const getProduct: ProductModel[] = await this.productRepository.find();

        return getProduct;
    }

    public async getProductById(id: string): Promise<ProductModel> {
        const product: ProductModel = await this.productRepository.findOne({
            select: ['name', 'address', 'description', 'status', 'currency', 'price'],
            where: [{ id: id }],
        });
        
        return product;
    }

    public async createProduct(createProduct: ProductModel): Promise<ProductModel> {
        const getProduct: Product = {} as Product;
        getProduct.name = createProduct.name;
        getProduct.description = createProduct.description;
        getProduct.price = createProduct.price;
        getProduct.address = createProduct.address;
        getProduct.status = createProduct.status;
        getProduct.currency = createProduct.currency;
        const product: ProductModel = await this.productRepository.save(getProduct);

        return product;
    }

    public async updateProduct(updateProduct: ProductModel): Promise<ProductModel> {
        const getProduct: ProductModel = {} as ProductModel;
        getProduct.id = updateProduct.id;
        getProduct.name = updateProduct.name;
        getProduct.description = updateProduct.description;
        getProduct.price = updateProduct.price;
        getProduct.address = updateProduct.address;
        getProduct.status = updateProduct.status;
        getProduct.currency = updateProduct.currency;
        const toUpdate: ProductModel = await this.productRepository.findOne(getProduct.id);
        delete toUpdate.name;
        delete toUpdate.description;
        delete toUpdate.price;
        delete toUpdate.address;
        delete toUpdate.status;
        delete toUpdate.currency;
        delete getProduct.id;
        const updated: ProductModel = Object.assign(toUpdate, getProduct);
        const product: ProductModel = await this.productRepository.save(updated);

        return product;
    }

    public async deleteProduct(productId: number): Promise<DeleteResult> {
        const result: DeleteResult = await this.productRepository.delete(productId);
        
        return result;
    }
}
