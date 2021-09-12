import { User, UserProps } from '../User';
import { View } from './View';
import { Model } from '../Model';
import { Callback } from '../Eventing';

export class Form<T extends Model<K>, K> extends View<T, K> {
  get values() {
    const form = this.parent.querySelector('form');
    if (!form) throw new Error('No form found in parent');
    const entries = Object.fromEntries(new FormData(form));
    return entries;
  }

  defaultCallback = () => {
    console.log(this.values);
    this.updateModel();
  }

  updateModel(): void {
    this.model.set(this.values as unknown as K);
  }

  template = this.model.form;

  eventsMap = this.model.formEvents;

  passInputValue() {

  }

  // refreshTemplate(): void{

  // }

}