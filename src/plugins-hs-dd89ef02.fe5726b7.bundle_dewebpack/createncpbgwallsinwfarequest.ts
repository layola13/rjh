import { HSCore } from './HSCore';
import { CreateInWFABaseRequest } from './CreateInWFABaseRequest';

interface Asset {
  seekId: string;
  recordData: unknown;
}

interface CreateNCPBgWallsParams {
  assets: Asset[];
  matrix4: unknown;
  sameLineFaces: unknown;
}

interface WallSpec {
  content: unknown;
}

export class CreateNCPBgWallsInWFARequest extends CreateInWFABaseRequest {
  private _specs: WallSpec[] = [];
  
  declare params: CreateNCPBgWallsParams;

  onCommit(): unknown[] {
    const { assets, matrix4, sameLineFaces } = this.params;
    const wallFaceAssemblyApi = new HSCore.Model.WallFaceAssemblyApi();
    
    this._specs = wallFaceAssemblyApi.createNCPBgWalls(assets, matrix4, sameLineFaces);
    
    super.onCommit();
    
    return this._specs.map((spec) => spec.content);
  }

  onUndo(): void {
    this._specs.forEach((spec) => {
      HSCore.Util.Content.removeCustomizedModel(spec.content);
    });
    
    super.onUndo();
  }

  onRedo(): void {
    this._specs.forEach((spec) => {
      HSCore.Util.Content.addCustomizedModel(spec);
    });
    
    super.onRedo();
  }

  static stringifyRequestArgs(args: CreateNCPBgWallsParams[]): string[] {
    const transcript = HSApp.Transcription.Transcript.instance();
    const stringifiedArgs: string[] = [];
    
    for (const arg of args) {
      try {
        const stringified = transcript.stringify(arg);
        stringifiedArgs.push(stringified);
      } catch (error) {
        console.error(error);
      }
    }
    
    const seekIds = new Set<string>();
    
    for (const asset of args[0].assets) {
      seekIds.add(asset.seekId);
      
      const recordSeekIds = HSCore.Model.NCPBackgroundWallBaseDecorator.getRecordSeekIdsByRecordData(asset.recordData);
      recordSeekIds.forEach((id) => seekIds.add(id));
    }
    
    const seekIdsJson = JSON.stringify({
      seekIds: Array.from(seekIds).filter((id) => id)
    });
    
    stringifiedArgs.push(seekIdsJson);
    
    return stringifiedArgs;
  }

  static async parseRequestArgsAsync(args: string[]): Promise<void> {
    const lastArg = args[args.length - 1];
    const { seekIds } = JSON.parse(lastArg) as { seekIds: string[] };
    
    for (const seekId of seekIds) {
      await HSApp.Util.NCustomizedFeatureModel.loadMetaRecursively(seekId);
    }
    
    await HSApp.Util.ParametricModelHelper.getInstance().preFetchDefaultMolding();
  }
}