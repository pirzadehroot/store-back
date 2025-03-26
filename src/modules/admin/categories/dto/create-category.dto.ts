import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'نام دسته بندی نمی‌تواند خالی باشد.' })
  @IsString({ message: 'نام دسته بندی باید متن باشد.' })
  readonly title: string;

  @IsNotEmpty({ message: 'اسلاگ دسته بندی نمی‌تواند خالی باشد.' })
  @IsString({ message: 'اسلاگ باید متن باشد.' })
  readonly slug: string;

  @IsOptional()
  readonly parentCategoryId?: string;
}
