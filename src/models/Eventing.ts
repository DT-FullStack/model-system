
export type Callback = (...args: any[]) => void;

export class Eventing {
  public events: { [key: string]: Callback[] } = {}
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }
  trigger = (eventName: string): void => {
    const handlers = this.events[eventName] || [];
    if (handlers.length) handlers.forEach(callback => callback());
  }
}
