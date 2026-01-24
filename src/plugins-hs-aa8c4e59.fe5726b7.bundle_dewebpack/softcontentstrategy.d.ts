/**
 * Module: SoftContentStrategy
 * Strategy for handling soft content (furniture and decorations) in room configurations.
 * Processes manual combination models and filters decorative contents.
 */

import { Strategy } from './Strategy';
import { CustomizeContentStrategy } from './CustomizeContentStrategy';
import { HSCatalog } from './HSCatalog';

/**
 * Represents a member item in a room configuration
 */
interface Member {
  /** Unique entity identifier */
  entityId: string;
  /** Instance identifier for manual combinations */
  instanceId?: string;
  /** Content type identifier */
  type?: string;
  /** Indicates if this is a custom model */
  isCustomModel?: boolean;
  /** Nested members for combination models */
  members?: Member[];
}

/**
 * Room configuration containing furniture and decoration information
 */
interface Room {
  /** List of furniture items */
  furniture_info: Member[];
  /** List of decoration items */
  decorate_info: Member[];
  /** Customized products information */
  customizedProducts_info?: CustomizedProductsInfo;
}

/**
 * Customized products configuration data
 */
interface CustomizedProductsInfo {
  [key: string]: unknown;
}

/**
 * Input parameters for getFlatEntityIdsAndCategory method
 */
interface GetFlatEntityIdsInput {
  /** Instance ID to search for */
  instanceId: string;
  /** Room configuration */
  room: Room;
  /** Array of processing strategies */
  strategies?: Strategy[];
}

/**
 * Input parameters for _getMembers method
 */
interface GetMembersInput {
  /** Array of member items to process */
  members: Member[];
  /** Optional array of strategies */
  strategies?: Strategy[];
  /** Optional customized products info */
  customizedProductsInfo?: CustomizedProductsInfo;
}

/**
 * Result of member processing
 */
interface GetMembersResult {
  /** Flattened array of entity IDs */
  items: string[];
  /** True if decorative contents were found */
  hasDecorativeContents: boolean;
  /** Optional reason for empty result */
  reason?: string;
}

/**
 * Result of entity ID extraction
 */
interface FlatEntityIdsResult {
  /** Flattened array of entity IDs */
  flatEntityIds: string[];
  /** Optional reason if extraction failed */
  reason?: string;
}

/**
 * Strategy for processing soft content (furniture and decorations) in room configurations.
 * Handles manual combination models, custom models, and filters out decorative contents.
 * 
 * @extends Strategy
 */
export declare class SoftContentStrategy extends Strategy {
  /**
   * Extracts and flattens entity IDs from room configuration based on instance ID.
   * Processes furniture and decoration items, handling nested members and custom models.
   * 
   * @param input - Configuration containing instanceId, room data, and strategies
   * @returns Object containing flattened entity IDs or reason for failure
   */
  getFlatEntityIdsAndCategory(input: GetFlatEntityIdsInput): FlatEntityIdsResult;

  /**
   * Handles manual combination models by extracting valid members.
   * Filters out decorative contents and validates instance ID presence.
   * 
   * @param input - Configuration with members, strategies, customized products, and instance ID
   * @returns Result containing items, decorative content flag, and optional reason
   * @private
   */
  private _handleManualCombinationModel(input: {
    members: Member[];
    strategies?: Strategy[];
    customizedProductsInfo?: CustomizedProductsInfo;
    instanceId: string;
  }): GetMembersResult;

  /**
   * Recursively extracts entity IDs from members array.
   * Handles nested members, custom models, and filters decorative content types.
   * 
   * @param input - Members array with optional strategies and customized products info
   * @returns Result containing flattened items, decorative content flag, and optional reason
   * @private
   */
  private _getMembers(input: GetMembersInput): GetMembersResult;
}