import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity }                           from '../../../../@core/entities/base.entity';
import { User }                                 from './user.entity';

enum AccountPlan {
  Free,
  Paid,
}

@Entity()
export class Account extends BaseEntity {
  @Column('enum', { enum: AccountPlan, default: AccountPlan.Free })
  public plan: AccountPlan;

  @OneToOne(() => User, (user: User) => user.account)
  @JoinColumn()
  public owner: User;
}
