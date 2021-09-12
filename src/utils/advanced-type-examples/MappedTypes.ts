interface User {
  name: string,
  age: number,
  id: number,
  address: {
    street: string,
    city: string,
    country: string
  }
}
// Mapped Types
type MappedType<T> = {
  [P in keyof T]: T[P]
}
type NewType = MappedType<User>;  // type equivalent to User interface

// Pick
type Pick1<T, Properties extends keyof T> = {
  [P in Properties]: T[P]
}
type NewType2 = Pick1<User, 'name' | 'id'>; // subset type of only id and name

type Record1<K extends keyof any, T> = {
  [P in K]: T;
};

const someRecord: Record1<string | number, number> = {}
someRecord.apples = 40;
someRecord.bananas = 69;
someRecord[4] = 3;

type City = User['address']['city'];  // string
type idOrName = User['id' | 'name'];  // string | number

type UserId = User['id'];
type UserAddress = User['address'];

function updateAddress1(id: User['id'], address: User['address']) { }
function updateAddress2(id: UserId, address: UserAddress) { }

type UserProperties = keyof User;
const userProperty: UserProperties = 'id';
const someString: string = userProperty;
