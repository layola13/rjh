import { HSApp } from './HSApp';
import { DrawLines } from './DrawLines';

interface Sketch2DBuilder {
  context: any;
  displayLayers: {
    temp: any;
  };
}

interface KeydownEventData {
  keyCode: number;
  [key: string]: any;
}

interface ClickEventData {
  event?: {
    button: number;
  };
  [key: string]: any;
}

interface GizmoCompleteEventData {
  paths: any[];
  [key: string]: any;
}

type EventData = KeydownEventData | ClickEventData | GizmoCompleteEventData;

interface Gizmo {
  onESC(event?: any): void;
  reset(): void;
}

interface TransactionManager {
  createRequest(requestType: string, params: any[]): any;
  commit(request: any): void;
}

interface Context {
  transManager: TransactionManager;
}

export class CmdDrawLines extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExLines {
  private sketch2dBuilder: Sketch2DBuilder;
  protected gizmo?: Gizmo;
  protected context!: Context;

  constructor(sketch2dBuilder: Sketch2DBuilder) {
    super(sketch2dBuilder);
    this.sketch2dBuilder = sketch2dBuilder;
  }

  protected _create2DGizmo(builder: Sketch2DBuilder): DrawLines {
    return new DrawLines(builder.context, builder.displayLayers.temp, this, false);
  }

  public onReceive(eventType: string, eventData: EventData): boolean {
    if (eventType === 'keydown') {
      const keydownData = eventData as KeydownEventData;
      if (keydownData.keyCode === HSApp.Util.Keyboard.KeyCodes.ESC) {
        this.gizmo?.onESC(keydownData);
        return true;
      }
    } else if (eventType === 'click') {
      const clickData = eventData as ClickEventData;
      if (clickData.event?.button === 2) {
        this.gizmo?.onESC();
        return true;
      }
    } else if (eventType === 'gizmo.completeSinglePath') {
      const gizmoData = eventData as GizmoCompleteEventData;
      const paths = gizmoData.paths;
      if (paths.length > 0) {
        const request = this._createRequest(paths);
        const transManager = this.context.transManager;
        if (request) {
          transManager.commit(request);
        }
        this.gizmo?.reset();
        this.showToast(paths);
      }
      return true;
    }

    return super.onReceive(eventType, eventData);
  }

  protected _createRequest(paths: any[]): any {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.OutdoorDrawing.DrawLines,
      [this.sketch2dBuilder, paths]
    );
  }

  public getDescription(): string {
    return '外部区域绘制-划线';
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.RoofsDrawing;
  }

  protected showToast(paths: any[]): void {
    // Implementation from parent class
  }
}