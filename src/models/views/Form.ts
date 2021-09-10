import { User, UserProps } from '../User';
import { View } from './View';

export class Form extends View<User, UserProps> {
  template(): string {
    return `
    <div id='UserForm'>
      <input placeholder="${this.model.get('name')}"/>
      <button class='set-name'>Change Name</button>
      <button class='set-age'>Set Random Age</button>
      <button class='save'>Save User</button>
    </div>
  `};

  eventsMap = (): {
    [key: string]: EventListenerOrEventListenerObject
  } => {
    return {
      'click:button': this.onButtonClick,
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    }
  }
  onSaveClick = (ev: Event): void => {
    this.model.save();
  }
  onSetAgeClick = (ev: Event): void => {
    this.model.setRandomAge();
    console.log('button was clicked');
  }
  onSetNameClick = (ev: Event): void => {
    const input = this.parent.querySelector('input');
    if (input && input.value) this.model.set({ name: input.value });
  }
  onButtonClick(ev: Event): void {
    ev.stopPropagation();
    console.log("BUTTTONS");
  }




  // refreshTemplate(): void{

  // }

}