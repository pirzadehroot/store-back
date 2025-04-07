import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { CategoryEntity } from '../../../entities/categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { randomInt } from 'crypto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: TreeRepository<CategoryEntity>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOneBy({
      slug: createCategoryDto.slug,
    });

    if (existingCategory)
      throw new BadRequestException('دسته بندی دیگری با این اسلاگ وجود دارد.');

    const newCategory = this.categoryRepository.create(createCategoryDto);
    if (createCategoryDto.parentCategoryId) {
      newCategory.parentCategory = await this.categoryRepository.findOneBy({
        id: createCategoryDto.parentCategoryId,
      });
      if (!newCategory.parentCategory)
        throw new NotFoundException('دسته بندی والد یافت نشد.');
    }

    return await this.categoryRepository.save(newCategory);
  }

  async findAllCategory() {
    return await this.categoryRepository.findTrees();
  }

  async findOneCategory(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['parentCategory', 'products'],
    });

    if (!category) throw new NotFoundException('دسته بندی یافت نشد.');

    const subcategoriesTree =
      await this.categoryRepository.findDescendantsTree(category);
    return {
      ...category,
      subcategories: subcategoriesTree.subcategories,
    };
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('دسته بندی یافت نشد.');
    }

    if (updateCategoryDto.slug && updateCategoryDto.slug !== category.slug) {
      const existingCategory = await this.categoryRepository.findOneBy({
        slug: updateCategoryDto.slug,
      });
      if (existingCategory)
        throw new BadRequestException(
          'دسته بندی دیگری با این اسلاگ وجود دارد.',
        );
    }

    if (updateCategoryDto.parentCategoryId) {
      const newParent = await this.categoryRepository.findOneBy({
        id: updateCategoryDto.parentCategoryId,
      });
      if (!newParent) {
        throw new NotFoundException('دسته بندی والد جدید یافت نشد.');
      }
      category.parentCategory = newParent;
    } else if (updateCategoryDto.parentCategoryId === null) {
      category.parentCategory = null;
    }

    Object.assign(category, updateCategoryDto);

    return await this.categoryRepository.save(category);
  }

  async removeCategory(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('دسته بندی یافت نشد.');
    }

    const descendants = await this.categoryRepository.findDescendants(category);

    for (const descendant of descendants) {
      await this.categoryRepository.update(descendant.id, {
        isDeleted: true,
        isShowing: false,
        slug: `${descendant.slug}-${randomInt(1000000000, 9999999999)}`,
      });
    }

    await this.categoryRepository.update(id, {
      isDeleted: true,
      isShowing: false,
      slug: `${category.slug}-${randomInt(1000000000, 9999999999)}`,
    });
  }

  async findRootCategories() {
    return await this.categoryRepository.findRoots();
  }

  async getCategoryTree(id: string) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('دسته بندی یافت نشد.');
    }
    return await this.categoryRepository.findDescendantsTree(category);
  }
}
