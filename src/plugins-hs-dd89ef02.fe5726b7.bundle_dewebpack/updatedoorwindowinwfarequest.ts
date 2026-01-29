import { HSCore } from './HSCore';
import { HSConstants } from './HSConstants';
import { CreateInWFABaseRequest } from './CreateInWFABaseRequest';

interface Asset {
  seekId: string;
  recordData: {
    openingType: string;
    doorStone?: unknown;
  };
}

interface UpdateDoorWindowParams {
  assets: Asset[];
  contents: unknown[];
  matrix4: unknown;
  sameLineFaces: unknown;
}

interface RequestArgs {
  assets: Asset[];
  contents: unknown[];
  matrix4: unknown;
  sameLineFaces: unknown;
}

interface SeekIdsData {
  normalSeekIds: string[];
  parametricOpeningSeekIds: string[];
}

export class UpdateDoorWindowInWFARequest extends CreateInWFABaseRequest {
  private params: UpdateDoorWindowParams;

  constructor() {
    super();
  }

  onCommit(): unknown[] {
    const { assets, contents, matrix4, sameLineFaces } = this.params;
    const assetsLength = assets.length;
    const contentsLength = contents.length;
    const result: unknown[] = [];

    if (contentsLength === 0) {
      const wallFaceApi = new HSCore.Model.WallFaceAssemblyApi();
      const doorOrWindows = wallFaceApi.createDoorOrWindow(assets, matrix4, sameLineFaces);
      result.push(...doorOrWindows);
    } else {
      contents.forEach((content, index) => {
        const asset = assets[index] ?? assets[assetsLength - 1];
        let decorator: HSCore.Model.OpeningDecorator | HSCore.Model.PODecorator;

        if (asset.recordData.openingType === HSConstants.Constants.OpeningType) {
          decorator = new HSCore.Model.OpeningDecorator(content);
        } else if (asset.recordData.openingType === HSConstants.Constants.ParametricOpeningType) {
          decorator = new HSCore.Model.PODecorator(content);
        }

        decorator.loadOther(asset.recordData, true);
        decorator.loadDoorStone(asset.recordData.doorStone);
        result.push(content);
      });
    }

    super.onCommit([]);
    return result;
  }

  static stringifyRequestArgs(args: RequestArgs[]): string[] {
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

    const normalSeekIds = new Set<string>();
    const parametricOpeningSeekIds = new Set<string>();

    args[0].assets.forEach((asset) => {
      if (asset.recordData.openingType === HSConstants.Constants.OpeningType) {
        HSCore.Model.OpeningDecorator.getAllSeekIds(asset.recordData).forEach((seekId) =>
          normalSeekIds.add(seekId)
        );
      } else if (asset.recordData.openingType === HSConstants.Constants.ParametricOpeningType) {
        HSCore.Model.PODecorator.getAllSeekIds(asset.recordData).forEach((seekId) =>
          normalSeekIds.add(seekId)
        );
        parametricOpeningSeekIds.add(asset.seekId);
      }
    });

    const seekIdsData: SeekIdsData = {
      normalSeekIds: Array.from(normalSeekIds).filter((id) => id),
      parametricOpeningSeekIds: Array.from(parametricOpeningSeekIds).filter((id) => id),
    };

    stringifiedArgs.push(JSON.stringify(seekIdsData));
    return stringifiedArgs;
  }

  static async parseRequestArgsAsync(args: string[]): Promise<void> {
    const lastArg = args[args.length - 1];
    const seekIdsData: SeekIdsData = JSON.parse(lastArg);
    const { normalSeekIds, parametricOpeningSeekIds } = seekIdsData;

    for (const seekId of parametricOpeningSeekIds) {
      const product = await HSApp.App.getApp().catalogManager.getProductBySeekId(seekId);
      await HSCore.Model.ParametricOpening.preFetchDependentMeta(product);
    }

    await HSApp.App.getApp().catalogManager.getProductsBySeekIds(normalSeekIds);
  }
}