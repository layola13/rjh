import { Arc2d, CONST } from './Arc2d';
import { PathItem } from './PathItem';

export enum EndPointType {
  Static = 'static',
  Active = 'active',
  Snap = 'snap',
  Error = 'error'
}

interface EndPointUpdateData {
  type?: EndPointType;
  hoverOn?: boolean;
  position?: unknown;
}

interface EndPointAttr {
  [key: string]: unknown;
}

declare global {
  namespace HSApp.View.SVG {
    namespace Util {
      function ModelToScreenFactor(context: unknown): number;
    }
  }
}

export const StaticEndPointAttr: EndPointAttr = {};
export const ActiveEndPointAttr: EndPointAttr = {};
export const SnapEndPointAttr: EndPointAttr = {};
export const ErrorEndPointAttr: EndPointAttr = {};

export class EndPointItem extends PathItem {
  private _context: unknown;
  private _defaultAttr?: EndPointAttr;
  private _type: EndPointType;

  constructor(context: unknown, defaultAttr?: EndPointAttr) {
    super(context);
    this._context = context;
    this._defaultAttr = defaultAttr;
    this._type = EndPointType.Static;
    this.attr(this._defaultAttr ?? StaticEndPointAttr);
  }

  /**
   * Update endpoint data including type, hover state, and position
   */
  updateData(data: EndPointUpdateData): void {
    const { type, hoverOn, position } = data;

    if (type) {
      this.setType(type);
    }

    if (position) {
      const baseRadius = 4;
      const hoverRadius = 6;
      const radius = hoverOn ? hoverRadius : baseRadius;
      const screenRadius = radius / HSApp.View.SVG.Util.ModelToScreenFactor(this._context);
      const arc = Arc2d.makeArcByStartEndAngles(
        position,
        screenRadius,
        0,
        CONST.PI2,
        true
      );
      this.path = arc;
    }
  }

  get type(): EndPointType {
    return this._type;
  }

  /**
   * Set the endpoint type and update visual attributes accordingly
   */
  setType(type: EndPointType): void {
    this._type = type;

    switch (this._type) {
      case EndPointType.Snap:
        this.attr(SnapEndPointAttr);
        break;
      case EndPointType.Active:
        this.attr(ActiveEndPointAttr);
        break;
      case EndPointType.Error:
        this.attr(ErrorEndPointAttr);
        break;
      case EndPointType.Static:
      default:
        this.attr(this._defaultAttr ?? StaticEndPointAttr);
    }
  }
}