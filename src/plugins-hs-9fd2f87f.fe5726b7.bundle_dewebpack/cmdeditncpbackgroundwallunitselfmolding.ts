import { HSCore } from '../core';
import { Line3d, Coordinate3 } from '../geometry';

interface SelfMoldingInfo {
  coord: Coordinate3;
  faceTag: string;
  flip: boolean;
  flipX: boolean;
  flipY: boolean;
  offsetX: number;
  offsetY: number;
  path: Line3d[];
  profileHeight: number;
  profileWidth: number;
  materialData: unknown;
  selfMoldingType: string;
  offset: number;
}

interface SelfMoldingEventData {
  moldingType?: string;
  moldingInfo?: SelfMoldingInfo;
  meta?: Product;
}

interface Product {
  attributes: Array<{
    id: string;
    free: string[];
  }>;
  profileSizeX?: number;
  profileSizeY?: number;
  userFreeData?: {
    materialMeta?: {
      seekId: string;
    };
  };
}

interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): unknown;
  commit(request: unknown): void;
}

interface CatalogManager {
  getProductBySeekId(seekId: string): Promise<Product>;
}

interface WallMoldingPlugin {
  getDefaultCorniceMaterial(): Promise<unknown>;
}

interface PluginManager {
  getPlugin(pluginType: string): WallMoldingPlugin;
}

interface AppContext {
  transManager: TransactionManager;
}

interface App {
  catalogManager: CatalogManager;
  pluginManager: PluginManager;
  signalPropertyBarRefresh: {
    dispatch(): void;
  };
}

declare namespace HSApp {
  namespace App {
    function getApp(): App;
  }
  namespace Cmd {
    class Command {
      context: AppContext;
    }
  }
}

declare namespace HSFPConstants {
  enum RequestType {
    EditNCPBackgroundWallUnitSelfMolding = 'EditNCPBackgroundWallUnitSelfMolding'
  }
  enum PluginType {
    WallMolding = 'WallMolding'
  }
  enum LogGroupTypes {
    ParametricBackgroundWallUnit = 'ParametricBackgroundWallUnit'
  }
}

export class CmdEditNCPBackgroundWallUnitSelfMolding extends HSApp.Cmd.Command {
  private _content: HSCore.Model.NCPBackgroundWallUnit;
  private _requestType: string;
  private _request: unknown;

  constructor(content: HSCore.Model.NCPBackgroundWallUnit) {
    super();
    this._content = content;
    this._requestType = HSFPConstants.RequestType.EditNCPBackgroundWallUnitSelfMolding;
    this._request = undefined;
  }

  private _commitRequest(): void {
    this.context.transManager.commit(this._request);
  }

  onReceive(eventName: string, eventData: SelfMoldingEventData): boolean {
    const transManager = this.context.transManager;

    switch (eventName) {
      case 'onSelfMoldingOpen':
        this.onSelfMoldingOpen(eventName, eventData.moldingType!);
        return true;

      case 'onSelfMoldingClose':
        this._request = transManager.createRequest(this._requestType, [
          this._content,
          eventName,
          { moldingType: eventData.moldingType }
        ]);
        this._commitRequest();
        HSApp.App.getApp().signalPropertyBarRefresh.dispatch();
        return true;

      case 'onSelfMoldingReset':
        this._request = transManager.createRequest(this._requestType, [
          this._content,
          eventName
        ]);
        this._commitRequest();
        HSApp.App.getApp().signalPropertyBarRefresh.dispatch();
        return true;
    }

    return super.onReceive?.(eventName, eventData) ?? false;
  }

  onSelfMoldingOpen(eventName: string, moldingType: string): void {
    if (!(this._content instanceof HSCore.Model.NCPBackgroundWallUnit)) {
      return;
    }

    const catalogManager = HSApp.App.getApp().catalogManager;
    const MOLDING_PRODUCT_SEEK_ID = 'e0b094c5-512d-4958-a946-f22e57937fb7';

    catalogManager.getProductBySeekId(MOLDING_PRODUCT_SEEK_ID).then((product: Product) => {
      const content = this._content;
      const halfWidth = content.XSize / 2;
      const halfDepth = content.YSize / 2;
      const height = content.ZSize;

      let pathLine: Line3d | undefined;
      let coordinate: Coordinate3 | undefined;

      if (moldingType === 'left') {
        pathLine = new Line3d(
          { x: -halfWidth, y: -halfDepth, z: height },
          { x: -halfWidth, y: -halfDepth, z: 0 }
        );
        coordinate = new Coordinate3(
          { x: -halfWidth, y: -halfDepth, z: height },
          { x: 1, y: 0, z: 0 },
          { x: 0, y: -1, z: 0 }
        );
      } else if (moldingType === 'right') {
        pathLine = new Line3d(
          { x: halfWidth, y: -halfDepth, z: 0 },
          { x: halfWidth, y: -halfDepth, z: height }
        );
        coordinate = new Coordinate3(
          { x: halfWidth, y: -halfDepth, z: height },
          { x: -1, y: 0, z: 0 },
          { x: 0, y: -1, z: 0 }
        );
      }

      if (!pathLine || !coordinate) {
        return;
      }

      const offsetAttribute = product.attributes.find(attr => attr.id === 'attr-attr-Offset');
      const offset = offsetAttribute ? Number(offsetAttribute.free[0]) : 0;

      const pluginManager = HSApp.App.getApp().pluginManager;
      const wallMoldingPlugin = pluginManager.getPlugin(HSFPConstants.PluginType.WallMolding);

      const materialPromise = product.userFreeData?.materialMeta
        ? catalogManager.getProductBySeekId(product.userFreeData.materialMeta.seekId)
        : wallMoldingPlugin.getDefaultCorniceMaterial();

      materialPromise.then((material: unknown) => {
        const materialData = HSCore.Material.Util.getMaterialData(material);

        const DEFAULT_PROFILE_SIZE = 0.06;
        const moldingInfo: SelfMoldingInfo = {
          coord: coordinate,
          faceTag: '',
          flip: false,
          flipX: false,
          flipY: false,
          offsetX: 0,
          offsetY: 0,
          path: [pathLine],
          profileHeight: product.profileSizeY ?? DEFAULT_PROFILE_SIZE,
          profileWidth: product.profileSizeX ?? DEFAULT_PROFILE_SIZE,
          materialData,
          selfMoldingType: moldingType,
          offset
        };

        const transManager = this.context.transManager;
        this._request = transManager.createRequest(this._requestType, [
          this._content,
          eventName,
          {
            moldingInfo,
            meta: product,
            moldingType
          }
        ]);

        this._commitRequest();
        HSApp.App.getApp().signalPropertyBarRefresh.dispatch();
      });
    });
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ParametricBackgroundWallUnit;
  }

  getDescription(): string {
    return '编辑参数化背景墙单元左右线条';
  }
}