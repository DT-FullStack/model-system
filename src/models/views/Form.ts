import { User, UserProps } from '../User';
import { DOMEventListener, View } from './View';
import { Model } from '../Model';
import { Callback } from '../Eventing';

export class Form<T extends Model<K>, K> extends View<T, K> {
  constructor(parent: Element, model: T) {
    super(parent, model);
    this.model.on('save', () => { this.remove() });
  }

  onCreation(): void {

  }

  get values() {
    const form = this.parent.querySelector('form');
    if (!form) throw new Error('No form found in parent');
    const entries = Object.fromEntries(new FormData(form));

    return entries;
  }

  defaultCallback = () => {
    this.updateModel();
  }

  updateModel = (): void => {
    this.model.set(this.values as unknown as K);
  }

  template = this.model.form;

  eventsMap = (): DOMEventListener[] => [
    ['change', 'input', this.updateModel],
    ...this.model.formEvents()
  ];

}