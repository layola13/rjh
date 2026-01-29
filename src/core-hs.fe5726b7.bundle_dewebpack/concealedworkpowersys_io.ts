import { Entity_IO, Entity } from './Entity';
import { ConcealedWorkCircuit } from './ConcealedWorkCircuit';
import { ConcealedWorkCompEntity_IO, ConcealedWorkCompEntity } from './ConcealedWorkCompEntity';
import { EntityField } from './decorators';
import { Content } from './Content';
import { GBCircuitComp } from './GBCircuitComp';

export class ConcealedWorkPowerSys_IO extends ConcealedWorkCompEntity_IO {
  dump(
    entity: ConcealedWorkPowerSys,
    target?: unknown,
    includeChildren: boolean = true,
    options: Record<string, unknown> = {}
  ): [Record<string, unknown>, unknown] {
    const result = super.dump(entity, undefined, includeChildren, options);
    const data = result[0];
    
    if (entity.relation) {
      data.rlt = entity.relation;
    }
    
    return result;
  }

  load(
    entity: ConcealedWorkPowerSys,
    data: Record<string, unknown>,
    options?: unknown
  ): void {
    super.load(entity, data, options);
    
    if (data.rlt) {
      Entity_IO.setEntityFields(entity, {
        relation: data.rlt
      });
    }
  }
}

export class ConcealedWorkPowerSys extends ConcealedWorkCompEntity {
  @EntityField()
  relation: string | undefined = undefined;

  getIO(): ConcealedWorkPowerSys_IO {
    return ConcealedWorkPowerSys_IO.instance();
  }

  get cworks(): Entity[] {
    return Object.values(this._parents);
  }

  get powerBox(): Content | undefined {
    const relatedEntity = this.relation 
      ? this.doc.getEntityById(this.relation) 
      : undefined;
    
    return relatedEntity instanceof Content ? relatedEntity : undefined;
  }

  get circuits(): ConcealedWorkCircuit[] {
    const circuitEntities = Object.values(this._children).filter(
      (entity): entity is ConcealedWorkCircuit => entity instanceof ConcealedWorkCircuit
    );
    
    this.sortCircuits(circuitEntities);
    return circuitEntities;
  }

  sortCircuits(circuits: ConcealedWorkCircuit[]): void {
    circuits.sort((circuitA, circuitB) => {
      const componentA = circuitA.getComponent(GBCircuitComp.Type);
      const componentB = circuitB.getComponent(GBCircuitComp.Type);
      
      if (!componentA || !componentB) {
        return 0;
      }
      
      if (componentA.circuitType !== componentB.circuitType) {
        return componentA.circuitType - componentB.circuitType;
      }
      
      return componentA.circuitTypeNumber - componentB.circuitTypeNumber;
    });
  }

  removeSelf(): void {
    Object.values(this._parents).forEach((parent) => {
      parent.removeChild(this);
    });
  }

  addCircuit(circuit: ConcealedWorkCircuit): void {
    this._addCWEntity(this.circuits, circuit);
  }

  removeCircuit(circuit: ConcealedWorkCircuit): void {
    this._removeCWEntity(this.circuits, circuit);
  }

  getCircuit(identifier: string): ConcealedWorkCircuit | undefined {
    return this._getCWEntity(this.circuits, identifier);
  }
}

Entity.registerClass(HSConstants.ModelClass.ConcealedWorkPowerSys, ConcealedWorkPowerSys);