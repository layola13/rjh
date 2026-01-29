export interface ExportOptions {
  ignoreOpening?: boolean;
  withPaint?: boolean;
  lang?: string;
  isNoContent?: boolean;
  thumbnail2D?: boolean;
}

export interface PositionInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PageSetting {
  compass: { visible: boolean };
  entry: { visible: boolean };
  logo: { visible: boolean };
  isOmitSize: boolean;
}

export interface WatermarkConfig {
  useful: boolean;
}

declare const adskUser: { watermark?: WatermarkConfig } | undefined;

import { SvgContext, SvgOutline, SvgRawContext, SvgMinimapContext } from './svg-context';
import { SvgOpenings } from './svg-openings';
import { SvgDoorStones } from './svg-door-stones';
import { SvgCornerWindows } from './svg-corner-windows';
import { SvgRooms } from './svg-rooms';
import { SvgDimensions } from './svg-dimensions';
import { SvgCompass, SvgEntry, SvgLogo } from './svg-decorations';
import { SvgWalls } from './svg-walls';
import { SvgContents } from './svg-contents';
import { Util } from './util';
import { getExportSetting, ENUM_EXPORT_TYPE } from './export-settings';

interface SvgExportable {
  export(): Promise<void>;
}

interface SvgMinimapExportable {
  exportM(): void;
}

interface FloorplanApp {
  floorplan: {
    scene: {
      outdoorLayer: Record<string, unknown>;
      rootLayer: Record<string, unknown>;
    };
  };
}

export class SvgBuilder {
  private _svg: SvgExportable[];
  private _app: FloorplanApp;
  private _position?: PositionInfo;
  private _svgoutline?: SvgOutline;

  constructor(app: FloorplanApp) {
    this._svg = [];
    this._app = app;
    this._position = undefined;
  }

  async build(options: ExportOptions, context?: unknown): Promise<string> {
    const app = this._app;
    const svgContext = new SvgContext(options, context);
    
    this._svgoutline = new SvgOutline(app, svgContext);
    this._svg.push(this._svgoutline);
    this._svg.push(new SvgRooms(app, svgContext, options));
    
    if (!options.ignoreOpening) {
      this._svg.push(new SvgOpenings(app, svgContext));
      this._svg.push(new SvgCornerWindows(app, svgContext));
    }

    const pageSetting = svgContext.pageSetting();
    
    if (!options.withPaint && pageSetting.compass.visible) {
      this._svg.push(new SvgCompass(app, svgContext));
    }
    
    if (options.withPaint) {
      this._svg.push(new SvgDoorStones(app, svgContext));
    }
    
    if (pageSetting.entry.visible) {
      this._svg.push(new SvgEntry(app, svgContext, options.lang));
    }
    
    this._svg.push(new SvgContents(app, svgContext, options.isNoContent));
    this._svg.push(new SvgWalls(app, svgContext));

    const outdoorLayer = this._app.floorplan.scene.outdoorLayer;
    const rootLayer = this._app.floorplan.scene.rootLayer;

    if (!options.thumbnail2D) {
      const hasOutdoorContent = Object.keys(outdoorLayer).length !== 0 && outdoorLayer === rootLayer;
      if (!hasOutdoorContent) {
        this._svg.push(new SvgDimensions(app, svgContext));
      }

      const watermarkUseful = (adskUser?.watermark ?? { useful: true }).useful;
      if (!options.withPaint && pageSetting.logo.visible && watermarkUseful) {
        this._svg.push(new SvgLogo(app, svgContext));
      }
    }

    const exportPromises = this._svg.map(svg => svg.export());
    
    await Promise.all(exportPromises);
    
    Util.logger.debug('draw end return node outerHTML');
    this._position = svgContext.getPositionInfo();
    
    if (svgContext.pageSetting().isOmitSize) {
      svgContext.context().attr({ width: null, height: null });
    }
    
    return svgContext.context().node.outerHTML;
  }

  getPositionInfo(): PositionInfo | undefined {
    return this._position;
  }
}

export class SvgRawBuilder {
  private _svg: SvgExportable[];
  private _app: FloorplanApp;

  constructor(app: FloorplanApp) {
    this._svg = [];
    this._app = app;
  }

  async build(options: ExportOptions): Promise<string> {
    const app = this._app;
    const context = new SvgRawContext(
      getExportSetting(ENUM_EXPORT_TYPE.Thumbnail2DPage),
      options
    );

    this._svg.push(new SvgOutline(app, context));
    this._svg.push(new SvgRooms(app, context, options));
    this._svg.push(new SvgOpenings(app, context));
    this._svg.push(new SvgCornerWindows(app, context));
    this._svg.push(new SvgEntry(app, context));
    
    if (!options.isNoContent) {
      this._svg.push(new SvgContents(app, context));
    }

    const exportPromises = this._svg.map(svg => svg.export());
    
    await Promise.all(exportPromises);
    
    Util.logger.debug('draw end return node outerHTML');
    return context.context().node.outerHTML;
  }
}

export class SvgMinimapBuilder {
  private _app: FloorplanApp;
  private _svg: SvgMinimapExportable[];

  constructor(app: FloorplanApp) {
    this._app = app;
    this._svg = [];
  }

  build(options: ExportOptions): string {
    const app = this._app;
    const context = new SvgMinimapContext(
      app,
      getExportSetting(ENUM_EXPORT_TYPE.Minimap),
      options
    );

    this._svg.push(new SvgOutline(app, context));
    this._svg.push(new SvgRooms(app, context, options));
    this._svg.push(new SvgOpenings(app, context));
    this._svg.push(new SvgCornerWindows(app, context));

    this._svg.forEach(svg => svg.exportM());
    
    context.setupPage();
    Util.logger.debug('draw end return node outerHTML');
    
    return context.context().node.outerHTML;
  }
}