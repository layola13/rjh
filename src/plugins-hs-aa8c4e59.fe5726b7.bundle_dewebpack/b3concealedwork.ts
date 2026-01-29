import { B3Entity } from './B3Entity';
import { turnEntityToBom3Entity } from './entityUtils';
import { B3ConcealedWorkPowerSystem } from './B3ConcealedWorkPowerSystem';
import { B3ConcealedWorkTubeTree } from './B3ConcealedWorkTubeTree';

interface PowerSystem {
  powerSystems: string[];
}

interface Terminal {
  routes: string[];
}

interface WeakElec {
  terminals: Terminal[];
}

interface WaterSystem {
  routes: string[];
}

interface Bom3Data {
  entity: unknown;
  strongElec?: PowerSystem;
  weakElec: WeakElec;
  coldWater: WaterSystem;
  hotWater: WaterSystem;
}

interface Entity {
  getParameterValue(key: string): any;
  getInstanceId(): string;
  children: Entity[];
}

export class B3ConcealedWork extends B3Entity {
  /**
   * Build BOM3 data structure from entity
   */
  buildBom3Data(entity: Entity): Bom3Data {
    const data: Bom3Data = {} as Bom3Data;
    
    data.entity = turnEntityToBom3Entity(entity);
    
    const strongElec = entity.getParameterValue('strongElec') as PowerSystem | null;
    if (strongElec) {
      strongElec.powerSystems = strongElec.powerSystems.map((systemId) => {
        const childEntity = entity.children.find((child) => {
          return child.getInstanceId() === systemId;
        });
        return childEntity && new B3ConcealedWorkPowerSystem(this.context).buildBom3Data(childEntity);
      });
      data.strongElec = strongElec;
    }
    
    const weakElec = entity.getParameterValue('weakElec') as WeakElec;
    weakElec.terminals.forEach((terminal) => {
      terminal.routes = terminal.routes.map((routeId) => {
        return this._buildRoute(entity, routeId);
      });
    });
    data.weakElec = weakElec;
    
    const coldWater = entity.getParameterValue('coldWater') as WaterSystem;
    coldWater.routes = coldWater.routes.map((routeId) => {
      return this._buildRoute(entity, routeId);
    });
    data.coldWater = coldWater;
    
    const hotWater = entity.getParameterValue('hotWater') as WaterSystem;
    hotWater.routes = hotWater.routes.map((routeId) => {
      return this._buildRoute(entity, routeId);
    });
    data.hotWater = hotWater;
    
    return data;
  }

  private _buildRoute(entity: Entity, routeId: string): unknown {
    const childEntity = entity.children.find((child) => {
      return child.getInstanceId() === routeId;
    });
    return childEntity && new B3ConcealedWorkTubeTree(this.context).buildBom3Data(childEntity);
  }
}