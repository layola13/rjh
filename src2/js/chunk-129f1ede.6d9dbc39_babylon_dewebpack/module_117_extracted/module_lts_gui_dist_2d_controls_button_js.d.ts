/**
 * Babylon.js GUI Button Control
 * A clickable UI control that can contain text, images, or both.
 */

import { Observable } from 'core/Misc/observable';
import { Rectangle } from './rectangle';
import { Control } from './control';
import { TextBlock } from './textBlock';
import { Image } from './image';

/**
 * Interface for pointer event context
 */
interface IPointerEventContext {
  /** X coordinate of the pointer */
  x: number;
  /** Y coordinate of the pointer */
  y: number;
  /** Pointer ID */
  pointerId: number;
  /** Button index */
  buttonIndex: number;
}

/**
 * Class representing a clickable button control.
 * Extends Rectangle to provide interactive button behavior with optional text and image content.
 */
export class Button extends Rectangle {
  /** The name identifier of the button */
  public name: string;

  /** 
   * Whether to delegate hit testing to child controls.
   * When true, only clicks on visible child controls will register.
   */
  public delegatePickingToChildren: boolean = false;

  /** Border thickness in pixels */
  public thickness: number = 1;

  /** Whether the button blocks pointer events from passing through */
  public isPointerBlocker: boolean = true;

  /** Optional animation callback triggered when pointer enters the button */
  public pointerEnterAnimation?: () => void;

  /** Optional animation callback triggered when pointer leaves the button */
  public pointerOutAnimation?: () => void;

  /** Optional animation callback triggered when pointer button is pressed down */
  public pointerDownAnimation?: () => void;

  /** Optional animation callback triggered when pointer button is released */
  public pointerUpAnimation?: () => void;

  /** Internal reference to the button's image control */
  private _image?: Image;

  /** Internal reference to the button's text block control */
  private _textBlock?: TextBlock;

  /** Stored alpha value for animation restoration */
  private _previousAlpha: number | null = null;

  /**
   * Creates a new Button instance
   * @param name - The unique name identifier for this button
   */
  constructor(name: string) {
    super(name);
    this.name = name;

    // Set up default pointer animations
    this.pointerEnterAnimation = () => {
      this._previousAlpha = this.alpha;
      this.alpha -= 0.1;
    };

    this.pointerOutAnimation = () => {
      if (this._previousAlpha !== null) {
        this.alpha = this._previousAlpha;
      }
    };

    this.pointerDownAnimation = () => {
      this.scaleX -= 0.05;
      this.scaleY -= 0.05;
    };

    this.pointerUpAnimation = () => {
      this.scaleX += 0.05;
      this.scaleY += 0.05;
    };
  }

  /**
   * Gets the image control contained in this button
   */
  public get image(): Image | undefined {
    return this._image;
  }

  /**
   * Gets the text block control contained in this button
   */
  public get textBlock(): TextBlock | undefined {
    return this._textBlock;
  }

  /**
   * Gets the type name of this control
   * @returns The string "Button"
   */
  protected _getTypeName(): string {
    return 'Button';
  }

  /**
   * Processes pointer picking/hit testing for this button
   * @param x - X coordinate in pixels
   * @param y - Y coordinate in pixels
   * @param pointerId - Unique pointer identifier
   * @param buttonIndex - Mouse button index
   * @param pickingInfo - Additional picking information
   * @param pointerEvent - The pointer event object
   * @param preventHit - Whether to prevent hit detection
   * @param isWheel - Whether this is a wheel event
   * @returns True if the button was picked, false otherwise
   */
  protected _processPicking(
    x: number,
    y: number,
    pointerId: number,
    buttonIndex: number,
    pickingInfo: unknown,
    pointerEvent: PointerEvent,
    preventHit: boolean,
    isWheel: boolean
  ): boolean {
    // Early exit if button cannot be interacted with
    if (!this._isEnabled || !this.isHitTestVisible || !this.isVisible || this.notRenderable) {
      return false;
    }

    // Check if coordinates are within button bounds
    if (!super.contains(x, y)) {
      return false;
    }

    // If delegating to children, ensure at least one child is hit
    if (this.delegatePickingToChildren) {
      let childHit = false;
      for (let i = this._children.length - 1; i >= 0; i--) {
        const child = this._children[i];
        if (
          child.isEnabled &&
          child.isHitTestVisible &&
          child.isVisible &&
          !child.notRenderable &&
          child.contains(x, y)
        ) {
          childHit = true;
          break;
        }
      }
      if (!childHit) {
        return false;
      }
    }

    // Process observables for this control
    this._processObservables(buttonIndex, x, y, pointerId, pickingInfo, pointerEvent, preventHit, isWheel);
    return true;
  }

  /**
   * Handles pointer enter event
   * @param control - The control being entered
   * @param cachedState - Cached pointer state
   * @returns True if event was handled
   */
  protected _onPointerEnter(control: Control, cachedState: unknown): boolean {
    if (!super._onPointerEnter(control, cachedState)) {
      return false;
    }

    if (!this.isReadOnly && this.pointerEnterAnimation) {
      this.pointerEnterAnimation();
    }

    return true;
  }

