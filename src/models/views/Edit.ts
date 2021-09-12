import { View } from './View';
import { User, UserProps } from '../User';
import { Show } from './Show';
import { Form } from './Form';
import { Model } from '../Model';

export class Edit<T extends Model<K>, K> extends View<T, K>{
  regionsMap = (): { [key: string]: string } => {
    return {
      show: '.show',
      form: '.form'
    }
  }

  onRender(): void {
    new Show<T, K>(this.regions.show, this.model).render();
    new Form<T, K>(this.regions.form, this.model).render();
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