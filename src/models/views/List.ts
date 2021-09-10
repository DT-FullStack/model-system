import { CollectionView } from './CollectionView';
import { UserProps, User } from '../User';
import { Show } from './Show';

export class List extends CollectionView<User, UserProps> {
  renderItem = (model: User, itemParent: Element): void => {
    new Show(itemParent, model).render();
  }
}