/**
 * Core type definitions for the design system module
 * @module CoreTypes
 */

/** Alignment options for UI elements */
export enum Align {
  /** Align to left/start */
  Left = 'left',
  /** Align to center */
  Center = 'center',
  /** Align to right/end */
  Right = 'right',
  /** Align to top */
  Top = 'top',
  /** Align to bottom */
  Bottom = 'bottom'
}

/** Cabinet board classification types */
export enum CabinetBoardType {
  /** Standard board */
  Standard = 'standard',
  /** Custom board */
  Custom = 'custom',
  /** Template board */
  Template = 'template'
}

/** Message structure for command communication */
export interface CommandMessage {
  /** Unique message identifier */
  id: string;
  /** Command type */
  type: CommandType;
  /** Message payload data */
  payload: unknown;
  /** Timestamp of message creation */
  timestamp: number;
  /** Optional callback identifier */
  callbackId?: string;
}

/** Available command types in the system */
export enum CommandType {
  /** Create new entity */
  Create = 'create',
  /** Update existing entity */
  Update = 'update',
  /** Delete entity */
  Delete = 'delete',
  /** Query entity */
  Query = 'query',
  /** Execute action */
  Execute = 'execute'
}

/** System-wide constant values */
export const Constants: {
  /** Maximum allowed file size in bytes */
  readonly MAX_FILE_SIZE: number;
  /** Default timeout duration in milliseconds */
  readonly DEFAULT_TIMEOUT: number;
  /** API version string */
  readonly API_VERSION: string;
  /** Maximum retry attempts */
  readonly MAX_RETRIES: number;
};

/** Design version type identifiers */
export enum DesignVersionType {
  /** Draft version */
  Draft = 'draft',
  /** Published version */
  Published = 'published',
  /** Archived version */
  Archived = 'archived'
}

/** Directional indicators for spatial operations */
export enum Direction {
  /** Upward direction */
  Up = 'up',
  /** Downward direction */
  Down = 'down',
  /** Leftward direction */
  Left = 'left',
  /** Rightward direction */
  Right = 'right',
  /** Forward direction */
  Forward = 'forward',
  /** Backward direction */
  Backward = 'backward'
}

/** View model definitions for edit operations */
export namespace EditViewModels {
  /** Base view model interface */
  export interface BaseViewModel {
    /** Entity identifier */
    id: string;
    /** Display name */
    name: string;
    /** Last modified timestamp */
    lastModified: number;
  }

  /** Edit operation context */
  export interface EditContext {
    /** Current view model */
    viewModel: BaseViewModel;
    /** Edit mode flag */
    isEditing: boolean;
    /** Validation errors */
    errors: string[];
  }
}

/** Environment scope enumeration */
export enum EnvScope {
  /** Development environment */
  Development = 'development',
  /** Staging environment */
  Staging = 'staging',
  /** Production environment */
  Production = 'production',
  /** Testing environment */
  Test = 'test'
}

/** Current environment configuration */
export const environment: {
  /** Current scope */
  readonly scope: EnvScope;
  /** API base URL */
  readonly apiUrl: string;
  /** Debug mode flag */
  readonly debug: boolean;
  /** Feature flags */
  readonly features: Record<string, boolean>;
};

/** Human-readable environment names */
export enum EnvironmentName {
  /** Development environment name */
  Dev = 'Development',
  /** Staging environment name */
  Stage = 'Staging',
  /** Production environment name */
  Prod = 'Production',
  /** Test environment name */
  Test = 'Test'
}

/** Global member type classifications */
export enum GlobalMemberType {
  /** Administrator member */
  Admin = 'admin',
  /** Standard user member */
  User = 'user',
  /** Guest member */
  Guest = 'guest',
  /** System member */
  System = 'system'
}

/** Log grouping categories */
export enum LogGroupTypes {
  /** Application logs */
  Application = 'application',
  /** System logs */
  System = 'system',
  /** Security logs */
  Security = 'security',
  /** Performance logs */
  Performance = 'performance',
  /** Error logs */
  Error = 'error'
}

/** Human-readable log group type names */
export const LogGroupTypesName: Record<LogGroupTypes, string>;

/** Performance logging categories */
export enum PerformanceLogCategory {
  /** Rendering performance */
  Render = 'render',
  /** Network performance */
  Network = 'network',
  /** Database performance */
  Database = 'database',
  /** Computation performance */
  Compute = 'compute'
}

/** Performance operation type identifiers */
export enum PerformanceOperationTypes {
  /** Start operation */
  Start = 'start',
  /** End operation */
  End = 'end',
  /** Measure operation */
  Measure = 'measure',
  /** Mark operation */
  Mark = 'mark'
}

/** Plugin type classifications */
export enum PluginType {
  /** Renderer plugin */
  Renderer = 'renderer',
  /** Editor plugin */
  Editor = 'editor',
  /** Exporter plugin */
  Exporter = 'exporter',
  /** Importer plugin */
  Importer = 'importer'
}

/** Property bar type definitions */
export enum PropertyBarType {
  /** Default property bar */
  Default = 'default',
  /** Advanced property bar */
  Advanced = 'advanced',
  /** Custom property bar */
  Custom = 'custom'
}

/** Rendering mode descriptions */
export const RenderingModeDescription: Record<string, string>;

/** HTTP request type enumeration */
export enum RequestType {
  /** GET request */
  Get = 'GET',
  /** POST request */
  Post = 'POST',
  /** PUT request */
  Put = 'PUT',
  /** DELETE request */
  Delete = 'DELETE',
  /** PATCH request */
  Patch = 'PATCH'
}

/** UI mode configurations */
export enum UIMode {
  /** Light mode */
  Light = 'light',
  /** Dark mode */
  Dark = 'dark',
  /** Auto mode (system preference) */
  Auto = 'auto'
}

/** View component type definitions */
export enum View {
  /** Main canvas view */
  Canvas = 'canvas',
  /** Properties panel view */
  Properties = 'properties',
  /** Hierarchy tree view */
  Hierarchy = 'hierarchy',
  /** Inspector view */
  Inspector = 'inspector'
}

/** View mode enumeration */
export enum ViewModeEnum {
  /** Design mode */
  Design = 'design',
  /** Preview mode */
  Preview = 'preview',
  /** Edit mode */
  Edit = 'edit',
  /** View-only mode */
  ViewOnly = 'viewOnly'
}

/** Registry of available view names */
export const viewNames: readonly string[];