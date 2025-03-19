import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { categoriesEntity } from '../../../entities/categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(categoriesEntity)
    private readonly category_repository: Repository<categoriesEntity>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.category_repository.findOneBy({
      slug: createCategoryDto.slug,
    });

    if (existingCategory) {
      throw new Error('دسته بندی دیگری با این اسلاگ وجود دارد.');
    }

    const newCategory = this.category_repository.create(createCategoryDto);
    return await this.category_repository.save(newCategory);
  }

  async findAllCategory() {
    return await this.category_repository.find();
  }

  async findOneCategory(id: string) {
    return await this.category_repository.findOneBy({ id });
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.category_repository.findOneBy({
      slug: updateCategoryDto.slug,
    });
    if (existingCategory) {
      throw new Error('دسته بندی دیگری با این اسلاگ وجود دارد.');
    }
    await this.category_repository.update(id, updateCategoryDto);
    return this.category_repository.findOneBy({ id });
  }

  async removeCategory(id: string) {
    await this.category_repository.update(id, { isDeleted: true });
  }
}
