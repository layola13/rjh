/**
 * Curtain component request module for managing curtain visibility and reset operations
 * @module ResetCurtainRequest
 */

declare namespace HSCore.Transaction {
  /**
   * Base class for transaction requests
   */
  class Request {
    /**
     * Called when the request is committed
     */
    onCommit(): void;
    
    /**
     * Called when the request is undone
     */
    onUndo(): void;
    
    /**
     * Called when the request is redone
     */
    onRedo(): void;
  }
}

declare namespace HSCore.Model {
  /**
   * Enum of available curtain components
   */
  enum CurtainComponentEnum {
    RailTips = 'RailTips',
    // Additional component types would be defined here
  }
}

/**
 * Interface representing a curtain object with component management capabilities
 */
interface ICurtain {
  /**
   * Checks if a specific component is available on this curtain
   * @param component - The component type to check
   * @returns True if the component is available
   */
  isComponentAvailable(component: HSCore.Model.CurtainComponentEnum): boolean;
  
  /**
   * Gets the material assigned to a specific component
   * @param component - The component type
   * @returns The material object or undefined if no material is assigned
   */
  getMaterial(component: HSCore.Model.CurtainComponentEnum): unknown | undefined;
  
  /**
   * Sets the material for a specific component
   * @param component - The component type
   * @param material - The material to assign, or undefined to remove material
   */
  setMaterial(component: HSCore.Model.CurtainComponentEnum, material: unknown | undefined): void;
  
  /**
   * Enables a specific component
   * @param component - The component type to enable
   */
  enableComponent(component: HSCore.Model.CurtainComponentEnum): void;
  
  /**
   * Disables a specific component
   * @param component - The component type to disable
   */
  disableComponent(component: HSCore.Model.CurtainComponentEnum): void;
  
  /**
   * Gets all currently disabled components
   * @returns Array of disabled component types
   */
  getDisabledComponents(): HSCore.Model.CurtainComponentEnum[];
}

/**
 * Request to reset a curtain by removing all materials and enabling all components
 * @extends HSCore.Transaction.Request
 */
export declare class ResetCurtainRequest extends HSCore.Transaction.Request {
  /**
   * The curtain instance to reset
   */
  private readonly _curtain: ICurtain;
  
  /**
   * Map storing original materials by component type for undo operations
   */
  private readonly _oldMaterialByComponent: Map<HSCore.Model.CurtainComponentEnum, unknown>;
  
  /**
   * Array of previously disabled components for undo operations
   */
  private _oldDisabledComponent: HSCore.Model.CurtainComponentEnum[];
  
  /**
   * Creates a new reset curtain request
   * @param curtain - The curtain instance to reset
   */
  constructor(curtain: ICurtain);
  
  /**
   * Commits the reset operation by enabling all components and removing all materials
   */
  onCommit(): void;
  
  /**
   * Undoes the reset by restoring disabled components and original materials
   */
  onUndo(): void;
  
  /**
   * Redoes the reset operation
   */
  onRedo(): void;
  
  /**
   * Enables all components on the curtain
   * @param curtain - The curtain instance
   * @returns Array of previously disabled components
   */
  private _EnableAllComponents(curtain: ICurtain): HSCore.Model.CurtainComponentEnum[];
}

/**
 * Request to show or hide a specific curtain component
 * @extends HSCore.Transaction.Request
 */
export declare class ShowHideCurtainComponentRequest extends HSCore.Transaction.Request {
  /**
   * The curtain instance to modify
   */
  private readonly _curtain: ICurtain;
  
  /**
   * The component to show or hide
   */
  private readonly _component: HSCore.Model.CurtainComponentEnum;
  
  /**
   * Whether to hide (true) or show (false) the component
   */
  private readonly _isHide: boolean;
  
  /**
   * Creates a new show/hide component request
   * @param curtain - The curtain instance
   * @param component - The component type to show or hide
   * @param isHide - True to hide the component, false to show it
   */
  constructor(curtain: ICurtain, component: HSCore.Model.CurtainComponentEnum, isHide: boolean);
  
  /**
   * Commits the show/hide operation
   */
  onCommit(): void;
  
  /**
   * Undoes the show/hide operation by toggling the component state
   */
  onUndo(): void;
  
  /**
   * Redoes the show/hide operation
   */
  onRedo(): void;
  
  /**
   * Shows or hides the specified component
   * @param component - The component type
   * @param isHide - True to hide, false to show
   */
  private _ShowHideComponent(component: HSCore.Model.CurtainComponentEnum, isHide: boolean): void;
}