  /**
   * Handles pointer out/leave event
   * @param control - The control being left
   * @param cachedState - Cached pointer state
   * @param forceOut - Whether to force the out event
   */
  protected _onPointerOut(control: Control, cachedState: unknown, forceOut: boolean = false): void {
    if (!this.isReadOnly && this.pointerOutAnimation) {
      this.pointerOutAnimation();
    }

    super._onPointerOut(control, cachedState, forceOut);
  }

  /**
   * Handles pointer down event
   * @param control - The control being pressed
   * @param coordinates - Pointer coordinates
   * @param pointerId - Unique pointer identifier
   * @param buttonIndex - Mouse button index
   * @param type - Event type
   * @returns True if event was handled
   */
  protected _onPointerDown(
    control: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    buttonIndex: number,
    type: number
  ): boolean {
    if (!super._onPointerDown(control, coordinates, pointerId, buttonIndex, type)) {
      return false;
    }

    if (!this.isReadOnly && this.pointerDownAnimation) {
      this.pointerDownAnimation();
    }

    return true;
  }

  /**
   * Gets the fill color for the button rectangle
   * @param context - Rendering context
   * @returns The fill color string
   */
  protected _getRectangleFill(context: CanvasRenderingContext2D): string {
    return this.isEnabled ? this._getBackgroundColor(context) : this._disabledColor;
  }

  /**
   * Handles pointer up event
   * @param control - The control being released
   * @param coordinates - Pointer coordinates
   * @param pointerId - Unique pointer identifier
   * @param buttonIndex - Mouse button index
   * @param notifyClick - Whether to notify click event
   * @param isWheel - Whether this is a wheel event
   */
  protected _onPointerUp(
    control: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    buttonIndex: number,
    notifyClick: boolean,
    isWheel: boolean
  ): void {
    if (!this.isReadOnly && this.pointerUpAnimation) {
      this.pointerUpAnimation();
    }

    super._onPointerUp(control, coordinates, pointerId, buttonIndex, notifyClick, isWheel);
  }

  /**
   * Serializes the button to JSON
   * @param serializationObject - The object to serialize into
   */
  public serialize(serializationObject: Record<string, unknown>): void {
    super.serialize(serializationObject);

    if (this._textBlock) {
      serializationObject.textBlockName = this._textBlock.name;
    }

    if (this._image) {
      serializationObject.imageName = this._image.name;
    }
  }

  /**
   * Parses button properties from serialized content
   * @param serializedObject - The serialized object
   * @param host - The host advanced dynamic texture
   */
  protected _parseFromContent(serializedObject: Record<string, unknown>, host: unknown): void {
    super._parseFromContent(serializedObject, host);

    if (serializedObject.textBlockName) {
      this._textBlock = this.getChildByName(serializedObject.textBlockName as string) as TextBlock;
    }

    if (serializedObject.imageName) {
      this._image = this.getChildByName(serializedObject.imageName as string) as Image;
    }
  }

  /**
   * Creates a button with an icon on the left and text on the right
   * @param name - The button name
   * @param text - The button text
   * @param imageUrl - The image URL or base64 string
   * @returns A new Button instance
   */
  public static CreateImageButton(name: string, text: string, imageUrl: string): Button {
    const button = new Button(name);

    // Create and configure text block
    const textBlock = new TextBlock(`${name}_button`, text);
    textBlock.textWrapping = true;
    textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    textBlock.paddingLeft = '20%';
    button.addControl(textBlock);

    // Create and configure image
    const image = new Image(`${name}_icon`, imageUrl);
    image.width = '20%';
    image.stretch = Image.STRETCH_UNIFORM;
    image.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    button.addControl(image);

    button._image = image;
    button._textBlock = textBlock;

    return button;
  }

  /**
   * Creates a button with only an image (no text)
   * @param name - The button name
   * @param imageUrl - The image URL or base64 string
   * @returns A new Button instance
   */
  public static CreateImageOnlyButton(name: string, imageUrl: string): Button {
    const button = new Button(name);

    const image = new Image(`${name}_icon`, imageUrl);
    image.stretch = Image.STRETCH_FILL;
    image.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    button.addControl(image);

    button._image = image;

    return button;
  }

  /**
   * Creates a simple text-only button
   * @param name - The button name
   * @param text - The button text
   * @returns A new Button instance
   */
  public static CreateSimpleButton(name: string, text: string): Button {
    const button = new Button(name);

    const textBlock = new TextBlock(`${name}_button`, text);
    textBlock.textWrapping = true;
    textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    button.addControl(textBlock);

    button._textBlock = textBlock;

    return button;
  }

  /**
   * Creates a button with a background image and centered text overlay
   * @param name - The button name
   * @param text - The button text
   * @param imageUrl - The background image URL or base64 string
   * @returns A new Button instance
   */
  public static CreateImageWithCenterTextButton(name: string, text: string, imageUrl: string): Button {
    const button = new Button(name);

    // Create background image
    const image = new Image(`${name}_icon`, imageUrl);
    image.stretch = Image.STRETCH_FILL;
    button.addControl(image);

    // Create centered text overlay
    const textBlock = new TextBlock(`${name}_button`, text);
    textBlock.textWrapping = true;
    textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    button.addControl(textBlock);

    button._image = image;
    button._textBlock = textBlock;

    return button;
  }
}

// Register the Button class with Babylon.js
RegisterClass('BABYLON.GUI.Button', Button);