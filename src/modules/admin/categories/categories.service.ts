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

    if (existingCategory) {
      throw new BadRequestException('دسته بندی دیگری با این اسلاگ وجود دارد.');
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);

    if (createCategoryDto.parentCategoryId) {
      const parentCategory = await this.categoryRepository.findOneBy({
        id: createCategoryDto.parentCategoryId,
        isDeleted: false,
      });

      if (!parentCategory) {
        newCategory.parentCategory = null;
      } else {
        newCategory.parentCategory = parentCategory;
      }
    }

    return await this.categoryRepository.save(newCategory);
  }

  async getCategoryWithChildren(
    category: CategoryEntity,
  ): Promise<CategoryEntity> {
    const children = await this.categoryRepository.find({
      where: {
        parentCategory: { id: category.id },
        isDeleted: false,
      },
      relations: ['parentCategory'],
    });

    category.subcategories = await Promise.all(
      children.map((child) => this.getCategoryWithChildren(child)),
    );

    return category;
  }

  async findAllCategoryRecursive(): Promise<CategoryEntity[]> {
    const rootCategories = await this.categoryRepository.find({
      where: {
        isDeleted: false,
        parentCategory: [],
      },
      relations: ['parentCategory'],
    });

    return await Promise.all(
      rootCategories.map((cat) => this.getCategoryWithChildren(cat)),
    );
  }

  async findOneCategory(id: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
    });
    if (!category) throw new NotFoundException('دسته بندی یافت نشد.');

    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    console.log('hello--------------------------');
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('دسته بندی یافت نشد.');

    const existingCategoryWithSlug = await this.categoryRepository.findOneBy({
      slug: updateCategoryDto.slug,
    });

    if (existingCategoryWithSlug && existingCategoryWithSlug.id !== id) {
      throw new BadRequestException('دسته بندی دیگری با این اسلاگ وجود دارد.');
    }

    const updateData = {
      ...updateCategoryDto,
      parentCategory: updateCategoryDto.parentCategoryId
        ? await this.categoryRepository.findOneBy({
            id: updateCategoryDto.parentCategoryId,
          })
        : null,
    };

    await this.categoryRepository.update(id, updateData);
    return this.categoryRepository.findOneBy({ id });
  }

  async isShowing(id: string) {
    const findCategory = await this.categoryRepository.findOneBy({ id });
    await this.categoryRepository.update(id, {
      isShowing: !findCategory?.isShowing,
    });
  }

  async removeCategory(id: string) {
    await this.categoryRepository.update(id, { isDeleted: true });
  }
}
