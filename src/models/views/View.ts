import { Model } from '../Model';


export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(
    public parent: Element,
    public model: T
  ) {
    this.bindModel();
  }

  abstract template(): string;

  regionsMap = (): { [key: string]: string } => {
    return {}
  };

  eventsMap = (): {
    [key: string]: EventListenerOrEventListenerObject
  } => { return {} }

  bindModel() {
    this.model.on('change', () => this.render());
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let eventKey in eventsMap) {
      const [event, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector)
        .forEach(element => element.addEventListener(event, eventsMap[eventKey]))
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

}