import './index.css';
import { User } from './models/User';
import { Company } from './models/Company';
import { Product } from './models/Product';
import { Issue } from './models/Issue';
import { Landing } from './models/views/Landing';

new Landing();
User.initializeCollection();
Company.initializeCollection();
Product.initializeCollection();
Issue.initializeCollection();
