import { Request } from './base-request';

interface PackageMeta {
  userFreeData: string;
  [key: string]: unknown;
}

interface AssemblySchema {
  localId: string;
  json?: unknown;
  [key: string]: unknown;
}

interface PackageSchema {
  assemblies?: AssemblySchema[];
  [key: string]: unknown;
}

interface PAssemblySpec {
  host: unknown;
  parent: unknown;
  [key: string]: unknown;
}

interface PAssembly {
  compute(): void;
  [key: string]: unknown;
}

type PackagePipelineProcessor = (
  packageMeta: PackageMeta,
  bodyAssembly: AssemblySchema | null,
  doorAssembly: AssemblySchema | null
) => void;

type MetaBuilder = (
  packageMeta: PackageMeta,
  bodyAssembly: AssemblySchema | null,
  doorAssembly: AssemblySchema | null
) => Record<string, unknown>;

type PAssemblyProcessor = (
  pAssembly: PAssembly,
  packageMeta: PackageMeta,
  schema: unknown
) => void;

export default class AddPAssemblyPackageRequest extends Request {
  private _packageMeta: PackageMeta;
  private _packageSchema: PackageSchema;
  private packagePipeline: PackagePipelineProcessor[];
  private metaBuilder: MetaBuilder[];
  private pAssemblyProcessors: PAssemblyProcessor[];
  private _meta?: Record<string, unknown>;
  private _spec?: PAssemblySpec;
  private _schema?: unknown;

  constructor(
    packageMeta: PackageMeta,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    param5: unknown,
    param6: unknown,
    param7: unknown,
    param8: unknown
  ) {
    super(packageMeta, param2, param3, param4, param5, param6, param7, param8);
    
    this._packageMeta = packageMeta;
    this._packageSchema = JSON.parse(JSON.stringify(packageMeta.userFreeData));
    this.packagePipeline = HSCore.Model.PAssemblyProcessor.getPrevProcessors();
    this.metaBuilder = HSCore.Model.PAssemblyProcessor.getMetaBuilders();
    this.pAssemblyProcessors = HSCore.Model.PAssemblyProcessor.getPostProcessors();
  }

  onCommit(): PAssembly {
    this._meta = this._package2PAssembly();
    
    const pAssembly = super.onCommit([]) as PAssembly;
    
    this.pAssemblyProcessors.forEach((processor) => {
      try {
        processor(pAssembly, this._packageMeta, this._schema);
      } catch (error) {
        console.error(`${processor.name} error: ${error}`);
        
        const errorMessage = '[Plugin Conentedit]: oncommit error';
        HSApp.App.getApp().errorLogger.push(errorMessage, {
          errorStack: new Error(errorMessage),
          description: errorMessage,
          errorInfo: {
            info: error,
            path: {
              file: 'homestyler-tools-web/web/plugin/contentedit/request/addpassemblypackagerequest.js',
              functionName: 'onCommit()'
            }
          }
        });
      }
    });
    
    this._spec = HSCore.Util.Content.getPAssemblySpec(pAssembly);
    this._spec.host = this._host;
    this._spec.parent = HSApp.App.getApp().floorplan.scene.activeLayer;
    
    pAssembly.compute();
    
    return pAssembly;
  }

  onUndo(): void {
    super.onUndo([]);
  }

  onRedo(): void {
    super.onRedo([]);
  }

  private _package2PAssembly(): Record<string, unknown> {
    let meta: Record<string, unknown> = {};
    
    if (this._packageSchema.assemblies && this._packageSchema.assemblies.length > 0) {
      const bodyAssembly = 
        this._packageSchema.assemblies[0]?.localId === 'bodyAssembly' 
          ? this._packageSchema.assemblies[0] 
          : null;
      
      const doorAssembly = 
        this._packageSchema.assemblies[1]?.localId === 'doorAssembly' 
          ? this._packageSchema.assemblies[1] 
          : null;
      
      if (bodyAssembly || doorAssembly) {
        this.packagePipeline.forEach((processor) => {
          processor(this._packageMeta, bodyAssembly, doorAssembly);
        });
      }
      
      this.metaBuilder.forEach((builder) => {
        meta = builder(this._packageMeta, bodyAssembly, doorAssembly);
      });
      
      this._schema = bodyAssembly?.json;
    }
    
    return meta;
  }
}