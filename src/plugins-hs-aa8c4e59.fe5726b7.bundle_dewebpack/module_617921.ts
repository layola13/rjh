interface ProductMeta {
  id: string;
  name: string;
  images?: string[];
  roomStyle?: string;
  roomType?: string;
  roomId?: string;
  userFreeData: UserFreeData;
  contentType: ContentType;
}

interface UserFreeData {
  roomId?: string;
  area?: number;
  designId?: string;
  designUrl?: string;
  templateData?: unknown;
  [key: string]: unknown;
}

interface ContentType {
  isTypeOf(type: unknown): boolean;
}

interface CustomizedUI {
  bindData(data: ProductMeta): void;
  writeResult(container: Record<string, unknown>): void;
  isChanged(): boolean;
  needPostProcess(): boolean;
}

interface CatalogPlugin {
  closeIndependent(): void;
  updateCustomizedProduct(id: string, data: ServerData, category: unknown): Promise<void>;
}

interface EditingPanelSaveData {
  name: string;
  roomTypeId: string;
  picInfo: PicInfo;
}

interface PicInfo {
  id: string;
  url: string;
}

interface OriginalData {
  name: string;
  roomType: string;
  picUrl: string;
}

interface ServerData {
  id: string;
  name?: string;
  style?: string;
  thumb?: string;
  isoRenderingUid?: string;
  isoRenderingType?: string;
  isoVersion?: string;
  roomId?: string;
  templateName?: string;
  area?: number;
  roomType?: string;
  designId?: string;
  designUrl?: string;
  usePostProcess?: boolean;
  templateData?: unknown;
}

interface DownloadedPicInfo {
  id: string;
  url: string;
  originUrl: string;
  renderingType: string;
  designVersion: string;
  roomId?: string;
}

interface PictureRequestCallback {
  addData(key: string, value: unknown): void;
  commit(): void;
}

interface PickImagePanelInstance {
  setPictureList_(list: DownloadedPicInfo[]): void;
}

interface CommandConstructorParams {
  app: unknown;
  editingPanelDomNode: HTMLElement;
  pickImagePanelDomNode: HTMLElement;
  catalogPlugin: CatalogPlugin;
  signalSendingStylerTemplate: Signal;
  customizedUIArr: CustomizedUI[];
  productMeta: ProductMeta;
  callback?: () => void;
}

interface Signal {
  dispatch(data: { customizedUIResultContainer: Record<string, unknown>; dataToServer: ServerData }): void;
}

export default class EditStylerTemplateCommand extends HSApp.Cmd.Command {
  private _app: unknown;
  private _editingPanelDomNode: HTMLElement;
  private _pickImagePanelDomNode: HTMLElement;
  private _catalogPlugin: CatalogPlugin;
  private _signalSendingStylerTemplate: Signal;
  private _customizedUIArr: CustomizedUI[];
  private _productMeta: ProductMeta;
  private _downloadedCoverPicInfoList?: DownloadedPicInfo[];
  private _originalData!: OriginalData;
  private wholehouseFlag: boolean = false;
  private callbaclk?: () => void;
  private roomId?: string;

  constructor(params: CommandConstructorParams) {
    super();
    this._app = params.app;
    this._editingPanelDomNode = params.editingPanelDomNode;
    this._pickImagePanelDomNode = params.pickImagePanelDomNode;
    this._catalogPlugin = params.catalogPlugin;
    this._signalSendingStylerTemplate = params.signalSendingStylerTemplate;
    this._customizedUIArr = params.customizedUIArr;
    this._productMeta = params.productMeta;
    this.callbaclk = params.callback;

    this._customizedUIArr.forEach((ui) => {
      ui.bindData(this._productMeta);
    });
  }

