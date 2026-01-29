import { getSelectedInJSON } from './utils/selection';
import { HSApp } from './core/app';
import { HSFPConstants } from './constants';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Offset {
  x: number;
  y: number;
}

interface Entity {
  id: string;
  seekId: string;
  x: number;
  y: number;
  z: number;
}

interface ContentsJSON {
  environmentId: string;
  viewMode: string;
  data: Entity[];
}

interface Product {
  id: string;
  seekId: string;
}

interface FloorPlan {
  [key: string]: unknown;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(type: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface TransactionSession {
  commit(): void;
}

interface TransactionRequest {
  [key: string]: unknown;
}

interface Context {
  transManager: TransactionManager;
}

interface CatalogManager {
  getProductBySeekId(seekId: string): Promise<Product>;
}

interface App {
  floorplan: FloorPlan;
  activeEnvironmentId: string;
  primaryViewMode: string;
  catalogManager: CatalogManager;
}

interface Manager {
  complete(cmd: unknown): void;
}

const PASTE_ERROR_DURATION = 3000;

export default class CmdArrayPasteEntity extends HSApp.Cmd.Implement.CmdBaseArray {
  private entities: Entity[];
  private offset: Offset;
  private arrayNum: number;
  private app: App;
  private context: Context;
  private mgr: Manager;

  constructor(entities: Entity[], arrayConfig: { offset: Offset; arrayNum: number }) {
    super(entities, arrayConfig);
    this.entities = entities;
    this.offset = arrayConfig.offset;
    this.arrayNum = arrayConfig.arrayNum;
  }

  pasteEntityArray(): void {
    const contentsJSON = getSelectedInJSON(this.entities);
    
    if (!contentsJSON) {
      return;
    }

    if (this.isNotCurrentViewMode(contentsJSON.environmentId, contentsJSON.viewMode)) {
      LiveHint.show(
        ResourceManager.getString('cross_view_mode_paste_livehint'),
        PASTE_ERROR_DURATION,
        undefined,
        { canclose: false }
      );
      return;
    }

    let validEntities = contentsJSON.data.filter((dataEntity) =>
      this.entities.find((entity) => dataEntity.id === entity.id)
    );

    const catalogManager = HSApp.App.getApp().catalogManager;
    const productPromises = validEntities.map((entity) =>
      catalogManager.getProductBySeekId(entity.seekId).catch(() => Promise.resolve(undefined))
    );

    Promise.all(productPromises)
      .then((products) => {
        const productsMap = new Map<string, Product>();
        products.forEach((product) => {
          if (product) {
            productsMap.set(product.id, product);
          }
        });
        this.addContents(validEntities, contentsJSON, productsMap);
      })
      .catch((error) => {
        console.assert(false, `array content failed! Error: ${error}`);
      });
  }

  private addContents(
    entities: Entity[],
    contentsJSON: ContentsJSON,
    productsMap: Map<string, Product>
  ): void {
    const floorplan = this.app.floorplan;
    const session = this.context.transManager.startSession();

    for (let i = 0; i < this.arrayNum; i++) {
      const currentOffset = this.getOffset(this.offset, i + 1);
      entities.forEach((entity) => {
        const offsetPosition = this.offsetPosition(entity, currentOffset);
        this.addContent(entity, contentsJSON, floorplan, productsMap, offsetPosition);
      });
    }

    session.commit();
    this.mgr.complete(this);
  }

  private addContent(
    dataContent: Entity,
    contentsJSON: ContentsJSON,
    floorplan: FloorPlan,
    productsMap: Map<string, Product>,
    position: Position
  ): void {
    const request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.PasteContent,
      [
        {
          dataContent,
          contentsJSON,
          floorplan,
          productsMap,
          position,
          entity: this.entities[0],
        },
      ]
    );
    this.context.transManager.commit(request);
  }

  private offsetPosition(entity: Entity, offset: Offset): Position {
    return {
      x: entity.x + offset.x,
      y: entity.y + offset.y,
      z: entity.z,
    };
  }

  private getOffset(baseOffset: Offset, multiplier: number): Offset {
    return {
      x: baseOffset.x * multiplier,
      y: baseOffset.y * multiplier,
    };
  }

  private isNotCurrentViewMode(environmentId: string, viewMode: string): boolean {
    return this.getEnvId() !== environmentId || this.getViewMode() !== viewMode;
  }

  private getEnvId(): string {
    return this.app.activeEnvironmentId;
  }

  private getViewMode(): string {
    return this.app.primaryViewMode;
  }

  getDescription(): string {
    return '阵列灯具';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}