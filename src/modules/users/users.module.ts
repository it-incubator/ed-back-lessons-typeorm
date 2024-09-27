import { Module }        from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User }          from 'src/modules/users/domain/entities/user.entity';
import { Account }       from './domain/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account])],
  controllers: [],
  providers: [],
})
export class UsersModule {}
