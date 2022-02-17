import { Collection, CollectionItem, JsonData } from './JsonDatabase';

export default class JsonCollection {
  constructor(public name: string, private array: Collection = []) { }

  get lastItem(): CollectionItem | null { return this.array.length ? this.array[this.array.length - 1] : null; }
  get lastId(): number { return this.lastItem ? this.lastItem.id : 0; }
  get nextId(): number { return this.lastId + 1; }

  findItem(id: string | number): CollectionItem | null {
    // @ts-ignore
    return this.array.find(({ id: i }) => i == id) || null;
  }
  createItem = (data: JsonData): CollectionItem => {
    if (data.id && this.findItem(data.id)) throw new Error(`Item with ID = ${data.id} already exists`);
    console.log(this.array);
    const item = { ...data, id: this.nextId };
    this.array.push(item);
    return item;
  }
  updateItem(data: CollectionItem): CollectionItem {
    const existing = this.findItem(data.id);
    if (!existing) throw new Error(`Item with ID = ${data.id} does not exist`);
    const item = { ...existing, ...data };
    this.array.splice(this.array.indexOf(existing), 1, item);
    return item;
  }
  createOrUpdateItem(data: JsonData): CollectionItem {
    return data.id ? this.updateItem(data as CollectionItem) : this.createItem(data);
  }
  deleteItem(id: string | number): void {
    const existing = this.findItem(id);
    if (!existing) throw new Error(`Item with ID = ${id} does not exist`);
    this.array.splice(this.array.indexOf(existing), 1);
  }
  getAll(): Collection { return [...this.array] }


}