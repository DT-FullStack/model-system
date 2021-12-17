
import { DOMEventListener, View } from './View';
import { Model } from '../Model';
import { DataObj } from '../Eventing';

export class Form<T extends Model<K>, K> extends View<T, K> {
  static removeForm() {
    const form = document.getElementById('Form');
    if (form) form.innerHTML = '';
  }
  showErrors = ({ attrs }: DataObj = {}): void => {
    console.log('ShowErrors', attrs);
    for (let name of attrs) {

      const input = this.parent.querySelector(`[name=${name}]`)
      console.log(input, name);
      if (input && input.parentElement) this.addClass('error')(input.parentElement);
    }
  }
  clearErrors = () => {
    this.parent.querySelectorAll('.field').forEach(this.removeClass('error'));
  }

  constructor(parent: Element, model: T) {
    super(parent, model);
    this.model.on('save', () => { this.remove() });
    this.model.on('error', this.showErrors)
  }

  get values(): K {
    const form = this.parent.querySelector('form');
    if (!form) throw new Error('No form found in parent');
    const entries = Object.fromEntries(new FormData(form));

    return entries as unknown as K;
  }

  defaultCallback = () => {
    this.updateModel();
  }

  updateModel = (): void => {
    this.model.set(this.values);
  }

  template = this.model.form;

  eventsMap = (): DOMEventListener[] => [
    ['change', 'input', this.updateModel],
    ['click', '.save', this.clearErrors],
    ...this.model.formEvents()
  ];

}