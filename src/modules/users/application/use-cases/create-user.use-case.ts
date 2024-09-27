import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import type { User }                                 from '../../domain/entities/user.entity';
import { UsersRepository }                           from '../../infrastructure/repositories/users.repository';
import { UserCreatedEvent }                          from '../events/user-created.event';

export class CreateUserCommand {
  public constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly tel?: string,
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase
  implements ICommandHandler<CreateUserCommand, User>
{
  public constructor(
    public readonly usersRepository: UsersRepository,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: CreateUserCommand): Promise<User> {
    const newUser = await this.usersRepository.save({
      username: command.username,
      email: command.email,
      tel: command.tel,
    });

    await this.eventBus.publish(new UserCreatedEvent(newUser.username));

    return newUser;
  }
}
