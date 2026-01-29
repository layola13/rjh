import { HSApp } from './518193';

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface AuxiliaryLine {
  points: Point2D[] | Point3D[];
}

interface ContentCenter {
  centerInfo?: string;
  isCenter?: string;
  snapPoint?: Point3D;
  snapPoints?: Point3D[];
}

interface SnapInfo {
  customizedCeilingCenter?: string;
  snapPoint?: Point3D[];
  snapLines?: AuxiliaryLine[];
}

interface WallHost {
  from: Point2D;
  to: Point2D;
}

interface SnappingResult {
  type: HSApp.Snapping.SnappingResultType;
  data?: SnappingResult[];
  contentCenter?: ContentCenter;
  snapInfo?: SnapInfo;
  host?: WallHost;
  snapLine?: Point2D[];
  snapPoints?: Point2D[];
}

interface SnappingEvent {
  data?: SnappingResult[];
}

interface SignalHook {
  listen(signal: unknown, callback: (event: SnappingEvent) => void): void;
}

interface CurrentContent {
  content: unknown;
  signalMoveSnapped?: unknown;
}

interface CommandOptions {
  signalMoveSnapped?: unknown;
  current?: CurrentContent;
}

export default class SnappingVisualization extends HSApp.View.SVG.Snap2d {
  private signalHook: SignalHook;
  private cmd: {
    content?: unknown;
    current?: CurrentContent;
  };

  constructor(
    element: unknown,
    namespace: unknown,
    options: CommandOptions
  ) {
    super(element, namespace, options);

    if (options.signalMoveSnapped) {
      this.signalHook.listen(options.signalMoveSnapped, this.onReceive);
    } else if (
      options.current &&
      (options.current.content instanceof HSCore.Model.Beam ||
        HSCore.Util.Content.isCeilingLight(options.current.content)) &&
      options.current.signalMoveSnapped
    ) {
      this.signalHook.listen(options.current.signalMoveSnapped, this.onReceive);
    }
  }

  private onReceive = (event: SnappingEvent): void => {
    this.reset();

    if (!event?.data) {
      return;
    }

    const snappingResults = event.data;
    const filteredResults: SnappingResult[] = [];
    let hasCeilingPanel = false;

    if (snappingResults.length > 1) {
      snappingResults.forEach((result) => {
        if (
          result?.type === HSApp.Snapping.SnappingResultType.CeilingPanel
        ) {
          hasCeilingPanel = true;
        }

        if (
          [
            HSApp.Snapping.SnappingResultType.LightingLines,
            HSApp.Snapping.SnappingResultType.Ceiling,
          ].includes(result.type)
        ) {
          if (filteredResults.length > 0) {
            for (const filtered of filteredResults) {
              if (filtered.type !== HSApp.Snapping.SnappingResultType.Ceiling) {
                filteredResults.push(result);
              }
            }
          } else {
            filteredResults.push(result);
          }
        }
      });
    }

    snappingResults.forEach((result) => {
      if (!result) {
        return;
      }

      this.handleCeilingPanel(result);
      this.handleLightingLines(result, hasCeilingPanel);
      this.handleCeilingType(result, filteredResults);
      this.handleBeamWallSnapping(result);
      this.handleFurnitureEdgePoint(result);
    });
  };

  private handleCeilingPanel(result: SnappingResult): void {
    if (
      result.type === HSApp.Snapping.SnappingResultType.CeilingPanel &&
      result.contentCenter?.snapPoint &&
      result.contentCenter.centerInfo === 'center'
    ) {
      const centerPoint = result.contentCenter.snapPoint;
      const lines: AuxiliaryLine[] = [
        {
          points: [
            { x: centerPoint.x + 10, y: centerPoint.y, z: centerPoint.z },
            { x: centerPoint.x, y: centerPoint.y, z: centerPoint.z },
          ],
        },
        {
          points: [
            { x: centerPoint.x, y: centerPoint.y + 10, z: centerPoint.z },
            { x: centerPoint.x, y: centerPoint.y, z: centerPoint.z },
          ],
        },
      ];
      this.prepareAuxiliaryLines(lines);
    }
  }

