import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { OpeningCalculatedDimensionBase } from './OpeningCalculatedDimensionBase';
import { SVGDimensionType } from './SVGDimensionType';
import { DOpening } from './DOpening';
import { ContentTypeEnum } from './ContentTypeEnum';

interface ValueChangeEventData {
  value: number;
  oldValue: number;
  gizmo: any;
}

interface ValueChangeEvent {
  data: ValueChangeEventData;
}

interface MoveToPayload {
  position: {
    x: number;
    y: number;
  };
  origin: string;
  snap: boolean;
}

interface ResizePayload {
  x: number;
  z?: number;
}

interface Vector {
  x: number;
  y: number;
  multiplied(value: number): Vector;
}

interface Gizmo {
  getValue(): number;
  direction: Vector;
}

interface EntityMetadata {
  contentType?: {
    isTypeOf(type: ContentTypeEnum): boolean;
  };
}

interface Entity {
  x: number;
  y: number;
  XSize: number;
  bottomProfile: any;
  metadata?: EntityMetadata;
}

interface Command {
  // Command interface placeholder
}

interface CommandManager {
  createCommand(commandType: string, entities: Entity[]): Command | null;
  execute(command: Command): void;
  receive(action: string, payload: MoveToPayload | ResizePayload): void;
  complete(): void;
}

declare const HSFPConstants: {
  CommandType: {
    MoveOpening: string;
  };
};

export class OpeningCalculatedDimension extends OpeningCalculatedDimensionBase {
  controller: OpeningCalculatedDimensionController;

  constructor(entity: Entity, dimensionView2d: any, commandManager: CommandManager) {
    super(entity, dimensionView2d, commandManager, undefined);
    this.controller = new OpeningCalculatedDimensionController(commandManager, entity, this);
  }

  static uniqueType(): string {
    return SVGDimensionType.OpeningCalculatedDimension;
  }

  type(): string {
    return OpeningCalculatedDimension.uniqueType();
  }

  onActivate(): void {
    super.onActivate();
  }

  onDeactivate(): void {
    super.onDeactivate();
  }

  onCleanup(): void {
    super.onCleanup();
  }

  onValueChangeCommit(event: ValueChangeEvent): void {
    if (!HSCore.Util.Math.nearlyEquals(event.data.value, event.data.oldValue)) {
      const dimensionGizmos = [this.dimensionView2d[1], this.dimensionView2d[4]];
      
      if (dimensionGizmos != null && dimensionGizmos.includes(event.data.gizmo)) {
        this.controller.dispatch('openingLengthChanged', this.entity, event);
      } else {
        this.controller.dispatch('valueChanged', this.entity, event);
      }
    }
  }

  get opening(): Entity {
    return this.entity;
  }

  getWorkingEntityProfile(): any {
    return this.opening.bottomProfile;
  }

  getEntityLength(): number {
    return this.opening.XSize;
  }
}

class OpeningCalculatedDimensionController extends HSApp.View.Base.DisplayController {
  gizmo: OpeningCalculatedDimension;

  constructor(commandManager: CommandManager, entity: Entity, gizmo: OpeningCalculatedDimension) {
    super(commandManager, entity);
    this.gizmo = gizmo;
  }

  dispatch(eventType: string, entity: Entity, event: ValueChangeEvent): void {
    switch (eventType) {
      case 'valueChanged':
        this.handleValueChanged(entity, event);
        break;
      case 'openingLengthChanged':
        this.handleOpeningLengthChanged(entity, event.data.value);
        break;
    }
  }

  private handleValueChanged(entity: Entity, event: ValueChangeEvent): void {
    const { gizmo, value } = event.data;
    
    if (!gizmo) {
      return;
    }

    const command = this._cmdMgr.createCommand(
      HSFPConstants.CommandType.MoveOpening,
      [this.entity]
    );

    if (!command) {
      return;
    }

    this._cmdMgr.execute(command);

    const delta = value - gizmo.getValue();
    const offset = gizmo.direction.multiplied(delta);
    const shouldSnap = entity instanceof HSCore.Model.DOpening;

    this._cmdMgr.receive('moveto', {
      position: {
        x: entity.x + offset.x,
        y: entity.y + offset.y
      },
      origin: OpeningCalculatedDimension.uniqueType(),
      snap: shouldSnap
    });

    this._cmdMgr.complete();
  }

  private handleOpeningLengthChanged(entity: Entity, newValue: number): void {
    const command = this._cmdMgr.createCommand(
      HSFPConstants.CommandType.MoveOpening,
      [entity]
    );

    if (!command) {
      return;
    }

    this._cmdMgr.execute(command);

    const isAirConditionHole = entity.metadata?.contentType?.isTypeOf(
      HSCore.Catalog.ContentTypeEnum.AirConditionHoleOpening
    );

    if (isAirConditionHole) {
      this._cmdMgr.receive('resize', {
        x: newValue,
        z: newValue
      });
    } else {
      this._cmdMgr.receive('resize', {
        x: newValue
      });
    }

    this._cmdMgr.complete();
  }
}