/**
 * Package meta information interface
 */
interface PackageMeta {
  userFreeData: string;
  [key: string]: unknown;
}

/**
 * Package schema structure
 */
interface PackageSchema {
  assemblies?: Assembly[];
  [key: string]: unknown;
}

/**
 * Assembly interface
 */
interface Assembly {
  localId: string;
  json?: unknown;
  [key: string]: unknown;
}

/**
 * Package assembly pipeline processor function type
 */
type PackagePipelineProcessor = (
  packageMeta: PackageMeta,
  bodyAssembly: Assembly | null,
  doorAssembly: Assembly | null
) => void;

/**
 * Meta builder function type
 */
type MetaBuilder = (
  packageMeta: PackageMeta,
  bodyAssembly: Assembly | null,
  doorAssembly: Assembly | null
) => Record<string, unknown>;

/**
 * Post processor function type for package assemblies
 */
type PAssemblyPostProcessor = (
  processedData: unknown,
  packageMeta: PackageMeta,
  schema: unknown
) => void;

/**
 * Package assembly specification
 */
interface PAssemblySpec {
  host?: unknown;
  parent?: unknown;
  [key: string]: unknown;
}

/**
 * Package assembly interface
 */
interface PAssembly {
  compute(): void;
  [key: string]: unknown;
}

/**
 * Base request class
 */
declare class BaseRequest {
  protected _host?: unknown;
  protected _spec?: PAssemblySpec;
  protected _schema?: unknown;
  
  constructor(
    arg1: unknown,
    arg2: unknown,
    arg3: unknown,
    arg4: unknown,
    arg5: unknown,
    arg6: unknown,
    arg7: unknown,
    arg8: unknown
  );
}

/**
 * Add package assembly request class
 * Handles the conversion and processing of package data to package assemblies
 */
declare class AddPackageAssemblyRequest extends BaseRequest {
  /** Package metadata */
  private _packageMeta: PackageMeta;
  
  /** Package schema (deep cloned from userFreeData) */
  private _packageSchema: PackageSchema;
  
  /** Pipeline processors for package assemblies */
  private packagePipeline: PackagePipelineProcessor[];
  
  /** Meta builders for generating metadata */
  private metaBuilder: MetaBuilder[];
  
  /** Post processors for package assemblies */
  private pAssemblyProcessors: PAssemblyPostProcessor[];
  
  /** Internal metadata result */
  private _meta?: Record<string, unknown>;
  
  /**
   * Constructor
   * @param packageMeta - Package metadata containing userFreeData
   * @param arg2 - Additional constructor argument
   * @param arg3 - Additional constructor argument
   * @param arg4 - Additional constructor argument
   * @param arg5 - Additional constructor argument
   * @param arg6 - Additional constructor argument
   * @param arg7 - Additional constructor argument
   * @param arg8 - Additional constructor argument
   */
  constructor(
    packageMeta: PackageMeta,
    arg2: unknown,
    arg3: unknown,
    arg4: unknown,
    arg5: unknown,
    arg6: unknown,
    arg7: unknown,
    arg8: unknown
  );
  
  /**
   * Commit handler - processes package data and creates package assembly
   * Executes pipeline processors, meta builders, and post processors
   * @returns The processed package assembly
   */
  onCommit(): PAssembly;
  
  /**
   * Undo handler - reverts the commit operation
   */
  onUndo(): void;
  
  /**
   * Redo handler - reapplies the commit operation
   */
  onRedo(): void;
  
  /**
   * Converts package data to package assembly metadata
   * Processes body and door assemblies through pipeline and meta builders
   * @returns Metadata object for package assembly
   */
  private _package2PAssembly(): Record<string, unknown>;
}

export default AddPackageAssemblyRequest;