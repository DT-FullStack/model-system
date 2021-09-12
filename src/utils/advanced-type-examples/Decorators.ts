interface TypedPropertyDescriptor<T> {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
  value?: T;
  get?: () => T;
  set?: (value: T) => void;
}

declare type ClassDecorator1 = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator1 = (target: Object, propertyKey: string | symbol) => void;
declare type MethodDecorator1 = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator1 = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

//** */
// Class Decorators
@Frozen
class ImmutableClass { }
// This prevents extending the class, such as..  
// class Butts extends Immutable {}   // throws an Error 
function Frozen(constructor: Function) {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}

//** */
//**  Property Decorators */

class Hospital {
  @HeartEmoji() description: string = 'Hearts!';
}
const hospital = new Hospital();
// hospital.description = `🫀 Hearts! 🫀`

type KeyedObject = { [key: string | symbol]: any };

function HeartEmoji() {
  return function (target: KeyedObject, key: string | symbol) {
    //** Define a getter and setter for the new object property */
    let val = target[key];
    const getter = () => val;
    const setter = (next: string) => `🫀 ${next} 🫀`;
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
}

//** */
//** Method Decorators */

//** Confirmable alters the function it decorates */
class Hospital2 {
  sureness: string = 'Sure';

  @Confirmable('Are you sure?') addMore(): void {
    this.sureness = `VERY ${this.sureness}`;
  }
}
const hospital2 = new Hospital();
// hospital.addMore()
// Must confirm via alert to execute function
// hospital.sureness = 'VERY Sure'

function Confirmable(message: string) {
  return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const allow = confirm(message);
      if (allow) {
        const result = original.apply(this, args);
        return result;
      } else return null;
    }
    return descriptor;
  }
}

//** */
//** Accessor Decorator */
class Hospital3 {
  @WithTax(0.15)
  get price(): number {
    return 5
  }
}
const hospital3 = new Hospital();
//** hospital.addMore() */
// Must confirm via alert to execute function
// hospital.sureness = 'VERY Sure'

function WithTax(taxRate: number) {
  return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.get as () => number;
    descriptor.get = function () {
      const result = original.apply(this);
      return result * taxRate;
    }
    return descriptor;
  }
}