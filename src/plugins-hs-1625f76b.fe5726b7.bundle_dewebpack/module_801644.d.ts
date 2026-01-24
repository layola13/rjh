/**
 * Command manager interface for creating and executing commands
 */
interface CommandManager {
  /**
   * Creates a command with specified type and parameters
   * @param commandType - The type of command to create
   * @param params - Parameters for the command
   * @returns The created command or null if creation failed
   */
  createCommand(
    commandType: string,
    params: unknown[]
  ): Command | null;

  /**
   * Executes a command
   * @param command - The command to execute
   * @param context - Execution context
   */
  execute(command: Command, context?: unknown): void;
}

/**
 * Command interface representing an executable action
 */
interface Command {
  /**
   * Whether to show the gizmo UI during command execution
   */
  showGizmo?: boolean;
}

/**
 * Template entity representing a geometry object
 */
interface TemplateEntity {
  // Template entity properties would be defined here
}

/**
 * Base class for style operations
 */
declare class BaseStyleHandler {
  /**
   * Command manager instance for creating and executing commands
   */
  protected readonly cmdMgr: CommandManager;

  /**
   * The template entity to apply operations to
   */
  protected readonly templateEntity: TemplateEntity;

  /**
   * Creates a new BaseStyleHandler instance
   * @param context - Initialization context containing cmdMgr and templateEntity
   */
  constructor(context: unknown);
}

/**
 * Handler for applying geometry material styles to pocket entities
 * Extends base style handler with material application functionality
 */
declare class GeometryMaterialToPocketStyleHandler extends BaseStyleHandler {
  /**
   * Creates a new GeometryMaterialToPocketStyleHandler instance
   * @param context - Initialization context passed to base class
   */
  constructor(context: unknown);

  /**
   * Applies a material style to the pocket geometry
   * Creates and executes an ApplyGeometryMaterialToPocket command
   * @param context - The style application context
   */
  onApplyStyle(context: unknown): void;
}

/**
 * Constants namespace for HSF (High-Speed Fabrication) commands
 */
declare namespace HSFPConstants {
  /**
   * Available command types for the system
   */
  enum CommandType {
    /**
     * Command to apply geometry material to a pocket entity
     */
    ApplyGeometryMaterialToPocket = "ApplyGeometryMaterialToPocket"
  }
}

export default GeometryMaterialToPocketStyleHandler;