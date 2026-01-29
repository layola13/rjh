interface ClickPosition {
  x: number;
  y: number;
}

interface Room {
  getOuterLoopPolygon(): number[][] | null;
}

interface UploadOptions {
  maxWidth?: number;
  maxHeight?: number;
  beforeSendingToServerCallback?: () => void;
}

interface AttributeValue {
  id: string;
  value?: string;
}

interface Attribute {
  id: string;
  name: string;
  values: AttributeValue[];
}

interface RoomTypeData {
  id: string;
  name: string;
}

interface RenderedPicture {
  id: string;
  roomId: string;
  url: string;
  originUrl: string;
  renderingType: string;
  type: string;
  iconUrl: string;
  designVersion: string;
}

interface StylerTemplateInput {
  id: string;
  area?: number;
  roomId: string;
  templateName: string;
  roomType: string;
  roomStyle: string;
  designId: string;
  designUrl: string;
  templateData: unknown;
  thumb: string;
  usePostProcess?: boolean;
}

interface StylerTemplateData {
  id: string;
  name: string;
  thumb: string;
  description: string;
  category: string;
  productType: string;
  contentType: string;
  postProcess?: string;
  attributes: Attribute[];
  free: string;
}

interface WholehouseTemplateData {
  attributes: Attribute[];
  [key: string]: unknown;
}

interface ImageOptions {
  format?: string;
  width?: number;
  height?: number;
  forground?: boolean;
  center?: boolean;
  factor?: number;
  environment?: string;
  viewMode?: string;
}

interface ViewSettings {
  cameraVisible: boolean;
  backgroundVisible: boolean;
  ceilingVisible: boolean;
  gridVisible: boolean;
  dimensionVisiable: boolean;
  environmentId: string;
  viewMode: string;
}

interface AutostylerRequest {
  designId: string;
  templateData: unknown;
  onlyHardDeco: boolean;
  roomConstruct: unknown;
}

interface TemplateSearchParams {
  roomTypes: string[];
  roomStyle: string;
  limit: number;
}

export default class AutostylerUtil {
  private static roomTypeAttribute: Attribute | undefined;
  private static roomStyleAttribute: Attribute | undefined;

  static getClickEventPositionRoom(position: [number, number], rooms: Room[]): Room | null {
    const point: ClickPosition = {
      x: position[0],
      y: position[1]
    };

    for (let i = 0; i < rooms.length; i++) {
      const polygon = rooms[i].getOuterLoopPolygon();
      if (polygon && HSCore.Util.Math.isPointInPolygon(point, polygon)) {
        return rooms[i];
      }
    }

    return null;
  }

  static parseURL(url: string): string {
    let resourcePath = `res/${url}`;
    const imagePattern = /\.(gif|jpg|jpeg|png|svg|SVG|GIF|JPG|PNG)$/;
    
    if (imagePattern.test(url)) {
      resourcePath = `res/ImgAutoStyler/${url}`;
    }

    return ResourceManager.parseURL(resourcePath, './plugin/autostyler/');
  }

  static uploadPictureToS3_(fileType: string, options?: UploadOptions): Promise<unknown> {
    const defaultOptions: Required<UploadOptions> = {
      maxWidth: 600,
      maxHeight: 600,
      beforeSendingToServerCallback: undefined
    };

    const mergedOptions = Object.assign(defaultOptions, options);

    return HSApp.Util.File.load('image/png, image/jpeg', 'dataURL')
      .then((dataURL: string) => {
        if (mergedOptions.beforeSendingToServerCallback) {
          mergedOptions.beforeSendingToServerCallback();
        }
        return this.getCenteredResizedImageDataURL_(dataURL, mergedOptions.maxWidth, mergedOptions.maxHeight);
      })
      .then((resizedDataURL: string) => {
        return HSApp.Io.Request.Design.uploadFile(resizedDataURL, {
          key: 'autostyler'
        });
      });
  }

  static roomTypeToAttribute_(roomTypeId: string): Attribute | undefined {
    if (!this.roomTypeAttribute) {
      return undefined;
    }

    const matchedValue = this.roomTypeAttribute.values.find((value) => value.id === roomTypeId);

    if (matchedValue) {
      return {
        id: this.roomTypeAttribute.id,
        name: this.roomTypeAttribute.name,
        values: [matchedValue]
      };
    }

    return undefined;
  }

  static couponTypeToAttribute_(): Attribute | null {
    const coupon = HSApp.App.getApp().appParams.getParam('coupon');

    if (coupon && coupon.alias === 'ysjj') {
      return {
        id: '55d5456e-a5d9-4725-970d-1404f8a8f6ab',
        name: '套餐',
        values: [{
          id: '7f537d66-58de-11e8-9c2d-fa7ae01bbebc',
          value: '云设计家选品库'
        }]
      };
    }

    return null;
  }

  static setRoomTypeAttribute_(attribute: Attribute): void {
    this.roomTypeAttribute = attribute;
  }

