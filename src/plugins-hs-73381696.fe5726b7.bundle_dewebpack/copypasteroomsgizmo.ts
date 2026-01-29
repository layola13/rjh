import { Vector2, Box2, Loop, MathAlg } from './math';
import { HSCore } from './core';
import { HSApp } from './app';
import { HSConstants } from './constants';
import { CopyPasteRoomSnapHelper } from './CopyPasteRoomSnapHelper';
import { getSlabPath } from './utils';

interface Offset {
  x: number;
  y: number;
}

interface BoxOffset {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface PathData {
  outer: any[];
  holes: any[];
}

interface TranslationData {
  translation: Vector2;
}

interface CopyRoomsData {
  rooms: HSCore.Model.Floor[];
  slab?: HSCore.Model.Slab;
}

const PREVIEW_STYLE = {
  'stroke-width': 2,
  stroke: '#3DFFF2',
  'fill-opacity': 0.2,
  'stroke-opacity': 1,
  fill: '#3DFFF2',
  'vector-effect': 'non-scaling-stroke'
} as const;

const DRAGGING_STYLE = {
  'stroke-width': 2,
  stroke: '#396EFE',
  'fill-opacity': 0.1,
  'stroke-opacity': 1,
  fill: '#396EFE',
  'vector-effect': 'non-scaling-stroke'
} as const;

export class CopyPasteRoomsGizmo extends HSApp.View.SVG.Temp {
  private _pos?: Vector2;
  private _isDragging: boolean = false;
  private _target?: HSCore.Model.Floor | HSCore.Model.Slab;
  private _layer: HSCore.Model.Layer;
  private _originalPos?: Vector2;
  private _offset: Offset = { x: 0, y: 0 };
  private _PreviewPath: any;
  private _pickDimensions: HSApp.View.SVG.SketchDimension.Dimension[] = [];
  private _snapHelper: CopyPasteRoomSnapHelper;
  private _isLockTarget: boolean;
  private _targetPaths?: PathData[];
  private _boxOffset?: BoxOffset;

  constructor(element: any, canvas: any, cmd: any) {
    super(element, canvas, cmd);

    this._layer = HSCore.Doc.getDocManager().activeDocument.scene.activeLayer;
    
    HSApp.App.getApp().hotkey.registerHotkey(
      'esc',
      this.onESC.bind(this),
      this.cmd.type
    );

    this.initElements(element);
    
    this._snapHelper = new CopyPasteRoomSnapHelper(element);
    this._updateSnapHelper();
    
    this._isLockTarget = (this.cmd.copyFloors?.length ?? 0) > 0;
    
    if (this._isLockTarget) {
      this._isDragging = true;
      this._originalPos = new Loop(this.target.worldRawPath2d.outer).getCentroidPoint();
      this._offset = { x: 0, y: 0 };
      this.updateBoxOffset();
    }
  }

  private get target(): HSCore.Model.Floor | HSCore.Model.Slab | undefined {
    return this._isLockTarget ? this.cmd.copyFloors[0] : this._target;
  }

  /**
   * Gets the paths for the current target
   */
  private getTargetPaths(): PathData[] {
    if (this._targetPaths) {
      return this._targetPaths;
    }

    const target = this.target;
    
    if (target instanceof HSCore.Model.Slab) {
      this._targetPaths = [{
        outer: getSlabPath(target).outer,
        holes: []
      }];
    } else if (target instanceof HSCore.Model.Floor) {
      this._targetPaths = this.cmd.copied.unionWallsPolygon
        .slice(0, 1)
        .map((polygon: any) => {
          const loops = polygon.getLoops()[0].getAllCurves();
          const mergedCurves = loops.length > 0 
            ? MathAlg.CurveCurveMerge.mergeCurves2ds(loops) 
            : loops;
          
          return {
            outer: mergedCurves,
            holes: []
          };
        });
    } else {
      return [];
    }

    return this._targetPaths;
  }

  /**
   * Updates the bounding box offset for positioning constraints
   */
  private updateBoxOffset(): void {
    const allPoints = this.getTargetPaths()
      .map(path => path.outer.map(curve => curve.discrete()))
      .flat(2);

    const boundingBox = new Box2(allPoints);
    const centerOffset = this._originalPos!.subtracted(boundingBox.getCenter());
    const size = boundingBox.getSize();

    this._boxOffset = {
      left: size.x / 2 + centerOffset.x,
      right: size.x / 2 - centerOffset.x,
      top: size.y / 2 - centerOffset.y,
      bottom: size.y / 2 + centerOffset.y
    };
  }

