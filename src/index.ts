import { User, UserProps } from './models/User';
import { Collection } from './models/Collection';
import { List } from './models/views/List';
import { Edit } from './models/views/Edit';

const user = User.initialize({ name: "David", age: 55 })
const parent = document.getElementById('main-content');
if (!parent) throw new Error('Cannot find main-content');
user.on('save', () => { console.log('SAVED', user) });
new Edit<User, UserProps>(parent, user).render();




//** Display List */
// const users = new Collection(User.rootUrl,
//   (json: UserProps) => { return User.initialize(json) }
// );
//
// users.on('change', () => {
//   const parent = document.getElementById('main-content');
//   if (!parent) throw new Error('Cannot find main-content');
//
//   new List(parent, users).render();
// })
//
// users.fetch();