  static roomStyleToAttribute_(roomStyleId: string): Attribute | undefined {
    if (!this.roomStyleAttribute) {
      return undefined;
    }

    const matchedValue = this.roomStyleAttribute.values.find((value) => value.id === roomStyleId);

    if (matchedValue) {
      return {
        id: this.roomStyleAttribute.id,
        name: this.roomStyleAttribute.name,
        values: [matchedValue]
      };
    }

    return undefined;
  }

  static setRoomStyleAttribute_(attribute: Attribute): void {
    this.roomStyleAttribute = attribute;
  }

  static getRoomStyleAttribute_(): Attribute | undefined {
    return this.roomStyleAttribute;
  }

  static getAvailableRoomTypeList_(): RoomTypeData[] {
    const availableTypes = HSApp.Util.Room.getAvailableRoomTypes();
    const roomTypeList: RoomTypeData[] = [];

    availableTypes.forEach((roomType: string) => {
      if (roomType !== 'none') {
        roomTypeList.push({
          id: roomType,
          name: `model_roomtype_${roomType}`
        });
      }
    });

    return roomTypeList;
  }

  static getInvalidRoomTypeSet_(): Set<string> {
    const invalidSet = new Set<string>();
    invalidSet.add(HSCore.Model.RoomTypeEnum.none);
    invalidSet.add(HSCore.Model.RoomTypeEnum.OtherRoom);
    return invalidSet;
  }

  static getRenderedPicturesFromServer_(designId: string): Promise<RenderedPicture[]> {
    if (!designId) {
      return Promise.reject(new Error('designId is null'));
    }

    const isFpTenant = HSApp.Config.TENANT === 'fp';
    const getSnapshotsMethod = isFpTenant 
      ? NWTK.mtop.Render.getSnapshotsByDesignIdV2 
      : NWTK.mtop.Render.getSnapshotsByDesignId;

    return getSnapshotsMethod({
      data: {
        designId: designId,
        pageNo: 1,
        pageSize: 50
      }
    }).then((response: any) => {
      const responseData = response.data;
      const items = isFpTenant ? responseData.result : responseData.items;

      if (!items) {
        return [];
      }

      return items
        .filter((item: any) => item.status === 2)
        .map((item: any) => {
          const originalUrl = item.url;
          const isPanorama = item.renderingType === 'panorama';
          let thumbnailUrl = isPanorama && !originalUrl.endsWith('.front.jpg')
            ? originalUrl.replace('.jpg', '.front.jpg')
            : originalUrl;

          thumbnailUrl = HSApp.Util.Image.getOssImageUrlWithSize(
            thumbnailUrl,
            320,
            180,
            isPanorama ? 'fill' : 'lfit'
          );

          return {
            id: item.uid,
            roomId: item.roomId,
            url: thumbnailUrl,
            originUrl: originalUrl,
            renderingType: item.renderingType,
            type: 'rendered',
            iconUrl: '',
            designVersion: item.designVersion
          };
        });
    });
  }

  static getSendingStylerTemplateData_(input: StylerTemplateInput): StylerTemplateData {
    let { area } = input;

    if (area !== undefined) {
      area = HSCore.Util.Math.toPersistentPrecision(area);
    }

    const roomData = {
      roomId: input.roomId,
      templateName: input.templateName,
      area: area,
      roomType: input.roomType,
      designId: input.designId,
      designUrl: input.designUrl,
      templateData: input.templateData
    };

    const attributes: Attribute[] = [];

    const roomTypeAttr = this.roomTypeToAttribute_(input.roomType);
    if (roomTypeAttr) {
      attributes.push(roomTypeAttr);
    }

    const roomStyleAttr = this.roomStyleToAttribute_(input.roomStyle);
    if (roomStyleAttr) {
      attributes.push(roomStyleAttr);
    }

    const couponAttr = this.couponTypeToAttribute_();
    if (couponAttr) {
      attributes.push(couponAttr);
    }

    return {
      id: input.id,
      name: input.templateName,
      thumb: input.thumb,
      description: input.templateName,
      category: NWTK.api.catalog.UserDataCategoryType.StylerTemplate,
      productType: HSCatalog.ProductTypeEnum.StylerTemplate,
      contentType: `${HSCatalog.ContentTypeEnum.CustomizedContent}/${HSCatalog.ContentTypeEnum.StylerTemplate}`,
      postProcess: input.usePostProcess ? 'floorplan-data-service/actions/autostyler' : undefined,
      attributes: attributes,
      free: JSON.stringify(roomData)
    };
  }

  static getSendingWholehouseTemplateData_(templateData: WholehouseTemplateData): WholehouseTemplateData {
    const attributes: Attribute[] = [];
    const couponAttr = this.couponTypeToAttribute_();

    if (couponAttr) {
      attributes.push(couponAttr);
    }

    return Object.assign(templateData, {
      attributes: attributes
    });
  }

