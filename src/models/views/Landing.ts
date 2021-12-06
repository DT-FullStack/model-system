import { MenuTab } from "./MenuTab";

export class Landing {
  constructor() {
    new MenuTab('Home', this.render).render();
  }
  template: string = `
    <h2>Project Details</h2>
  `;
  render = () => {
    const parent = document.getElementById('Collection');
    if (!parent) return;
    parent.innerHTML = this.template;
  }
}