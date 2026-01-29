interface Entity {
  material?: Material;
  getMaterial(meshName?: string): Material | undefined;
  getMaterialByMeshName(meshName: string): Material | undefined;
}

interface Material {
  [key: string]: unknown;
}

interface SuckParams {
  entity: Entity;
  meshName: string;
}

interface ApplyParams {
  entity: unknown;
}

interface SuckResult {
  materialData: unknown;
}

declare namespace HSCore {
  namespace Model {
    class DAssembly {}
    class DExtruding {}
    class DMolding {}
    class DSweep {}
  }
  namespace Doc {
    function getDocManager(): DocumentManager;
  }
}

declare namespace HSApp {
  namespace Util {
    namespace Content {
      function isCustomModel(entity: unknown): boolean;
    }
  }
}

declare namespace HSFPConstants {
  enum RequestType {
    ProxyMaterialBrushRequest = 'ProxyMaterialBrushRequest'
  }
}

interface TransactionManager {
  createRequest(type: HSFPConstants.RequestType, args: unknown[]): Request;
  commitAsync(request: Request): void;
}

interface DocumentManager {
  transManager: TransactionManager;
}

interface Request {
  [key: string]: unknown;
}

abstract class BaseStrategy {
  protected abstract _getMaterialData(material: Material): unknown;
}

export default class CabinetMaterialStrategy extends BaseStrategy {
  private readonly _dependencies: unknown;
  public readonly type = 'CabinetMaterialStrategy';

  constructor(dependencies: unknown) {
    super();
    this._dependencies = dependencies;
  }

  /**
   * Check if the entity is a valid type for this strategy
   */
  public isVailableEnt(entity: unknown): boolean {
    if (!entity) {
      return false;
    }
    return (
      entity instanceof HSCore.Model.DAssembly ||
      entity instanceof HSCore.Model.DExtruding ||
      entity instanceof HSCore.Model.DMolding ||
      entity instanceof HSCore.Model.DSweep
    );
  }

  /**
   * Check if material can be extracted from the entity
   */
  public isSuckable(params: SuckParams): boolean {
    const { entity, meshName } = params;
    
    if (!HSApp.Util.Content.isCustomModel(entity)) {
      return false;
    }
    
    const hasMaterial = !!(
      entity.material ||
      entity.getMaterial() ||
      entity.getMaterialByMeshName(meshName)
    );
    
    return hasMaterial;
  }

  /**
   * Extract material data from the entity
   */
  public suck(params: SuckParams): SuckResult | undefined {
    const { entity, meshName } = params;
    
    if (!entity || !meshName) {
      return undefined;
    }
    
    let material = entity.material || entity.getMaterial(meshName);
    
    if (!material) {
      material = entity.getMaterialByMeshName(meshName);
    }
    
    return {
      materialData: material ? this._getMaterialData(material) : undefined
    };
  }

  /**
   * Check if material can be applied to the entity
   */
  public isAppliable(params: ApplyParams): boolean {
    const { entity } = params;
    return this.isVailableEnt(entity);
  }

  /**
   * Apply material to the entity
   */
  public apply(): void {
    // Implementation not provided in source
  }

  /**
   * Commit material brush request to transaction manager
   */
  public commitRequest(arg1: unknown, arg2: unknown): void {
    const transactionManager = HSCore.Doc.getDocManager().transManager;
    const request = transactionManager.createRequest(
      HSFPConstants.RequestType.ProxyMaterialBrushRequest,
      [arg1, arg2]
    );
    transactionManager.commitAsync(request);
  }

  protected _getMaterialData(material: Material): unknown {
    // Abstract method implementation required
    throw new Error('_getMaterialData must be implemented');
  }
}