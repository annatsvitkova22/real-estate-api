import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { ProductService } from '../services';
import { ProductModel } from '../models';

@Controller('product')
export class ProductController {

    constructor(
        private productService: ProductService,
        ) { }

    @Get(':id')
    public async getProductById(@Param() params) {
        const product = this.productService.getProductById(params.id);

        return product;
    }

    @Get()
    public async getProductAll(): Promise<ProductModel[]> {
        const products: ProductModel[] = await this.productService.getProduct();

        return products;
    }

    @Post()
    public async createProduct(@Body() product: ProductModel): Promise<ProductModel> {
        const createdProduct: ProductModel = await this.productService.createProduct(product);

        return createdProduct;
    }

    @Put()
    public async updateProduct(@Body() product: ProductModel): Promise<ProductModel> {
        const updatedProduct: ProductModel = await this.productService.updateProduct(product);

        return updatedProduct;
    }

    @Delete(':id')
    public async deleteProduct(@Param() params): Promise<DeleteResult> {
        const result: DeleteResult = await this.productService.deleteProduct(params.id);

        return result;
    }
}
