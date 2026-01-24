import { AcceptEntity } from './AcceptEntity';
import { Parameter, DataType } from './Parameter';
import { ParameterWindowPocketEntity } from './ParameterWindowPocketEntity';
import { 
  genEntityTypeFromContent, 
  genCategoryDataFromContent, 
  genInstanceDataFromContent,
  checkBelongTwoRooms 
} from './utils';
import { HSApp } from './HSApp';

/**
 * Window parameters defining dimensions
 */
interface WindowParameters {
  /** Window height */
  height: number;
  /** Side A dimension */
  sideA: number;
  /** Side B dimension */
  sideB: number;
  /** Side C dimension */
  sideC: number;
  /** Side D dimension */
  sideD: number;
  /** Whether to display window pockets */
  showPocket: boolean;
}

/**
 * Parent layer information
 */
interface ParentLayer {
  /** Layer unique identifier */
  id: string;
}

/**
 * Host wall or structure
 */
interface Host {
  /** Host unique identifier */
  id: string;
}

/**
 * Floor information
 */
interface Floor {
  /** Floor unique identifier */
  id: string;
}

/**
 * Room information associated with wall
 */
interface RoomInfo {
  /** Floor reference */
  floor: Floor;
}

/**
 * Window pocket entity
 */
interface WindowPocket {
  /** Pocket unique identifier */
  id: string;
}

/**
 * Window content data
 */
interface WindowContent {
  /** Window parameters */
  parameters: WindowParameters;
  /** Parent layer (optional) */
  parent?: ParentLayer;
  
  /**
   * Get host wall or structure
   * @returns Host entity or null
   */
  getHost(): Host | null;
  
  /**
   * Get window pockets collection
   * @returns Array of window pockets
   */
  getWindowPockets(): WindowPocket[];
}

/**
 * Instance data container
 */
interface InstanceData {
  /**
   * Add parameter(s) to instance data
   * @param parameters - One or more parameters to add
   */
  addParameter(...parameters: Parameter[]): void;
}

/**
 * Entity representing a parameter window in the building model.
 * Handles window geometry, associated pockets, and relationships with walls and rooms.
 */
export declare class ParameterWindowEntity extends AcceptEntity {
  /**
   * Construct child entities (pockets) if showPocket is enabled
   * @param content - Window content data
   */
  protected buildChildren(content: WindowContent): void;

  /**
   * Build entity data from window content
   * Sets instance data, type, and category
   * @param content - Window content data
   */
  protected buildEntityData(content: WindowContent): void;

  /**
   * Extract and construct instance data from window content
   * Includes parameters, layer ID, room associations, and host information
   * @param content - Window content data
   * @returns Instance data with all parameters
   */
  protected getInstanceData(content: WindowContent): InstanceData;
}