  /**
   * Initializes SVG elements for preview and dimensions
   */
  private initElements(element: any): void {
    this._PreviewPath = element.path().attr(PREVIEW_STYLE);
    this.layer.appendChild(this._PreviewPath);

    this._pickDimensions = [];
    for (let i = 0; i < 4; i++) {
      const dimension = new HSApp.View.SVG.SketchDimension.Dimension(
        element,
        this.layer,
        {
          type: HSApp.View.SVG.SketchDimension.InputBoxType.Number,
          editable: false
        }
      );
      this._pickDimensions.push(dimension);
    }

    this.dirtyGraph();
  }

  private _updateSnapHelper(): void {
    const walls = Object.values(this._layer.walls);
    this._snapHelper.refreshForMoveWall(walls, null, undefined);
    this._snapHelper.hide();
  }

  public onDraw(): void {
    super.onDraw();
    this._updatePreviewPath();
  }

  private _updatePreviewPath(): void {
    const pathElement = this._PreviewPath;

    if (!this.target) {
      pathElement.hide();
      return;
    }

    // Update style based on dragging state
    pathElement.attr(this._isDragging ? DRAGGING_STYLE : PREVIEW_STYLE);

    // Collect all discrete points from paths
    const allDiscretePoints: any[] = [];
    for (const pathData of this.getTargetPaths()) {
      if (pathData?.outer.length) {
        allDiscretePoints.push(this.getDiscrete(pathData.outer));
        pathData.holes.forEach(hole => {
          allDiscretePoints.push(this.getDiscrete(hole));
        });
      }
    }

    const svgPath = this._getPathsSvg(allDiscretePoints);
    
    if (!svgPath || svgPath === '') {
      pathElement.hide();
      return;
    }

    const transformMatrix = new Snap.Matrix().translate(this._offset.x, this._offset.y);
    
    pathElement.attr({
      d: svgPath,
      transform: transformMatrix
    });
    
    pathElement.show();
  }

  /**
   * Constrains model position within valid bounds
   */
  private _constraintModelPosition([x, y]: [number, number]): { x: number; y: number } {
    let constrainedX = x;
    let constrainedY = y;

    if (this._boxOffset) {
      const maxValue = HSConstants.Constants.Max_Vertex_Value;
      
      constrainedX = Math.max(
        Math.min(maxValue - this._boxOffset.right, x),
        -maxValue + this._boxOffset.left
      );
      
      constrainedY = Math.max(
        Math.min(maxValue - this._boxOffset.top, y),
        -maxValue + this._boxOffset.bottom
      );
    }

    return { x: constrainedX, y: constrainedY };
  }

  public onMouseMove(event: MouseEvent, screenX: number, screenY: number): void {
    const enableSnap = !event.ctrlKey;
    const modelCoords = HSApp.View.SVG.Util.ScreenPointToModel(
      [screenX, screenY],
      this.context
    );
    
    const constrainedPos = this._constraintModelPosition(modelCoords);
    this._pos = new Vector2(constrainedPos.x, constrainedPos.y);

    if (this._isDragging) {
      updateMouseTips();

      let translation = this._originalPos!.subtracted(this._pos).reverse();
      this._snapHelper.hide();

      if (enableSnap) {
        for (const pathData of this.getTargetPaths()) {
          if (pathData?.outer.length) {
            const translatedCurves = pathData.outer.map(curve => 
              curve.clone().translate(translation)
            );
            
            const snapDelta = this._snapHelper.snapByPolygon(translatedCurves);
            if (snapDelta) {
              this._pos.add(snapDelta);
            }
          }
        }
      }

      translation = this._originalPos!.subtracted(this._pos).reverse();
      this._offset = HSApp.View.SVG.Util.ModelPointToCanvas(translation);
      
    } else if (!this._isLockTarget) {
      updateMouseTips(
        ResourceManager.getString('plugin_layeredit_mousetips_select_room'),
        { x: screenX, y: screenY }
      );

      const previousTarget = this._target;
      this._target = this._pickTargetSlab();
      
      if (previousTarget !== this._target) {
        this._targetPaths = undefined;
      }
      
      this._offset = { x: 0, y: 0 };
    }

    this.dirtyGraph();
  }

