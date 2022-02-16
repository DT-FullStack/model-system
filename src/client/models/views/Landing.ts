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
      header: 'Json Server', meta: 'Ready made RESTful interface',
      description: ['An ExpressJS package that creates a server with RESTful routing for any collection stored in the designated JSON file']
    },
    {
      header: 'Zero JavaScript Frameworks',
      meta: 'Basic TypeScript only',
      description: [`Doesn't rely on React or Angular, simply renders templates directly in the DOM`]
    }
  ]

  get template(): string {
    return `
    <h2>Project Highlights</h2>
    <div class='ui basic segment'>
      <div class='ui cards'>
        ${this.details.map(detail => `
          <div class='ui blue card'>
            <div class='content'>
              <div class='header'>${detail.header}</div>
              ${detail.meta && `<div class='meta'>${detail.meta}</div>`}
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