  onExecute(): void {
    this._catalogPlugin.closeIndependent();

    const productMeta = this._productMeta;
    let roomStyleId = "";
    let roomTypeId = "";
    let customizedRoomId = "";

    const requestData: Record<string, string> = {};
    if (HSApp.Config.TENANT === "fp") {
      requestData.templateId = this._productMeta.id;
    } else {
      requestData.roomId = this._productMeta.id;
    }

    NWTK.mtop.Catalog.getMyStylerProductDetail({ data: requestData })
      .then((response) => {
        const app = HSApp.App.getApp();
        const roomTypeKey = HSApp.Config.TENANT === "fp" ? "roomType" : "房间类型";
        const roomStyleKey = HSApp.Config.TENANT === "fp" ? "roomStyle" : "房间风格";

        roomStyleId = HSApp.Catalog.BaseApiManager.getInstance().Utils.getAttributesFirstId(
          response.data.attributes,
          roomStyleKey
        );
        roomTypeId = HSApp.Catalog.BaseApiManager.getInstance().Utils.getAttributesFirstId(
          response.data.attributes,
          roomTypeKey
        );
        customizedRoomId = response.data.customizedRoom.roomId;

        return app.catalogManager.getProductBySeekId(
          response.data.id,
          { data: response.data },
          HSCatalog.OriginalMetaCreatorType.Local,
          HSCatalog.MetaCreatorType.Generic,
          true
        );
      })
      .then((product: ProductMeta) => {
        product.roomStyle = roomStyleId || "";
        product.roomType = roomTypeId || "";
        product.roomId = customizedRoomId || "";
        Object.assign(product.userFreeData, productMeta.userFreeData);

        const availableRoomTypeList = (window as any).default.getAvailableRoomTypeList_();
        const invalidRoomTypeSet = (window as any).default.getInvalidRoomTypeSet_();

        let isWholehouse = false;
        if (product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.FullRoom)) {
          isWholehouse = true;
        } else if (product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.StylerTemplate)) {
          isWholehouse = false;
        }

        this.wholehouseFlag = isWholehouse;
        this._originalData = {
          name: product.name,
          roomType: roomTypeId,
          picUrl: this._getImgScr(product.images?.[0])
        };

        this._customizedUIArr.forEach((ui) => {
          ui.bindData(product);
        });

        this.roomId = product.roomId;

        const editingPanel = React.createElement((window as any).default, {
          initialName: this._originalData.name,
          initialRoomTypeId: this._originalData.roomType,
          customizedUIWithValueList: this._customizedUIArr,
          initialPicInfo: {
            id: "",
            url: this._originalData.picUrl
          },
          roomTypeList: availableRoomTypeList,
          invalidRoomTypeIdSet: invalidRoomTypeSet,
          saveNotify: this._onEditingPanelSave.bind(this),
          cancelNotify: () => {
            ReactDOM.unmountComponentAtNode(this._editingPanelDomNode);
            this.mgr.complete(this);
          },
          requestPictureNotify: this._onRequestPicture.bind(this),
          wholehouseFlag: this.wholehouseFlag
        });

        ReactDOM.render(editingPanel, this._editingPanelDomNode);
      });
  }

  onReceive(): boolean {
    return true;
  }

  canUndoRedo(): boolean {
    return false;
  }

  private _getImgScr(url?: string): string {
    return url ? HSApp.Util.Image.getOssImageUrlWithSize(url, 320, 180, "fill") : "";
  }

  private _getWholhouseEditServerData(productMeta: ProductMeta, saveData: EditingPanelSaveData): ServerData {
    const customizedResult: Record<string, unknown> = {};
    this._customizedUIArr.forEach((ui) => {
      ui.writeResult(customizedResult);
    });

    const serverData: ServerData = {
      id: productMeta.id,
      name: saveData.name,
      style: customizedResult.ezhomeRoomStyle as string
    };

    const matchedPic = this._downloadedCoverPicInfoList?.find((pic) => pic.id === saveData.picInfo.id);

    if (matchedPic) {
      Object.assign(serverData, {
        thumb: matchedPic.originUrl,
        isoRenderingUid: matchedPic.id,
        isoRenderingType: matchedPic.renderingType,
        isoVersion: matchedPic.designVersion
      });
    }

    return serverData;
  }

  private _getSinglehouseEditServerData(
    productMeta: ProductMeta,
    saveData: EditingPanelSaveData,
    usePostProcess: boolean
  ): ServerData {
    const userFreeData = productMeta.userFreeData;

    const serverData: ServerData = {
      id: productMeta.id,
      roomId: userFreeData.roomId,
      templateName: saveData.name,
      area: userFreeData.area,
      roomType: saveData.roomTypeId,
      designId: userFreeData.designId,
      designUrl: userFreeData.designUrl,
      usePostProcess,
      templateData: userFreeData.templateData
    };

    const matchedPic = this._downloadedCoverPicInfoList?.find((pic) => pic.id === saveData.picInfo.id);

    if (matchedPic) {
      Object.assign(serverData, {
        thumb: matchedPic.originUrl,
        isoRenderingUid: matchedPic.id,
        isoRenderingType: matchedPic.renderingType,
        isoVersion: matchedPic.designVersion
      });
    }

    const sendingData = (window as any).default.getSendingStylerTemplateData_(serverData);
    const customizedResult: Record<string, unknown> = {};

    this._customizedUIArr.forEach((ui) => {
      ui.writeResult(customizedResult);
    });

    this._signalSendingStylerTemplate.dispatch({
      customizedUIResultContainer: customizedResult,
      dataToServer: sendingData
    });

    return sendingData;
  }

  private _onEditingPanelSave(saveData: EditingPanelSaveData): void {
    ReactDOM.unmountComponentAtNode(this._editingPanelDomNode);

    const hasChanges =
      this._originalData.name !== saveData.name ||
      this._originalData.roomType !== saveData.roomTypeId ||
      this._originalData.picUrl !== saveData.picInfo.url ||
      this._customizedUIArr.some((ui) => ui.isChanged());

    if (hasChanges) {
      const needPostProcess =
        this._originalData.roomType !== saveData.roomTypeId ||
        this._customizedUIArr.some((ui) => ui.isChanged() && ui.needPostProcess());

      let serverData: ServerData;
      let category: unknown;

      if (this.wholehouseFlag) {
        serverData = this._getWholhouseEditServerData(this._productMeta, saveData);
        category = NWTK.api.catalog.UserDataCategoryType.MyWholehouseTemplate;
      } else {
        serverData = this._getSinglehouseEditServerData(this._productMeta, saveData, needPostProcess);
        category = NWTK.api.catalog.UserDataCategoryType.MySingleStylerTemplate;
      }

      this._executeSendingToServer(this._productMeta.id, serverData, category);
    }

    this.mgr.complete(this);
  }

  private _executeSendingToServer(productId: string, data: ServerData, category: unknown): void {
    LiveHint.show(ResourceManager.getString("autostyler_editing_panel_wait_backend_hint"), undefined, undefined, {
      canclose: false,
      status: LiveHint.statusEnum.loading
    });

    this._catalogPlugin
      .updateCustomizedProduct(productId, data, category)
      .then(() => {
        LiveHint.hide();
        LiveHint.show(ResourceManager.getString("autostyler_editing_panel_submit_success_hint"), 2500, undefined, {
          canclose: true,
          status: LiveHint.statusEnum.completed
        });

        if (this.callbaclk) {
          this.callbaclk();
        }
      })
      .catch(() => {
        LiveHint.hide();
        const retryHtml = `<span class="action">${ResourceManager.getString(
          "autostyler_editing_panel_submit_retry_hint"
        )}</span>`;

        LiveHint.show(
          ResourceManager.getString("autostyler_editing_panel_submit_failed_hint"),
          3000,
          () => {
            this._executeSendingToServer(productId, data, category);
          },
          {
            canclose: true,
            status: LiveHint.statusEnum.canops,
            append: retryHtml,
            effect: "shake"
          }
        );
      });
  }

  private _onRequestPicture(callback: PictureRequestCallback, beforeUploadCallback: () => void): void {
    const pickImagePanel = React.createElement((window as any).default, {
      uploadNotify: () => {
        ReactDOM.unmountComponentAtNode(this._pickImagePanelDomNode);
        (window as any).default
          .uploadPictureToS3_(adskUser.sid, {
            beforeSendingToServerCallback: beforeUploadCallback
          })
          .then((uploadedUrl: string) => {
            const thumbnailUrl = uploadedUrl
              ? HSApp.Util.Image.getOssImageUrlWithSize(uploadedUrl, 320, 180, "lfit")
              : uploadedUrl;

            callback.addData("hasError", false);
            callback.addData("picUrl", thumbnailUrl);
            callback.addData("picId", undefined);
            callback.commit();
          })
          .catch(() => {
            callback.addData("hasError", true);
            callback.commit();
          });
      },
      submitNotify: (picInfo: PicInfo) => {
        ReactDOM.unmountComponentAtNode(this._pickImagePanelDomNode);
        callback.addData("hasError", false);
        callback.addData("picUrl", picInfo.url);
        callback.addData("picId", picInfo.id);
        callback.commit();
      },
      cancelNotify: () => {
        ReactDOM.unmountComponentAtNode(this._pickImagePanelDomNode);
      },
      willMountNotify: this._onPickImagePanelWillMount.bind(this)
    });

    ReactDOM.render(pickImagePanel, this._pickImagePanelDomNode);
  }

  filterPicInfoList(): DownloadedPicInfo[] | undefined {
    if (!this.roomId || !this._downloadedCoverPicInfoList) {
      return this._downloadedCoverPicInfoList;
    }

    return this._downloadedCoverPicInfoList.filter((pic) => {
      return this.roomId?.toString() === pic.roomId?.toString();
    });
  }

  private _onPickImagePanelWillMount(panelInstance: PickImagePanelInstance): void {
    if (this._downloadedCoverPicInfoList) {
      panelInstance.setPictureList_(this.filterPicInfoList() ?? []);
    } else {
      const userFreeData = this._productMeta.userFreeData;

      if (userFreeData.designId) {
        (window as any).default
          .getRenderedPicturesFromServer_(userFreeData.designId)
          .then((pictures: DownloadedPicInfo[]) => {
            this._downloadedCoverPicInfoList = pictures;
            panelInstance.setPictureList_(this.filterPicInfoList() ?? []);
          })
          .catch(() => {
            panelInstance.setPictureList_([]);
          });
      } else {
        panelInstance.setPictureList_([]);
      }
    }
  }

  getDescription(): string {
    return "编辑样板间";
  }

  getCategory(): unknown {
    return HSFPConstants.LogGroupTypes.TemplateDesign;
  }

  isInteractive(): boolean {
    return true;
  }
}