import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class usersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default:
      'https://site-storage.storage.c2.liara.space/avater_user_image/userAvatar_shopApp.webp',
  })
  avatar: string;

  @Column({ unique: false, nullable: false })
  first_name: string;

  @Column({ unique: false, nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false, nullable: false })
  password: string;

  @Column({ default: false })
  is_delete: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
