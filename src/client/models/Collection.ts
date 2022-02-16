import { Eventing } from './Eventing';
import axios, { AxiosResponse } from 'axios';
import { List } from './views/List';
import { Model } from './Model';
import { ButtonAction } from './views/layout/Button';
import { MenuTab } from './views/MenuTab';

export class Collection<T extends Model<K>, K> {
  models: T[] = [];
  events: Eventing = new Eventing();
  tab: Element;
  list: List<T, K>;

  constructor(
    public itemName: string,
    public collectionName: string,
    public rootUrl: string,
    public deserialize: (json: K) => T,

  ) {
    if (!collectionName) this.collectionName = this.itemName + "s";
    this.tab = this.renderTab();
    const parent = document.getElementById('Collection');
    if (!parent) throw new Error('Cannot find main-content');
    this.list = new List(parent, this);
    this.on('change', () => { this.list.render() })
    this.fetch(false);
  }

  get showing(): boolean { return this.tab.className.includes('active') }

  renderTab = (): Element => {
    const tab = new MenuTab(this.collectionName, this.tabClick).render()
    return tab;
  }

  tabClick = () => {
    if (this.tab.className.includes('active')) return;
    this.list.render();
  }

  get on() { return this.events.on }
  get trigger() { return this.events.trigger }

  add = (model: T) => {
    this.models.push(model);
    model.on('save', () => { this.list.render() });
    model.on('delete', () => { this.remove(model) });
  }

  remove = (model: T) => {
    const id = model.get('id' as keyof K);
    this.models = this.models.filter(m => m.get('id' as keyof K) != id);
    this.trigger('change');
  }

  fetch = (triggerChange: boolean = true): void => {
    axios.get(this.rootUrl)
      .then((response: AxiosResponse) => {
        response.data.forEach((value: K) => {
          const newModel = this.deserialize(value);
          this.add(newModel);
        })
        if (triggerChange) this.trigger('change');
      })
  }
}