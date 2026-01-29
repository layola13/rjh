import { SavePostDataStage } from './SavePostDataStage';
import { BaseSaveService } from './BaseSaveService';
import { SaveStageEnum } from './SaveStageEnum';
import {
  LoadingCheckTask,
  LoginCheckTask,
  DesignEditStateTask,
  ReadonlyCheckTask,
  ReadonlyModeCheckTask,
  VersionCheckTask,
  RoomClosedCheckTask,
  SaveFormCheckTask,
  SaveAsCheckTask,
  UploadThumbTask,
  ExportRoominfoTask,
  UpdateSceneJson
} from './tasks';
import { HSCore } from './HSCore';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { isHXRR } from './utils';

interface SaveParams {
  isSaveas?: boolean;
  needUnderlay?: boolean;
  isAutoCreate?: boolean;
}

interface SaveResult {
  status: 'success' | 'cancel';
  data?: {
    formData: FormData;
  };
}

interface FormData {
  designName: string;
  description: string;
  documentStatus: string;
  attributes: Record<string, unknown>;
  address: string;
  basicAttributes: Record<string, unknown>;
}

interface SignalData {
  create: boolean;
  saveType: 'save' | 'update' | 'saveas';
}

interface SaveDialogProps {
  designName: string;
  description: string;
  documentStatus: string;
  acsprojectid: string;
  acsassetid: string;
  address: string;
  basicAttributes: Record<string, unknown>;
  dropdown: unknown;
  onCancel: () => void;
  onSave: (data: FormData) => void;
}

interface PopupWindowConfig {
  windowname: string;
  title: string;
  contents: React.ReactElement;
  width: number;
  submitcall: () => void;
  cancelcall: () => void;
}

export class SaveService extends BaseSaveService {
  private savePostDataStage: SavePostDataStage;
  private currentSaveParams?: SaveParams;

  constructor(app: unknown) {
    super(app);

    this.savePostDataStage = new SavePostDataStage({ app: this.app });

    this.registerService('loadingCheck', SaveStageEnum.Check, new LoadingCheckTask());
    this.registerService({ name: 'loginCheck' }, SaveStageEnum.Check, new LoginCheckTask());
    this.registerService('designEditStateTask', SaveStageEnum.Check, new DesignEditStateTask());
    this.registerService('readOnlyCheck', SaveStageEnum.Check, new ReadonlyCheckTask());
    this.registerService('readonlyModeCheck', SaveStageEnum.Check, new ReadonlyModeCheckTask());
    this.registerService('versionCheck', SaveStageEnum.Check, new VersionCheckTask());
    this.registerService('roomClosedCheckTask', SaveStageEnum.Check, new RoomClosedCheckTask());
    this.registerService('saveFormCheck', SaveStageEnum.Check, new SaveFormCheckTask(this));
    this.registerService('saveAsCheckTask', SaveStageEnum.Check, new SaveAsCheckTask());
    this.registerService('uploadThumbTask', SaveStageEnum.Check, new UploadThumbTask());
    this.registerService('exportRoominfoTask', SaveStageEnum.Subsequent, ExportRoominfoTask.getExportRoominfoTask());
    this.registerService('updateSceneJson', SaveStageEnum.Subsequent, new UpdateSceneJson());
  }

  save(params: SaveParams): Promise<unknown> {
    if (this.currentSaveParams && this.currentSaveParams.isSaveas !== params.isSaveas) {
      return new Promise(() => {});
    }
    return super.save(params);
  }

  saveGetData(params: SaveParams, context: unknown): Promise<unknown> {
    const softClothList = this.getSoftClothList();
    
    if (softClothList.length > 0) {
      NWTK.mtop.SoftCloth.saveDesignSimulate({
        data: {
          json_arg: JSON.stringify({
            clothJidList: softClothList
          })
        }
      });
    }

    return super.saveGetData(params, context);
  }

  saveSubsequent(params: SaveParams, context: unknown): Promise<unknown> {
    return this.saveSubsequentStage.execute(params, context);
  }

  getData(params: SaveParams): unknown {
    const { isSaveas } = params;
    return this.API.getSaveRequestData(this.app.floorplan, {
      needUnderlay: params.needUnderlay,
      isSaveas,
      isAutoCreate: params.isAutoCreate
    });
  }

  async savePostDate(params: SaveParams, context: unknown): Promise<unknown> {
    return this.savePostDataStage.execute(params, context);
  }

  onSaveSucceeded(params: SaveParams, context: unknown): Promise<SaveResult> {
    return super.onSaveSucceeded(params, context).then(() => {
      if (!params.needUnderlay) {
        this.API.removeUnderlay(this.app);
      }
      this.API.updateUrlBar(this.app);
    }).then(() => {
      const designId = this.globalAPI.getDesignId(this.app);
      const queryStrings = HSApp.Util.Url.getQueryStrings();
      const { env, taobaoId, reenterurl } = queryStrings;

      if (env && taobaoId && reenterurl && window.parent) {
        window.parent.postMessage({
          eventType: 'refreshDesignId',
          data: { designId }
        }, '*');
      }

      if (HSApp.Util.Url.isInFrame() && window.parent) {
        window.parent.postMessage({
          eventType: 'SaveSuccess'
        }, '*');
      }

      this.saveSuccessfullyTime();
      this.app.isFloorplanDirty = false;

      return { status: 'success' as const };
    });
  }

