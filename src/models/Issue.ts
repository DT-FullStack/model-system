import { Events, Model, ModelAttributes, RequiredAttrs, Sync } from "./Model";
import { Attributes } from './Attributes';
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Collection } from './Collection';
import { DOMEventListener } from "./views/View";
import { Form } from "./views/Form";
import { Button, ButtonAction } from './views/layout/Button';

export interface IssueProps {
  id?: number;
  title?: string;
  description?: string;
  resolved?: boolean;
}
// export const Issue.rootUrl: string = `/issues`;

export class Issue extends Model<IssueProps>{
  formEle: Form<Issue, IssueProps>;

  constructor(
    attributes: ModelAttributes<IssueProps>,
    events: Events,
    sync: Sync<IssueProps>
  ) {
    super(attributes, events, sync);
    const form = document.getElementById('Form');
    if (!form) throw new Error('#Form not found');
    this.formEle = new Form<Issue, IssueProps>(form, this);
    this.on('save', () => {
      this.formEle.remove();
    })
  }


  attributeGuard: Required<IssueProps> = {
    id: 0, title: '', description: '', resolved: false
  }
  attributeRequire: RequiredAttrs<IssueProps> = {
    title: true, description: true
  }


  type = 'Issue';
  pluralType = 'Issues';

  static get rootUrl() { return `https://model-system.herokuapp.com:3000/issues` }

  static initialize(attrs: IssueProps): Issue {
    const issue = new Issue(
      new Attributes<IssueProps>(attrs),
      new Eventing(),
      new ApiSync<IssueProps>(Issue.rootUrl)
    )
    issue.guardAttrs(attrs);
    issue.set(attrs);
    return issue;
  }
  static initializeCollection(): Collection<Issue, IssueProps> {
    return new Collection<Issue, IssueProps>(
      'Issue', 'Issues',
      Issue.rootUrl,
      (json: IssueProps) => Issue.initialize(json),
    )
  }

  show = (): string => {
    return `
        <div class='content'>
          <a class='ui right floated icon delete '><i class='delete red icon'></i></a>
          <a class='ui right floated icon edit'><i class='edit icon'></i></a>
          
          <h1 class='header'>${this.get('title')}</h1>
          <div>Description: ${this.get('description')}</div>
          <div>Resolved: ${this.get('resolved') ? 'true' : 'false'}</div>
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
    const cards = document.querySelectorAll('.issue-card');
    cards.forEach(card => card.className = card.className.split(' ').filter(str => str != 'red').join(' '));
    const card = document.getElementById(`Issue${this.get('id')}`);
    console.log(this.get('id'), card);
    if (card) card.className += ' red';
  }
  cancelEdit = () => {
    this.formEle.remove();
    const cards = document.querySelectorAll('.issue-card');
    cards.forEach(card => card.className = card.className.split(' ').filter(str => str != 'red').join(' '));
  }

  form = (): string => {
    return `
    <div>
      <div class='ui header large'>Issue Details</div>
      <form id='IssueForm' class='ui form'>
        <div class='field'>
          <label>Title</label>
          <input name='title' type='text' placeholder="Title" value="${this.get('title') || ''}"/>
        </div>
        <div class='field'>
          <label>Description</label>
          <input name='description' type='text' placeholder="Description" value="${this.get('description') || ''}"/>
        </div>
        <div class='field'>
          <label>Status</label>
          <div class='ui checkbox'>
            <input name='resolved' type='checkbox' value="true" ${this.get('resolved') && 'checked'}/>
            <label>resolved</label>
          </div>
          
          
        </div>
      </form>
      <div class='ui basic segment'>
        <div class='ui buttons'>
          <button class='ui button green save'>Save Issue</button>
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
