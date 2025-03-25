import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../../../entities/categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOneBy({
      slug: createCategoryDto.slug,
    });

    if (existingCategory)
      throw new BadRequestException('دسته بندی دیگری با این اسلاگ وجود دارد.');

    const newCategory = this.categoryRepository.create(createCategoryDto);
    if (createCategoryDto.parentCategoryId) {
      const findParentCategory = await this.categoryRepository.findOneBy({
        id: createCategoryDto.parentCategoryId,
      });
      if (findParentCategory) newCategory.parentCategory = findParentCategory;
    }

    return await this.categoryRepository.save(newCategory);
  }

  async findAllCategory() {
    return await this.categoryRepository.find({
      where: { isDeleted: false },
    });
  }

  async findOneCategory(id: string) {
    const category = await this.categoryRepository.findOneBy({
      id,
      isDeleted: false,
    });
    if (!category) throw new NotFoundException('دسته بندی یافت نشد.');

    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('دسته بندی یافت نشد.');

    const existingCategoryWithSlug = await this.categoryRepository.findOneBy({
      slug: updateCategoryDto.slug,
    });

    if (existingCategoryWithSlug && existingCategoryWithSlug.id !== id) {
      throw new BadRequestException('دسته بندی دیگری با این اسلاگ وجود دارد.');
    }

    const updatedCategory = {
      ...updateCategoryDto,
      parentCategory: await this.categoryRepository.findOneBy({
        id: updateCategoryDto.parentCategoryId,
      }),
    };

    await this.categoryRepository.update(
      id,
      updatedCategory as UpdateCategoryDto,
    );
  }

  async removeCategory(id: string) {
    await this.categoryRepository.update(id, { isDeleted: true });
  }
}
