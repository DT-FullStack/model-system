import { User, UserProps } from '../User';
import { View } from './View';

export class Show extends View<User, UserProps>{
  template(): string {
    return `
      <div>
      <h1>User Details</h1>
      <div>User Name: ${this.model.get('name')}</div>
      <div>User Age: ${this.model.get('age')}</div>
      </div>
    `;
  }
}