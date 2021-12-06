import { Callback, Eventing } from '../Eventing';
import { Model } from '../Model';

//**  */
export type DOMEventListener = [eventType: string, selector: string, callback: Callback | null];

export abstract class View<T extends Model<K>, K> {
  events: Eventing = new Eventing();
  regions: { [key: string]: Element } = {};

  constructor(
    public parent: Element,
    public model: T
  ) {
    this.bindModel();
  }

  abstract template(): string;
  abstract defaultCallback(): void
  abstract onCreation(): void;

  regionsMap = (): { [key: string]: string } => {
    return {}
  };

  eventsMap = (): DOMEventListener[] => ([])
  on = this.events.on;
  trigger = this.events.trigger;

  bindModel() {
    this.model.on('save', () => this.render());
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let DOMEventTuple of eventsMap) {
      let [eventType, selector, callback] = DOMEventTuple;
      fragment.querySelectorAll(selector)
        .forEach(element => {
          callback
            ? element.addEventListener(eventType, callback)
            : element.addEventListener(eventType, this.defaultCallback)
        })
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (const key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) this.regions[key] = element;
    }
  }

  onRender(): void { }

  content?: DocumentFragment;

  render(): void {
    this.parent.innerHTML = "";
    if (this.content) this.content.replaceChildren('');
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(this.content = templateElement.content);
  }

  remove = (): void => {
    this.parent.innerHTML = "";
    if (this.content) this.content.replaceChildren('');
  }

  // hide(): void{
  //   this.parent.childNodes.forEach(child => child.hide())
  // }
}