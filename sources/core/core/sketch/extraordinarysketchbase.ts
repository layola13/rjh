import { InteractiveModel } from './InteractiveModel';
import { ExIdGenerator } from './ExIdGenerator';

export class ExtraordinarySketchBase extends InteractiveModel {
  private _id: string;

  constructor(initialId: string = "") {
    super(initialId);
    this._id = initialId;
  }

  generateId(): void {
    this._id = ExIdGenerator.getInstance().generateId(this.id);
  }

  get id(): number {
    return parseInt(this._id);
  }

  forceSetId(newId: number): void {
    this._id = newId.toString();
  }
}