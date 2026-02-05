// @ts-nocheck
import { HSCore } from './HSCore';
import { BaseDimension } from './BaseDimension';
import * as THREE from 'three';

interface AuxOptions {
  isCeilingEnv?: boolean;
}

interface Context {
  auxOptions?: AuxOptions;
  application: Application;
}

interface Application {
  cmdManager: CommandManager;
  getActive2DView(): View2D;
}

interface CommandManager {
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
  receive(event: string, data: unknown): void;
  complete(): void;
}

interface Command {}

interface View2D {
  gizmoManager: GizmoManager;
}

interface GizmoManager {
  getTypeGizmo(type: unknown): Gizmo[];
  removeGizmo(gizmo: Gizmo): void;
}

interface Gizmo {
  cleanup(): void;
}

interface Bound {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Entity {
  getUniqueParent(): Entity | null;
  getFirstParent(): Entity | null;
  isFlagOn(flag: number): boolean;
  x: number;
  y: number;
  bound?: Bound;
  instanceOf(modelClass: string): boolean;
}

interface LinearDimensionGizmoData {
  gizmo: GizmoData;
}

interface GizmoData {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

interface EventData {
  data: {
    value: number;
    oldValue: number;
    gizmo: GizmoData;
  };
}

interface SVGElement {
  attr(attributes: Record<string, number>): void;
  show(): void;
}

interface Logger {
  warning(message: string): void;
}

declare const HSFPConstants: {
  Constants: {
    PIXEL_TO_M_FACTOR: number;
  };
  CommandType: {
    MoveStructure: string;
    MoveBeam: string;
    MoveOpening: string;
    MoveContent: string;
  };
};

declare const HSConstants: {
  ModelClass: {
    NgContent: string;
  };
};

declare const HSApp: {
  View: {
    Base: {
      DisplayController: new (context: Context, entity: Entity) => void;
    };
  };
};

declare const log: {
  logger(name: string): Logger;
};

class ContentDimensionEventDispatcher extends HSApp.View.Base.DisplayController {
  constructor(context: Context, entity: Entity) {
    super(context, entity);
  }

  dispatch(event: EventData): void {
    if (!HSCore.Util.Math.nearlyEquals(event.data.value, event.data.oldValue)) {
      const delta = event.data.value - event.data.oldValue;
      const direction = new THREE.Vector2(
        event.data.gizmo.start.x - event.data.gizmo.end.x,
        event.data.gizmo.start.y - event.data.gizmo.end.y
      ).setLength(delta);

      const application = this.context.application;
      const cmdManager = application.cmdManager;

      let command: Command;
      if (this.entity instanceof HSCore.Model.NCustomizedStructure) {
        command = cmdManager.createCommand(HSFPConstants.CommandType.MoveStructure, [
          this.entity,
          undefined,
          { _moveonly: true }
        ]);
      } else if (this.entity instanceof HSCore.Model.NCustomizedBeam) {
        command = cmdManager.createCommand(HSFPConstants.CommandType.MoveBeam, [
          this.entity,
          undefined,
          { _moveonly: true }
        ]);
      } else if (
        this.entity instanceof HSCore.Model.Opening ||
        this.entity instanceof HSCore.Model.ParametricOpening
      ) {
        command = cmdManager.createCommand(HSFPConstants.CommandType.MoveOpening, [this.entity]);
      } else {
        command = cmdManager.createCommand(HSFPConstants.CommandType.MoveContent, [this.entity]);
      }

      cmdManager.execute(command);
      cmdManager.receive('moveto', {
        position: {
          x: this.entity.x + direction.x,
          y: this.entity.y + direction.y
        }
      });
      cmdManager.complete();

      const gizmoManager = application.getActive2DView().gizmoManager;
      const existingGizmos = gizmoManager.getTypeGizmo(undefined); // Type reference removed
      if (existingGizmos.length) {
        existingGizmos.forEach((gizmo: Gizmo) => {
          gizmo.cleanup();
          gizmoManager.removeGizmo(gizmo);
        });
      }
    }
  }
}

export class ContentDimension extends BaseDimension {
  static type = 'hsw.view.svg.gizmo.ContentDimension';
  static logger: Logger = log.logger('hsw.view.svg.gizmo.ContentDimension');

  protected entity!: Entity;
  protected context!: Context;
  protected childItems!: unknown[];
  protected linearDimensionGizmoDatas!: LinearDimensionGizmoData[];
  protected boxHelpLineData!: (Entity | null)[];
  protected BoundaryboxElement!: SVGElement[];
  protected outlineHelpData!: unknown;

  constructor(entity: Entity, context: Context, options: unknown) {
    super(entity, context, options, new ContentDimensionEventDispatcher(options as Context, entity));
  }

  protected _isContentInHiddenRoom(): boolean {
    const auxOptions = this.context.auxOptions;
    if (auxOptions?.isCeilingEnv) {
      const parent = this.entity.getUniqueParent();
      return !HSCore.Util.Content.getCeilingContentIn(this.entity, parent);
    }
    return false;
  }

  protected _updateGizmos(): void {
    if (
      !this._isContentInHiddenRoom() &&
      this.entity?.getFirstParent() instanceof HSCore.Model.Layer &&
      (!this.entity || !this.entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed))
    ) {
      let index = 0;
      for (const childItem of this.childItems) {
        const gizmoData = this.linearDimensionGizmoDatas[index];
        this._updateChildGizmo(gizmoData, childItem);
        index++;
      }

      this._updateHelperBoxs();
      this._updateHelperLinears();
      this.drawOutlineHelpData(this.outlineHelpData);
    }
  }

  protected _updateHelperBoxs(): void {
    let elementIndex = 0;
    this.boxHelpLineData.forEach((helpData: Entity | null) => {
      const boundaryElement = this.BoundaryboxElement[elementIndex++];
      if (helpData?.instanceOf(HSConstants.ModelClass.NgContent)) {
        const bound = helpData.bound!;
        boundaryElement.attr({
          x: bound.left * HSFPConstants.Constants.PIXEL_TO_M_FACTOR,
          y: -(bound.top + bound.height) * HSFPConstants.Constants.PIXEL_TO_M_FACTOR,
          width: bound.width * HSFPConstants.Constants.PIXEL_TO_M_FACTOR,
          height: bound.height * HSFPConstants.Constants.PIXEL_TO_M_FACTOR
        });
        boundaryElement.show();
      }
    });
  }

  protected computeChildGizmoInfo(): void {
    ContentDimension.logger.warning('should rewrite computeChildGizmoInfo method');
  }

  protected _updateChildGizmo(gizmoData: LinearDimensionGizmoData, childItem: unknown): void {
    // Implementation to be provided
  }

  protected _updateHelperLinears(): void {
    // Implementation to be provided
  }

  protected drawOutlineHelpData(data: unknown): void {
    // Implementation to be provided
  }
}