  getSignalData(params: SaveParams, context: unknown): SignalData {
    const saveType = params.isSaveas 
      ? 'saveas' 
      : this.globalAPI.getDesignId(this.app) 
        ? 'update' 
        : 'save';
    const create = params.isSaveas ?? false;

    return {
      ...super.getSignalData(params, context),
      create,
      saveType
    };
  }

  showSaveDialog(params: SaveParams): Promise<SaveResult> {
    const { isSaveas } = params;

    return new Promise((resolve, reject) => {
      const designMetadata = this.app.designMetadata;
      const popupContainer = document.querySelector('.popupcontainer');

      if (!popupContainer) {
        return reject('cannot find dom .popupcontainer to show save dialog');
      }

      const handleCancel = (): void => {
        ReactDOM.unmountComponentAtNode(popupContainer);
        reject({ status: 'cancel' });

        if (HSApp.PartnerConfig.ENABLE_FIRST_SAVE_SURVEY && window.localStorage) {
          if (!window.localStorage.getItem('firstSaveSuccessfullyTime')) {
            window.open(
              HSApp.PartnerConfig.FIRST_SAVE_CANCEL_SAVE_SURVEY,
              '_blank',
              'noopener=yes, noreferrer=yes'
            );
          }
        }
      };

      const commonUIPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.CommonUI);
      const createDropdownMenu = commonUIPlugin?.createDropdownMenu;

      const dialogTitle = isSaveas 
        ? ResourceManager.getString('save_design_as')
        : ResourceManager.getString('save_design');

      let acsProjectId: string;
      let acsAssetId: string;
      let namePrefix = '';

      if (isSaveas || (HSCore.Util.String.matchGUID(this.globalAPI.getDesignId(this.app)) && !this.globalAPI.isOwner())) {
        acsProjectId = '0';
        acsAssetId = '0';
        namePrefix = ResourceManager.getString('save_design_as_name_prefix') || 'copy of ';
      } else {
        acsProjectId = this.API.getAcsProjectId(this.app);
        acsAssetId = this.API.getAcsAssetId(this.app);
      }

      const handleSave = (formData: FormData): void => {
        ReactDOM.unmountComponentAtNode(popupContainer);
        designMetadata.set('designName', formData.designName);
        designMetadata.set('documentStatus', formData.documentStatus);
        designMetadata.set('attributes', formData.attributes);
        designMetadata.set('address', formData.address);
        designMetadata.set('basicAttributes', formData.basicAttributes);

        resolve({
          status: 'success',
          data: { formData }
        });
      };

      const popupConfig: PopupWindowConfig = {
        windowname: 'savedialog',
        title: dialogTitle,
        contents: React.createElement<SaveDialogProps>('SaveDialog', {
          designName: namePrefix + designMetadata.get('designName'),
          description: designMetadata.get('description'),
          documentStatus: designMetadata.get('documentStatus'),
          acsprojectid: acsProjectId,
          acsassetid: acsAssetId,
          address: this.API.getAddress(this.app),
          basicAttributes: this.API.getBasicAttributes(this.app),
          dropdown: createDropdownMenu,
          onCancel: handleCancel,
          onSave: handleSave
        }),
        width: isHXRR() ? 520 : 500,
        submitcall: () => {},
        cancelcall: handleCancel
      };

      const popupWindow = commonUIPlugin.createPopupwindow(popupConfig);
      ReactDOM.render(popupWindow, popupContainer);
    });
  }

  updateThumbnail(shouldUpdate: boolean = true): Promise<string> {
    if (!shouldUpdate) {
      return Promise.resolve('Success');
    }

    return this.API.exportImgFromCanvas(this.app, 'thumbnail 3d', {
      width: 1920,
      height: 1080,
      forground: false
    }).then((thumbnailData: string) => {
      this.app.designMetadata.set('threeDThumbnail', thumbnailData);
      return Promise.resolve('Success');
    });
  }

  private getSoftClothList(): string[] {
    const clothJidList: string[] = [];

    this.app.floorplan.forEachContent((content: unknown) => {
      if (content instanceof HSCore.Model.SoftCloth && !content.isSimulated) {
        if (!clothJidList.includes(content.simulatedContent.jid)) {
          clothJidList.push(content.simulatedContent.jid);
        }
      }
    });

    return clothJidList;
  }

  private saveSuccessfullyTime(): void {
    if (!window.localStorage) {
      return;
    }

    const storage = window.localStorage;
    const firstSaveTime = storage.getItem('firstSaveSuccessfullyTime');

    if (!firstSaveTime) {
      storage.setItem('firstSaveSuccessfullyTime', new Date(Date.now()).toISOString());
    }
  }
}