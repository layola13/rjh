import { HSApp } from './518193';
import { HSCore } from './635589';
import { DiffTool } from './617057';
import { DiffToolUtil } from './2632';
import { DiffCW } from './939473';

interface DesignData {
  data: string;
}

interface WallOutline {
  entity: any;
  outline: number[][];
}

interface OpeningData {
  content: any;
  openings: Array<{ outline: number[] }>;
}

interface ParsedOpening {
  entity: any;
  outline: number[][];
}

export class BaseDiffToolPlugin extends HSApp.Plugin.IPlugin {
  protected _app: any;
  protected _currentFloorplan: any | undefined;
  protected _originalFloorplan: any | undefined;
  protected diffTool: DiffTool | undefined;

  constructor(...args: any[]) {
    super(...args);
    this._app = HSApp.App.getApp();
    this._currentFloorplan = undefined;
    this._originalFloorplan = undefined;
    this.diffTool = undefined;
  }

  async preloadOriginalFloorplan(): Promise<void> {
    const originalAssetId = this._app.designMetadata.get("originalAccessoryAssetId");
    
    if (!originalAssetId) {
      return Promise.resolve();
    }

    this._currentFloorplan = this._app.floorplan;
    
    const designData = await this.loadDesignJsonFromServer(originalAssetId, (window as any).adskUser.sid);
    
    this._originalFloorplan = await this.createFloorplan(designData, originalAssetId);
    
    if (this._originalFloorplan) {
      this.diffTool = new DiffTool(this._originalFloorplan, this._currentFloorplan);
      this.diffTool.compute();
    }
  }

  getOriginalFloorplan(): any | undefined {
    return this._originalFloorplan;
  }

  isOriginalLayerExist(layerId: string): boolean {
    return !!this.diffTool && this.diffTool.isOriginalLayerExist(layerId);
  }

  clearOriginalFloorplan(): void {
    if (this._originalFloorplan) {
      this._originalFloorplan.clear();
      this._originalFloorplan = undefined;
      this.diffTool = undefined;
    }
  }

  loadDesignJsonFromServer(designId: string, sessionId: string): Promise<DesignData> {
    return HSApp.Io.Request.Design.loadDesign(designId, sessionId).then((data: DesignData) => data);
  }

  async createFloorplan(designData: DesignData | undefined, designId: string): Promise<any | undefined> {
    if (!designData) {
      return undefined;
    }

    const metadata = new HSCore.Doc.Metadata();
    metadata.fromObject(HSCore.Doc.Metadata.getDesignMeta(designId, designData));
    
    const app = HSApp.App.getApp();
    const parsedData = JSON.parse(designData.data);
    
    const document = await app.docManager.newDocument(parsedData, metadata, designId, false);
    
    return document.floorplan;
  }

  getRemovedWallOutlines(wallId: string): number[][] {
    return this.diffTool ? this.diffTool.getRemovedWallOutlines(wallId) : [];
  }

  getNewWallOutlines(wallId: string): number[][] {
    return this.diffTool ? this.diffTool.getNewWallOutlines(wallId) : [];
  }

  getNewWallOpeings(): OpeningData[] {
    return this.diffTool ? this.diffTool.getNewWallOpeings() : [];
  }

  getRemovedWallOpeings(): OpeningData[] {
    return this.diffTool ? this.diffTool.getRemovedWallOpeings() : [];
  }

  getBomRemovedWallData(wallId: string): any[] {
    return this.diffTool ? this.diffTool.getRemovedWallData(wallId) : [];
  }

  getBomNewWallData(wallId: string): any[] {
    return this.diffTool ? this.diffTool.getNewWallData(wallId) : [];
  }

  isRemovedContent(content: any): boolean {
    if (!this.diffTool || !DiffToolUtil.isNewDiffToolContent(content)) {
      return false;
    }
    return this.diffTool.isRemovedContent(content);
  }

  isNewContent(content: any): boolean {
    if (!this.diffTool || !DiffToolUtil.isNewDiffToolContent(content)) {
      return false;
    }
    return this.diffTool.isNewContent(content);
  }

  isNewWindow(window: any): boolean {
    if (!this.diffTool || !DiffToolUtil.isNewDiffToolWindow(window)) {
      return false;
    }
    return this.diffTool.isNewContent(window);
  }

  getAllNewStructures(): any[] {
    return this.diffTool ? this.diffTool.getNewStructures() : [];
  }

  getAllRemoveStructures(): any[] {
    return this.diffTool ? this.diffTool.getRemoveStructures() : [];
  }

  getAllNewWalls(): WallOutline[] {
    const result: WallOutline[] = [];
    const floorplan = this._currentFloorplan;
    
    if (!floorplan) {
      return result;
    }

    floorplan.forEachWall((wall: any) => {
      const outlines = this.getNewWallOutlines(wall.id);
      
      if (outlines && outlines.length > 0) {
        const transformedOutlines: number[][] = [];
        
        outlines.forEach((outline: number[]) => {
          const reordered: number[] = [];
          reordered.push(outline[3]);
          reordered.push(outline[0]);
          reordered.push(outline[1]);
          reordered.push(outline[2]);
          transformedOutlines.push(reordered);
        });
        
        result.push({
          entity: wall,
          outline: transformedOutlines
        });
      }
    });

    return result;
  }

  getAllRemovedWalls(): WallOutline[] {
    const result: WallOutline[] = [];
    const originalFloorplan = this.getOriginalFloorplan();
    
    if (!originalFloorplan) {
      return result;
    }

    originalFloorplan.forEachWall((wall: any) => {
      const outlines = this.getRemovedWallOutlines(wall.id);
      
      if (outlines && outlines.length > 0) {
        const transformedOutlines: number[][] = [];
        
        outlines.forEach((outline: number[]) => {
          const reordered: number[] = [];
          reordered.push(outline[3]);
          reordered.push(outline[0]);
          reordered.push(outline[1]);
          reordered.push(outline[2]);
          transformedOutlines.push(reordered);
        });
        
        result.push({
          entity: wall,
          outline: transformedOutlines
        });
      }
    });

    return result;
  }

  getAllRemovedOpenings(): ParsedOpening[] {
    const openings = this.getRemovedWallOpeings();
    return this.parseOpenings(openings);
  }

  getAllNewOpenings(): ParsedOpening[] {
    const openings = this.getNewWallOpeings();
    return this.parseOpenings(openings);
  }

  parseOpenings(openingsData: OpeningData[]): ParsedOpening[] {
    const result: ParsedOpening[] = [];
    
    openingsData.forEach((openingData) => {
      const outlines: number[][] = [];
      
      openingData.openings.forEach((opening) => {
        outlines.push(opening.outline);
      });
      
      result.push({
        entity: openingData.content,
        outline: outlines
      });
    });

    return result;
  }

  getCWDiffData(): any {
    return this.diffTool.getDiffCWData();
  }

  destroyDiffCW(layer?: any): void {
    const targetLayer = layer ?? HSApp.App.getApp().floorplan.scene.activeLayer;
    
    this._app.selectionManager.unselectAll();
    
    targetLayer.getChildrenByType(DiffCW).forEach((diffCW: any) => {
      targetLayer.removeChild(diffCW, false);
    });
  }
}