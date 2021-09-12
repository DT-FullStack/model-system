type Callback = () => void;

export class Eventing {
  private events: { [key: string]: Callback[] } = {}
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

export function Event() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log({ target, propertyKey, descriptor })
  };

}

export function Attributes(target: any, property: string, descriptor: TypedPropertyDescriptor<Function>) {
  // let method = descriptor.value!;
  console.log({ target, property, descriptor });
}

// export function HasEvents<T extends { new(...args: any[]): {} }>(constructor: T) {
//   return class extends constructor {
//     // private reportingURL = "http://www...";
//     private events: { [key: string]: Callback[] } = {}
//     on = (eventName: string, callback: Callback): void => {
//       const handlers = this.events[eventName] || [];
//       handlers.push(callback);
//       this.events[eventName] = handlers;
//     }
//     trigger = (eventName: string): void => {
//       const handlers = this.events[eventName] || [];
//       if (handlers.length) handlers.forEach(callback => callback());
//     }
//   };
// }

// export function HasEventss(...args: any[]) {
//   console.log(args);
//   return function (...args) { }
//   // return function (constructor: Function) {
//   // const proto = constructor.prototype
//   // console.log({ constructor, proto });
//   // Object.assign(proto, {
//   //   hello: 'whats up',
//   //   sayHi() { console.log('hi') }
//   // })
//   // Object.assign(constructor.prototype, {
//   //   events: { [key: string]: Callback[] } = {},
//   //   on = (eventName: string, callback: Callback): void => {
//   //     const handlers = this.events[eventName] || [];
//   //     handlers.push(callback);
//   //     this.events[eventName] = handlers;
//   //   },
//   //   trigger = (eventName: string): void => {
//   //     const handlers = this.events[eventName] || [];
//   //     if (handlers.length) handlers.forEach(callback => callback());
//   //   }

//   // })
//   // }
// }