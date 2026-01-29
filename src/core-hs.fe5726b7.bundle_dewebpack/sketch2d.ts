import { Entity, Entity_IO } from './Entity';
import { Background } from './Background';
import { Face2d } from './Face2d';
import { GuideLine2d } from './GuideLine2d';
import { Sketch2dBuilder } from './Sketch2dBuilder';
import { Util } from './Util';
import { Signal } from './Signal';
import { EntityField } from './EntityField';
import { 
  decomposeAxis, 
  getCrossValue, 
  nearlyEquals, 
  transformPoint, 
  transformCenterPoint 
} from './TransformUtils';
import { Line2d } from './Line2d';
import { Circle2d } from './Circle2d';
import { CircleArc2d } from './CircleArc2d';
import { Logger } from './Logger';

interface Face2dAddedEventData {
  faceId: string;
}

interface Face2dCopiedEventData {
  sourceId: string;
  copyId: string;
  sourceAffectedFaceInfo: unknown;
  copiedAffectedFaceInfo: unknown;
}

interface BuildCompleteEventData {
  copyFacePropsPairs: unknown;
}

interface BackgroundOptions {
  hasBackground?: boolean;
}

interface DirtyMaterialOptions {
  faceIds?: string[];
}

interface Point2d {
  id: string;
  x: number;
  y: number;
  set(x: number, y: number): void;
}

interface PointMap {
  [id: string]: { x: number; y: number };
}

export class Sketch2d extends Entity {
  private _background: Background;
  public face2dAdded: Signal<Face2dAddedEventData>;
  public face2dCopied: Signal<Face2dCopiedEventData>;
  public signalBuildComplete: Signal<BuildCompleteEventData>;

  constructor(name: string = "", parent?: Entity) {
    super(name, parent);
    this._background = new Background();
    this.face2dAdded = new Signal(this);
    this.face2dCopied = new Signal(this);
    this.signalBuildComplete = new Signal(this);
  }

  isRoot(): boolean {
    return true;
  }

  getIO(): Sketch2d_IO {
    return Sketch2d_IO.instance();
  }

  get faces(): Face2d[] {
    const faceList: Face2d[] = [];
    this.forEachChild((child: Entity) => {
      if (child instanceof Face2d) {
        faceList.push(child);
      }
    });
    return faceList;
  }

  set faces(value: Face2d[]) {
    const currentFaces = this.faces;
    this.replaceChildren(currentFaces, value);
  }

  get guideLines(): GuideLine2d[] {
    const lines: GuideLine2d[] = [];
    this.forEachChild((child: Entity) => {
      if (child instanceof GuideLine2d) {
        lines.push(child);
      }
    });
    return lines;
  }

  @EntityField({
    get() {
      return this._background;
    },
    partialSet(value: Background) {
      this._setBackground(value);
    },
    equals(value: Background) {
      return value instanceof Background && this._background.equals(value);
    }
  })
  background!: Background;

  private _setBackground(data: Background | unknown): void {
    if (!(data instanceof Background)) {
      if (DEBUG) {
        Logger.console.assert(false, 'set background without Background type');
      }
      this._background.setFromData(data);
      return;
    }
    this._background = data;
  }

  transform(matrix: THREE.Matrix3): void {
    if (!this.faces.length) {
      return;
    }

    const processedIds = new Set<string>();
    const processOnce = (id: string, action: () => void): void => {
      if (!processedIds.has(id)) {
        processedIds.add(id);
        action();
      }
    };

    const { xAxis, yAxis } = decomposeAxis(matrix);
    const isFlipped = getCrossValue(xAxis, yAxis) < 0;
    const scaleX = xAxis.length();
    const hasNonUniformScaleOrShear = 
      !nearlyEquals(xAxis.dot(yAxis), 0) || 
      !nearlyEquals(scaleX, yAxis.length());

    this.faces.forEach((face: Face2d) => {
      const allLoops = [face.outerLoop].concat(face.innerLoops);
      
      allLoops.forEach((loop) => {
        loop.curves.forEach((curve) => {
          if (curve instanceof Line2d) {
            if (!curve.from || !curve.to) {
              Logger.console.assert(false, 'invalid curve!');
              return;
            }
            processOnce(curve.from.id, () => transformPoint(curve.from, matrix));
            processOnce(curve.to.id, () => transformPoint(curve.to, matrix));
            curve.refreshBoundInternal();
          } else if (curve instanceof Circle2d) {
            if (hasNonUniformScaleOrShear) {
              Logger.console.assert(false, '圆暂不支持变换成椭圆！！！');
              return;
            }
            processOnce(curve.id, () => {
              curve.center = transformCenterPoint(curve.center, matrix);
              curve.radius *= scaleX;
            });
            curve.refreshBoundInternal();
          } else if (curve instanceof CircleArc2d) {
            if (!curve.from || !curve.to) {
              Logger.console.assert(false, 'invalid curve!');
              return;
            }
            if (hasNonUniformScaleOrShear) {
              Logger.console.assert(false, '圆弧暂不支持变换成椭圆弧！！！');
              return;
            }
            processOnce(curve.from.id, () => transformPoint(curve.from, matrix));
            processOnce(curve.to.id, () => transformPoint(curve.to, matrix));
            processOnce(curve.id, () => {
              curve.center = transformCenterPoint(curve.center, matrix);
              curve.radius *= scaleX;
              if (isFlipped) {
                curve.clockwise = !curve.clockwise;
              }
            });
            curve.refreshBoundInternal();
          }
        });

        if (isFlipped) {
          loop.curves = [...loop.curves].reverse();
        }
        loop.refreshBoundInternal();
      });

      face.refreshBoundInternal();
    });

    this.background.transform(matrix);
    this.refreshBoundInternal();
  }

