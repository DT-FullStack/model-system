import { ApiSyncable } from "./ApiSync";
import { Event } from "./Eventing";
// import { HasEvents } from "./Eventing";

interface HasId { id: number }

// @HasEvents
export class NewModel {
  constructor(
    private attrs: {}
  ) { }

  @Event() save() { }
}