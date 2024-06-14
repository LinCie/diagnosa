import { PrimaryKey, Entity, Property, Unique } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  @Unique()
  username!: string;

  @Property()
  password!: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
