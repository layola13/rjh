import { B3Entity } from './B3Entity';
import { turnEntityToBom3Entity } from './entityUtils';
import { B3ConcealedWorkTubeTree } from './B3ConcealedWorkTubeTree';
import { B3ConcealedWorkTube } from './B3ConcealedWorkTube';

interface Tube {
  tubes: unknown[];
}

interface Relation {
  tubes: unknown[];
}

interface Logic {
  relations: Relation[];
}

interface LightControl {
  logics: Logic[];
  otherRelations: Relation[];
}

interface Route {
  // Define route properties based on B3ConcealedWorkTubeTree.buildBom3Data return type
  [key: string]: unknown;
}

interface Bom3Data {
  entity: unknown;
  displayName: unknown;
  circuitType: unknown;
  circuitTypeNumber: unknown;
  breakerType: unknown;
  tubeType: unknown;
  wireType: unknown;
  roomRange: unknown;
  routes: Route[];
  lightControl?: LightControl;
}

interface EntityChild {
  getInstanceId(): unknown;
}

interface Entity {
  getParameterValue(paramName: string): any;
  children: EntityChild[];
}

interface Context {
  [key: string]: unknown;
}

export class B3ConcealedWorkCircuit extends B3Entity {
  context: Context;

  buildBom3Data(entity: Entity): Bom3Data {
    const data: Bom3Data = {
      entity: turnEntityToBom3Entity(entity),
      displayName: entity.getParameterValue('displayName'),
      circuitType: entity.getParameterValue('circuitType'),
      circuitTypeNumber: entity.getParameterValue('circuitTypeNumber'),
      breakerType: entity.getParameterValue('breakerType'),
      tubeType: entity.getParameterValue('tubeType'),
      wireType: entity.getParameterValue('wireType'),
      roomRange: entity.getParameterValue('roomRange'),
      routes: []
    };

    const routes = entity.getParameterValue('routes');
    data.routes = routes.map((route: unknown) => {
      return this._buildRoute(entity, route);
    });

    const lightControl = entity.getParameterValue('lightControl');
    if (lightControl) {
      lightControl.logics.forEach((logic: Logic) => {
        logic.relations.forEach((relation: Relation) => {
          relation.tubes = relation.tubes.map((tube: unknown) => {
            return this._buildTube(entity, tube);
          });
        });
      });

      lightControl.otherRelations.forEach((relation: Relation) => {
        relation.tubes = relation.tubes.map((tube: unknown) => {
          return this._buildTube(entity, tube);
        });
      });

      data.lightControl = lightControl;
    }

    return data;
  }

  private _buildRoute(entity: Entity, routeId: unknown): Route | undefined {
    const routeEntity = entity.children.find((child: EntityChild) => {
      return child.getInstanceId() === routeId;
    });

    return routeEntity && new B3ConcealedWorkTubeTree(this.context).buildBom3Data(routeEntity);
  }

  private _buildTube(entity: Entity, tubeId: unknown): unknown {
    const tubeEntity = entity.children.find((child: EntityChild) => {
      return child.getInstanceId() === tubeId;
    });

    return tubeEntity && new B3ConcealedWorkTube(this.context).buildBom3Data(tubeEntity);
  }
}