  public onMouseDown(event: MouseEvent, screenX: number, screenY: number): void {
    if (event.button === 2) {
      this.onESC();
      return;
    }

    if (!this.target || !this._pos) {
      return;
    }

    const modelCoords = HSApp.View.SVG.Util.ScreenPointToModel(
      [screenX, screenY],
      this.context
    );

    if (this._isDragging) {
      const finalPos = this._constraintModelPosition([this._pos.x, this._pos.y]);
      const translation = new Vector2(
        finalPos.x - this._originalPos!.x,
        finalPos.y - this._originalPos!.y
      );

      this.cmd.onReceive('gizmo.PasteRooms', { translation } as TranslationData);
      this._updateSnapHelper();
      this._isDragging = !!this._isLockTarget;
      
    } else {
      this._isDragging = true;
      this._originalPos = new Vector2(modelCoords);
      this.updateBoxOffset();

      const rooms: HSCore.Model.Floor[] = [];
      let slab: HSCore.Model.Slab | undefined;

      if (this.target instanceof HSCore.Model.Floor) {
        rooms.push(this.target);
      } else if (this.target instanceof HSCore.Model.Slab) {
        slab = this.target;
        const topFaceFloors = Object.values(this.target.topFaces).filter(
          face => face instanceof HSCore.Model.Floor
        ) as HSCore.Model.Floor[];
        rooms.push(...topFaceFloors);
      }

      if (rooms.length > 0) {
        this.cmd.onReceive('gizmo.CopyRooms', { rooms, slab } as CopyRoomsData);
      }
    }

    this.dirtyGraph();
  }

  public onESC(): void {
    this._snapHelper?.hide();

    if (this._isDragging && !this._isLockTarget) {
      this._target = undefined;
      this._isDragging = false;
      this._offset = { x: 0, y: 0 };
      this.dirtyGraph();
    } else {
      this.cmd.onReceive('gizmo.Complete', {});
    }
  }

  public onCleanup(): void {
    super.onCleanup();
    
    this._snapHelper.dispose();
    updateMouseTips();
    
    this._target = undefined;
    this._isDragging = false;
    this._offset = { x: 0, y: 0 };
    
    this._PreviewPath?.remove();
    this._pickDimensions.forEach(dimension => dimension.dispose());
    
    HSApp.App.getApp().hotkey.unregisterCmdHotkey('esc', this.cmd.type);
  }

  /**
   * Converts curves to discrete points
   */
  private getDiscrete(curves: any[]): any[] {
    let points: any[] = [];

    curves.forEach(curve => {
      const discretePoints = curve.discrete();
      
      if (points.length > 0 && discretePoints[0].equals(points[points.length - 1])) {
        points = points.concat(discretePoints.slice(1));
      } else {
        points = points.concat(discretePoints);
      }
    });

    (points as any).close = true;
    return points;
  }

  /**
   * Picks target slab under cursor position
   */
  private _pickTargetSlab(): HSCore.Model.Slab | undefined {
    if (!this._pos) {
      return undefined;
    }

    // Check if cursor is still within current target
    if (this.target) {
      const targetPath = getSlabPath(this.target);
      const polygon = new HSMath.Polygon([
        new Loop(targetPath.outer),
        ...targetPath.holes.map(hole => new Loop(hole))
      ]);

      if (MathAlg.PositionJudge.ptToPolygon(this._pos, polygon) === MathAlg.PtLoopPositonType.IN) {
        return this.target as HSCore.Model.Slab;
      }
    }

    // Search for new target slab
    let foundSlab: HSCore.Model.Slab | undefined;

    this._layer.forEachFloorSlab((slab: HSCore.Model.Slab) => {
      if (this.target === slab || foundSlab) {
        return;
      }

      const slabPath = getSlabPath(slab);
      const polygon = new HSMath.Polygon([
        new Loop(slabPath.outer),
        ...slabPath.holes.map(hole => new Loop(hole))
      ]);

      if (MathAlg.PositionJudge.ptToPolygon(this._pos!, polygon) === MathAlg.PtLoopPositonType.IN) {
        foundSlab = slab;
      }
    });

    return foundSlab;
  }

  private _getPathsSvg(paths: any[]): string {
    return paths.map(path => this._getPathSvg(path)).join('');
  }

  private _getPathSvg(points: any[]): string {
    if (points.length < 2) {
      return '';
    }

    const canvasPoints = points
      .map(point => this.canvas.modelPointToCanvas(point))
      .map(point => `${point.x}, ${point.y}`);

    const pathData = canvasPoints.join(' ');
    return (points as any).close ? `M${pathData}Z` : `M${pathData}`;
  }
}