import { ContentDimension } from './ContentDimension';
import { HSApp } from './HSApp';

interface LightDimensionInfo {
  from: Point;
  to: Point;
}

interface Point {
  x: number;
  y: number;
  z?: number;
}

interface DimensionData {
  lightDimensionInfo?: LightDimensionInfo[];
  extendsHelperLinearData?: unknown;
}

interface LinearDimensionGizmoData {
  startPoint: Point;
  endPoint: Point;
}

interface SettingChangedEvent {
  data: {
    fieldName?: string;
    name?: string;
    oldValue: unknown;
    value: unknown;
  };
}

export class LightingLocationDimension extends ContentDimension {
  public readonly type = "hsw.view.svg.gizmo.LightingLocationDimension";
  public isEnable: boolean = false;
  protected lightingAlignmentHelper: HSApp.Util.LightingLocationHelper;
  protected extendsHelperLinearData?: unknown;
  protected linearDimensionGizmoDatas: LinearDimensionGizmoData[] = [];

  constructor(e: unknown, n: unknown, i: unknown) {
    super(e, n, i);
    this.lightingAlignmentHelper = new HSApp.Util.LightingLocationHelper(i);
    this.updateIsEnable();
  }

  protected _onSettingChanged(event: SettingChangedEvent): void {
    const data = event.data;
    
    if (data.fieldName === "lightingLocationVisible" || data.name === "viewMode") {
      if (data.oldValue === data.value) {
        return;
      }
      this.updateIsEnable();
      this.update();
    }
  }

  public updateIsEnable(): void {
    this.isEnable = true;
  }

  public computeChildGizmoInfo(): void {
    const dimensionData = this.lightingAlignmentHelper.getDimensionData();
    
    if (dimensionData?.lightDimensionInfo) {
      this.extendsHelperLinearData = dimensionData.extendsHelperLinearData;
      
      dimensionData.lightDimensionInfo.forEach((info: LightDimensionInfo) => {
        this.linearDimensionGizmoDatas.push({
          startPoint: info.from,
          endPoint: info.to
        });
      });
    }
  }

  protected update(): void {
    // Implementation to be provided by parent class or override
  }
}