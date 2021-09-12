type MyNumber = number;

type StringOrNull = MyNumber extends string ? string : null;
// null

function functionFactory<T>(value: T) {
  type A = T extends boolean
    ? 'TYPE A'
    : T extends string
    ? 'TYPE B'
    : T extends number
    ? 'TYPE C' : 'TYPE D';
  return (arg1: A) => {
    // const a: string = arg1; //Error
    const a: string = arg1;
  }
}
const functionWithParamA = functionFactory(true);
// (arg1: "TYPE A") => void
const functionWithParamB = functionFactory('true');
// (arg1: "TYPE B") => void
const functionWithParamC = functionFactory(1);
// (arg1: "TYPE C") => void
const functionWithParamD = functionFactory(null);
// (arg1: "TYPE D") => void

type ResultType = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
// type ResultType = "c"

type Distributive<T> = T extends string | number ? T : never;
type Result = Distributive<string | number | boolean>;
// type Result = string | number

type NotDistibutive<T> = T extends [string | number] ? T : never;
type Result2 = NotDistibutive<string | number | boolean>;
// type Result = never
type Result3 = NotDistibutive<[string | number]>;
// type Result = [string | number]

type InferSomething<T> = T extends infer U ? U : any;
type Inferred = InferSomething<'Hello There'>
// type Inferred = "Hello There"

type InferSomething2<T> = T extends { a: infer A; b: number } ? A : any;
type Inferred2 = InferSomething2<{ a: 'Hello' }>;
// type Inferred2 = any
type Inferred3 = InferSomething2<{ a: 'Hello', b: 5 }>;
// type Inferred3 = "Hello"

type InferSomething3<T> = T extends { a: infer A; b: infer B } ? A & B : any;
type Inferred5 = InferSomething3<{
  a: { someAProp: 'Hello' },
  b: { someBProp: 5 }
}>;
// type Inferred5 = {
//   someAProp: 'Hello';
// } & {
//   someBProp: 5;
// }

// ReturnType is a built in Utility type that uses infer
// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type FuncReturnVal = ReturnType<() => true>
// type FuncReturnVal = true
type FuncReturnVal2 = ReturnType<() => { a: boolean }>
// type FuncReturnVal2 = {
//   a: boolean;
// }

