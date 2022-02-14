import { Events, Model, ModelAttributes, RequiredAttrs, Sync } from "./Model";
import { Attributes } from './Attributes';
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Collection } from './Collection';
import { DOMEventListener } from "./views/View";
import { Form } from "./views/Form";

export interface ProductProps {
  id?: number;
  name?: string;
  type?: 'software' | 'retail merchandise' | 'service' | 'food product' | '';
  cost?: number;
}
// export const Product.rootUrl: string = `/users`;

export class Product extends Model<ProductProps>{
  formEle: Form<Product, ProductProps>;

  constructor(
    attributes: ModelAttributes<ProductProps>,
    events: Events,
    sync: Sync<ProductProps>
  ) {
    super(attributes, events, sync);
    const form = document.getElementById('Form');
    if (!form) throw new Error('#Form not found');
    this.formEle = new Form<Product, ProductProps>(form, this);
    this.on('save', () => {
      this.formEle.remove();
    })
  }


  attributeGuard: Required<ProductProps> = {
    id: 0, name: '', type: '', cost: 0
  }
  attributeRequire: RequiredAttrs<ProductProps> = {
    name: true, cost: true
  }

  type = 'Product';
  pluralType = 'Products';

  static get rootUrl() { return `https://model-system.herokuapp.com:3000/products` }

  static initialize(attrs: ProductProps): Product {
    const user = new Product(
      new Attributes<ProductProps>(attrs),
      new Eventing(),
      new ApiSync<ProductProps>(Product.rootUrl)
    )
    user.guardAttrs(attrs);
    user.set(attrs);
    return user;
  }
  static initializeCollection(): Collection<Product, ProductProps> {
    return new Collection<Product, ProductProps>(
      'Product', 'Products',
      Product.rootUrl,
      (json: ProductProps) => Product.initialize(json),
    )
  }

  show = (): string => {
    return `
        <div class='content'>
          <a class='ui right floated icon delete '><i class='delete red icon'></i></a>
          <a class='ui right floated icon edit'><i class='edit icon'></i></a>
          
          <h1 class='header'>${this.get('name')}</h1>
          <div>Type: ${this.get('type')}</div>
          <div>Cost: ${this.get('cost')}</div>
        </div>
      `
  }
  showEvents = (): DOMEventListener[] => {
    return [
      ['click', '.ui.edit.icon', this.edit],
      ['click', '.ui.delete.icon', this.delete]
    ];
  }

  edit = () => {
    this.formEle.render();
    const cards = document.querySelectorAll('.user-card');
    cards.forEach(card => card.className = card.className.split(' ').filter(str => str != 'red').join(' '));
    const card = document.getElementById(`Product${this.get('id')}`);
    console.log(this.get('id'), card);
    if (card) card.className += ' red';
  }
  cancelEdit = () => {
    this.formEle.remove();
    const cards = document.querySelectorAll('.user-card');
    cards.forEach(card => card.className = card.className.split(' ').filter(str => str != 'red').join(' '));
  }

  form = (): string => {
    return `
    <div>
      <div class='ui header large'>Product Details</div>
      <form id='ProductForm' class='ui form'>
        <div class='field'>
          <label>Name</label>
          <input name='name' type='text' placeholder="Product Name" value="${this.get('name') || ''}"/>
        </div>
        <div class='field'>
          <label>Product Type</label>
          ${['software', 'retail merchandise', 'service', 'food product'].map(t => `
            <div class='ui radio checkbox'>
              <input name='type' type='radio' placeholder="Type" value="${t}" ${this.get('type') === t && 'checked'}/>
              <label for='type'>${t}</label>
            </div>
          `).join('')}
        </div>
        <div class='field'>
          <label>Cost</label>
          <input name='cost' type='number' placeholder="Cost" value="${this.get('cost') || ''}"/>
        </div>
      </form>
      <div class='ui basic segment'>
        <div class='ui buttons'>
          <button class='ui button green save'>Save Product</button>
          <button class='ui button  cancel'>Cancel</button>
        </div>
      </div>
    </div>`
  }
  formEvents = (): DOMEventListener[] => {
    return [
      ['click', '.save', this.save],
      ['click', '.cancel', this.cancelEdit]

    ];
  }
}
