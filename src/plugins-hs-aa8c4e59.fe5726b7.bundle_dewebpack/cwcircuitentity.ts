import { InstanceData, Parameter, DataType } from './321465';
import { ParameterNames } from './242448';
import { AcceptEntity } from './306931';
import { CWTubeEntity } from './837235';
import { CWTubeTreeEntity } from './976259';

interface CircuitType {
  classType: string;
}

interface TubeData {
  id: string;
}

interface NodeRelation {
  tubes: TubeData[];
  nodesType: string;
  nodeIds: string[];
}

interface LogicData {
  displayName: string;
  logicType: string;
  relations: NodeRelation[];
}

interface LightControlData {
  logics: LogicData[];
  otherRelations: NodeRelation[];
}

interface RouteData {
  id: string;
}

interface CircuitEntityData {
  id: string;
  parentId: string;
  displayName: string;
  classType: string;
  circuitType: string;
  circuitTypeNumber: number;
  breakerType: string;
  tubeType: string;
  wireType: string;
  roomRange: string[];
  routes: RouteData[];
  lightControl?: LightControlData;
}

interface LightControlParameter {
  logics: Array<{
    displayName: string;
    logicType: string;
    relations: Array<{
      tubes: string[];
      nodesType: string;
      nodeIds: string[];
    }>;
  }>;
  otherRelations: Array<{
    tubes: string[];
    nodesType: string;
    nodeIds: string[];
  }>;
}

export class CWCircuitEntity extends AcceptEntity {
  protected buildChildren(data: CircuitEntityData): void {
    data.routes.forEach((route: RouteData) => {
      this.addChild(new CWTubeTreeEntity().accept(route));
    });

    if (data.lightControl) {
      data.lightControl.logics.forEach((logic: LogicData) => {
        logic.relations.forEach((relation: NodeRelation) => {
          relation.tubes.forEach((tube: TubeData) => {
            this.addChild(new CWTubeEntity().accept(tube));
          });
        });
      });

      data.lightControl.otherRelations.forEach((relation: NodeRelation) => {
        relation.tubes.forEach((tube: TubeData) => {
          this.addChild(new CWTubeEntity().accept(tube));
        });
      });
    }
  }

  protected buildEntityData(data: CircuitEntityData): void {
    this.setInstanceData(this.getInstanceData(data));
    this.setType({
      classType: data.classType
    });
  }

  protected getInstanceData(data: CircuitEntityData): InstanceData {
    const instanceData = new InstanceData(data.id);

    instanceData.addParameter(
      new Parameter(ParameterNames.parentId, data.parentId, DataType.String),
      new Parameter('displayName', data.displayName, DataType.String),
      new Parameter('circuitType', data.circuitType, DataType.String),
      new Parameter('circuitTypeNumber', data.circuitTypeNumber, DataType.Number),
      new Parameter('breakerType', data.breakerType, DataType.String),
      new Parameter('tubeType', data.tubeType, DataType.String),
      new Parameter('wireType', data.wireType, DataType.String),
      new Parameter('roomRange', data.roomRange, DataType.StringArray),
      new Parameter('routes', data.routes.map((route: RouteData) => route.id), DataType.StringArray)
    );

    if (data.lightControl) {
      const lightControlParam: LightControlParameter = {
        logics: data.lightControl.logics.map((logic: LogicData) => ({
          displayName: logic.displayName,
          logicType: logic.logicType,
          relations: logic.relations.map((relation: NodeRelation) => ({
            tubes: relation.tubes.map((tube: TubeData) => tube.id),
            nodesType: relation.nodesType,
            nodeIds: relation.nodeIds
          }))
        })),
        otherRelations: data.lightControl.otherRelations.map((relation: NodeRelation) => ({
          tubes: relation.tubes.map((tube: TubeData) => tube.id),
          nodesType: relation.nodesType,
          nodeIds: relation.nodeIds
        }))
      };

      instanceData.addParameter(
        new Parameter('lightControl', lightControlParam, DataType.Object)
      );
    }

    return instanceData;
  }
}