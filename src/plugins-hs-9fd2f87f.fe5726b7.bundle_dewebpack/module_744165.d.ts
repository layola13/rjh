/**
 * Paste and move content command sequence generator
 * Handles copying, pasting, and moving various types of content (structures, beams, openings, etc.)
 */

import type { HSCore } from 'HSCore';
import type { HSApp } from 'HSApp';
import type { HSCatalog } from 'HSCatalog';
import type { HSFPConstants } from 'HSFPConstants';

/**
 * Mouse position in 2D space
 */
interface MousePosition {
  x: number;
  y: number;
}

/**
 * 3D position with optional z-coordinate
 */
interface Position3D {
  x: number;
  y: number;
  z?: number;
}

/**
 * User input plugin interface for handling mouse interactions
 */
interface UserInputPlugin {
  /**
   * Get current mouse position in viewport coordinates
   */
  getMousePosition(): MousePosition;
}

/**
 * Content entity with associated metadata and type information
 */
interface ContentEntity {
  contentType: HSCatalog.ContentType;
  z?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Options for paste/move operations
 */
interface PasteOptions {
  onPasteSequence?: boolean;
  from?: ContentEntity[];
  originSelections?: ContentEntity[];
  [key: string]: unknown;
}

/**
 * Result of a command execution
 */
interface CommandResult {
  content?: ContentEntity | ContentEntity[];
  replaceTarget?: ContentEntity;
  lastResult?: unknown;
  length?: number;
  [key: string]: unknown;
}

/**
 * Command sequence step definition
 */
interface CommandStep {
  type: HSFPConstants.CommandType;
  params: unknown[];
  completeSequenceOnCancel: boolean;
}

/**
 * Command sequence metadata
 */
interface CommandSequenceMetadata {
  options: PasteOptions;
}

/**
 * Generate command sequence for paste and move operations
 * 
 * @param selectedContents - Array of selected content entities to paste/move
 * @param userInputPlugin - Plugin for handling user input and mouse position
 * @param options - Additional options for the paste operation
 * @returns Tuple of command step generators and metadata
 */
export default function generatePasteMoveSequence(
  selectedContents: ContentEntity[],
  userInputPlugin: UserInputPlugin,
  options: PasteOptions
): [
  Array<(result: CommandResult) => CommandStep | null>,
  [CommandSequenceMetadata]
];

/**
 * Pick a 3D position from the active view at the mouse cursor
 * 
 * @param app - Application instance
 * @param userInputPlugin - User input plugin
 * @param zCoordinate - Optional z-coordinate override
 * @returns 3D position or undefined if no valid pick
 */
export function pickPosition(
  app: HSApp.App,
  userInputPlugin: UserInputPlugin,
  zCoordinate?: number
): Position3D | undefined;

/**
 * Pick position adjusted for specific content types (ceiling lights, windows, etc.)
 * 
 * @param app - Application instance
 * @param userInputPlugin - User input plugin
 * @param content - Content entity being placed
 * @returns Adjusted 3D position
 */
export function pickPositionForContent(
  app: HSApp.App,
  userInputPlugin: UserInputPlugin,
  content: ContentEntity
): Position3D;

/**
 * Determine the appropriate copy/paste command type for selected contents
 * 
 * @param selectedContents - Array of selected content entities
 * @returns Appropriate command type for the selection
 */
export function determineCopyPasteCommandType(
  selectedContents: ContentEntity[]
): HSFPConstants.CommandType;

/**
 * Determine the appropriate move command type for a content entity
 * 
 * @param content - Content entity to be moved
 * @returns Appropriate move command type
 */
export function determineMoveCommandType(
  content: ContentEntity
): HSFPConstants.CommandType;

/**
 * Check if content is an opening (door, window, parametric opening, or slab opening)
 * 
 * @param content - Content entity to check
 * @returns True if content is an opening type
 */
export function isOpeningContent(content: ContentEntity): boolean;