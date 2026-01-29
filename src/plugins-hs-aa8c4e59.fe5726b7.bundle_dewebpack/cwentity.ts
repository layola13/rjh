import { InstanceData, Parameter, DataType } from './321465';
import { ParameterNames } from './242448';
import { AcceptEntity } from './306931';
import { CWPowerSystemEntity } from './947319';
import { CWTubeTreeEntity } from './976259';

interface PowerSystem {
  id: string;
  [key: string]: unknown;
}

interface StrongElec {
  houseHoldCableType: string;
  totalBreakerType: string;
  powerSystems: PowerSystem[];
  parts: unknown;
}

interface Route {
  id: string;
  [key: string]: unknown;
}

interface Terminal {
  routes: Route[];
  category: string;
}

interface WeakElec {
  terminals: Terminal[];
}

interface WaterSystem {
  routes: Route[];
  parts: unknown;
}

interface CWEntityData {
  id: string;
  classType: string;
  parentId: string;
  strongElec?: StrongElec;
  weakElec: WeakElec;
  coldWater: WaterSystem;
  hotWater: WaterSystem;
}

interface StrongElecParameter {
  houseHoldCableType: string;
  totalBreakerType: string;
  powerSystems: string[];
  parts: unknown;
}

interface WeakElecParameter {
  terminals: Array<{
    routes: string[];
    category: string;
  }>;
}

interface WaterSystemParameter {
  routes: string[];
  parts: unknown;
}

export class CWEntity extends AcceptEntity {
  protected buildChildren(data: CWEntityData): void {
    data.strongElec?.powerSystems.forEach((system) => {
      this.addChild(new CWPowerSystemEntity().accept(system));
    });

    data.weakElec.terminals.forEach((terminal) => {
      terminal.routes.forEach((route) => {
        this.addChild(new CWTubeTreeEntity().accept(route));
      });
    });

    data.coldWater.routes.forEach((route) => {
      this.addChild(new CWTubeTreeEntity().accept(route));
    });

    data.hotWater.routes.forEach((route) => {
      this.addChild(new CWTubeTreeEntity().accept(route));
    });
  }

  protected buildEntityData(data: CWEntityData): void {
    this.setInstanceData(this.getInstanceData(data));
    this.setType({
      classType: data.classType
    });
  }

  private getInstanceData(data: CWEntityData): InstanceData {
    const instanceData = new InstanceData(data.id);

    if (data.strongElec) {
      const { houseHoldCableType, totalBreakerType, powerSystems, parts } = data.strongElec;
      const strongElecParam: StrongElecParameter = {
        houseHoldCableType,
        totalBreakerType,
        powerSystems: powerSystems.map((system) => system.id),
        parts
      };
      instanceData.addParameter(
        new Parameter('strongElec', strongElecParam, DataType.Object)
      );
    }

    const weakElecParam: WeakElecParameter = {
      terminals: data.weakElec.terminals.map((terminal) => ({
        routes: terminal.routes.map((route) => route.id),
        category: terminal.category
      }))
    };

    const coldWaterParam: WaterSystemParameter = {
      routes: data.coldWater.routes.map((route) => route.id),
      parts: data.coldWater.parts
    };

    const hotWaterParam: WaterSystemParameter = {
      routes: data.hotWater.routes.map((route) => route.id),
      parts: data.hotWater.parts
    };

    instanceData.addParameter(
      new Parameter(ParameterNames.parentId, data.parentId, DataType.String),
      new Parameter(ParameterNames.layerId, data.parentId, DataType.String),
      new Parameter('weakElec', weakElecParam, DataType.Object),
      new Parameter('coldWater', coldWaterParam, DataType.Object),
      new Parameter('hotWater', hotWaterParam, DataType.Object)
    );

    return instanceData;
  }
}