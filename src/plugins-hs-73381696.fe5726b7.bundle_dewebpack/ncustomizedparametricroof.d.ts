import { HSCore } from 'hscore';
import { PropertyBarControlItem, PropertyBarControlTypeEnum } from './property-bar';
import { SelectionContext } from './selection-context';

/**
 * Enumeration for parametric roof types
 */
export enum ENParamRoofType {
  /** Herringbone roof pattern */
  HerringBone = 'HerringBone',
  /** Salt box roof style */
  SaltBox = 'SaltBox',
  /** Box gable roof style */
  BoxGable = 'BoxGable'
}

/**
 * Parameters for customized parametric roof
 */
interface RoofParameters {
  /** Type of roof structure */
  roofType: ENParamRoofType;
  /** Room boundary loop defining roof perimeter */
  roomLoop?: {
    /** Get all curves that define the room boundary */
    getAllCurves(): Array<any>;
  };
}

/**
 * Customized parametric roof model entity
 */
interface NCustomizedParametricRoofEntity extends HSCore.Model.NCustomizedParametricRoof {
  /** Unique identifier for the roof entity */
  id: string;
  /** Configuration parameters for the roof */
  parameters: RoofParameters;
}

/**
 * Selection context containing roof entities
 */
interface RoofSelectionContext extends SelectionContext {
  /** Array of selected entities that may include roof objects */
  entities: Array<NCustomizedParametricRoofEntity>;
}

/**
 * Property bar control definition for customized parametric roofs
 * Provides UI controls for manipulating roof properties and materials
 */
export interface NCustomizedParametricRoofPropertyBar {
  /** Identifier for this property bar control group */
  readonly name: 'NCustomizedParametricRoof';

  /**
   * Determines if this property bar should be displayed based on selection
   * @param entities - Array of selected entities to check
   * @returns True if any selected entity is a customized parametric roof
   */
  isApplied(entities: Array<any>): boolean;

  /**
   * Generates property bar control items based on current selection context
   * Returns different controls depending on:
   * - Whether a face material is selected (shows clear material button)
   * - Roof type (shows direction change for specific roof types)
   * 
   * @param context - Current selection context containing entities and view state
   * @returns Array of property bar control items (buttons, inputs, etc.)
   */
  getItems(context: RoofSelectionContext | undefined): Array<PropertyBarControlItem>;
}

/**
 * Main export: Property bar configuration for customized parametric roofs
 * Handles material replacement, face material clearing, direction changes,
 * and standard operations (lock, hide, delete) for roof entities
 */
export declare const NCustomizedParametricRoof: NCustomizedParametricRoofPropertyBar;