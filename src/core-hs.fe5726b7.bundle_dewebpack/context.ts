import { RelationshipFactory } from './RelationshipFactory';
import { ConfigRegister } from './ConfigRegister';
import type { Manager } from './types';

export class Context {
  private readonly _factory: RelationshipFactory;
  public readonly configRegister: ConfigRegister;
  public readonly manager: Manager;

  constructor(manager: Manager) {
    this._factory = new RelationshipFactory();
    this.configRegister = new ConfigRegister(this);
    this.manager = manager;
  }

  createRelationshipModel<T = unknown>(
    type: string,
    options?: T
  ): unknown {
    return this._factory.createRelationshipModel(type, this, options);
  }
}