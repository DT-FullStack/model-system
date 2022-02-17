import { AxiosPromise, AxiosResponse } from 'axios';
import { DOMEventListener, View } from './views/View';
import { Form } from './views/Form';

export interface ModelAttributes<T> {
  set(attrs: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

export type RequiredAttrs<T> = {
  [P in keyof T]: boolean
}

export interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
  delete(id: number): AxiosPromise;
}

type Callback = () => void;

export interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string, ...data: any[]): void;
}

interface HasId {
  id?: number
}

export abstract class Model<T extends HasId> {
  abstract attributeGuard: Required<T>;
  abstract attributeRequire: RequiredAttrs<T>;
  abstract type: string;
  abstract pluralType: string;

  get allowedAttrs(): string[] { return Object.keys(this.attributeGuard) }
  guardAttrs(update: T): void {
    const allowedAttrs = this.allowedAttrs;
    for (let attrName in update) {
      if (!allowedAttrs.includes(attrName)) delete update[attrName];
    }
  }

  get requiredAttrs(): string[] { return Object.keys(this.attributeRequire) }
  checkRequired(update: T): string[] {
    const errors: string[] = [], required = this.requiredAttrs;
    for (let attrName of required) {
      const val = update[attrName];
      if (val === undefined || val === null || val === '') errors.push(attrName);
    }
    return errors;
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
    this.guardAttrs(update);
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
  save = async () => {
    const attrs = this.getAll();
    const check = this.checkRequired(attrs);

    if (check.length) {
      this.trigger('error', { attrs: check });
      return;
    }
    try {
      const result = await this.sync.save(attrs);
      console.log(result);
      if (!this.get('id')) {
        const { id } = result.data;
        this.set({ id } as T);
        console.log('no id', this.get('id'), this);
      }
      this.trigger('save');
    } catch (error) {
      this.trigger('error');
    }

  }
  delete = () => {
    if (!confirm(`Delete ${this.get('name' as keyof T) || this.type}?`)) return;
    this.sync.delete(Number(this.get('id')))
      .then((result: AxiosResponse) => {
        console.log('delete response', { result });
        this.trigger('delete');
      }).catch(error => { this.trigger('error') })
  }

  show = (): string => `Show Model`;
  form = (): string => `Model Form`;

  abstract edit(): void;
  abstract formEvents(): DOMEventListener[];
  abstract showEvents(): DOMEventListener[];
}