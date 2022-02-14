import { Events, Model, ModelAttributes, RequiredAttrs, Sync } from "./Model";
import { Attributes } from './Attributes';
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Collection } from './Collection';
import { DOMEventListener } from "./views/View";
import { Form } from "./views/Form";
import { Button, ButtonAction } from './views/layout/Button';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
// export const User.rootUrl: string = `/users`;

export class User extends Model<UserProps>{
  formEle: Form<User, UserProps>;

  constructor(
    attributes: ModelAttributes<UserProps>,
    events: Events,
    sync: Sync<UserProps>
  ) {
    super(attributes, events, sync);
    const form = document.getElementById('Form');
    if (!form) throw new Error('#Form not found');
    this.formEle = new Form<User, UserProps>(form, this);
    this.on('save', () => {
      this.formEle.remove();
    })
  }


  attributeGuard: Required<UserProps> = {
    id: 0, name: '', age: 0
  }
  attributeRequire: RequiredAttrs<UserProps> = {
    age: true, name: true,
  }

  type = 'User';
  pluralType = 'Users';

  static get rootUrl() { return `https://model-system.herokuapp.com:3000/users` }

  static initialize(attrs: UserProps): User {
    const user = new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(User.rootUrl)
    )
    user.guardAttrs(attrs);
    user.set(attrs);
    return user;
  }
  static initializeCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      'User', 'Users',
      User.rootUrl,
      (json: UserProps) => User.initialize(json),
    )
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }

  show = (): string => {
    return `
        <div class='content'>
          <a class='ui right floated icon delete '><i class='delete red icon'></i></a>
          <a class='ui right floated icon edit'><i class='edit icon'></i></a>
          
          <h1 class='header'>${this.get('name')}</h1>
          <div>Age: ${this.get('age')}</div>
        </div>
      `
  }
  showEvents = (): DOMEventListener[] => {
    return [
      ['click', '.ui.edit.icon', this.edit],
      ['click', '.ui.delete.icon', this.delete]
    ];
  }

  edit = () => {
    this.formEle.render();
    const cards = document.querySelectorAll('.user-card');
    cards.forEach(card => card.className = card.className.split(' ').filter(str => str != 'red').join(' '));
    const card = document.getElementById(`User${this.get('id')}`);
    console.log(this.get('id'), card);
    if (card) card.className += ' red';
  }
  cancelEdit = () => {
    this.formEle.remove();
    const cards = document.querySelectorAll('.user-card');
    cards.forEach(card => card.className = card.className.split(' ').filter(str => str != 'red').join(' '));
  }

  form = (): string => {
    return `
    <div>
      <div class='ui header large'>User Details</div>
      <form id='UserForm' class='ui equal width form'>
        <div class='field'>
          <label>Name</label>
          <input name='name' type='text' placeholder="User Name" value="${this.get('name') || ''}"/>
        </div>
        <div class='four wide field'>
          <label>Age</label>
          <input name='age' type='number' placeholder="Age" value="${this.get('age')}"/>
        </div>
      </form>
      <div class='ui basic segment'>
        <div class='ui buttons'>
          <button class='ui button green save'>Save User</button>
          <button class='ui button  cancel'>Cancel</button>
        </div>
      </div>
    </div>`
  }
  formEvents = (): DOMEventListener[] => {
    return [
      ['click', '.save', this.save],
      ['click', '.cancel', this.cancelEdit]

    ];
  }
  onSetAgeClick = (): void => {
    this.setRandomAge();
  }
}
