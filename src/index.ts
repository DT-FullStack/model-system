import { User, UserProps } from './models/User';
import { Collection } from './models/Collection';
import { List } from './models/views/List';
import './index.css';
import { Company } from './models/Company';
import { Product } from './models/Product';
import { Issue } from './models/Issue';
import { Landing } from './models/views/Landing';

// const user = User.initialize({ name: "David", age: 55 })
// const parent = document.getElementById('main-content');
// if (!parent) throw new Error('Cannot find main-content');
// user.on('save', () => { console.log('SAVED', user) });
// new Edit<User, UserProps>(parent, user).render();




//** Display List */
new Landing();
User.initializeCollection();
Company.initializeCollection();
Product.initializeCollection();
Issue.initializeCollection();

// users.on('change', () => {
//   const parent = document.getElementById('Collection');
//   if (!parent) throw new Error('Cannot find main-content');

//   new List(parent, users).render();
// })

// users.fetch();