  removeAllFaces(
    recursive: boolean = false, 
    silent: boolean = false, 
    context?: unknown
  ): void {
    this.faces.forEach((face: Face2d) => {
      this.removeChild(face, recursive, silent, context);
    }, this);
  }

  getBackgroundOuter(): unknown[] {
    return (this._background?.getFirstPolygonOuter()) || [];
  }

  getAllCurves(): unknown[] {
    return Array.from(Util.getChildCurves(this));
  }

  getAllPoints(): Point2d[] {
    return Array.from(Util.getChildPoint2d(this));
  }

  createBuilder(): Sketch2dBuilder {
    return new Sketch2dBuilder(this);
  }

  initWithBackground(data: Background | unknown, autoAddBackground: boolean = true): void {
    if (data instanceof Background) {
      this.background = data;
    } else {
      const bg = new Background();
      bg.setFromData(data);
      this.background = bg;
    }

    if (this.faces.length === 0 && autoAddBackground) {
      this.addBackground();
    }
  }

  changeBackground(data: unknown, options: unknown): void {
    const builder = this.createBuilder();
    const newBackground = new Background();
    newBackground.setFromData(data);
    
    if (builder.changeBackground(newBackground, options)) {
      this._boundDirty = true;
    }
  }

  isSameBackground(data: Background | unknown): boolean {
    let background = data;
    if (!(data instanceof Background)) {
      const bg = new Background();
      bg.setFromData(data);
      background = bg;
    }
    return this._background.isSameBackground(background as Background);
  }

  clear(shouldAddBackground: boolean = true): void {
    this.faces = [];
    if (shouldAddBackground) {
      this.addBackground();
    }
    this.dirtyGeometry();
  }

  addPaths(paths: unknown, options: unknown): void {
    this.createBuilder().addPaths(paths, options);
  }

  addCirclePath(circle: unknown, options: unknown): void {
    this.createBuilder().addCirclePath(circle, options);
  }

  updateAfterChanges(
    param1: unknown, 
    param2: unknown, 
    param3: unknown, 
    param4: unknown, 
    param5: unknown
  ): void {
    this.createBuilder().updateAfterChanges(param1, param2, param3, param4, param5);
  }

  postBuild(): void {
    this.createBuilder().postBuild();
  }

  removeCurves(curves: unknown, param2: unknown, param3: unknown): void {
    this.createBuilder().removeCurves(curves, param2, param3);
  }

  removeFace(face: Face2d): void {
    this.createBuilder().removeFace(face);
  }

  addCurvesPath(curves: unknown, options: unknown): void {
    this.createBuilder().addCurvePath(curves, options);
  }

  addBackground(options: BackgroundOptions = {}): void {
    options.hasBackground = true;
    this.createBuilder().addBackground(options);
  }

  refreshBoundInternal(): void {
    const bound = this.boundInternal;
    bound.reset();
    for (const face of this.faces) {
      bound.appendBound(face.bound);
    }
  }

  copyFace(offset: { x: number; y: number }, sourceFace: Face2d, pointMap?: PointMap): Face2d {
    const clonedFace = sourceFace.clone();
    
    clonedFace.getAllPoints().forEach((point: Point2d) => {
      point.set(point.x + offset.x, point.y + offset.y);
      if (pointMap) {
        pointMap[point.id] = { x: point.x, y: point.y };
      }
    });

    for (const curve of clonedFace.getAllCurves()) {
      if (curve instanceof HSCore.Model.Circle2d || curve instanceof HSCore.Model.CircleArc2d) {
        curve.center = {
          x: curve.center.x + offset.x,
          y: curve.center.y + offset.y
        };
        if (pointMap) {
          pointMap[curve.id] = { x: curve.center.x, y: curve.center.y };
        }
      }
    }

    this.addChild(clonedFace);
    return clonedFace;
  }

  forEachFace(callback: (face: Face2d) => void, context?: unknown): void {
    if (callback) {
      Object.values(this.faces).forEach((face: Face2d) => {
        callback.call(context, face);
      }, this);
    }
  }

  addGuideLine(param1: unknown, param2: unknown): void {
    const guideLine = GuideLine2d.create(param1, param2);
    this.addChild(guideLine);
  }

  removeGuideLines(guideLines: GuideLine2d[]): void {
    guideLines.forEach((guideLine: GuideLine2d) => {
      this.removeChild(guideLine);
    });
  }

