import { HSCore } from './HSCore';
import MathUtils from './MathUtils';

interface EntityFieldChangeData {
  oldValue: number;
  newValue: number;
  fieldName: string;
}

interface EntityFieldChangeEvent {
  data?: EntityFieldChangeData;
}

interface Entity {
  signalFieldChanged: unknown;
}

interface UIThreadOptions {
  overridable: boolean;
  taskId: string;
  delayLimits: number;
}

declare function runInUIThread(
  callback: () => void,
  options: UIThreadOptions
): void;

abstract class BaseController {
  abstract setValue(value: number): void;
}

export class ContentRotateController extends BaseController {
  private entity: Entity;
  private _contentSignalHook?: HSCore.Util.SignalHook<ContentRotateController>;

  constructor(entity: Entity, options: unknown) {
    super(options);
    this.entity = entity;
    this._contentSignalHook = new HSCore.Util.SignalHook<ContentRotateController>(this);
    this._contentSignalHook.listen(entity.signalFieldChanged, this.onEntityFieldChange);
  }

  private onEntityFieldChange(event: EntityFieldChangeEvent): void {
    if (
      event?.data &&
      !MathUtils.nearlyEqual(event.data.oldValue, event.data.newValue) &&
      event.data.fieldName === 'ZRotation'
    ) {
      if (typeof runInUIThread !== 'undefined') {
        runInUIThread(
          () => {
            this.setValue(event.data!.newValue);
          },
          {
            overridable: true,
            taskId: 'updateZRotate',
            delayLimits: 20
          }
        );
      } else {
        this.setValue(event.data.newValue);
      }
    }
  }

  public deactive(): void {
    this._contentSignalHook?.dispose();
    this._contentSignalHook = undefined;
  }

  public setValue(value: number): void {
    // Implementation to be provided by subclass or added here
  }
}