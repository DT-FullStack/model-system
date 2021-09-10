import { Model } from "./Model";
import { Attributes } from './Attributes';
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Collection } from './Collection';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

// export const User.rootUrl: string = `http://localhost:3000/users`;

export class User extends Model<UserProps>{
  static get rootUrl() { return `http://localhost:3000/users` }
  static initialize(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(User.rootUrl)
    )
  }

  static initializeCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(User.rootUrl,
      (json: UserProps) => User.initialize(json))
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