  static getCenteredResizedImageDataURL_(imageDataURL: string, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise((resolve) => {
      const image = new Image();

      image.onload = () => {
        const naturalWidth = image.naturalWidth;
        const naturalHeight = image.naturalHeight;

        if (naturalWidth > maxWidth && naturalHeight > maxHeight) {
          const widthRatio = naturalWidth / maxWidth;
          const heightRatio = naturalHeight / maxHeight;
          const scaleFactor = widthRatio < heightRatio ? widthRatio : heightRatio;

          const resizedCanvas = HSApp.Util.Image.resize(image, naturalWidth / scaleFactor, naturalHeight / scaleFactor);
          const resizedDataURL = HSApp.Util.Image.toDataURL(resizedCanvas, 'image/png');

          resizedCanvas.xRelease();
          resolve(resizedDataURL);
        } else {
          resolve(imageDataURL);
        }
      };

      image.src = imageDataURL;
    });
  }

  static get2DImage(options: ImageOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      const app = HSApp.App.getApp();
      const defaultOptions: Required<ImageOptions> = {
        format: 'image/png',
        width: 400,
        height: 400,
        forground: false,
        center: true,
        factor: 1.1,
        environment: '',
        viewMode: ''
      };

      const mergedOptions = Object.assign(defaultOptions, options);

      const cameraRoom = this.getCameraRoom();
      HSApp.Selection.Manager.select(cameraRoom);

      const currentViewSettings = app.appSettings.getViewSetting();
      const savedSettings: ViewSettings = {
        cameraVisible: currentViewSettings.cameraVisible,
        backgroundVisible: currentViewSettings.backgroundVisible,
        ceilingVisible: currentViewSettings.ceilingVisible,
        gridVisible: currentViewSettings.gridVisible,
        dimensionVisiable: currentViewSettings.dimensionVisiable,
        environmentId: app.activeEnvironmentId,
        viewMode: app.primaryViewMode
      };

      app.activateEnvironment(mergedOptions.environment, {
        viewMode: mergedOptions.viewMode
      });

      app.appSettings.setViewItem('backgroundVisible', false);
      app.appSettings.setViewItem('gridVisible', false);
      app.appSettings.setViewItem('cameraVisible', false);
      app.appSettings.setViewItem('dimensionVisiable', false);
      app.updateDocumentWithViewOptions();

      const frameEndHandler = () => {
        app.signalNewAnimationFrameEnd.unlisten(frameEndHandler, this);

        app.saveDocument('thumbnail 2d', mergedOptions, (result: string | null) => {
          app.appSettings.setViewItem('cameraVisible', false);
          app.appSettings.setViewItem('backgroundVisible', false);
          app.appSettings.setViewItem('ceilingVisible', false);
          app.appSettings.setViewItem('gridVisible', false);
          app.appSettings.setViewItem('dimensionVisiable', false);

          app.activateEnvironment(savedSettings.environmentId, {
            viewMode: savedSettings.viewMode
          });

          app.updateDocumentWithViewOptions();

          if (result) {
            resolve(result);
          } else {
            reject();
          }
        });
      };

      app.signalNewAnimationFrameEnd.listen(frameEndHandler, this);
    });
  }

  static isAutomationTest(): boolean {
    const app = HSApp.App.getApp();
    return !!app && !!app.appParams._autostylertest;
  }

  static getCameraRoom(): unknown {
    const app = HSApp.App.getApp();
    const activeCamera = app.floorplan.active_camera;

    if (!activeCamera) {
      return null;
    }

    let targetRoom: unknown = null;

    app.floorplan.forEachRoom((room: any) => {
      if (!targetRoom) {
        const polygon = room.toPolygon();
        if (HSCore.Util.Math.isPointInPolygon(activeCamera, polygon)) {
          targetRoom = room;
        }
      }
    });

    return targetRoom;
  }

  static getTemplateName(): string {
    return HSApp.App.getApp().appParams._templatename;
  }

  static getAutostylerData(designId: string, templateData: unknown, roomConstruct: unknown): Promise<unknown> {
    const apiUrl = `${HSApp.PartnerConfig.EZHOME_AUTOSTYLER_SERVER}/api/rest/v2.0/tenants/ezhome/designs/sync_migrate`;
    const requestData: AutostylerRequest = {
      designId: designId,
      templateData: templateData,
      onlyHardDeco: false,
      roomConstruct: roomConstruct
    };

    return NWTK.ajax.post(apiUrl, requestData);
  }

  static saveBase64ToPng(base64String: string, suffix: string): void {
    const app = HSApp.App.getApp();
    const templateName = app.appParams._templatename;
    const designId = app.designMetadata.get('designId');
    const fileName = `${templateName}_${designId}_${suffix}`;

    const parts = base64String.split(';base64,');
    const mimeType = parts[0].replace('data:', '');
    const byteArray = new Uint8Array(HSApp.Util.Base64.decodeStringToByteArray(parts[1], false));
    const blob = new Blob([byteArray], { type: mimeType });

    saveAs(blob, `${fileName}.png`);
  }

  static getTemplateDesignData(roomTypes: string[], roomStyle: string, limit: number): Promise<unknown[]> {
    const searchParams: TemplateSearchParams = {
      roomTypes: roomTypes,
      roomStyle: roomStyle,
      limit: limit
    };

    return NWTK.mtop.TemplateRoom.templateRoomRandomSearchSingle({
      data: searchParams
    }).then((response: any) => {
      return response.data?.items ?? [];
    });
  }
}