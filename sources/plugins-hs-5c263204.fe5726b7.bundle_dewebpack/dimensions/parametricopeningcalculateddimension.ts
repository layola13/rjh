import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { OpeningCalculatedDimensionBase } from './OpeningCalculatedDimensionBase';
import { SVGDimensionType } from './SVGDimensionType';

const ORDINARY_WINDOW_WIDTH = HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowWidth;

interface ValueChangeEvent {
  data: {
    value: number;
    oldValue: number;
    gizmo: any;
  };
}

interface DispatchOptions {
  event: ValueChangeEvent;
  flag?: string;
}

export class ParametricOpeningCalculatedDimension extends OpeningCalculatedDimensionBase {
  private _isShowSelf: boolean = true;
  public controller: ParametricOpeningController;

  constructor(
    entity: any,
    commandManager: any,
    viewManager: any,
    isShowSelf: boolean = true
  ) {
    super(entity, commandManager, viewManager, undefined);
    this._isShowSelf = true;
    this.controller = new ParametricOpeningController(viewManager, entity, this);
    this._isShowSelf = isShowSelf;
  }

  static uniqueType(): string {
    return SVGDimensionType.ParametricopeningCalculatedDimension;
  }

  type(): string {
    return ParametricOpeningCalculatedDimension.uniqueType();
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
      const targetGizmos = [this.dimensionView2d[1], this.dimensionView2d[4]];
      
      if (targetGizmos != null && targetGizmos.includes(event.data.gizmo)) {
        this.controller.dispatch('openingLengthChanged', this.entity, {
          event: event,
          flag: ORDINARY_WINDOW_WIDTH
        });
      } else {
        this.controller.dispatch('valueChanged', this.entity, {
          event: event
        });
      }
    }
  }

  get parametricOpening(): any {
    return this.entity;
  }

  getWorkingEntityProfile(): any[] {
    const matrix = new HSMath.Matrix3().fromArray(
      this.parametricOpening.get2DMatrix().toArray()
    );
    return this.parametricOpening.getHole2D()[0].transformed(matrix).getAllCurves();
  }

  getEntityLength(): number {
    return this.parametricOpening.getPropertiesNode(ORDINARY_WINDOW_WIDTH).value / 1000;
  }

  updateChildGizmo(): void {
    super.updateChildGizmo();
  }

  formatDimensionView(param1: any, param2: any): void {
    super.formatDimensionView(param1, param2, this._isShowSelf);
  }
}

class ParametricOpeningController extends HSApp.View.Base.DisplayController {
  private _cmd: any = undefined;
  public gizmo: any = undefined;

  constructor(viewManager: any, entity: any, gizmo: any) {
    super(viewManager, entity);
    this._cmd = undefined;
    this.gizmo = undefined;
    this.gizmo = gizmo;
  }

  dispatch(action: string, entity: any, options: DispatchOptions): void {
    const { event, flag } = options;

    switch (action) {
      case 'valueChanged':
        this.handleValueChanged(entity, event);
        break;

      case 'openingLengthChanged':
        this.handleOpeningLengthChanged(entity, event, flag);
        break;
    }
  }

  private handleValueChanged(entity: any, event: ValueChangeEvent): void {
    const { gizmo } = event.data;
    
    if (gizmo) {
      if (this.entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)) {
        LiveHint.show(
          ResourceManager.getString('livehint_cannot_move_content'),
          5000,
          null,
          { canclose: true }
        );
      }

      const moveCommand = this._cmdMgr.createCommand(
        HSFPConstants.CommandType.MoveOpening,
        [this.entity]
      );

      if (moveCommand) {
        this._cmdMgr.execute(moveCommand);
        
        const delta = event.data.value - gizmo.getValue();
        const offset = gizmo.direction.multiplied(delta);
        
        this._cmdMgr.receive('moveto', {
          position: {
            x: entity.x + offset.x,
            y: entity.y + offset.y
          },
          origin: ParametricOpeningCalculatedDimension.uniqueType()
        });
        
        this._cmdMgr.complete();
      }
    }
  }

  private handleOpeningLengthChanged(entity: any, event: ValueChangeEvent, flag?: string): void {
    const propertyNode = entity.getPropertiesNode(flag);
    
    if (!this._cmd) {
      this._cmd = this._cmdMgr.createCommand(
        HSFPConstants.CommandType.EditParametricOpening,
        [this.entity]
      );
    }

    if (this._cmd) {
      this._cmd.receive('changeend', {
        node: propertyNode,
        newValue: 1000 * event.data.value
      });
    }

    this._cmdMgr.complete();
    this._cmd = undefined;
  }
}