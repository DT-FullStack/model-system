type Callback = () => void;

export class MenuTab {
  menu = document.getElementById('Menu');

  constructor(
    public name: string,
    public action: Callback
  ) {

  }

  get active() { return }

  onClick = (): void => {
    this.action();
    if (!this.menu) return;
    this.menu.querySelectorAll('.item').forEach(i => i.className = i.className.split(' ').filter(n => n != 'active').join(' '));
    const tab = this.menu.querySelector(`#${this.name}`)
    if (tab) tab.className += ' active';
  }

  render(): Element {
    if (!this.menu) throw new Error('#Menu not found');
    const tab = document.createElement('a');
    tab.className = 'item';
    tab.id = `${this.name}`;
    tab.append(this.name);
    this.menu.append(tab);
    if (this.menu.childNodes.length === 1) this.onClick();
    tab.addEventListener('click', this.onClick);
    return tab;

  }

  template = `
    <div id='${this.name}' class='item'>${this.name}</div>
  `;
}