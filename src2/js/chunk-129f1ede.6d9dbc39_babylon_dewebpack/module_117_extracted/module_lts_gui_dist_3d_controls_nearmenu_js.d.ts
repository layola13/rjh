/**
 * Near menu control for 3D GUI in Babylon.js
 * Extends TouchHolographicMenu with pinning and follow behavior capabilities
 */

import { TouchHolographicButton } from './touchHolographicButton';
import { DefaultBehavior } from '../behaviors/defaultBehavior';
import { TouchHolographicMenu } from './touchHolographicMenu';
import { Scene } from '@babylonjs/core/scene';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import { Observer } from '@babylonjs/core/Misc/observable';

/**
 * NearMenu - A holographic menu that can follow the user or be pinned in place
 * Provides default interaction behaviors including six degrees of freedom dragging
 */
export class NearMenu extends TouchHolographicMenu {
  /**
   * Base URL for MRTK (Mixed Reality Toolkit) assets
   */
  private static readonly _ASSETS_BASE_URL = 'https://assets.babylonjs.com/meshes/MRTK/';
  
  /**
   * Filename for the pin icon texture
   */
  private static readonly _PIN_ICON_FILENAME = 'IconPin.png';

  /**
   * Whether the menu is currently pinned in space
   */
  private _isPinned = false;

  /**
   * Default behavior controller for follow and drag interactions
   */
  private readonly _defaultBehavior: DefaultBehavior;

  /**
   * Pin button control for toggling pinned state
   */
  private _pinButton!: TouchHolographicButton;

  /**
   * Observer for drag events to auto-pin on drag
   */
  private readonly _dragObserver: Observer<unknown>;

  /**
   * Gets the default behavior instance managing follow and drag behaviors
   */
  public get defaultBehavior(): DefaultBehavior {
    return this._defaultBehavior;
  }

  /**
   * Gets or sets whether the menu is pinned in place
   * When pinned, the menu stops following the user
   */
  public get isPinned(): boolean {
    return this._isPinned;
  }

  public set isPinned(value: boolean) {
    if (this._pinButton.isToggled === value) {
      this._isPinned = value;
      this._defaultBehavior.followBehaviorEnabled = !value;
    } else {
      this._pinButton.isToggled = value;
    }
  }

  /**
   * Creates a new NearMenu instance
   * @param name - Unique identifier for the menu
   */
  constructor(name: string) {
    super(name);
    
    this._defaultBehavior = new DefaultBehavior();
    
    // Auto-pin when user drags the menu
    this._dragObserver = this._defaultBehavior.sixDofDragBehavior.onDragObservable.add(() => {
      this.isPinned = true;
    });
    
    this.backPlateMargin = 1;
  }

  /**
   * Creates the pin toggle button for the menu
   * @param parent - Parent transform node to attach the button to
   * @returns Configured TouchHolographicButton instance
   */
  private _createPinButton(parent: TransformNode): TouchHolographicButton {
    const button = new TouchHolographicButton(`pin${this.name}`, false);
    button.imageUrl = NearMenu._ASSETS_BASE_URL + NearMenu._PIN_ICON_FILENAME;
    button.parent = this;
    button._host = this._host;
    button.isToggleButton = true;
    
    button.onToggleObservable.add((isToggled: boolean) => {
      this.isPinned = isToggled;
    });
    
    if (this._host.utilityLayer) {
      button._prepareNode(this._host.utilityLayer.utilityLayerScene);
      button.scaling.scaleInPlace(TouchHolographicMenu.MENU_BUTTON_SCALE);
      
      if (button.node) {
        button.node.parent = parent;
      }
    }
    
    return button;
  }

  /**
   * Creates and configures the root node for the menu
   * Sets up pin button, default behaviors, and follow settings
   * @param scene - Scene to create the node in
   * @returns Configured TransformNode
   */
  protected _createNode(scene: Scene): TransformNode {
    const node = super._createNode(scene);
    
    this._pinButton = this._createPinButton(node);
    this.isPinned = false;
    
    this._defaultBehavior.attach(node, [this._backPlate]);
    
    // Configure follow behavior settings
    this._defaultBehavior.followBehavior.ignoreCameraPitchAndRoll = true;
    this._defaultBehavior.followBehavior.pitchOffset = -15;
    this._defaultBehavior.followBehavior.minimumDistance = 0.3;
    this._defaultBehavior.followBehavior.defaultDistance = 0.4;
    this._defaultBehavior.followBehavior.maximumDistance = 0.6;
    
    this._backPlate.isNearGrabbable = true;
    node.isVisible = false;
    
    return node;
  }

  /**
   * Final positioning and layout adjustments after node creation
   * Positions the pin button at the top-right corner of the menu
   */
  protected _finalProcessing(): void {
    super._finalProcessing();
    
    this._pinButton.position.copyFromFloats(
      (this._backPlate.scaling.x + TouchHolographicMenu.MENU_BUTTON_SCALE) / 2,
      this._backPlate.scaling.y / 2,
      0
    );
  }

  /**
   * Disposes of the menu and cleans up all resources
   * Removes observers and detaches behaviors
   */
  public dispose(): void {
    super.dispose();
    
    this._defaultBehavior.sixDofDragBehavior.onDragObservable.remove(this._dragObserver);
    this._defaultBehavior.detach();
  }
}