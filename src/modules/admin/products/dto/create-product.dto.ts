export class CreateProductDto {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly price: number;
  readonly description: string;
  readonly features: FeaturesDto[];
  readonly imageUrls: string[];
  readonly isDeleted: boolean;
}

class FeaturesDto {
  readonly label: string;
  readonly value: string;
}
