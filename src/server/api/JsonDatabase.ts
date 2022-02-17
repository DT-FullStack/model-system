import { Request, Response, Router, Express } from "express";
import fs from 'fs';
import path from 'path';
import JsonCollection from "./JsonCollection";
import JsonDatabaseRoutes from "./JsonDatabaseRoutes";

export interface JsonData {
  [key: string]: any
}
export interface CollectionItem extends JsonData {
  id: number
}
export type Collection = CollectionItem[];

export class JsonDatabase {
  private database: { [key: string]: Collection } = {};
  private collections: { [key: string]: JsonCollection } = {};
  private path: string;
  router: Router;

  constructor(private jsonFilePath: string) {
    this.path = path.resolve(__dirname, this.jsonFilePath);
    this.load();
    this.initializeCollections();
    this.router = new JsonDatabaseRoutes(this).router;
  }

  private load(): void {
    try {
      const fileContents = fs.readFileSync(this.path, 'utf-8');
      const database = JSON.parse(fileContents);
      this.database = database;
    } catch (error) {
      console.error(error);
    }
  }
  private initializeCollections(): void {
    for (const collectionName in this.database) {
      this.collections[collectionName] = new JsonCollection(collectionName, this.database[collectionName]);
    }
  }
  private update(): void {
    try {
      Object.values(this.collections).forEach(collection => {
        this.database[collection.name] = collection.getAll()
      })
    } catch (error) {
      console.error(error);
    }
  }
  save(): void {
    try {
      this.update();
      fs.writeFileSync(this.path, JSON.stringify(this.database, null, '\t'), { encoding: 'utf-8' });
    } catch (error) {
      console.error(error);
    }
  }

  getCollection = (name: string): JsonCollection | null => {
    return this.collections[name] || null;
  }
  createCollection = (name: string): JsonCollection => {
    const collection = new JsonCollection(name);
    this.collections[name] = collection;
    return collection;
  }
  findOrCreateCollection = (name: string): JsonCollection => {
    const collection = this.getCollection(name);
    return collection ? collection : this.createCollection(name);
  }

}

export default (jsonFilePath: string, app: Express): void => {
  const database = new JsonDatabase(jsonFilePath);
  app.use(database.router);
}