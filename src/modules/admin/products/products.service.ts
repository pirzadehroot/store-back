import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly product_repository: Repository<ProductEntity>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const { slug, categoryId } = createProductDto;

    const existingProduct = await this.product_repository.findOne({
      where: { slug },
      relations: categoryId ? ['category'] : [],
    });

    if (existingProduct) {
      throw new BadRequestException('محصول دیگری با این اسلاگ وجود دارد.');
    }

    if (categoryId) {
      const newCategory = await this.product_repository.findOneBy({
        id: categoryId,
      });
      if (!category) {
        throw new BadRequestException('دسته‌بندی موردنظر یافت نشد.');
      }
    }

    const newProduct = this.product_repository.create({
      ...createProductDto,
      category: newCategory,
    });

    return this.product_repository.save(newProduct);
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
