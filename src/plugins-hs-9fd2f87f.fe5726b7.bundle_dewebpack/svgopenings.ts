import { SvgBase } from './SvgBase';
import { SvgMinimapContext } from './SvgMinimapContext';
import { Util } from './Util';

interface OpeningEntity {
  ID: string;
  id: string;
  x: number;
  y: number;
  rotation: number;
  swing: string;
  XSize: number;
  YSize: number;
  topView?: string;
  bottomProfile: unknown;
  instanceOf(className: string): boolean;
  getHost(): WallEntity | null;
}

interface WallEntity {
  width: number;
  instanceOf(className: string): boolean;
}

interface LayersNode {
  openings: SvgNode;
}

interface SvgNode {
  group(): SvgNode;
  path(data: string): SvgNode;
  svg(content: string): SvgNode;
  move(x: number, y: number): SvgNode;
  transform(options: TransformOptions): SvgNode;
  fill(color: string): SvgNode;
  id(identifier: string): SvgNode;
  add(node: SvgNode): void;
}

interface TransformOptions {
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  cx?: number;
  cy?: number;
}

interface FloorplanApp {
  floorplan: {
    scene: {
      activeLayer: {
        openings: Record<string, OpeningEntity>;
      };
    };
    globalWallWidth: number;
  };
}

interface PageSetting {
  backgroundColor: string;
  door: { visible: boolean; lineWidth: number; lineColor: string };
  window: { visible: boolean; lineWidth: number; lineColor: string };
  entry: { lineWidth: number; lineColor: string };
}

interface SvgContext {
  layers(): LayersNode;
  pageSetting(): PageSetting;
  getWallsMask(): SvgNode;
  getUnitPerPixel(): number;
  getWallModelWidth(wall?: WallEntity): number;
  _withPaint?: boolean;
}

interface SvgData {
  background?: string;
  base?: string | ((color: string, lineWidth: number) => string);
  swing?: string | ((color: string, lineWidth: number) => string);
  height?: number;
  width?: number;
}

interface OpeningMobileSvgs {
  window: SvgData;
  hole: SvgData;
  door: SvgData;
  entry: SvgData;
}

interface SvgResourceManager {
  lookupSvg(path: string): SvgData | null;
  lookupSvgByName(name: string): SvgData | null;
  buildOpeinings(ctx: SvgContext): void;
}

declare const HSConstants: {
  ModelClass: {
    NgOpening: string;
    NgWindow: string;
    NgHole: string;
    NgDoor: string;
    NgWall: string;
  };
};

declare const HSCore: {
  Model: {
    Door: new (...args: unknown[]) => unknown;
    Opening: {
      SWING_SCALE_TABLE: Record<string, { x: number; y: number }>;
    };
  };
  Util: {
    Content: {
      isWallNiche(entity: OpeningEntity): boolean;
    };
  };
};

declare const HSApp: {
  Util: {
    Opening: {
      isWindow(entity: OpeningEntity): boolean;
    };
  };
};

class SvgResourceManagerSingleton {
  private static instance: SvgResourceManager;

  static get(): SvgResourceManager {
    if (!this.instance) {
      throw new Error('SvgResourceManager not initialized');
    }
    return this.instance;
  }

  static OpeningMobileSvgs: OpeningMobileSvgs;
}

export class SvgOpenings extends SvgBase {
  private _openings: Opening[];
  private _node: SvgNode;

  constructor(app: FloorplanApp, ctx: SvgContext) {
    super(app, ctx);
    this._openings = [];
    this._node = ctx.layers().openings;
  }

  build(): void {
    Object.values((this._app as FloorplanApp).floorplan.scene.activeLayer.openings).forEach((entity) => {
      if (this.isItemValid(entity) && !this._isOpeningHidden(entity)) {
        const opening = this._createOpening(entity);
        if (opening) {
          opening.build();
          this._openings.push(opening);
        }
      }
    });

    if (this._openings.length > 0) {
      SvgResourceManagerSingleton.get().buildOpeinings(this._ctx as SvgContext);
    }
  }

  draw(): void {
    this._openings.forEach((opening) => {
      opening.draw();
    });
  }

  exportM(): void {
    this.build();
    this._openings.forEach((opening) => {
      opening.drawM();
    });
  }

