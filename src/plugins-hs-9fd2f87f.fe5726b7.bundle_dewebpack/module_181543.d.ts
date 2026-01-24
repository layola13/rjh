/**
 * Paste operation command factory module
 * Generates command sequences for paste, move, and content manipulation operations
 */

/**
 * Position with optional Z coordinate
 */
interface Position {
  x: number;
  y: number;
  z?: number;
}

/**
 * Pick result from view interaction
 */
interface PickResult extends Position {
  // Additional pick metadata
  [key: string]: unknown;
}

/**
 * Content metadata information
 */
interface ContentMetadata {
  contentType: {
    isTypeOf: (type: string | RegExp) => boolean;
  };
  z?: number;
  [key: string]: unknown;
}

/**
 * Content item with metadata
 */
interface ContentItem {
  contentType?: {
    isTypeOf: (type: string | RegExp) => boolean;
  };
  z?: number;
  metadata?: ContentMetadata;
  [key: string]: unknown;
}

/**
 * Paste event data
 */
interface PasteEvent {
  content: ContentItem | ContentItem[];
  replaceTarget?: unknown;
}

/**
 * Move operation parameters
 */
interface MoveParams {
  onPasteSequence?: boolean;
  [key: string]: unknown;
}

/**
 * Command configuration object
 */
interface CommandConfig {
  type: string;
  params: unknown[];
  completeSequenceOnCancel: boolean;
}

/**
 * User input plugin interface
 */
interface UserInputPlugin {
  getMousePosition: () => Position;
}

/**
 * View interface
 */
interface View {
  pick: (position: Position) => PickResult;
}

/**
 * Application interface
 */
interface AppInterface {
  activeView: View;
  is3DViewActive: () => boolean;
}

/**
 * Plugin context
 */
interface PluginContext {
  userinputPlugin: UserInputPlugin;
  catalogPlugin: unknown;
  floorplan: unknown;
  app: AppInterface;
}

/**
 * Command factory function type
 */
type CommandFactory = (event: PasteEvent | ContentItem[] | unknown) => CommandConfig | null;

/**
 * Creates a command sequence for paste operations
 * 
 * @param context - The plugin context containing required dependencies
 * @returns A tuple containing command factories array and context array
 */
export default function createPasteCommandSequence(
  context: [UserInputPlugin, unknown, unknown, AppInterface, MoveParams]
): [CommandFactory[], [PluginContext]];