export type DataObj = { [key: string]: any };
export type Callback = (data?: DataObj) => void;

export class Eventing {
  public events: { [key: string]: Callback[] } = {}
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }
  trigger = (eventName: string, data: DataObj = {}): void => {
    const handlers = this.events[eventName] || [];
    if (handlers.length) handlers.forEach(callback => callback(data));
  }
}
