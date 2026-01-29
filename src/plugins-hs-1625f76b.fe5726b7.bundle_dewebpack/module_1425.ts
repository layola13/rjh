interface PropertyBarControl {
  getControlById(id: string): unknown;
  hide(): void;
  clear(): void;
  show(): void;
  setControls(controls: unknown[]): void;
  signalSizeGrow: unknown;
  signalSizeShrink: unknown;
}

interface PropertyBarStatic {
  create(className: string): PropertyBarControl;
}

declare const PropertyBar: PropertyBarStatic;

export default class StatusBarManager {
  private _propertyBar: PropertyBarControl;
  public signalSizeGrow: unknown;
  public signalSizeShrink: unknown;

  constructor() {
    this._propertyBar = PropertyBar.create("statusBar unselectable");
    this.signalSizeGrow = this._propertyBar.signalSizeGrow;
    this.signalSizeShrink = this._propertyBar.signalSizeShrink;
  }

  /**
   * Retrieves a status bar control by its ID
   */
  getStatusBarControlById_(controlId: string): unknown {
    return this._propertyBar.getControlById(controlId);
  }

  /**
   * Clears and hides the status bar
   */
  clear_(): void {
    this._propertyBar.hide();
    this._propertyBar.clear();
  }

  /**
   * Shows the status bar
   */
  show_(): void {
    this._propertyBar.show();
  }

  /**
   * Hides the status bar
   */
  hide_(): void {
    this._propertyBar.hide();
  }

  /**
   * Redraws the status bar with new controls
   */
  redraw_(controls: unknown[]): void {
    this.clear_();
    this._propertyBar.setControls(controls);
    this._propertyBar.show();
  }
}