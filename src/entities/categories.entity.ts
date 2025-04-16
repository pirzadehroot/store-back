import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ProductEntity } from './products.entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ unique: true, nullable: false })
  slug: string;

  @Column({ default: false })
  isShowing: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => CategoryEntity, (category) => category.parentCategory)
  subcategories: CategoryEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.subcategories, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parentCategoryId' })
  parentCategory: CategoryEntity | null;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
