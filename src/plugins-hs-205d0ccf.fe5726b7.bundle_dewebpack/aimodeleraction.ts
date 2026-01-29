import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface ActionExecuteParams {
  actionType: 'aiModelerUpload' | 'aiMoodboardUpload' | 'aiMaterial';
}

interface CustomAttributeIdEnum {
  aiModeler: string;
  aiMoodboard: string;
  aiMaterial: string;
  aiResult: string;
}

interface ShowPageByCategoryIdParams {
  custAttr: string;
  menuId: string;
  subPageId: string;
}

declare global {
  const adskUser: {
    isEnterprise: boolean;
  };
}

export class AIModelerAction extends HSApp.Action {
  private _signalHook: HSCore.Util.SignalHook<AIModelerAction>;

  constructor() {
    super();
    this._signalHook = new HSCore.Util.SignalHook(this);
  }

  onExecute(params: ActionExecuteParams): void {
    super.onExecute([]);

    const customAttributeIdEnum: CustomAttributeIdEnum = HSApp.Catalog.DataConfig.CustomAttributeIdEnum;
    const { aiModeler, aiMoodboard, aiMaterial, aiResult } = customAttributeIdEnum;

    const attributeMap: Record<string, string> = {
      aiModelerUpload: aiModeler,
      aiMoodboardUpload: aiMoodboard,
      aiMaterial: aiMaterial
    };

    const subPageId = attributeMap[params.actionType];

    const catalogSignalManager = HSApp.Catalog.CatalogSignalManager.getInstance();

    this._signalHook.listen(catalogSignalManager.signalCatalogRenderEnd, () => {
      if (!adskUser.isEnterprise) {
        HSApp.Catalog.Manager.showPageByCategoryId({
          custAttr: aiResult,
          menuId: HSApp.Catalog.DataConfig.MenuIdEnum.myModelLibrary,
          subPageId: subPageId
        });
      }
      this.onDestroy();
    });
  }

  onDestroy(): void {
    super.onDestroy([]);
    this._removeWindowUrlParams();
    this._signalHook.dispose();
  }

  private _removeWindowUrlParams(): void {
    const updatedUrl = HSApp.Util.Url.replaceParamsInUrl({
      actionType: ''
    });
    HSApp.Util.Url.addWindowHistoryState('actionType', '', updatedUrl);
  }
}