import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('admin/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoriesService.findAllCategoryRecursive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOneCategory(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Patch('setMode/:id')
  setMode(@Param('id') id: string) {
    return this.categoriesService.isShowing(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.removeCategory(id);
  }
}
