import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateRequestContext, EntityManager } from '@mikro-orm/sqlite';
import { SignUpBody } from './app.interface';
import { User } from './entities/User.entity';

@Injectable()
export class AppService {
  constructor(private readonly em: EntityManager) {}

  @CreateRequestContext()
  async signUp({ username, password }: SignUpBody) {
    if (!username || !password) {
      throw new BadRequestException(
        'Tolong berikan username atau password yang lengkap',
      );
    }

    const user = new User(username, password);

    await this.em.persistAndFlush(user);

    return { username };
  }

  async logIn({ username, password }: SignUpBody) {
    if (!username || !password) {
      throw new BadRequestException(
        'Tolong berikan username atau password yang lengkap',
      );
    }

    const user = await this.em.findOne(User, { username: username });

    if (!user) {
      throw new NotFoundException('User tidak ada');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Password salah');
    }

    return { username };
  }
}
