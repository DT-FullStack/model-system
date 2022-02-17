import { JsonDatabase } from "./JsonDatabase";
import { Request, RequestHandler, Response, Router } from "express";

// interface ReqWithBody

// GET      /:collection
// POST     /:collection
// PUT      /:collection/:id
// DELETE   /:collection/:id

export default class JsonDatabaseRoutes {
  router: Router = Router();
  constructor(private database: JsonDatabase) {
    this.router.route('/:collection')
      .get(this.getCollection)
      .post(this.addToCollection);
    this.router.route('/:collection/:id')
      .put(this.updateItem)
      .delete(this.deleteItem);
  }

  collection = this.database.findOrCreateCollection;

  getCollection: RequestHandler = (req: Request, res: Response) => {
    const { collection: name } = req.params;
    res.json(this.collection(name).getAll());
  }
  addToCollection: RequestHandler = (req: Request, res: Response) => {
    const { collection: name } = req.params;
    const item = this.collection(name).createItem(req.body);
    this.database.save();
    res.json(item);
  }
  updateItem: RequestHandler = (req: Request, res: Response) => {
    const { collection: name, id: requestId } = req.params;
    const { id: payloadId } = req.body;
    if (requestId != payloadId) res.status(422).json({ error: 'Invalid data' });
    const item = this.collection(name).updateItem(req.body);
    this.database.save();
    res.json(item);
  }
  deleteItem: RequestHandler = (req: Request, res: Response) => {
    const { collection: name, id } = req.params;
    const item = this.collection(name).deleteItem(id);
    this.database.save();
    res.json(item);
  }
}
