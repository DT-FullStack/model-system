import { Model } from '../../models/Model';
import { View } from '../../models/views/View';
// import { Callback } from '../../models/Eventing';
/// Utility types

interface Starship {
  name: string
  enableHyperJump: boolean,
  speed: 'fast' | 'slow' | 'hyper' | 'oldschool',
  color?: 'green' | 'yellow' | 'silver' | 'gold'
}

//** Partial<T> */
const updateStarship = (id: number, starship: Starship) => { }
updateStarship(1, {
  name: 'butts',  // you must include all properties
  enableHyperJump: true,
  speed: 'slow'
})
const updateStarship2 = (id: number, starship: Partial<Starship>) => { }
updateStarship2(1, {
  name: 'butts'  // with Partial all properties become optional
})

//** */
// Required<T> makes ALL properties of T required
// Readonly<T> makes ALL properties READONLY so that you cannot update them

// Record<K,T>
const starships: Record<string, Partial<Starship>> = {
  Discovery: {
    name: "Discovery",
    enableHyperJump: true,
    speed: 'hyper'
  },
  Explorer: {
    name: "Explorer",
    enableHyperJump: false
  }
}

//** Pick<T,K> */
// for the follwing examples <K> can be union such as 'name' | 'speed'

type StarshipNamesOnly = Pick<Starship, 'name'>;
// type StarshipNamesOnly = {
//   name: string;
// }

// Omit<T,K>
type StarshipNoNames = Omit<Starship, 'name'>;
// type StarshipNoNames = {
//   enableHyperJump: boolean;
//   speed: 'fast' | 'slow' | 'hyper';
// }

type StarshipSpeeds = Starship['speed']; // type StarshipSpeeds = "hyper" | "fast" | "slow" | "oldschool"
type StarshipColors = Starship['color']; // type StarshipColors = "green" | "yellow" | "silver" | "gold" | undefined

// Exclude<T,U>
type SlowSpeeds = 'slow' | 'oldschool';
type NotSlow = Exclude<StarshipSpeeds, 'slow'>
// type SpeedFastOnly = "fast" | "hyper" \ 'oldschool
type FastOnly = Exclude<StarshipSpeeds, SlowSpeeds>
// type SpeedFastOnly = "fast" | "hyper"

// Extract<T,U>
type OnlySlow = Extract<StarshipSpeeds, 'slow'>
// type OnlySlow = "slow"
type AnySlow = Extract<StarshipSpeeds, SlowSpeeds>
// type AnySlow = "slow" | "oldschool"

// NonNullable<T>
type ActualColors = NonNullable<StarshipColors> // type ActualColors = "green" | "yellow" | "silver" | "gold"
function paintStarship(id: number, color: NonNullable<StarshipColors>) {
  return { id, color };
}
paintStarship(1, 'green') // undefined will throw error

// ReturnType<T>
type PaintFunctionReturn = ReturnType<typeof paintStarship>
// {
//   id: number;
//   color: "green" | "yellow" | "silver" | "gold";
// }

// InstanceType<T>
export type Constructable<T> = new (...args: any[]) => T;

export function Deletable<T extends Constructable<{}>>(base: T) {
  return class extends base {
    deleted: boolean = false;
    delete() { }
  }
}
class Form {
  constructor(name: string) { }
}
const DeletableForm = Deletable(Form);
type DeletableFormInstance = InstanceType<typeof DeletableForm>
class Website {
  constructor(public form: DeletableFormInstance) { }
}
const website = new Website(
  new DeletableForm('Signup')
)
website.form.delete()  // class Form originally did not have a delete function!!


// ThisType<T>
// must ust --NoImplicitThis
interface Hello {
  sayHello(): void
}
interface HelloWorld {
  helloWorld(): string
}
const myHello: Hello & ThisType<HelloWorld> = {
  sayHello() {
    return this.helloWorld();
  }
}

myHello.sayHello = myHello.sayHello.bind({
  HelloWorld() {
    return 'Hellllllllo World!';
  }
})

myHello.sayHello(); //'Hellllllllo World!'


// This utility does not return a transformed type.Instead, it serves as a marker for a contextual this type.Note that the--noImplicitThis flag must be enabled to use this utility.


type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});
// Makes an object with all the data and methods
// {
//   x: number;
//   y: number;
//   moveBy(dx: number, dy: number): void;
// }

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);  // obj.x === 15, obj.y === 25

// Parameters<T>   T === typeof Function
// returns a tuple type
function paint(item: string, color: 'red' | 'blue') {
  return { item, color };
}
type paintParams = Parameters<typeof paint> // * NOT Parameters<paint>
// [item: string, color: "red" | "blue"]
type fiveArgs = Parameters<(a: any, b: string, c: number, d: symbol, e?: Function) => void>
// [a: any, b: string, c: number, d: symbol, e ?: Function | undefined]

// ConstructorParameters<T>
// returns a tuple or array type
type errorParams = ConstructorParameters<ErrorConstructor>
// [message?: string | undefined]
type regexParams = ConstructorParameters<RegExpConstructor>
// [pattern: string | RegExp, flags ?: string | undefined]