  private handleLightingLines(
    result: SnappingResult,
    hasCeilingPanel: boolean
  ): void {
    if (
      result.type === HSApp.Snapping.SnappingResultType.LightingLines &&
      result.snapInfo &&
      !hasCeilingPanel
    ) {
      if (result.snapInfo.customizedCeilingCenter) {
        const lines: AuxiliaryLine[] = [];
        const snapPoints = result.snapInfo.snapPoint;

        if (!snapPoints) {
          return;
        }

        if (result.snapInfo.customizedCeilingCenter === 'center') {
          lines.push(
            {
              points: [
                { x: snapPoints[0].x + 10, y: snapPoints[0].y, z: snapPoints[0].z },
                { x: snapPoints[0].x, y: snapPoints[0].y, z: snapPoints[0].z },
              ],
            },
            {
              points: [
                { x: snapPoints[1].x, y: snapPoints[1].y + 10, z: snapPoints[1].z },
                { x: snapPoints[1].x, y: snapPoints[1].y, z: snapPoints[1].z },
              ],
            }
          );
        } else {
          lines.push({
            points: [
              { x: snapPoints[0].x, y: snapPoints[0].y, z: snapPoints[0].z },
              { x: snapPoints[1].x, y: snapPoints[1].y, z: snapPoints[0].z },
            ],
          });
        }
        this.prepareAuxiliaryLines(lines);
      } else if (result.snapInfo.snapLines) {
        this.prepareAuxiliaryLines(result.snapInfo.snapLines);
      }
    }
  }

  private handleCeilingType(
    result: SnappingResult,
    filteredResults: SnappingResult[]
  ): void {
    if (
      filteredResults.length !== 2 &&
      result.type === HSApp.Snapping.SnappingResultType.Ceiling &&
      result.contentCenter?.isCenter
    ) {
      const lines: AuxiliaryLine[] = [];
      const centerType = result.contentCenter.isCenter;
      const snapPoints = result.contentCenter.snapPoints;

      if (!snapPoints) {
        return;
      }

      if (centerType === 'center') {
        lines.push(
          {
            points: [
              { x: snapPoints[0].x + 10, y: snapPoints[0].y, z: snapPoints[0].z },
              { x: snapPoints[0].x, y: snapPoints[0].y, z: snapPoints[0].z },
            ],
          },
          {
            points: [
              { x: snapPoints[1].x, y: snapPoints[1].y + 10, z: snapPoints[1].z },
              { x: snapPoints[1].x, y: snapPoints[1].y, z: snapPoints[1].z },
            ],
          }
        );
      } else {
        lines.push({
          points: [
            { x: snapPoints[0].x, y: snapPoints[0].y, z: snapPoints[1].z },
            { x: snapPoints[1].x, y: snapPoints[1].y, z: snapPoints[1].z },
          ],
        });
      }
      this.prepareAuxiliaryLines(lines);
    }
  }

  private handleBeamWallSnapping(result: SnappingResult): void {
    const isBeamContent =
      this.cmd.content instanceof HSCore.Model.Beam ||
      (this.cmd.current?.content instanceof HSCore.Model.Beam);

    if (!isBeamContent) {
      return;
    }

    if (result.type === HSApp.Snapping.SnappingResultType.WallMidLine && result.host) {
      const lines: AuxiliaryLine[] = [{
        points: [
          { x: result.host.from.x, y: result.host.from.y },
          { x: result.host.to.x, y: result.host.to.y },
        ],
      }];
      this.prepareAuxiliaryLines(lines);
    } else if (
      result.type === HSApp.Snapping.SnappingResultType.WallInnerOuterLine &&
      result.snapLine
    ) {
      const lines: AuxiliaryLine[] = [{ points: result.snapLine }];
      this.prepareAuxiliaryLines(lines);
    }
  }

  private handleFurnitureEdgePoint(result: SnappingResult): void {
    if (
      result.type === HSApp.Snapping.SnappingResultType.FurnitureEgdePoint &&
      result.snapPoints
    ) {
      const lines: AuxiliaryLine[] = [{ points: result.snapPoints }];
      this.showFurnitureAuxiliaryLines(lines);
    }
  }

  protected reset(): void {
    // Implementation provided by base class
  }

  protected prepareAuxiliaryLines(lines: AuxiliaryLine[]): void {
    // Implementation provided by base class
  }

  protected showFurnitureAuxiliaryLines(lines: AuxiliaryLine[]): void {
    // Implementation provided by base class
  }
}