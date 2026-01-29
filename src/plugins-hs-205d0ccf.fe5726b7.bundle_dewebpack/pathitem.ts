import { toSvgPath } from './svg-utils';

interface SvgNode {
  attr(attributes: Record<string, any>): void;
  marker(position: 'start' | 'end', marker: any): void;
  show(): void;
  hide(): void;
  remove(): void;
}

interface PathItemOptions {
  path(): SvgNode;
}

/**
 * Represents a path item in an SVG drawing context.
 * Manages visibility and attributes of an SVG path element.
 */
export class PathItem {
  private _isShow: boolean;
  private node: SvgNode;

  constructor(options: PathItemOptions) {
    this.node = options.path();
    this._isShow = true;
  }

  /**
   * Sets the path data for the SVG path element.
   */
  set path(pathData: any) {
    this.attr({
      d: toSvgPath(pathData)
    });
  }

  /**
   * Sets attributes on the underlying SVG node.
   * @param attributes - Key-value pairs of attributes to set
   * @returns This instance for method chaining
   */
  attr(attributes: Record<string, any>): this {
    this.node.attr(attributes);
    return this;
  }

  /**
   * Sets markers at the start and end of the path.
   * @param marker - The marker to apply
   */
  marker(marker: any): void {
    this.node.marker('start', marker);
    this.node.marker('end', marker);
  }

  /**
   * Shows the path element if currently hidden.
   */
  show(): void {
    if (!this._isShow) {
      this._isShow = true;
      this.node.show();
    }
  }

  /**
   * Hides the path element if currently visible.
   */
  hide(): void {
    if (this._isShow) {
      this._isShow = false;
      this.node.hide();
    }
  }

  /**
   * Removes the path element from the DOM.
   */
  dispose(): void {
    this.node.remove();
  }
}