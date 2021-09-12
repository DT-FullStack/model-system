

// Indexed Access Types
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const user = { age: 5, name: "David" };
const age = getProperty(user, 'age');

document.addEventListener('click', (e) => { });   // e is inferred to be MouseEvent

document.addEventListener('keypress', (e) => { });  // e is inferred to be KeyboardEvent

interface MyMouseEvent {
  x: number;
  y: number;
}

interface MyKeyboardEvent {
  key: string;
}

interface MyEvents {
  click: MyMouseEvent;
  keypress: MyKeyboardEvent;
}
type JustEvents = MyEvents[keyof MyEvents]; // MyMouseEvent | MyKeyboardEvent


function handleEvent<K extends keyof MyEvents>(
  eventName: K,
  // callback: (e: MyEvents[K]) => void   //  MyEvents[keyof MyEvents] or JustEvents works fine!
  callback: (e: JustEvents) => void
) {
  if (eventName === 'click') {
    // Here, I expected e to be MyMouseEvent
    callback({ x: 0, y: 0 }); // ERROR
  } else if (eventName === 'keypress') {
    // Here, I expected e to be MyKeyboardEvent
    callback({ key: 'Enter' }); // ERROR
  }
}