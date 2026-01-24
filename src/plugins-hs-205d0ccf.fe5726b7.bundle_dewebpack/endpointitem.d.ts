/**
 * Module: EndPointItem
 * Defines endpoint types and item class for rendering endpoint markers
 */

import { PathItem } from './PathItem';
import { Arc2d, CONST } from './Arc2d';
import {
  StaticEndPointAttr,
  SnapEndPointAttr,
  ActiveEndPointAttr,
  ErrorEndPointAttr,
  EndPointAttributes
} from './EndPointAttributes';

/**
 * Enum representing different states of an endpoint
 */
export enum EndPointType {
  /** Default static endpoint state */
  Static = 'static',
  /** Active/selected endpoint state */
  Active = 'active',
  /** Snapped endpoint state */
  Snap = 'snap',
  /** Error/invalid endpoint state */
  Error = 'error'
}

/**
 * Position in 2D space
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Data structure for updating endpoint visual state
 */
export interface EndPointUpdateData {
  /** New endpoint type/state */
  type?: EndPointType;
  /** Whether the endpoint is being hovered */
  hoverOn?: boolean;
  /** New position for the endpoint */
  position?: Position;
}

/**
 * Global HSApp namespace (defined externally)
 */
declare global {
  const HSApp: {
    View: {
      SVG: {
        Util: {
          ModelToScreenFactor(context: unknown): number;
        };
      };
    };
  };
}

/**
 * Represents a visual endpoint marker in the SVG canvas
 * Supports different visual states (static, active, snap, error)
 */
export class EndPointItem extends PathItem {
  private _context: unknown;
  private _defaultAttr: EndPointAttributes;
  private _type: EndPointType;

  /**
   * Creates a new endpoint item
   * @param context - Rendering context
   * @param defaultAttr - Default visual attributes (optional, defaults to StaticEndPointAttr)
   */
  constructor(context: unknown, defaultAttr?: EndPointAttributes) {
    super(context);
    this._context = context;
    this._defaultAttr = defaultAttr;
    this._type = EndPointType.Static;
    this.attr(this._defaultAttr ?? StaticEndPointAttr);
  }

  /**
   * Gets the current endpoint type/state
   */
  get type(): EndPointType {
    return this._type;
  }

  /**
   * Updates the endpoint's visual representation
   * @param data - Update data containing type, hover state, and/or position
   */
  updateData(data: EndPointUpdateData): void {
    const { type, hoverOn, position } = data;

    if (type) {
      this.setType(type);
    }

    if (position) {
      // Base radius for normal state
      const BASE_RADIUS = 4;
      // Enlarged radius for hover state
      const HOVER_RADIUS = 6;
      
      const radiusInPixels = hoverOn ? HOVER_RADIUS : BASE_RADIUS;
      const radius = radiusInPixels / HSApp.View.SVG.Util.ModelToScreenFactor(this._context);
      
      // Create full circle arc as endpoint marker
      const arc = Arc2d.makeArcByStartEndAngles(
        position,
        radius,
        0,
        CONST.PI2,
        true
      );
      
      this.path = arc;
    }
  }

  /**
   * Sets the endpoint type and applies corresponding visual attributes
   * @param type - The endpoint type to set
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