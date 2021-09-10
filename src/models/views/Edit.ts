import { View } from './View';
import { User, UserProps } from '../User';
import { Show } from './Show';
import { Form } from './Form';

export class Edit extends View<User, UserProps>{
  regionsMap = (): { [key: string]: string } => {
    return {
      show: '.show',
      form: '.form'
    }
  }

  onRender(): void {
    new Show(this.regions.show, this.model).render();
    new Form(this.regions.form, this.model).render();
  }

  template(): string {
    return `
      <div>
        <div class='show'></div>
        <div class='form'></div>
      </div>
    `;
  }
}