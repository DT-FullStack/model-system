import { MenuTab } from "./MenuTab";

interface DetailCard {
  header: string;
  meta?: string;
  description: string[];
}

export class Landing {
  constructor() {
    new MenuTab('Home', this.render).render();
  }
  details: DetailCard[] = [
    {
      header: 'Json Server', meta: 'Express + Typescript',
      description: ['A custom API that serves a JSON file as a database', "Ultra lightweight and simple, without MySQL or MongoDB"]
    },
    {
      header: 'HTML Templating',
      meta: 'Axios + Typescript',
      description: [`Dynamically renders collections without a front-end framework`, `Implements abstract classes and generic Typescript classes`]
    },
    {
      header: 'Event Handling',
      meta: 'Typescript utility class',
      description: [`Allows fully customizable events`, `Handles both UI and API events, such as click, submit, save, etc`, `Can be used with any other Javascript class`]
    },
  ]

  get template(): string {
    return `
    <h2>Project Highlights</h2>
    <div class='ui basic segment'>
      <p>This is a super lightweight project that is completely built from scratch using just Express, Axios, and Webpack</p>
      <div class='ui cards'>
        ${this.details.map(detail => `
          <div class='ui blue card'>
            <div class='content'>
              <div class='header'>${detail.header}</div>
              ${detail.meta ? `<div class='meta'>${detail.meta}</div>` : ''}
              <div class='description'>
                ${detail.description.map(desc => `<p>${desc}</p>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `};


  render = () => {
    const parent = document.getElementById('Collection');
    if (!parent) return;
    parent.innerHTML = this.template;
  }
}