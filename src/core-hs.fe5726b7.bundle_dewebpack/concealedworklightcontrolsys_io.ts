import { Entity } from './Entity';
import { ConcealedWorkLightLogic } from './ConcealedWorkLightLogic';
import { ConcealedWorkCompEntity_IO, ConcealedWorkCompEntity } from './ConcealedWorkCompEntity';

class ConcealedWorkLightControlSys_IO extends ConcealedWorkCompEntity_IO {
  dump(
    entity: unknown,
    target?: unknown,
    includeChildren: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown {
    return super.dump(entity, undefined, includeChildren, options);
  }

  load(
    entity: unknown,
    source: unknown,
    context: unknown
  ): void {
    super.load(entity, source, context);
  }
}

class ConcealedWorkLightControlSys extends ConcealedWorkCompEntity {
  protected _parents: Record<string, ConcealedWorkCompEntity>;
  protected _children: Record<string, ConcealedWorkCompEntity>;

  getIO(): ConcealedWorkLightControlSys_IO {
    return ConcealedWorkLightControlSys_IO.instance();
  }

  get cworks(): ConcealedWorkCompEntity[] {
    return Object.values(this._parents);
  }

  get lightLogics(): ConcealedWorkLightLogic[] {
    let logics: ConcealedWorkLightLogic[] = [];
    const children = Object.values(this._children);
    
    if (children.length) {
      logics = children.filter(
        (child): child is ConcealedWorkLightLogic => 
          child instanceof ConcealedWorkLightLogic
      );
    }
    
    return logics;
  }

  removeSelf(): void {
    Object.values(this._parents).forEach((parent) => {
      parent.removeChild(this);
    });
  }

  addLightLogic(logic: ConcealedWorkLightLogic): void {
    this._addCWEntity(this.lightLogics, logic);
  }

  removeLightLogic(logic: ConcealedWorkLightLogic): void {
    this._removeCWEntity(this.lightLogics, logic);
  }

  getLightLogic(id: string): ConcealedWorkLightLogic | undefined {
    return this._getCWEntity(this.lightLogics, id);
  }

  protected _addCWEntity(
    collection: ConcealedWorkCompEntity[],
    entity: ConcealedWorkCompEntity
  ): void {
    // Implementation inherited from parent
  }

  protected _removeCWEntity(
    collection: ConcealedWorkCompEntity[],
    entity: ConcealedWorkCompEntity
  ): void {
    // Implementation inherited from parent
  }

  protected _getCWEntity<T extends ConcealedWorkCompEntity>(
    collection: T[],
    id: string
  ): T | undefined {
    // Implementation inherited from parent
    return undefined;
  }
}

Entity.registerClass(
  HSConstants.ModelClass.ConcealedWorkLightControlSys,
  ConcealedWorkLightControlSys
);

export { ConcealedWorkLightControlSys_IO, ConcealedWorkLightControlSys };