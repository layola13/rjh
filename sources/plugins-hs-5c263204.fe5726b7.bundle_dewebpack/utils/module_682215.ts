// @ts-nocheck
interface SnappingData {
  type: string;
  snapLine: any[];
}

interface ReceiveEvent {
  data?: SnappingData[];
}

interface LinePoints {
  points: any[];
}

interface PathStyle {
  'stroke-width': number;
  stroke: string;
}

interface CommandOutput {
  instanceOf(modelClass: string): boolean;
}

interface Command {
  output: CommandOutput;
}

interface CurrentContent {
  content: any;
  signalResizeSnapped?: any;
}

interface Options {
  signalResizeSnapped?: any;
  current?: CurrentContent;
}

class BeamAuxiliaryLineView extends HSApp.View.SVG.Temp {
  private element: any[];
  private pathStyle: PathStyle;
  private dirty: boolean;

  constructor(cmd: Command, context: any, options: Options) {
    super(cmd, context, options);
    
    this.element = [];
    this.reset();

    if (options.signalResizeSnapped) {
      this.signalHook.listen(options.signalResizeSnapped, this.onReceive);
    } else if (
      options.current &&
      (options.current.content instanceof HSCore.Model.Beam ||
        options.current.content instanceof HSCore.Model.NCustomizedBeam) &&
      options.current.signalResizeSnapped
    ) {
      this.signalHook.listen(options.current.signalResizeSnapped, this.onReceive);
    }

    this.pathStyle = {
      'stroke-width': 1,
      stroke: '#ff521d'
    };
    
    this.dirty = false;
  }

  onReceive = (event: ReceiveEvent): void => {
    this.reset();
    
    if (event?.data) {
      event.data.forEach((item: SnappingData) => {
        if (
          item &&
          this.cmd.output.instanceOf(HSConstants.ModelClass.NgBeam) &&
          item.type === HSApp.Snapping.SnappingResultType.WallLines
        ) {
          const lines: LinePoints[] = [{
            points: item.snapLine
          }];
          this.prepareAuxiliaryLines(lines);
        }
      });
    }
  };

  prepareAuxiliaryLines(lines: LinePoints[]): void {
    lines.forEach((line: LinePoints) => {
      let points = line.points;
      const pathElement = this.context.path().attr(this.pathStyle);
      
      points = HSApp.View.SVG.Util.buildIndicateLine(this.context, points);
      
      if (points && points.length >= 2) {
        HSApp.View.SVG.Util.UpdateSnappedLineSVGElements(
          this.context,
          points[0],
          points[1],
          pathElement
        );
        this.element.push(pathElement);
      }
    });
  }

  reset(): void {
    this.element.forEach((elem: any) => {
      elem.hide();
    });
    this.element = [];
  }

  onCleanup(): void {
    this.reset();
    super.onCleanup?.();
  }
}

export default BeamAuxiliaryLineView;