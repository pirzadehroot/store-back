import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  readonly id: string;

  @IsNotEmpty({ message: 'نام محصول نمی‌تواند خالی باشد.' })
  readonly title: string;

  @IsNotEmpty({ message: 'اسلاگ محصول نمی‌تواند خالی باشد.' })
  readonly slug: string;

  @IsNumber({}, { message: 'قیمت محصول باید یک عدد باشد.' })
  readonly price: number;

  @IsString({ message: 'توضیحات محصول باید یک رشته باشد.' })
  readonly description: string;

  @IsString({ message: 'عکس محصول انتخاب نشده است..' })
  readonly imageUrl: string;

  readonly isDeleted: boolean = false;
}
