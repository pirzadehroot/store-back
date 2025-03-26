import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class FeaturesDto {
  @IsNotEmpty({ message: 'برچسب ویژگی نمی‌تواند خالی باشد.' })
  readonly label: string;

  @IsNotEmpty({ message: 'مقدار ویژگی نمی‌تواند خالی باشد.' })
  readonly value: string;
}

export class CreateProductDto {
  readonly id: string;

  @IsNotEmpty({ message: 'نام محصول نمی‌تواند خالی باشد.' })
  readonly title: string;

  @IsNotEmpty({ message: 'اسلاگ محصول نمی‌تواند خالی باشد.' })
  readonly slug: string;

  @IsNumber({}, { message: 'قیمت محصول باید یک عدد باشد.' })
  readonly price: number;

  @IsString({ message: 'توضیحات محصول باید یک رشته باشد.' })
  readonly description: string;

  @IsArray({ message: 'ویژگی‌ها باید به صورت آرایه باشند.' })
  @ValidateNested({ each: true })
  @Type(() => FeaturesDto)
  readonly features: FeaturesDto[];

  @IsString({ message: 'عکس محصول انتخاب نشده است..' })
  readonly imageUrl: string;

  @IsNotEmpty({ message: 'دسته بندی محصول باید انتخاب شود.' })
  readonly categoryId: string;

  readonly isDeleted: boolean = false;
}
