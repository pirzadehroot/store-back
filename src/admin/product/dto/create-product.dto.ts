export class CreateProductDto {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly features: FeaturesDto[];
  readonly count: number;
  readonly price: number;
  readonly meta_keyWords: string;
  readonly meta_description: string;
  readonly is_delete: boolean;
}

class FeaturesDto {
  label: string;
  value: string;
}
