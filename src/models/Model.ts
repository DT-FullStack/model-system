import { AxiosPromise, AxiosResponse } from 'axios';
import { DOMEventListener } from './views/View';

interface ModelAttributes<T> {
  set(attrs: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

type Callback = () => void;

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number
}

export abstract class Model<T extends HasId> {
  abstract attributeGuard: Required<T>;
  allowedAttrs(): string[] { return Object.keys(this.attributeGuard) }
  checkAttrs(update: T): void {
    const allowedAttrs = this.allowedAttrs();
    for (let attrName in update) {
      if (!allowedAttrs.includes(attrName)) delete update[attrName];
    }
  }
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) { }


  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;
  getAll = this.attributes.getAll;
  set = (update: T): void => {
    this.checkAttrs(update);
    this.attributes.set(update);
    this.trigger('change');
  }
  fetch(): void {
    const id = this.attributes.get('id');
    try {
      if (!id) {
        throw new Error('Cannot fetch with id');
      }
      this.sync.fetch(id).then((response: AxiosResponse) => {
        this.set(response.data);
      })
    } catch (error) {
      console.log(error);
    }
  }
  save() {
    this.sync.save(this.getAll())
      .then((result: AxiosResponse) => {
        console.log('save response', { result });
        this.trigger('save');
      }).catch(error => {
        this.trigger('error');
      })
  }

  show = (): string => `Show Model`;
  form = (): string => `Model Form`;
  formEvents = (): DOMEventListener[] => ([])

}