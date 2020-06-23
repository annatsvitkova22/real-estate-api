import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { ProductService } from '../services';
import { ProductModel } from '../models';
import { Roles } from '../common';

@ApiTags('Product')
@Controller('product')
export class ProductController {

    constructor(
        private productService: ProductService,
        ) { }

    @Get(':id')
    @ApiParam({ name: 'id'})
    public async getProductById(@Param() params): Promise<ProductModel> {
        const product: ProductModel = await this.productService.getProductById(params.id);

        return product;
    }

    @Get()
    public async getProductAll(): Promise<ProductModel[]> {
        const products: ProductModel[] = await this.productService.getProduct();

        return products;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @Roles('admin')
    @ApiBearerAuth('access-token')
    public async createProduct(@Body() product: ProductModel): Promise<ProductModel> {
        const createdProduct: ProductModel = await this.productService.createProduct(product);

        return createdProduct;
    }


    @UseGuards(AuthGuard('jwt'))
    @Put()
    @Roles('admin')
    @ApiBearerAuth('access-token')
    public async updateProduct(@Body() product: ProductModel): Promise<ProductModel> {
        const updatedProduct: ProductModel = await this.productService.updateProduct(product);

        return updatedProduct;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Roles('admin')
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id'})
    public async deleteProduct(@Param() params): Promise<DeleteResult | string> {
        const result: DeleteResult | string = await this.productService.deleteProduct(params.id);

        return result;
    }
}
