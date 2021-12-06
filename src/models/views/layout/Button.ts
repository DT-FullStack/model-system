import { Callback } from '../../Eventing';

export interface ButtonAction {
  text: string;
  action: Callback;
  className?: string;
}

export class Button {
  ele: Element;
  text: string = 'button';
  action: Callback = () => { console.log('action', this.ele) };
  className: string = 'ui button';

  constructor({ text, action, className }: ButtonAction) {
    this.text = text;
    this.action = action;
    if (className) this.className = className;

    this.ele = document.createElement('div');
    this.ele.className = this.className;
    this.ele.append(this.text);
    this.ele.addEventListener('click', this.action);
    console.log(this);
  }

  static ButtonWrapper(
    className: string = 'ui buttons'
  ): Element {
    const segment = document.createElement('div');
    segment.className = 'ui header';
    const wrap = document.createElement('div');
    wrap.className = className;
    segment.append(wrap);
    return segment;
  }

  static create(props: ButtonAction): Element {
    const btn = new Button(props);
    return btn.ele;
  }
}