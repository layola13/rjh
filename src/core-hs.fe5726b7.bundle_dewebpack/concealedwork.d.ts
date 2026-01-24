/**
 * Module: ConcealedWork
 * Original ID: 62947
 * Exports: ConcealedWork
 */

import { BaseObject } from './BaseObject';
import { TubeMeshCreator } from './TubeMeshCreator';

/**
 * Entity interface representing the data structure for ConcealedWork
 */
interface ConcealedWorkEntity {
  /** Array of tube tree objects to be processed */
  tubeTrees: TubeTree[];
}

/**
 * Tube tree type definition
 */
type TubeTree = unknown;

/**
 * ConcealedWork class handles initialization and management of tube tree view models
 * and coordinates with TubeMeshCreator for mesh operations.
 */
export declare class ConcealedWork extends BaseObject {
  /** Entity data containing tube trees */
  entity: ConcealedWorkEntity;

  /**
   * Initializes the component by creating view models for all tube trees
   * in the entity.
   */
  onInit(): void;

  /**
   * Creates a view model for the given tube tree element.
   * @param tubeTree - The tube tree element to create a view model for
   */
  createViewModel(tubeTree: TubeTree): void;

  /**
   * Clears all tube mesh data from the TubeMeshCreator singleton instance.
   */
  clearTubeMeshCreator(): void;
}