  private _createOpening(entity: OpeningEntity): Opening | null {
    if (entity.instanceOf(HSConstants.ModelClass.NgOpening)) {
      let type = 'opening';
      if (entity.instanceOf(HSConstants.ModelClass.NgWindow)) {
        type = 'window';
      } else if (entity.instanceOf(HSConstants.ModelClass.NgHole)) {
        type = 'hole';
      } else if (entity.instanceOf(HSConstants.ModelClass.NgDoor)) {
        type = 'door';
      }

      return new Opening(
        this._app as FloorplanApp,
        this._ctx as SvgContext,
        entity,
        this._node.group().id(`${type}_${entity.ID}`)
      );
    }
    return null;
  }

  private _isOpeningHidden(entity: OpeningEntity): boolean {
    const settings = (this._ctx as SvgContext).pageSetting();
    return (
      (!settings.door.visible && entity instanceof HSCore.Model.Door) ||
      (!settings.window.visible && HSApp.Util.Opening.isWindow(entity))
    );
  }
}

class Opening extends SvgBase {
  private _entity: OpeningEntity;
  private _node: SvgNode;
  private _background: SvgNode;
  private _base: SvgNode;
  private _swing: SvgNode;
  private _paints: unknown[];

  constructor(app: FloorplanApp, ctx: SvgContext, entity: OpeningEntity, node: SvgNode) {
    super(app, ctx);
    this._entity = entity;
    this._node = node;
    this._background = node.group();
    this._base = node.group().id('base');
    this._swing = node.group().id('swing');
    this._paints = [];
  }

  draw(): void {
    if (!this._entity || !this._node) {
      return;
    }

    this._paints.forEach((paint: any) => {
      paint.draw();
    });

    const topView = this._entity.topView;
    const isTransparentBackground = (this._ctx as SvgContext).pageSetting().backgroundColor === 'transparent';

    if (isTransparentBackground) {
      const pathData = Util.loop2SVG(this._entity.bottomProfile, this.unitScale());
      const pathElement = this._node.path(pathData).id(`opening_path_${this._entity.id}`).fill('black');
      (this._ctx as SvgContext).getWallsMask().add(pathElement);

      if (!topView) {
        return;
      }
    }

    const viewPath = topView && !(this._ctx as SvgContext)._withPaint ? topView : 'HSCore.Model.Hole';
    let svgData = SvgResourceManagerSingleton.get().lookupSvg(viewPath);

    if (!svgData) {
      let fileName = viewPath.split('/').pop() ?? '';
      if (fileName === 'bay_window' && isTransparentBackground) {
        fileName = 'bay_window_transparent';
      }
      svgData = SvgResourceManagerSingleton.get().lookupSvgByName(fileName);
      if (!svgData) {
        return;
      }
    }

    const backgroundSvg = svgData.background ?? '';
    const baseSvg = svgData.base ?? '';
    const swingSvg = svgData.swing ?? '';

    this._background.svg(backgroundSvg);
    this._base.svg(typeof baseSvg === 'string' ? baseSvg : '');
    this._swing.svg(typeof swingSvg === 'string' ? swingSvg : '');

    const scale = this.unitScale();
    const swingScale = HSCore.Model.Opening.SWING_SCALE_TABLE[this._entity.swing];

    this._node.move(this._entity.x * scale, -this._entity.y * scale);
    this._node.transform({ rotation: this._entity.rotation, cx: 0, cy: 0 });
    this._node.transform({ scaleX: swingScale.x, scaleY: swingScale.y, cx: 0, cy: 0 });

    let wallWidth = (this._app as FloorplanApp).floorplan.globalWallWidth;
    if (HSCore.Util.Content.isWallNiche(this._entity)) {
      wallWidth = this._entity.YSize;
    } else {
      const host = this._entity.getHost();
      wallWidth = host?.instanceOf(HSConstants.ModelClass.NgWall) ? host.width : this._entity.YSize;
    }

    const widthScale = (this._entity.XSize * scale) / 100;
    const heightScale = (wallWidth * scale) / 20;
    const swingYOffset = 10 * (heightScale - widthScale);

    this._swing.move(0, swingYOffset);
    this._background.transform({ scaleX: widthScale, scaleY: heightScale, cx: 0, cy: 0 });
    this._base.transform({ scaleX: widthScale, scaleY: heightScale, cx: 0, cy: 0 });
    this._swing.transform({ scaleX: widthScale, scaleY: widthScale, cx: 0, cy: 0 });
  }

