import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  isDeleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentCategoryId' })
  parentCategory: CategoryEntity;

  @OneToMany(() => ProductEntity, (product) => product.category, {
    cascade: true,
  })
  products: ProductEntity[];
}
