import { Model } from "./Model";
import { Attributes } from './Attributes';
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Collection } from './Collection';
import { DOMEventListener } from "./views/View";
import { Form } from "./views/Form";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
// export const User.rootUrl: string = `http://localhost:3000/users`;

export class User extends Model<UserProps>{
  attributeGuard: Required<UserProps> = {
    id: 0, name: '', age: 0
  }
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

  show = (): string => {
    return `
      <div>
      <h1>User Details</h1>
      <div>User Name: ${this.get('name')}</div>
      <div>User Age: ${this.get('age')}</div>
      </div>`
  }
  form = (): string => {
    return `
    <div>
      <form id='UserForm'>
      <input name='name' placeholder="Your Name" value="${this.get('name')}"/>
      <input name='butts' placeholder="nothing"/>
      </form>
      <button class='set-name'>Change Name</button>
      <button class='set-age'>Set Random Age</button>
      <button class='save'>Save User</button>
    </div>`
  }
  formEvents = (): DOMEventListener[] => {
    return [
      ['click', '.set-age', this.onSetAgeClick],
      ['click', '.set-name', null],
      ['click', '.save', this.save],
    ];
  }
  onSetAgeClick = (): void => {
    this.setRandomAge();
    console.log('button was clicked');
  }
}
