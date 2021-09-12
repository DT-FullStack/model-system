import axios, { AxiosPromise, AxiosResponse } from 'axios';
// import { UserProps } from './User';

interface HasId {
  id?: number;
}

// export class ApiSync<T extends HasId> {
export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) { }
  fetch = (id: number): AxiosPromise<T> => {
    return axios.get(`${this.rootUrl}/${id}`)
  }
  save = (data: T): AxiosPromise<T> => {
    const { id } = data;
    console.log('Sync!');
    return id ?
      axios.put(`${this.rootUrl}/${id}`, data)
      : axios.post(this.rootUrl, data);
  }

}

export function ApiSyncable<T extends HasId>(rootUrl: string) {
  return function (constructor: Function) {
    Object.assign(constructor.prototype, {
      fetch(id: number): AxiosPromise<T> {
        return axios.get(`${rootUrl}/${id}`);
      },
      save(data: T) {
        const { id } = data;
        console.log('Sync!');
        return id ?
          axios.put(`${rootUrl}/${id}`, data)
          : axios.post(rootUrl, data);

      }
    })
  }
}