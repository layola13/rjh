interface SvgTextElement {
  attr(attributes: Record<string, any>): this;
  node: {
    style: CSSStyleDeclaration;
  };
  text(content: string): this;
  show(): void;
  hide(): void;
  remove(): void;
}

interface DrawingContext {
  text(): SvgTextElement;
  getScaleFactor(): number;
}

interface Point {
  x: number;
  y: number;
}

interface Range {
  getLength(): number;
}

interface Curve {
  getMidPt(): Point;
  isArc2d(): boolean;
  getRange(): Range;
  getLength(): number;
}

interface Matrix {
  scale(sx: number, sy: number, cx: number, cy: number): this;
  translate(tx: number, ty: number): this;
}

interface MatrixConstructor {
  new (): Matrix;
}

interface FloorPlan {
  displayLengthUnit: number;
}

interface App {
  floorplan: FloorPlan;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface HSCore {
  Util: {
    Unit: {
      LengthUnitTypeEnum: {
        inch: number;
      };
    };
  };
}

declare const HSApp: HSApp;
declare const HSCore: HSCore;

const TEXT_SHADOW = "-1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px -1px 0 #ffffff, 1px 1px 0 #ffffff";
const VERTICAL_OFFSET = -12;
const RADIANS_TO_DEGREES = 180 / Math.PI;
const UNIT_CONVERSION_BASE = 1000;
const INCHES_PER_FOOT = 12;

export class TextItem {
  private context: DrawingContext;
  private node: SvgTextElement;

  constructor(context: DrawingContext, textAttributes: Record<string, any>, matrixClass: MatrixConstructor, toSvgPointFn: (point: Point) => Point, getUnitParamFn: () => number) {
    this.context = context;
    this.node = context.text();
    this.node.attr(textAttributes);
    this.node.node.style.textShadow = TEXT_SHADOW;
    
    this.Matrix = matrixClass;
    this.toSvgPoint = toSvgPointFn;
    this.getUnitParam = getUnitParamFn;
  }

  private Matrix: MatrixConstructor;
  private toSvgPoint: (point: Point) => Point;
  private getUnitParam: () => number;

  /**
   * Updates the text item based on the curve properties
   * @param curve - The curve to display measurements for
   */
  setCurve(curve: Curve): void {
    const midPoint = this.toSvgPoint(curve.getMidPt());
    const scaleFactor = 1 / this.context.getScaleFactor();
    const transformMatrix = new this.Matrix()
      .scale(scaleFactor, scaleFactor, midPoint.x, midPoint.y)
      .translate(0, VERTICAL_OFFSET);

    this.attr({
      x: midPoint.x,
      y: midPoint.y,
      transform: transformMatrix
    });

    let displayText = "";

    if (curve.isArc2d()) {
      const angleDegrees = (curve.getRange().getLength() * RADIANS_TO_DEGREES).toFixed(1);
      displayText = `${angleDegrees}˚`;
    } else {
      const unitParam = this.getUnitParam();
      let lengthValue = curve.getLength() * unitParam;

      if (HSApp.App.getApp().floorplan.displayLengthUnit === HSCore.Util.Unit.LengthUnitTypeEnum.inch) {
        lengthValue /= INCHES_PER_FOOT;
        let feet = Math.trunc(lengthValue);
        let inches = Math.round(INCHES_PER_FOOT * (lengthValue - feet));

        if (inches === INCHES_PER_FOOT) {
          feet++;
          inches = 0;
        }

        displayText = `${feet}' ${inches}"`;
      } else {
        const decimalPlaces = -Math.log10(unitParam / UNIT_CONVERSION_BASE);
        displayText = lengthValue.toFixed(decimalPlaces);
      }
    }

    this.node.text(displayText);
  }

  attr(attributes: Record<string, any>): this {
    this.node.attr(attributes);
    return this;
  }

  show(): void {
    this.node.show();
  }

  hide(): void {
    this.node.hide();
  }

  dispose(): void {
    this.node.remove();
  }
}