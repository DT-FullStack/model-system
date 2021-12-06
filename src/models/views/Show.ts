import { User, UserProps } from '../User';
import { View } from './View';
import { Model } from '../Model';

export class Show<T extends Model<K>, K> extends View<T, K>{
  template = this.model.show;
  defaultCallback(): void {

  }
  eventsMap = this.model.showEvents;
  onCreation = (): void => {
    this.model.on('save', () => { this.render() });
  }
}