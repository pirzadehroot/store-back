import {
  Column,
  CreateDateColumn,
  Entity,
  Tree,
  TreeChildren,
  TreeParent,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from './products.entity';

@Entity('categories')
@Tree('nested-set')
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

  @TreeChildren()
  subcategories: CategoryEntity[];

  @TreeParent({ onDelete: 'SET NULL' })
  parentCategory: CategoryEntity | null;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
