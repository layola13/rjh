/**
 * Factory for creating transaction state objects based on entity type.
 * This factory pattern implementation creates appropriate TxnState instances
 * for different HSCore model types to handle transactional operations.
 * 
 * @module TxnStateFactory
 */

import { ContentTxnState } from './ContentTxnState';
import { CustomizedFeatureModelTxnState } from './CustomizedFeatureModelTxnState';
import { EntityTxnState } from './EntityTxnState';
import { LayerTxnState } from './LayerTxnState';
import { VertexTxnState } from './VertexTxnState';
import { RoomBuilderTxnState } from './RoomBuilderTxnState';
import { CustomizedModelTxnState } from './CustomizedModelTxnState';

/**
 * Base interface for all transaction state objects
 */
export interface ITxnState {
  // Define common transaction state methods here
}

/**
 * Supported entity types for transaction state creation
 */
export type SupportedEntity =
  | HSCore.Model.Layer
  | HSCore.Model.CustomizedModel
  | HSCore.Model.CustomizedFeatureModel
  | HSCore.Model.Content
  | HSCore.Model.Vertex
  | HSCore.Model.Geom.RoomBuilder
  | unknown;

/**
 * Factory class for creating transaction state objects.
 * Uses type checking to instantiate the appropriate TxnState subclass
 * based on the runtime type of the entity.
 */
export class TxnStateFactory {
  constructor() {}

  /**
   * Creates an appropriate transaction state object for the given entity.
   * 
   * @param entity - The model entity requiring a transaction state
   * @param context - Additional context or configuration for the transaction state
   * @returns An instance of the appropriate TxnState subclass
   * 
   * @remarks
   * The factory checks entity types in the following order:
   * 1. Layer
   * 2. CustomizedModel
   * 3. CustomizedFeatureModel
   * 4. Content
   * 5. Vertex
   * 6. RoomBuilder
   * 7. Falls back to EntityTxnState for unrecognized types
   */
  static createTxnState(entity: SupportedEntity, context: unknown): ITxnState {
    let txnState: ITxnState | undefined;

    if (entity instanceof HSCore.Model.Layer) {
      txnState = new LayerTxnState(entity, context);
    } else if (entity instanceof HSCore.Model.CustomizedModel) {
      txnState = new CustomizedModelTxnState(entity, context);
    } else if (entity instanceof HSCore.Model.CustomizedFeatureModel) {
      txnState = new CustomizedFeatureModelTxnState(entity, context);
    } else if (entity instanceof HSCore.Model.Content) {
      txnState = new ContentTxnState(entity, context);
    } else if (entity instanceof HSCore.Model.Vertex) {
      txnState = new VertexTxnState(entity, context);
    } else if (entity instanceof HSCore.Model.Geom.RoomBuilder) {
      txnState = new RoomBuilderTxnState(entity, context);
    }

    // Fallback to generic EntityTxnState for unsupported types
    if (!txnState) {
      txnState = new EntityTxnState(entity, context);
    }

    return txnState;
  }
}