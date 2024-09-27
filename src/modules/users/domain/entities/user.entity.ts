import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// import { BaseEntity }   from '../../../../@core/entities/base.entity';
import type { Comment } from '../../../comments/domain/entities/comment.entity';
import type { Post }    from '../../../posts/domain/entities/post.entity';
import { Account }      from './account.entity';
// import type { Account } from './account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column({ nullable: true })
  public tel: string;

  @OneToOne(() => Account, (account: Account) => account.owner)
  // @OneToOne('Account', (account: Account) => account.owner)
  public account: Account;

  @OneToMany('Comment', 'author')
  public comments: Comment[];

  @OneToMany('Post', 'author')
  public posts: Post[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}

// @Entity()
// export class User extends BaseEntity {
//   @Column()
//   public username: string;

//   @Column()
//   public email: string;

//   @Column({ nullable: true })
//   public tel: string;

//   // @OneToMany(() => Comment, (comment) => comment.author)
//   @OneToMany('Comment', 'author')
//   public comments: Comment[];

//   @OneToMany('Post', 'author')
//   public posts: Post[];
// }
