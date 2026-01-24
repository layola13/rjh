/**
 * Content utility functions for managing floor contents, ceiling attachments, and content filtering
 * @module ContentUtils
 */

import { HSCore, HSCatalog } from './HSCore';
import { ContentGroupConstraintObject } from './ContentGroupConstraint';

/**
 * Interface for content with additional metadata
 */
interface ContentWithInfo {
  /** The content object with added info */
  content: HSCore.Model.Content & { addContentInfo?: ContentItem };
  /** Original tag associated with the content */
  tag: string;
}

/**
 * Base content item structure
 */
interface ContentItem {
  /** The content model object */
  content: HSCore.Model.Content;
  /** Original tag identifier */
  originTag: string;
  /** Optional child content items for groups */
  children?: ContentItem[];
}

/**
 * Utility class for content manipulation and filtering operations
 */
export declare class ContentUtils {
  /**
   * Flattens content groups and adds metadata to each content item
   * @param items - Array of content items or constraint groups
   * @returns Promise resolving to array of contents with tags
   */
  static addContentsToFloor(
    items: (ContentItem | ContentGroupConstraintObject)[]
  ): Promise<ContentWithInfo[]>;

  /**
   * Recursively collects target contents matching filter criteria
   * @param entity - Content entity, array, or group to search
   * @param targetList - Accumulator array for matched contents
   * @param floor - Floor context for filtering
   */
  static getTargetContent(
    entity: HSCore.Model.Content | HSCore.Model.Content[] | HSCore.Model.Group,
    targetList: HSCore.Model.Content[],
    floor: HSCore.Model.Floor
  ): void;

  /**
   * Gets all target contents on a specific floor
   * @param floor - The floor to search
   * @returns Array of contents matching target criteria
   */
  static getTargetContentsOnFloor(floor: HSCore.Model.Floor): HSCore.Model.Content[];

  /**
   * Gets all contents present on a floor
   * @param floor - The floor to search
   * @returns Array of all contents in the floor's room
   */
  static getAllContentsOnFloor(floor: HSCore.Model.Floor): HSCore.Model.Content[];

  /**
   * Removes all contents from a floor
   * @param floor - The floor to clear
   */
  static removeContentsOnFloor(floor: HSCore.Model.Floor): void;

  /**
   * Checks if content is a ceiling-attached lighting fixture
   * @param content - Content to check
   * @returns True if content is ceiling-attached lighting
   */
  static isCeilingAttachedLight(content: HSCore.Model.Content): boolean;

  /**
   * Validates if content type is allowed ceiling attachment
   * @param contentType - Content type to validate
   * @returns True if valid ceiling-attached type
   */
  static isValidCeilingAttached(contentType: HSCatalog.ContentType): boolean;

  /**
   * Checks if content meets target criteria for floor operations
   * @param content - Content to evaluate
   * @param floor - Floor context
   * @returns True if content is a valid target
   * @private
   */
  private static _isTargetContent(
    content: HSCore.Model.Content,
    floor: HSCore.Model.Floor
  ): boolean;

  /**
   * Checks if content category is whitelisted for room type
   * @param content - Content to check
   * @param roomType - Room type for whitelist validation
   * @returns True if content is whitelisted
   */
  static isContentInCategoryWhitelist(
    content: HSCore.Model.Content,
    roomType: HSCore.Model.RoomType
  ): boolean;

  /**
   * Determines if content is a parametric or customized type
   * @param content - Content to check
   * @returns True if content is parametric/customized
   * @private
   */
  private static _isParametricContent(content: HSCore.Model.Content): boolean;

  /**
   * Creates a copy of content
   * @param content - Content to copy
   * @returns Promise resolving to copied content
   */
  static async copyContent<T extends HSCore.Model.Content>(content: T): Promise<T>;
}