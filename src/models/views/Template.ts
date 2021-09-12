import { Model } from '../Model';


export class Template<T extends Model<K>, K> {
  constructor(
    public htmlStr: string,
    public attrs: K
  ) {

  }
}