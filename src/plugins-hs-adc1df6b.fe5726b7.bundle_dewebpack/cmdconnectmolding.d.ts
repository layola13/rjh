/**
 * Command for connecting molding entities together.
 * Allows users to merge compatible molding pieces by clicking on them.
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';
import { MathAlg } from './MathAlg';

/**
 * Position interface representing a 3D point
 */
interface Position {
  x: number;
  y: number;
  z: number;
  equals(other: Position): boolean;
}

/**
 * Sweep path segment with start and end points
 */
interface SweepPathSegment {
  getStartPt(): Position;
  getEndPt(): Position;
}

/**
 * Material definition
 */
interface Material {
  seekId: string;
}

/**
 * Metadata definition
 */
interface Metadata {
  seekId: string;
}

/**
 * Topological path information
 */
interface TopoPather {
  from: number;
}

/**
 * Display list item with highlight capabilities
 */
interface DisplayListItem {
  isHighlight(): boolean;
  highlightOutlineMesh(highlight: boolean, immediate: boolean): void;
}

/**
 * Molding entity base interface
 */
interface Molding {
  id: string;
  parent: { id: string };
  sweepPath: SweepPathSegment[];
  XSize: number;
  YSize: number;
  material: Material;
  metadata: Metadata;
  topoPathers: TopoPather[];
}

/**
 * Baseboard-specific molding with offset property
 */
interface Baseboard extends Molding {
  offset: number;
}

/**
 * Event data from user interaction
 */
interface CommandEvent {
  entity?: Molding;
  event?: MouseEvent;
}

/**
 * Transaction request for molding operations
 */
interface TransactionRequest {
  getNewMolding(): Molding;
}

/**
 * Transaction manager for undo/redo operations
 */
interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

/**
 * Command context with transaction manager
 */
interface CommandContext {
  transManager: TransactionManager;
}

/**
 * Mini image preview controller for hover tooltips
 */
interface MiniImagePreviewController {
  title: string;
  init(): void;
  render(position: { x: number; y: number }): void;
  destroy(): void;
}

/**
 * Display list mapping entity IDs to display items
 */
type DisplayList = Record<string, DisplayListItem>;

/**
 * Command for connecting compatible molding pieces together.
 * 
 * This command allows users to merge molding entities that share:
 * - Same parent entity
 * - Adjacent borders (connected endpoints)
 * - Matching dimensions (XSize, YSize)
 * - Same material and metadata
 * 
 * @example
 *