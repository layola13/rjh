interface Entity {
  ID: string;
  Class: string;
  getPocket(): Pocket;
  addPocket(pocket: Pocket): void;
  removePocket(): void;
  canAddPocket(): boolean;
}

interface PocketMetadata {
  seekId: string;
}

interface Material {
  seekId: string;
  rotation: number;
  clone(): Material;
}

interface Pocket {
  metadata: PocketMetadata;
  material: Material;
  height: number;
  thickness: number;
  outerHeight: number;
  outerThickness: number;
  side: string;
  getMaterial(): Material;
}

interface TransactionManager {
  createRequest(type: string, args: unknown[]): Request;
  commit(request: Request): void;
}

interface Context {
  transManager: TransactionManager;
}

interface Layer {
  forEachOpening(callback: (opening: Entity) => void): void;
}

interface Scene {
  forEachLayer(callback: (layer: Layer) => void): void;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
}

declare const HSCore: {
  Transaction: {
    Request: new () => Request;
  };
  Model: {
    Pocket: {
      create(metadata: PocketMetadata): Pocket;
    };
  };
  Material: {
    Material: {
      create(material: Material): Material;
    };
  };
};

declare const HSApp: {
  App: {
    getApp(): App;
  };
  Cmd: {
    Command: new () => Command;
  };
  PaintPluginHelper: {
    Util: {
      MixPaintUtil?: {
        disconnectFaceGroupWithPrompt(
          entities: Entity[],
          param: undefined,
          callback: () => void
        ): boolean;
      };
    };
  };
};

declare const HSFPConstants: {
  RequestType: {
    ApplyGeometryMaterialToPocket: string;
  };
  LogGroupTypes: {
    ContentOperation: string;
  };
};

declare const HSConstants: {
  ModelClass: {
    NgDoor: string;
    NgWindow: string;
    NgHole: string;
  };
};

declare const LiveHint: {
  show(
    message: string,
    duration: number,
    param: undefined,
    options: { canclose: boolean }
  ): void;
};

declare const ResourceManager: {
  getString(key: string): string;
};

abstract class Request {}

abstract class Command {
  protected context!: Context;
  protected mgr!: {
    complete(command: Command): void;
  };
}

export class ApplyGeometryMaterialToPocketRequest extends HSCore.Transaction
  .Request {
  private templateEntity: Entity;
  private entities: Entity[];
  private savedPocketMap: Map<string, Pocket | null>;
  private restoredPocketMap: Map<string, Pocket>;

  constructor(templateEntity: Entity, entities: Entity[]) {
    super();
    this.templateEntity = templateEntity;
    this.entities = entities;
    this.savedPocketMap = new Map();
    this.restoredPocketMap = new Map();
  }

  onCommit(): void {
    this.entities.forEach((entity) => {
      const templatePocket = this.templateEntity.getPocket();
      const metadata = templatePocket.metadata;
      const templateMaterial = templatePocket.getMaterial();
      const currentPocket = entity.getPocket();

      this.savedPocketMap.set(entity.ID, currentPocket);

      const newPocket = HSCore.Model.Pocket.create(metadata);
      newPocket.material = HSCore.Material.Material.create(
        templateMaterial.clone()
      );
      newPocket.height = templatePocket.height;
      newPocket.thickness = templatePocket.thickness;
      newPocket.outerHeight = templatePocket.outerHeight;
      newPocket.outerThickness = templatePocket.outerThickness;
      newPocket.side = templatePocket.side;

      entity.addPocket(newPocket);
      this.restoredPocketMap.set(entity.ID, newPocket);
    });
  }

  onUndo(): void {
    this.entities.forEach((entity) => {
      const savedPocket = this.savedPocketMap.get(entity.ID);
      if (savedPocket) {
        entity.addPocket(savedPocket);
      } else {
        entity.removePocket();
      }
    });
  }

  onRedo(): void {
    this.entities.forEach((entity) => {
      const restoredPocket = this.restoredPocketMap.get(entity.ID);
      if (restoredPocket) {
        entity.addPocket(restoredPocket);
      }
    });
  }
}

export default class ApplyGeometryMaterialToPocketCommand extends HSApp.Cmd
  .Command {
  private entity: Entity;

  constructor(entity: Entity) {
    super();
    this.entity = entity;
  }

  onExecute(entities?: Entity[]): void {
    const templateEntity = this.entity;

    if (!entities) {
      entities = [];
      HSApp.App.getApp().floorplan.scene.forEachLayer((layer) => {
        layer.forEachOpening((opening) => {
          if (
            opening.Class === templateEntity.Class &&
            opening.canAddPocket() &&
            opening.ID !== templateEntity.ID
          ) {
            entities!.push(opening);
          }
        });
      });
    }

    const filteredEntities = entities.filter((entity) => {
      const currentPocket = entity.getPocket();
      if (currentPocket) {
        const currentMetadata = currentPocket.metadata;
        const currentMaterial = currentPocket.getMaterial();
        const templatePocket = templateEntity.getPocket();
        const templateMetadata = templatePocket.metadata;
        const templateMaterial = templatePocket.getMaterial();

        if (
          currentMetadata.seekId === templateMetadata.seekId &&
          currentMaterial.seekId === templateMaterial.seekId &&
          currentMaterial.rotation === templateMaterial.rotation &&
          currentPocket.height === templatePocket.height &&
          currentPocket.thickness === templatePocket.thickness &&
          currentPocket.outerHeight === templatePocket.outerHeight &&
          currentPocket.outerThickness === templatePocket.outerThickness &&
          currentPocket.side === templatePocket.side
        ) {
          return false;
        }
      }
      return true;
    });

    if (filteredEntities.length) {
      const executeCommit = (): void => {
        const transManager = this.context.transManager;
        const request = transManager.createRequest(
          HSFPConstants.RequestType.ApplyGeometryMaterialToPocket,
          [templateEntity, filteredEntities]
        );
        transManager.commit(request);
      };

      const mixPaintUtil = HSApp.PaintPluginHelper.Util.MixPaintUtil;
      if (
        mixPaintUtil &&
        !mixPaintUtil.disconnectFaceGroupWithPrompt(
          filteredEntities,
          undefined,
          executeCommit.bind(this)
        )
      ) {
        executeCommit();
      } else if (!mixPaintUtil) {
        executeCommit();
      }
    }

    this.showLiveHint();
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }

  showLiveHint(): void {
    let messageKey: string | undefined;

    switch (this.entity.Class) {
      case HSConstants.ModelClass.NgDoor:
        messageKey = "plugin_contentstyler_door_pocket_applied_all";
        break;
      case HSConstants.ModelClass.NgWindow:
        messageKey = "plugin_contentstyler_window_pocket_applied_all";
        break;
      case HSConstants.ModelClass.NgHole:
        messageKey = "plugin_contentstyler_hole_pocket_applied_all";
        break;
    }

    if (messageKey) {
      LiveHint.show(ResourceManager.getString(messageKey), 8000, undefined, {
        canclose: true,
      });
    }
  }

  getDescription(): string {
    return "应用几何材质到套线";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}