  verify(): boolean {
    return super.verify();
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    this._processFieldChanged(fieldName);
    super.onFieldChanged(fieldName, oldValue, newValue);
  }

  private _processFieldChanged(fieldName: string): void {
    if (['background', 'faces'].includes(fieldName)) {
      this.dirtyGeometry();
    }
  }

  dispatchCopyFace2dSignal(
    sourceId: string, 
    copyId: string, 
    sourceInfo: unknown, 
    copiedInfo: unknown
  ): void {
    const eventData: Face2dCopiedEventData = {
      sourceId,
      copyId,
      sourceAffectedFaceInfo: sourceInfo,
      copiedAffectedFaceInfo: copiedInfo
    };
    this.face2dCopied.dispatch(eventData);
  }

  dispatchFace2dAddedSignal(faceId: string): void {
    const eventData: Face2dAddedEventData = { faceId };
    this.face2dAdded.dispatch(eventData);
  }

  dispatchBuildCompleteSignal(copyPairs: unknown): void {
    const eventData: BuildCompleteEventData = { copyFacePropsPairs: copyPairs };
    this.signalBuildComplete.dispatch(eventData);
  }

  dirtyMaterial(options: DirtyMaterialOptions = {}): void {
    const { faceIds } = options;
    super.dirtyMaterial(options);
    
    this.forEachChild((child: Entity) => {
      const shouldDirty = !faceIds || 
        !faceIds.length || 
        faceIds.find(id => id.indexOf(`customized_feature_model_${child.id}<bottomFace>`) >= 0);
      
      if (shouldDirty) {
        child.dirtyMaterial();
      }
    });
  }

  applyTransform(
    scaleX: number = 1, 
    scaleY: number = 1, 
    translateX: number = 0, 
    translateY: number = 0, 
    rotation: number = 0
  ): void {
    const scaleMatrix = new THREE.Matrix3().scale(scaleX, scaleY);
    const translateMatrix = new THREE.Matrix3().translate(translateX, translateY);
    const rotateMatrix = new THREE.Matrix3().rotate(rotation);
    const combinedMatrix = new THREE.Matrix3()
      .multiply(translateMatrix)
      .multiply(rotateMatrix)
      .multiply(scaleMatrix);

    const transformPoint = (point: Point2d, pointId: string, processed: Set<string>): boolean => {
      if (processed.has(pointId)) {
        return false;
      }
      processed.add(pointId);
      const transformed = new THREE.Vector2(point.x, point.y).applyMatrix3(combinedMatrix);
      point.x = transformed.x;
      point.y = transformed.y;
      return true;
    };

    const processedSet = new Set<string>();

    this.faces.forEach((face: Face2d) => {
      let curves: unknown[] = [];
      
      if (face.isBackground()) {
        face.forEachChild((child: unknown) => {
          curves = curves.concat((child as any).curves);
        });
      } else {
        curves = face.outerLoop.curves;
      }

      curves.forEach((curve: any) => {
        curve.transact();
        
        if (curve instanceof HSCore.Model.Line2d || curve instanceof HSCore.Model.CircleArc2d) {
          transformPoint(curve.from, curve.from.id, processedSet);
          transformPoint(curve.to, curve.to.id, processedSet);
        }

        if (curve instanceof HSCore.Model.CircleArc2d || curve instanceof HSCore.Model.Circle2d) {
          const centerId = curve.id + '/center';
          if (transformPoint(curve.center, centerId, processedSet)) {
            curve.radius *= scaleX;
          }
        }

        curve.verify();
      });
    });
  }

  destroy(): void {
    if (this._disposed) {
      return;
    }

    this.face2dAdded.dispose();
    (this as any).face2dAdded = undefined;
    this.face2dCopied.dispose();
    (this as any).face2dCopied = undefined;
    this.signalBuildComplete.dispose();
    (this as any).signalBuildComplete = undefined;
    
    super.destroy();
  }

  mirror(mirrorMatrix: THREE.Matrix4): void {
    this.transform(new THREE.Matrix3().fromArray(mirrorMatrix.toArray()));
  }
}

Entity.registerClass(HSConstants.ModelClass.Sketch2d, Sketch2d);

export class Sketch2d_IO extends Entity_IO {
  private static _Sketch2d_IO_instance: Sketch2d_IO;

  static instance(): Sketch2d_IO {
    if (!Sketch2d_IO._Sketch2d_IO_instance) {
      Sketch2d_IO._Sketch2d_IO_instance = new Sketch2d_IO();
    }
    return Sketch2d_IO._Sketch2d_IO_instance;
  }

  dump(
    entity: Sketch2d, 
    callback?: (data: unknown[], entity: Sketch2d) => void, 
    includeChildren: boolean = true, 
    options: Record<string, unknown> = {}
  ): unknown[] {
    const data = super.dump(entity, undefined, includeChildren, options);
    data[0].background = entity._background.dump();
    
    if (callback) {
      callback(data, entity);
    }
    
    return data;
  }

  load(entity: Sketch2d, data: any, options: Record<string, unknown> = {}): void {
    super.load(entity, data, options);
    entity._background.load(data.background);
  }
}