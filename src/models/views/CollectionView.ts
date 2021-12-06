import { Collection } from '../Collection';
import { Model } from '../Model';
import { Callback } from '../Eventing';
import { Button, ButtonAction } from './layout/Button';

export abstract class CollectionView<T extends Model<K>, K> {
  actions: ButtonAction[] = [
    {
      text: `New ${this.collection.itemName}`, action: () => {
        const model = this.collection.deserialize({} as K);
        model.edit();
        model.on('save', () => {
          this.collection.add(model);
          this.render();
        })
      }, className: 'ui primary button'
    }
  ];

  constructor(
    public parent: Element,
    public collection: Collection<T, K>
  ) {
  }

  abstract renderItem(model: T, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');

    const buttons = Button.ButtonWrapper();
    buttons.append(...this.actions.map(button => Button.create(button)))

    const collectionElement = document.createElement('div');
    collectionElement.className = 'ui cards';
    templateElement.content.append(buttons, collectionElement);

    for (let model of this.collection.models) {
      const itemParent = document.createElement('div');
      itemParent.className = `ui card ${this.collection.itemName.toLowerCase()}-card`;
      itemParent.id = `${this.collection.itemName}${model.get('id' as keyof K)}`
      this.renderItem(model, itemParent);
      collectionElement.append(itemParent);
    }

    this.parent.append(templateElement.content);
  }

  remove(): void {
    this.parent.innerHTML = "";
  }
}