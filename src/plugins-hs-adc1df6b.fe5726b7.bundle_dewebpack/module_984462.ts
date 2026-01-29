abstract class Request {
  abstract onCommit(): void;
  abstract onUndo(): void;
  abstract onRedo(): void;
}

interface ContentInfo {
  userFreeData: {
    materialMeta?: unknown;
  };
  profileSizeX?: number;
  profileSizeY?: number;
}

interface Face {
  getMolding(type: MoldingType): WallMolding[] | null;
  removeMolding(molding: WallMolding): void;
  addMolding(molding: WallMolding): void;
}

type MoldingType = number;

interface WallMolding {
  type: MoldingType;
  metadata: {
    profileSizeX: number;
    profileSizeY: number;
  };
  material: Material;
  assignTo(face: Face): void;
  initByMeta(meta: ContentInfo): void;
  dirtyNeighborMoldingsByFacetype(): void;
}

interface WallBoardBaseboard extends WallMolding {}
interface WallBoardWaistLine extends WallMolding {}

interface Material {
  // Material interface definition
}

declare namespace HSCore {
  namespace Model {
    const WallBoardBaseboard: new (...args: unknown[]) => WallBoardBaseboard;
    const WallBoardWaistLine: new (...args: unknown[]) => WallBoardWaistLine;
    
    namespace WallMolding {
      function isValidMoldingType(type: MoldingType): boolean;
    }
    
    enum MoldingTypeEnum {
      WallBoardBaseboard = 0,
      // Add other enum values as needed
    }
  }
  
  namespace Material {
    namespace Material {
      function create(meta: unknown): Material;
    }
  }
  
  namespace Util {
    namespace Molding {
      function createFromType(type: MoldingType): WallMolding;
    }
  }
  
  namespace Transaction {
    class Request {
      abstract onCommit(): void;
      abstract onUndo(): void;
      abstract onRedo(): void;
    }
  }
}

declare namespace HSApp {
  namespace App {
    function getApp(): {
      pluginManager: {
        getPlugin(type: string): {
          getParametricCeilingPresets(): {
            getDefaultMoldingMaterial(): unknown;
          };
        };
      };
    };
  }
}

declare namespace HSFPConstants {
  enum PluginType {
    CustomizedFeatureModel = 'CustomizedFeatureModel',
  }
}

declare function assert(condition: boolean, message: string): void;

/**
 * Command for changing wall molding type
 */
export default class ChangeMoldingTypeCommand extends Request {
  private contentInfo: ContentInfo;
  private face: Face;
  private moldingType: MoldingType;
  private savedEntity?: WallMolding;

  constructor(contentInfo: ContentInfo, face: Face, moldingType: MoldingType) {
    super();
    this.contentInfo = contentInfo;
    this.face = face;
    this.moldingType = moldingType;
    this.savedEntity = undefined;
  }

  onCommit(): void {
    if (HSCore.Model.WallMolding.isValidMoldingType(this.moldingType)) {
      const entity = this._createEntity(this.contentInfo);
      if (entity) {
        this._changeMoldingType(entity);
      }
    } else {
      assert(false, 'invalid molding type');
    }
  }

  onUndo(): void {
    if (this.savedEntity) {
      this._changeMoldingType(this.savedEntity);
    }
  }

  onRedo(): void {
    if (this.savedEntity) {
      this._changeMoldingType(this.savedEntity);
    }
  }

  private _changeMoldingType(entity: WallMolding): void {
    const currentMolding = this.face.getMolding(this.moldingType);
    this.savedEntity = currentMolding?.[0];
    this._addToWall(entity);
  }

  private _addToWall(entity: WallMolding): void {
    if (!entity) {
      return;
    }

    entity.assignTo(this.face);

    if (
      entity instanceof HSCore.Model.WallBoardBaseboard ||
      entity instanceof HSCore.Model.WallBoardWaistLine
    ) {
      const existingMoldings = this.face.getMolding(entity.type);
      existingMoldings?.forEach((molding) => {
        this.face.removeMolding(molding);
      });
    }

    this.face.addMolding(entity);
    entity.dirtyNeighborMoldingsByFacetype();
  }

  private _createEntity(contentInfo: ContentInfo): WallMolding | undefined {
    const existingMoldings = this.face.getMolding(this.moldingType);
    
    if (!existingMoldings || existingMoldings.length === 0) {
      return undefined;
    }

    let material: Material;

    if (contentInfo.userFreeData.materialMeta) {
      material = HSCore.Material.Material.create(contentInfo.userFreeData.materialMeta);
      delete contentInfo.userFreeData.materialMeta;
    } else {
      const defaultMaterialMeta = HSApp.App.getApp()
        .pluginManager.getPlugin(HSFPConstants.PluginType.CustomizedFeatureModel)
        .getParametricCeilingPresets()
        .getDefaultMoldingMaterial();
      material = HSCore.Material.Material.create(defaultMaterialMeta);
    }

    const newEntity = HSCore.Util.Molding.createFromType(this.moldingType);

    if (this.moldingType === HSCore.Model.MoldingTypeEnum.WallBoardBaseboard) {
      contentInfo.profileSizeX = existingMoldings[0].metadata.profileSizeX;
      contentInfo.profileSizeY = existingMoldings[0].metadata.profileSizeY;
    }

    newEntity.initByMeta(contentInfo);
    newEntity.material = material;

    return newEntity;
  }
}