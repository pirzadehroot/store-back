import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { productsEntity } from '../../../entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(productsEntity)
    private readonly product_repository: Repository<productsEntity>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const existingProduct = await this.product_repository.findOneBy({
      slug: createProductDto.slug,
    });

    if (existingProduct) {
      throw new Error('محصول دیگری با این اسلاگ وجود دارد.');
    }

    const newProduct = this.product_repository.create(createProductDto);
    return await this.product_repository.save(newProduct);
  }

  async findAllProducts() {
    return await this.product_repository.find();
  }

  async findOneProduct(id: string) {
    return await this.product_repository.findOneBy({ id });
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    await this.product_repository.update(id, updateProductDto);
    return this.product_repository.findOneBy({ id });
  }

  async removeProduct(id: string) {
    await this.product_repository.update(id, { isDeleted: true });
  }
}
