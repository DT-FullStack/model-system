import axios, { AxiosPromise, AxiosResponse } from 'axios';
// import { UserProps } from './User';

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) { }
  fetch = (id: number): AxiosPromise<T> => {
    return axios.get(`${this.rootUrl}/${id}`)
  }
  save = (data: T): AxiosPromise<T> => {
    const { id } = data;

    return id ?
      axios.put(`${this.rootUrl}/${id}`, data)
      : axios.post(this.rootUrl, data);
  }

}