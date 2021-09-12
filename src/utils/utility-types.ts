export type Constructable<T> = new (...args: any[]) => T;

// export function Syncable<T extends Constructable<{}>>(base: T) {
//   return class extends base {
//     deleted: boolean = false;
//     delete() { }
//   }
// }
