import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../entities/products.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly product_repository: Repository<ProductEntity>,
  ) {}

  create(createShopDto: CreateShopDto) {
    return 'This action adds a new shop';
  }

  findAllProducts() {
    return this.product_repository.find();
  }

  findBySlug(slug: string) {
    return this.product_repository.findOneBy({ slug: slug });
  }

  update(id: number, updateShopDto: UpdateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
