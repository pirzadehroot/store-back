import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class productEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @Column({ unique: true, nullable: false })
  slug: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  description: string;

  @Column('jsonb', { nullable: false })
  features: { label: string; value: string }[];

  @Column('jsonb', { nullable: false })
  imageUrls: string[];

  @Column({ default: false })
  isDeleted: boolean;
}
