import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { isFunction } from './utils';
import { RoofAngleGizmo } from './RoofAngleGizmo';
import { ENParamRoofType } from './ENParamRoofType';

interface RoofParameter {
  name: string;
  value: number;
  minMax?: [number, number];
}

interface RoofParameters {
  roomLoop?: boolean;
  roofType?: ENParamRoofType;
}

interface RoofEntity {
  id: string;
  parameters: RoofParameters;
}

interface DisplayListItem {
  getChoiceFaceName?: () => string | undefined;
}

interface Canvas3D {
  context: HSCore.Context;
  displayList: Record<string, DisplayListItem>;
}

interface App {
  getActive3DView(): Canvas3D;
}

export class InputViewController {
  private _app: App;
  private _context?: HSCore.Context;
  private _canvas3d: Canvas3D;
  private _gizmos3d: RoofAngleGizmo[] = [];
  private _signalHook: HSCore.Util.SignalHook;

  constructor() {
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._app = HSApp.App.getApp();
    this._canvas3d = this._app.getActive3DView();
    this._signalHook.listen(
      this._canvas3d.context.signalCameraChanged,
      this._onCameraChanged
    );
  }

  public refresh(entity?: RoofEntity): void {
    this._clear();

    if (entity) {
      const displayItem = this._app.getActive3DView().displayList[entity.id];
      const hasChoiceFaceName =
        isFunction(displayItem?.getChoiceFaceName) &&
        displayItem.getChoiceFaceName();

      if (!hasChoiceFaceName) {
        this._init(entity);
      }
    }
  }

  private _init(entity: RoofEntity): void {
    this._context = this._canvas3d.context;

    const hasRoomLoop = entity.parameters.roomLoop;
    const isSaltBoxOrBoxGable =
      entity.parameters.roofType === ENParamRoofType.SaltBox ||
      entity.parameters.roofType === ENParamRoofType.BoxGable;

    if (hasRoomLoop && isSaltBoxOrBoxGable) {
      const angleParams: Array<{
        name: string;
        value: number;
        min: number;
        max: number;
      }> = [];

      const angleNames = ['angleA', 'angleB'];
      const roofParamNodes = HSCore.Util.Roof.getRoofParamNodes(entity);

      roofParamNodes.forEach((param: RoofParameter) => {
        const isAngleParam = angleNames.find((name) => param.name === name);

        if (isAngleParam) {
          angleParams.push({
            name: param.name,
            value: param.value,
            min: param.minMax ? param.minMax[0] : 1,
            max: param.minMax ? param.minMax[1] : 89,
          });
        }
      });

      angleParams.forEach((angleParam) => {
        const gizmo = new RoofAngleGizmo(this._context!, {
          roof: entity,
          name: angleParam.name,
          value: angleParam.value,
          min: angleParam.min,
          max: angleParam.max,
        });

        gizmo.show();
        this._gizmos3d.push(gizmo);
      });
    }
  }

  private _clear(): void {
    this._gizmos3d.forEach((gizmo) => {
      gizmo.cleanup();
    });
    this._gizmos3d = [];
  }

  private _onCameraChanged = (): void => {
    this._gizmos3d.forEach((gizmo) => {
      gizmo.updatePosition();
    });
  };
}