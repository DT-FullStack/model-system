import { CollectionView } from './CollectionView';
import { UserProps, User } from '../User';
import { Show } from './Show';
import { Model } from '../Model';

export class List<T extends Model<K>, K> extends CollectionView<T, K> {
  renderItem = (model: T, itemParent: Element): void => {
    new Show<T, K>(itemParent, model).render();
  }

}