import { BaseStrategy } from './BaseStrategy';

interface ProfileData {
  [key: string]: unknown;
}

interface MaterialData {
  [key: string]: unknown;
}

interface SuckResult {
  profileData: ProfileData;
  materialData: MaterialData;
  error: number;
}

interface ApplyParameters {
  profileData: ProfileData;
  materialData: MaterialData;
  error: number;
}

interface UndoRedoData {
  moldingParameters: ApplyParameters;
}

interface EntityContext {
  entity: HSCore.Model.Cornice | unknown;
}

declare namespace HSCore {
  namespace Model {
    class Cornice {
      metadata: ProfileData;
      type: string;
      getMaterial(): Material.Material;
      getHost(): unknown;
    }
  }

  namespace Material {
    class Material {
      static create(data: MaterialData): Material;
      getMaterialData(): MaterialData;
    }
  }

  namespace Util {
    namespace Molding {
      function createFromType(type: string): Molding;
      function dirtyNeighborMoldingsByFacetype(host: unknown, type: string): void;
    }
  }
}

interface Molding {
  material: HSCore.Material.Material;
  initByMeta(metadata: ProfileData): void;
  assignTo(host: unknown): void;
}

interface Host {
  addMolding(molding: Molding): void;
}

export default class CornicesStrategy extends BaseStrategy {
  get ClassName(): string {
    return "CornicesStrategy";
  }

  isSuckable(context: EntityContext): boolean {
    return context.entity instanceof HSCore.Model.Cornice;
  }

  suck(context: EntityContext): SuckResult | undefined {
    const entity = context.entity;
    if (entity instanceof HSCore.Model.Cornice) {
      return {
        profileData: _.cloneDeep(entity.metadata),
        materialData: entity.getMaterial().getMaterialData(),
        error: -1
      };
    }
  }

  isAppliable(context: EntityContext, parameters: ApplyParameters | null): boolean {
    return !!(context.entity instanceof HSCore.Model.Cornice && parameters);
  }

  apply(context: EntityContext, parameters: ApplyParameters): Molding | null {
    const entity = context.entity;
    if (entity instanceof HSCore.Model.Cornice) {
      const { profileData, materialData } = parameters;
      const host = entity.getHost() as Host;
      const moldingType = entity.type;
      const material = HSCore.Material.Material.create(materialData);
      const molding = HSCore.Util.Molding.createFromType(moldingType);
      
      molding.initByMeta(profileData);
      molding.material = material;
      molding.assignTo(host);
      host.addMolding(molding);
      HSCore.Util.Molding.dirtyNeighborMoldingsByFacetype(host, moldingType);
      
      return molding;
    }
    return null;
  }

  getUndoData(context: EntityContext): UndoRedoData {
    return this._getUndoRedoData(context);
  }

  getRedoData(context: EntityContext): UndoRedoData {
    return this._getUndoRedoData(context);
  }

  undo(context: EntityContext, data: UndoRedoData): void {
    const { moldingParameters } = data;
    this.apply(context, moldingParameters);
  }

  redo(context: EntityContext, data: UndoRedoData): void {
    const { moldingParameters } = data;
    this.apply(context, moldingParameters);
  }

  private _getUndoRedoData(context: EntityContext): UndoRedoData {
    const entity = context.entity as HSCore.Model.Cornice;
    return {
      moldingParameters: {
        profileData: _.cloneDeep(entity.metadata),
        materialData: entity.getMaterial().getMaterialData(),
        error: -1
      }
    };
  }
}