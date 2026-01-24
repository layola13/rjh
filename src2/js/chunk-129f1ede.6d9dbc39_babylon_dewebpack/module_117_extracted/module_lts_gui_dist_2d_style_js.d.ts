/**
 * Represents a style configuration for GUI controls, managing font properties and notifying observers of changes.
 * @module GUI/2D/Style
 */

import { Observable } from "core/Misc/observable";
import { ValueAndUnit } from "./valueAndUnit";

/**
 * Interface representing a host object that can be used with Style
 */
export interface IStyleHost {
  // Host interface properties would be defined based on actual usage
}

/**
 * Style class for managing font and text appearance properties in 2D GUI controls.
 * Provides observable notifications when style properties change.
 */
export class Style {
  /**
   * The font family for the text (e.g., "Arial", "Times New Roman")
   * @default "Arial"
   */
  private _fontFamily: string;

  /**
   * The font style (e.g., "normal", "italic", "oblique")
   * @default ""
   */
  private _fontStyle: string;

  /**
   * The font weight (e.g., "normal", "bold", "100", "900")
   * @default ""
   */
  private _fontWeight: string;

  /**
   * Internal font size value with unit support
   * @default 18px
   */
  private _fontSize: ValueAndUnit;

  /**
   * Observable that triggers when any style property changes
   */
  public onChangedObservable: Observable<Style>;

  /**
   * Reference to the host object that uses this style
   */
  private _host: IStyleHost;

  /**
   * Creates a new Style instance
   * @param host - The host object that will use this style
   */
  constructor(host: IStyleHost) {
    this._fontFamily = "Arial";
    this._fontStyle = "";
    this._fontWeight = "";
    this._fontSize = new ValueAndUnit(18, ValueAndUnit.UNITMODE_PIXEL, false);
    this.onChangedObservable = new Observable<Style>();
    this._host = host;
  }

  /**
   * Gets the font size as a string with units
   * @returns The font size string (e.g., "18px", "1.5em")
   */
  get fontSize(): string {
    return this._fontSize.toString(this._host);
  }

  /**
   * Sets the font size from a string value
   * Notifies observers if the value changes
   * @param value - The font size string to set
   */
  set fontSize(value: string) {
    if (this._fontSize.toString(this._host) !== value && this._fontSize.fromString(value)) {
      this.onChangedObservable.notifyObservers(this);
    }
  }

  /**
   * Gets the font family name
   * @returns The current font family
   */
  get fontFamily(): string {
    return this._fontFamily;
  }

  /**
   * Sets the font family
   * Notifies observers if the value changes
   * @param value - The font family name to set
   */
  set fontFamily(value: string) {
    if (this._fontFamily !== value) {
      this._fontFamily = value;
      this.onChangedObservable.notifyObservers(this);
    }
  }

  /**
   * Gets the font style
   * @returns The current font style
   */
  get fontStyle(): string {
    return this._fontStyle;
  }

  /**
   * Sets the font style
   * Notifies observers if the value changes
   * @param value - The font style to set
   */
  set fontStyle(value: string) {
    if (this._fontStyle !== value) {
      this._fontStyle = value;
      this.onChangedObservable.notifyObservers(this);
    }
  }

  /**
   * Gets the font weight
   * @returns The current font weight
   */
  get fontWeight(): string {
    return this._fontWeight;
  }

  /**
   * Sets the font weight
   * Notifies observers if the value changes
   * @param value - The font weight to set
   */
  set fontWeight(value: string) {
    if (this._fontWeight !== value) {
      this._fontWeight = value;
      this.onChangedObservable.notifyObservers(this);
    }
  }

  /**
   * Disposes of the style instance and clears all observers
   * Should be called when the style is no longer needed to prevent memory leaks
   */
  dispose(): void {
    this.onChangedObservable.clear();
  }
}