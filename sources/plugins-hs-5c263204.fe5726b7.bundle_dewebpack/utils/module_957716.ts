interface SubmitDataHandleItem {
  id: string | number;
  fn: (context: DataHandleContext) => Promise<void>;
  callback?: (context: DataHandleContext) => void;
  priority?: number;
}

interface DataHandleContext {
  submitData: SubmitData;
  formData: FormData;
}

interface FormData {
  content?: string;
  [key: string]: any;
}

interface SubmitData {
  title?: string;
  biz?: string;
  domain?: string;
  environment?: string;
  environmentName?: string;
  webSite?: string;
  module?: string;
  userTracks?: any[];
  extraData?: ExtraData;
  designId?: string;
  userInfo?: UserInfo;
  clientInfo?: any;
  [key: string]: any;
}

interface ExtraData {
  magic?: string;
  designVersion?: string;
  publishVersion?: string;
  publishVersionByType?: any;
}

interface UserInfo {
  umsId?: string;
  employeeId?: string;
  enterpriseId?: string;
}

interface FormDataAdapterParams {
  formData: FormData;
  webSite?: string;
  module?: string;
}

declare const HSApp: any;
declare const HSFPConstants: any;
declare const adskUser: any;
declare const window: any;

import { submitDataHandleFunctionArr } from './constants';
import { insertSort } from './utils';

export default class SubmitDataHandler {
  private _arr: SubmitDataHandleItem[];

  constructor() {
    this._arr = submitDataHandleFunctionArr;
  }

  /**
   * Add a submit data handle item to the processing queue
   */
  addSubmitDataHandleItem(item: SubmitDataHandleItem): void {
    const exists = this._arr.some((existingItem) => existingItem.id === item.id);
    
    if (!exists) {
      this._arr.push(item);
      insertSort(this._arr);
    }
  }

  /**
   * Remove a submit data handle item by id
   */
  deleteSubmitDataHandleItem(id: string | number): void {
    const arr = this._arr;
    
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        this._arr.splice(i, 1);
      }
    }
  }

  /**
   * Transform form data into standardized submit data format
   */
  async formDataAdapter(params: FormDataAdapterParams): Promise<SubmitData> {
    const { formData, webSite, module } = params;
    
    const app = HSApp.App.getApp();
    const designId = app.designMetadata.get('designId');
    const biz = HSApp.Config.TENANT === 'fp' 
      ? 'global' 
      : app.appParams.biz === 'tpzz' 
        ? 'tpzz' 
        : 'sjj';
    
    const userTracks = app.userTrackLogger.getStoreLog(30);
    const environmentId = app.activeEnvironmentId;
    const environmentName = HSFPConstants.EnvironmentName[environmentId]?.name ?? environmentId;
    
    const queryStrings = HSApp.Util.Url.getQueryStrings(location.search);
    const domain = queryStrings?.env ?? 'default';
    
    const umsId = adskUser?.uid;
    const employeeId = adskUser?.employeeId;
    const enterpriseId = adskUser?.enterpriseId;
    
    const submitData: SubmitData = {};
    
    Object.keys(formData).forEach((key) => {
      this._setKeyValue(submitData, key, formData[key]);
    });
    
    Object.assign(submitData, {
      title: formData.content?.substring(0, 30),
      biz,
      domain,
      environment: environmentId,
      environmentName,
      webSite,
      module: module ?? environmentId,
      userTracks
    });
    
    const magic = HSApp.HSCore.Doc.FloorplanMeta.magic;
    const extraData = submitData.extraData ?? {};
    submitData.extraData = extraData;
    
    Object.assign(extraData, { magic });
    
    if (designId) {
      Object.assign(submitData, { designId });
      Object.assign(extraData, {
        designVersion: app.designMetadata.get('designVersion')
      });
    }
    
    const userInfo: UserInfo = { umsId };
    
    if (employeeId) {
      Object.assign(userInfo, { employeeId, enterpriseId });
    }
    
    Object.assign(submitData, { userInfo });
    
    const clientInfo = await HSApp.Util.Feedback.collectFeedbackInfo();
    
    if (clientInfo) {
      Object.assign(submitData, { clientInfo });
    }
    
    if (window.publishVersion) {
      Object.assign(extraData, { publishVersion: window.publishVersion });
      Object.assign(extraData, { publishVersionByType: window.publishVersionByType });
    }
    
    const customizedData = await this._handleCustomizedData(submitData, formData);
    Object.assign(submitData, { ...customizedData });
    
    return submitData;
  }

  /**
   * Process customized data through registered handlers
   */
  private async _handleCustomizedData(
    submitData: SubmitData,
    formData: FormData
  ): Promise<Partial<SubmitData>> {
    const handlers = this._arr;
    const context: DataHandleContext = {
      submitData: { ...submitData },
      formData: { ...formData }
    };
    
    for (let i = 0; i < handlers.length; i++) {
      const handler = handlers[i];
      await handler.fn(context);
      
      if (handler.callback) {
        handler.callback({ ...context });
      }
    }
    
    return context.submitData;
  }

  /**
   * Set nested property value using dot notation
   */
  private _setKeyValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      
      if (!current[key] || !(current[key] instanceof Object)) {
        current[key] = {};
      }
      
      current = current[key];
    }
    
    current[keys[keys.length - 1]] = value;
  }

  /**
   * Get all registered submit data handle items
   */
  getSubmitDataHandleItem(): SubmitDataHandleItem[] {
    return this._arr;
  }
}