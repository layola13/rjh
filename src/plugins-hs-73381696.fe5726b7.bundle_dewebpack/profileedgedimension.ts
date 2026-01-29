import { Dimension, InputBoxType } from './Dimension';
import { Line2d } from './Line2d';
import { dimOffsetLength } from './constants';

interface ProfileEdgeDimensionContext {
  edge: {
    curve: {
      getStartPt(): THREE.Vector3;
      getEndPt(): THREE.Vector3;
    };
  };
}

interface Canvas {
  // Canvas interface placeholder
}

interface TransactionManager {
  signalUndone: Signal;
  signalRedone: Signal;
}

interface Application {
  appSettings: {
    dimensionType: string;
  };
  transManager: TransactionManager;
  signalViewActivated: Signal;
  isActiveView(canvas: Canvas): boolean;
}

interface Signal {
  // Signal interface placeholder
}

interface Entity {
  signalDirty: Signal;
  signalFlagChanged: Signal;
  length: number;
  from: THREE.Vector3;
  to: THREE.Vector3;
  isFlagOn(flag: number): boolean;
}

interface Context {
  application: Application;
}

interface SignalHook {
  listen(signal: Signal, callback: (data?: any) => void): SignalHook;
}

abstract class Gizmo {
  protected canvas: Canvas;
  protected entity: Entity;
  protected context: Context;
  protected dirty: boolean = false;
  protected signalHook: SignalHook;

  constructor(canvas: Canvas, entity: Entity, context: Context) {
    this.canvas = canvas;
    this.entity = entity;
    this.context = context;
  }

  protected defineField(name: string, value: any): void {}
  protected unlistenAllEvents(): void {}
  protected show(): void {}
  protected hide(): void {}
  
  protected abstract onActivate(): void;
  protected abstract onDeactivate(): void;
  protected abstract onCleanup(): void;
  protected abstract draw(): void;
}

const EntityFlagEnum = {
  freezed: 1,
  hidden: 2,
  dimensionOff: 3,
};

const DEFAULT_WALL_WIDTH = 0.1;

declare const GeLib: {
  MathUtils: {
    smallerOrEqual(a: number, b: number): boolean;
    isZero(value: number): boolean;
  };
  VectorUtils: {
    toTHREEVector3(v: any): THREE.Vector3;
    isPointEqual(a: THREE.Vector3, b: THREE.Vector3): boolean;
    getPerpendicularVector(v: THREE.Vector3): THREE.Vector3;
  };
};

declare const HSApp: {
  View: {
    SVG: {
      Util: {
        ModelToScreenFactor(context: Context): number;
      };
    };
  };
};

export class ProfileEdgeDimension extends Gizmo {
  public readonly type = "hsw.view.svg.gizmo.ProfileEdgeDimension";
  private readonly kMinScreenLengthToShowDim = 12.5;
  private dimension: Dimension | undefined;

  constructor(canvas: Canvas, entity: Entity, context: ProfileEdgeDimensionContext & Context) {
    super(canvas, entity, context);

    const startPoint = context.edge.curve.getStartPt();
    const endPoint = context.edge.curve.getEndPt();

    this.dimension = new Dimension(canvas, {
      type: InputBoxType.Number
    }, {
      offset: dimOffsetLength,
      offsetByScreen: false
    });

    this.dimension.path = new Line2d(startPoint, endPoint);
    this.dimension.show();

    const appSettings = context.application.appSettings;
    this.defineField("dimensionType", appSettings.dimensionType);
  }

  protected onActivate(): void {
    this.signalHook.listen(this.entity.signalDirty, () => {
      this.dirty = true;
    });

    this.signalHook.listen(this.entity.signalFlagChanged, (event) => {
      const flag = event.data.flag;
      if (
        flag === EntityFlagEnum.freezed ||
        flag === EntityFlagEnum.hidden ||
        flag === EntityFlagEnum.dimensionOff
      ) {
        this.dirty = true;
      }
    });

    const handleTransactionChange = () => {
      this.dirty = true;
    };

    const application = this.context.application;
    const transManager = application.transManager;

    this.signalHook
      .listen(transManager.signalUndone, handleTransactionChange)
      .listen(transManager.signalRedone, handleTransactionChange)
      .listen(application.signalViewActivated, (event) => {
        if (event.data.newView === this.canvas) {
          this.show();
        } else {
          this.hide();
        }
      });
  }

  protected onDeactivate(): void {
    if (this.dimension) {
      this.dimension.dispose();
    }
    this.unlistenAllEvents();
  }

  protected onCleanup(): void {
    this.dimension = undefined;
  }

  private canDraw(): boolean {
    const entity = this.entity;

    if (!this.context.application.isActiveView(this.canvas)) {
      return false;
    }

    if (entity.isFlagOn(EntityFlagEnum.hidden)) {
      return false;
    }

    if (GeLib.MathUtils.smallerOrEqual(entity.length, 0.05)) {
      return false;
    }

    const screenFactor = HSApp.View.SVG.Util.ModelToScreenFactor(this.context);
    if (screenFactor < this.kMinScreenLengthToShowDim) {
      return false;
    }

    return true;
  }

  protected draw(): void {
    if (this.canDraw()) {
      this.updateDimension();
      this.show();
    } else {
      this.hide();
    }
  }

  private updateDimension(): void {
    const entity = this.entity;
    const screenFactor = HSApp.View.SVG.Util.ModelToScreenFactor(this.context);
    const wallWidth = DEFAULT_WALL_WIDTH;
    const offsetDistance = 0 / screenFactor;

    const points = {
      from: GeLib.VectorUtils.toTHREEVector3(entity.from),
      to: GeLib.VectorUtils.toTHREEVector3(entity.to)
    };

    if (!points || GeLib.VectorUtils.isPointEqual(points.from, points.to)) {
      return;
    }

    const startPoint = points.from.clone();
    const endPoint = points.to.clone();
    const edgeVector = points.from.clone().sub(points.to);
    const perpendicular = GeLib.VectorUtils.getPerpendicularVector(edgeVector);

    if (GeLib.MathUtils.isZero(perpendicular.lengthSq())) {
      return;
    }

    perpendicular.normalize();

    const wallOffset = perpendicular.clone().multiplyScalar(wallWidth);
    const additionalOffset = perpendicular.clone().multiplyScalar(offsetDistance);

    const dimensionStart = startPoint.clone();
    const dimensionEnd = endPoint.clone();
    const midpointOffset = dimensionEnd.clone().sub(dimensionStart).multiplyScalar(0.5);
    const midpoint = dimensionStart.clone().add(midpointOffset);

    dimensionStart.add(wallOffset);
    dimensionEnd.add(wallOffset);
    midpoint.add(wallOffset).add(additionalOffset);

    if (this.dimension) {
      this.dimension.path = new Line2d(dimensionStart, dimensionEnd);
    }
  }
}