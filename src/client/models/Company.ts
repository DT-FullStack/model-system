import { Events, Model, ModelAttributes, RequiredAttrs, Sync } from "./Model";
import { Attributes } from './Attributes';
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Collection } from './Collection';
import { DOMEventListener } from "./views/View";
import { Form } from "./views/Form";

export interface CompanyProps {
  id?: number;
  name?: string;
  location?: string;
  mission?: string;
}
// export const Company.rootUrl: string = `/users`;

export class Company extends Model<CompanyProps>{
  formEle: Form<Company, CompanyProps>;

  constructor(
    attributes: ModelAttributes<CompanyProps>,
    events: Events,
    sync: Sync<CompanyProps>
  ) {
    super(attributes, events, sync);
    const form = document.getElementById('Form');
    if (!form) throw new Error('#Form not found');
    this.formEle = new Form<Company, CompanyProps>(form, this);
    this.on('save', () => {
      this.formEle.remove();
    })
  }


  attributeGuard: Required<CompanyProps> = {
    id: 0, name: '', location: '', mission: ''
  }
  attributeRequire: RequiredAttrs<CompanyProps> = {
    name: true, location: true
  }

  type = 'Company';
  pluralType = 'Companies';

  static get rootUrl() { return `/companies` }

  static initialize(attrs: CompanyProps): Company {
    const user = new Company(
      new Attributes<CompanyProps>(attrs),
      new Eventing(),
      new ApiSync<CompanyProps>(Company.rootUrl)
    )
    user.guardAttrs(attrs);
    user.set(attrs);
    return user;
  }
  static initializeCollection(): Collection<Company, CompanyProps> {
    return new Collection<Company, CompanyProps>(
      'Company', 'Companies',
      Company.rootUrl,
      (json: CompanyProps) => Company.initialize(json),
    )
  }

  show = (): string => {
    return `
        <div class='content'>
          <a class='ui right floated icon delete '><i class='delete red icon'></i></a>
          <a class='ui right floated icon edit'><i class='edit icon'></i></a>
          
          <h1 class='header'>${this.get('name')}</h1>
          <div>Location: ${this.get('location')}</div>
          <div>Mission: ${this.get('mission')}</div>
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
    const cards = document.querySelectorAll('.company-card');
    cards.forEach(card => card.className = card.className.split(' ').filter(str => str != 'red').join(' '));
    const card = document.getElementById(`Company${this.get('id')}`);
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
      <div class='ui header large'>Company Details</div>
      <form id='CompanyForm' class='ui form'>
        <div class='field'>
          <label>Name</label>
          <input name='name' type='text' placeholder="Company Name" value="${this.get('name') || ''}"/>
        </div>
        <div class='field'>
          <label>Location</label>
          <input name='location' type='text' placeholder="Location" value="${this.get('location') || ''}"/>
        </div>
        <div class='field'>
          <label>Mission</label>
          <input name='mission' type='text' placeholder="Mission" value="${this.get('mission') || ''}"/>
        </div>
      </form>
      <div class='ui basic segment'>
        <div class='ui buttons'>
          <button class='ui button green save'>Save Company</button>
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
