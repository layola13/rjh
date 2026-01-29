import { BaseObject } from './BaseObject';
import { WebCadDocument } from './WebCadDocument';
import { Util } from './Util';

interface EntityParameters {
  materialData: unknown;
}

interface Entity {
  ID: string;
  parameters: EntityParameters;
  getHost(): Entity | null;
  isFlagOff(flag: number): boolean;
}

interface GraphicsObject {
  entityId: string;
  type: number;
  visible: boolean;
  graphicsPath: string;
  mesh: string;
  material: unknown;
}

interface MeshDefinition {
  meshKey: string;
  [key: string]: unknown;
}

interface GraphicsData {
  meshDefs: MeshDefinition[];
  objects: GraphicsObject[];
}

interface BaseGraphicsObject {
  entityId: string;
  type: number;
  visible: boolean;
}

export class ParametricModel extends BaseObject {
  private _webCADDocument: WebCadDocument;
  private parentWebCADDoc: unknown;

  constructor(
    entity: Entity,
    parentWebCADDoc: unknown,
    param3: unknown,
    param4: unknown
  ) {
    super(entity, param3, param4);
    this._webCADDocument = new WebCadDocument();
    this.parentWebCADDoc = parentWebCADDoc;
  }

  onUpdate(): void {
    this._webCADDocument = new WebCadDocument();
  }

  async toGraphicsDataAsync(): Promise<GraphicsData> {
    const entity = this.entity as Entity;
    const host = entity.getHost();
    
    const baseObject: BaseGraphicsObject = {
      entityId: entity.ID,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden) || 
               (host && host.isFlagOff(HSCore.Model.EntityFlagEnum.hidden))
    };

    const graphicsData = await this._webCADDocument.getGraphicsDataAsync();
    const meshData = graphicsData || [];

    return meshData.reduce((accumulator: GraphicsData, meshDef: MeshDefinition) => {
      accumulator.meshDefs.push(
        Util.applyMaterialToUV(meshDef, entity.parameters.materialData)
      );

      const material = Util.getMaterialObject(entity.parameters.materialData);

      accumulator.objects.push({
        ...baseObject,
        graphicsPath: `${baseObject.entityId}/${meshDef.meshKey}`,
        mesh: meshDef.meshKey,
        material
      });

      return accumulator;
    }, {
      meshDefs: [],
      objects: []
    });
  }

  toGraphicsData(): GraphicsData {
    const entity = this.entity as Entity;
    const host = entity.getHost();
    
    const baseObject: BaseGraphicsObject = {
      entityId: entity.ID,
      type: HSConstants.GraphicsObjectType.Mesh,
      visible: entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden) || 
               (host && host.isFlagOff(HSCore.Model.EntityFlagEnum.hidden))
    };

    return this._webCADDocument.getGraphicsData().reduce((accumulator: GraphicsData, meshDef: MeshDefinition) => {
      accumulator.meshDefs.push(
        Util.applyMaterialToUV(meshDef, entity.parameters.materialData)
      );

      const material = Util.getMaterialObject(entity.parameters.materialData);

      accumulator.objects.push({
        ...baseObject,
        graphicsPath: `${baseObject.entityId}/${meshDef.meshKey}`,
        mesh: meshDef.meshKey,
        material
      });

      return accumulator;
    }, {
      meshDefs: [],
      objects: []
    });
  }

  onFlagChanged(flag: unknown): void {
    // Implementation placeholder
  }
}