  build(): void {
    // Build implementation
  }

  drawM(): void {
    if (!this._entity || !this._node) {
      return;
    }

    const entity = this._entity;
    const settings = (this._ctx as SvgContext).pageSetting();
    const unitPerPixel = (this._ctx as SvgContext).getUnitPerPixel();
    const wallsMask = (this._ctx as SvgContext).getWallsMask();

    let svgData: SvgData | undefined;
    let lineWidth: number | undefined;
    let lineColor: string | undefined;

    if (entity.instanceOf('HSCore.Model.Window')) {
      svgData = SvgResourceManagerSingleton.OpeningMobileSvgs.window;
      lineWidth = settings.window.lineWidth;
      lineColor = settings.window.lineColor;
    } else if (entity.instanceOf('HSCore.Model.Hole')) {
      svgData = SvgResourceManagerSingleton.OpeningMobileSvgs.hole;
    } else if (entity.instanceOf('HSCore.Model.Door')) {
      if (Opening.isEntryDoor(entity)) {
        svgData = SvgResourceManagerSingleton.OpeningMobileSvgs.entry;
        lineWidth = settings.entry.lineWidth;
        lineColor = settings.entry.lineColor;
      } else {
        svgData = SvgResourceManagerSingleton.OpeningMobileSvgs.door;
        lineWidth = settings.door.lineWidth;
        lineColor = settings.door.lineColor;
      }
    }

    if (!svgData) {
      return;
    }

    const svgHeight = svgData.height ?? 1;
    const svgWidth = svgData.width ?? 1;
    const scale = this.unitScale();
    const swingScale = HSCore.Model.Opening.SWING_SCALE_TABLE[this._entity.swing];

    this._node.move(this._entity.x * scale, -this._entity.y * scale);
    this._node.transform({ rotation: this._entity.rotation, cx: 0, cy: 0 });
    this._node.transform({ scaleX: swingScale.x, scaleY: swingScale.y, cx: 0, cy: 0 });

    let wallWidth = (this._ctx as SvgContext).getWallModelWidth() / scale;
    const host = this._entity.getHost();
    if (host?.instanceOf(HSConstants.ModelClass.NgWall)) {
      wallWidth = (this._ctx as SvgContext).getWallModelWidth(host) / scale;
    }

    const widthScale = (this._entity.XSize * scale) / svgWidth;
    const heightScale = (wallWidth * scale) / svgHeight;

    this._base.transform({ scaleX: widthScale, scaleY: heightScale, cx: 0, cy: 0 });
    this._swing.transform({ scaleX: widthScale, scaleY: widthScale, cx: 0, cy: 0 });

    const adjustedLineWidth = (lineWidth ?? 1) * unitPerPixel;
    const baseSvg = svgData.base 
      ? typeof svgData.base === 'function' 
        ? svgData.base(lineColor ?? '#000', adjustedLineWidth / heightScale)
        : svgData.base
      : '';
    const swingSvg = svgData.swing
      ? typeof svgData.swing === 'function'
        ? svgData.swing(lineColor ?? '#000', adjustedLineWidth / widthScale)
        : svgData.swing
      : '';

    this._base.svg(baseSvg);
    this._swing.svg(swingSvg);

    const backgroundSvg = svgData.background
      ? typeof svgData.background === 'function'
        ? (svgData.background as (color: string) => string)('black')
        : svgData.background
      : '';

    this._background.svg(backgroundSvg);
    this._background.move(this._entity.x * scale, -this._entity.y * scale);
    this._background.transform({ rotation: this._entity.rotation, cx: 0, cy: 0 });
    this._background.transform({ scaleX: widthScale, scaleY: 1.5 * heightScale, cx: 0, cy: 0 });
    wallsMask.add(this._background);
  }

  static isEntryDoor(entity: OpeningEntity): boolean {
    const host = entity.getHost();
    if (!host || !host.instanceOf(HSConstants.ModelClass.NgWall)) {
      return false;
    }
    return !SvgMinimapContext.isInnerWall(host);
  }
}