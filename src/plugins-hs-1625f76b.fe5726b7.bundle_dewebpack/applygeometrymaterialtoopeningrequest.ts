interface Entity {
  metadata: unknown;
  swing?: unknown;
  anchor?: unknown;
  anchorAxis?: unknown;
  angle?: unknown;
  isOpened?: boolean;
  indent?: unknown;
  Class: string;
  getMaterialList(): Array<[string, unknown]> | null;
  getPocket(): unknown;
  getWindowSill(): unknown;
}

interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): Request;
  commit(request: Request): void;
}

interface RequestManager {
  createRequest(requestType: string, args: unknown[]): Request;
  complete(request: Request): void;
}

interface Context {
  transManager: TransactionManager;
}

interface Request {
  append(request: Request): void;
}

declare const HSFPConstants: {
  RequestType: {
    ReplaceProduct: string;
    ApplyGeometryMaterialToPocket: string;
    ApplyGeometryMaterialToSill: string;
    ApplyGeometryMaterialToOpening: string;
  };
};

declare const HSCore: {
  Transaction: {
    Common: {
      CompositeRequest: new (...args: unknown[]) => Request;
    };
  };
  Model: {
    Window: new (...args: unknown[]) => Entity;
  };
};

declare const HSApp: {
  Cmd: {
    Command: new (...args: unknown[]) => {
      context: Context;
      mgr: RequestManager;
      entity: Entity;
    };
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
  show(message: string, duration: number, position: undefined, options: { canclose: boolean }): void;
};

declare const ResourceManager: {
  getString(key: string): string;
};

export class ApplyGeometryMaterialToOpeningRequest extends HSCore.Transaction.Common.CompositeRequest {
  private templateEntity: Entity;
  private entities: Entity[];

  constructor(templateEntity: Entity, entities: Entity[]) {
    super();
    this.templateEntity = templateEntity;
    this.entities = entities;
  }

  onCommit(): void {
    const templateEntity = this.templateEntity;
    const metadata = templateEntity.metadata;
    const materialList = templateEntity.getMaterialList();

    this.entities.forEach((entity) => {
      this.append(
        this.mgr.createRequest(HSFPConstants.RequestType.ReplaceProduct, [
          entity,
          metadata,
          { isSmartReplace: true },
        ])
      );

      const baseRequest = super.onCommit?.call(this, []);
      
      if (baseRequest) {
        baseRequest.swing = entity.swing;
        baseRequest.anchor = entity.anchor;
        baseRequest.anchorAxis = entity.anchorAxis;
        baseRequest.angle = entity.angle;
        baseRequest.isOpened = entity.isOpened;
        baseRequest.indent = templateEntity.indent;

        if (materialList) {
          materialList.forEach(([materialKey, materialValue]) => {
            (baseRequest as unknown as { setMaterial: (key: string, value: unknown) => void }).setMaterial(
              materialKey,
              materialValue
            );
          });
        }

        if (templateEntity.getPocket()) {
          const pocketRequest = this.mgr.createRequest(
            HSFPConstants.RequestType.ApplyGeometryMaterialToPocket,
            [templateEntity, [baseRequest]]
          );
          this.append(pocketRequest);
          super.onCommit?.call(this, []);
        }

        if (
          templateEntity instanceof HSCore.Model.Window &&
          templateEntity.getWindowSill()
        ) {
          const sillRequest = this.mgr.createRequest(
            HSFPConstants.RequestType.ApplyGeometryMaterialToSill,
            [templateEntity, [baseRequest]]
          );
          this.append(sillRequest);
          super.onCommit?.call(this, []);
        }
      }
    });
  }
}

export default class ApplyGeometryMaterialToOpeningCommand extends HSApp.Cmd.Command {
  private entity: Entity;

  constructor(entity: Entity) {
    super();
    this.entity = entity;
  }

  onExecute(entities?: Entity[]): void {
    const entity = this.entity;

    if (entities && Array.isArray(entities) && entities.length > 0) {
      const transactionManager = this.context.transManager;
      const request = transactionManager.createRequest(
        HSFPConstants.RequestType.ApplyGeometryMaterialToOpening,
        [entity, entities]
      );
      transactionManager.commit(request);
    }

    this.showLiveHint();
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }

  private showLiveHint(): void {
    let messageKey: string | undefined;

    switch (this.entity.Class) {
      case HSConstants.ModelClass.NgDoor:
        messageKey = "plugin_contentstyler_door_pocket_applied";
        break;
      case HSConstants.ModelClass.NgWindow:
        messageKey = "plugin_contentstyler_window_pocket_applied";
        break;
      case HSConstants.ModelClass.NgHole:
        messageKey = "plugin_contentstyler_hole_pocket_applied";
        break;
    }

    if (messageKey) {
      LiveHint.show(ResourceManager.getString(messageKey), 8000, undefined, {
        canclose: true,
      });
    }
  }
}