/**
 * API Module
 * Provides core API functionality including request handling, session management, and data operations.
 */

/**
 * Message interface for API communication
 */
export interface IMessage {
  // Add specific message properties based on the actual implementation
  [key: string]: unknown;
}

/**
 * Wrapper class for field values with type information
 */
export declare class FieldValueWrapper {
  constructor(value: unknown, type: FieldValueType);
  getValue(): unknown;
  getType(): FieldValueType;
}

/**
 * Enumeration of supported field value types
 */
export enum FieldValueType {
  String = "String",
  Number = "Number",
  Boolean = "Boolean",
  Date = "Date",
  Object = "Object",
  Array = "Array",
  Null = "Null",
  Undefined = "Undefined"
}

/**
 * Enumeration of entity transaction types
 */
export enum EntityTransactionType {
  Create = "Create",
  Update = "Update",
  Delete = "Delete",
  Read = "Read"
}

/**
 * Request type enumeration from HSConstants
 */
interface RequestTypeEnum {
  Batch: string;
  Composite: string;
  CompositeState: string;
  Data: string;
}

/**
 * Batch request handler for processing multiple requests
 */
export declare class BatchRequest {
  constructor();
  addRequest(request: Request): void;
  execute(): Promise<unknown>;
}

/**
 * API Manager for handling API lifecycle and configuration
 */
export declare class Manager {
  constructor();
  initialize(config?: ManagerConfig): void;
  shutdown(): void;
}

/**
 * Manager configuration options
 */
export interface ManagerConfig {
  baseUrl?: string;
  timeout?: number;
  retryAttempts?: number;
  [key: string]: unknown;
}

/**
 * Session management for maintaining API state
 */
export declare class Session {
  constructor();
  start(): void;
  end(): void;
  isActive(): boolean;
  getSessionId(): string;
}

/**
 * Base request class for API operations
 */
export declare class Request {
  constructor();
  send(): Promise<unknown>;
  cancel(): void;
}

/**
 * Composite request for combining multiple operations
 */
export declare class CompositeRequest extends Request {
  constructor();
  addSubRequest(request: Request): void;
}

/**
 * Composite state request for managing stateful operations
 */
export declare class CompositeStateRequest extends Request {
  constructor();
  setState(state: Record<string, unknown>): void;
  getState(): Record<string, unknown>;
}

/**
 * Data request for CRUD operations
 */
export declare class DataRequest extends Request {
  constructor();
  setData(data: unknown): void;
  getData(): unknown;
}

/**
 * Common utilities and shared functionality
 */
export declare namespace Common {
  // Add common utility types and functions
  export function isValidRequest(request: Request): boolean;
  export function formatResponse(response: unknown): unknown;
}

/**
 * Request registrar interface
 */
export interface RequestRegistrar {
  register(mappings: Array<[string, new () => Request]>): void;
}

/**
 * Main API module with registration functionality
 */
export declare namespace Api {
  /**
   * Registers request type mappings with the provided registrar
   * @param registrar - The request registrar instance
   */
  export function register(registrar: RequestRegistrar): void;
}

/**
 * Default export containing all API components
 */
declare const _default: {
  Api: typeof Api;
  Common: typeof Common;
  Request: typeof Request;
  Session: typeof Session;
  Manager: typeof Manager;
  BatchRequest: typeof BatchRequest;
  EntityTransactionType: typeof EntityTransactionType;
  FieldValueType: typeof FieldValueType;
  FieldValueWrapper: typeof FieldValueWrapper;
  IMessage: typeof IMessage;
};

export default _default;