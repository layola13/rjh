interface EditingPanelConfig {
  editingPanelDomNode: HTMLElement;
  pickImagePanelDomNode: HTMLElement;
  app: any;
  cmdMgr: any;
  catalogPlugin: any;
  signalSendingStylerTemplate: any;
  editingPanelCustomizedUIArr: any[];
}

interface PanelInfo {
  id: string;
  area?: string;
  templateData?: any;
  roomTypeName?: string;
  roomType?: string;
  roomStyleName?: string;
  roomStyle?: string;
  bedroom?: string;
  livingroom?: number;
  bathroom?: number;
  isWholeHouse?: boolean;
  contextmenu?: ContextMenu;
  userFreeData?: {
    area?: number;
    templateData?: any;
  };
}

interface AttributeValue {
  id: string;
  value: string;
}

interface Attribute {
  id: string;
  values: AttributeValue[];
  free?: any[];
}

interface ProductMeta {
  attributes: Attribute[];
  productType: number;
  isUserUpload?: boolean;
}

interface ContextMenu {
  name: string;
  items: ContextMenuItem[];
}

interface ContextMenuItem {
  id: string;
  name: string;
  icon: string;
  onclick: (panelInfo: PanelInfo, callback: () => void) => void;
}

interface CommandConfig {
  app: any;
  cmdMgr: any;
  editingPanelDomNode: HTMLElement;
  pickImagePanelDomNode: HTMLElement;
  catalogPlugin: any;
  signalSendingStylerTemplate: any;
  customizedUIArr: any[];
  productMeta: any;
  callback: () => void;
}

interface DeleteParams {
  roomId: string;
  includeSingleRoom: boolean;
}

interface StylerProductDetailParams {
  data: {
    templateId?: string;
    roomId?: string;
  };
}

class StylerTemplateProcessor {
  private readonly _editingPanelDomNode: HTMLElement;
  private readonly _pickImagePanelDomNode: HTMLElement;
  private readonly _app: any;
  private readonly _cmdMgr: any;
  private readonly _catalogPlugin: any;
  private readonly _signalSendingStylerTemplate: any;
  private readonly _editingPanelCustomizedUIArr: any[];
  private _meta: PanelInfo[];

  constructor(config: EditingPanelConfig) {
    this._editingPanelDomNode = config.editingPanelDomNode;
    this._pickImagePanelDomNode = config.pickImagePanelDomNode;
    this._app = config.app;
    this._cmdMgr = config.cmdMgr;
    this._catalogPlugin = config.catalogPlugin;
    this._signalSendingStylerTemplate = config.signalSendingStylerTemplate;
    this._editingPanelCustomizedUIArr = config.editingPanelCustomizedUIArr;
    this._meta = [];
  }

  private _deleteConfirm(panelInfo: PanelInfo, callback: () => void): void {
    const deleteContent = ResourceManager.getString("catalog_menu_delete_content");
    const cancelText = ResourceManager.getString("catalog_menu_delete_cancel");
    const confirmText = ResourceManager.getString("catalog_menu_delete_confirm");
    const checkboxText = ResourceManager.getString("catalog_menu_delete_checkbox");
    
    let includeSingleRoom = true;
    
    const messageBox = MessageBox.create(
      "",
      [cancelText, confirmText],
      1,
      {
        title: deleteContent,
        checkboxContent: panelInfo.isWholeHouse ? checkboxText : undefined,
        isChecked: includeSingleRoom
      },
      false,
      false
    );

    this._app.userTrackLogger.push("delete.TemplateDesign", {
      description: "删除样本间提示框",
      argInfo: {
        id: panelInfo.id
      },
      group: HSFPConstants.LogGroupTypes.TemplateDesign
    });

    messageBox.show((buttonIndex: number, _param2: any, isChecked?: boolean) => {
      if (buttonIndex === -1 && isChecked !== undefined) {
        includeSingleRoom = isChecked;
      }

      if (buttonIndex === 0) {
        const deleteParams: DeleteParams = {
          roomId: panelInfo.id,
          includeSingleRoom
        };

        HSApp.App.getApp()
          .pluginManager.getPlugin(HSFPConstants.PluginType.Catalog)
          .BaseApiManager.dataManager.deleteMyStylerProduct(deleteParams)
          .then(() => {
            setTimeout(() => {
              callback();
            }, 1000);
          });
      }

      this._app.userTrackLogger.push("delete.TemplateDesign", {
        description: buttonIndex === 0 ? "删除样本间" : "未删除样本间",
        argInfo: {
          id: panelInfo.id
        },
        group: HSFPConstants.LogGroupTypes.TemplateDesign
      });
    });
  }

  buildSinglePanelInfo(panelInfo: PanelInfo, productMeta: ProductMeta): PanelInfo {
    const userFreeData = panelInfo.userFreeData;
    const area = userFreeData?.area;
    const templateData = userFreeData?.templateData;

    if (area !== undefined) {
      const areaDisplay = HSApp.Util.UnitFormater.toAreaDisplayString(
        area,
        this._app.floorplan.displayAreaUnit,
        this._app.floorplan.displayAreaPrecisionDigits,
        true
      );
      panelInfo.area = areaDisplay;
    } else {
      panelInfo.area = undefined;
    }

    if (templateData) {
      panelInfo.templateData = templateData;
    }

    productMeta.attributes.forEach((attribute) => {
      switch (attribute.id) {
        case HSApp.PartnerConfig.PRODUCTS_ROOM_TYPE:
          panelInfo.roomTypeName = attribute.values[0].value;
          panelInfo.roomType = attribute.values[0].id;
          break;
        case HSApp.PartnerConfig.PRODUCTS_ROOM_STYLE:
          panelInfo.roomStyleName = attribute.values[0].value;
          panelInfo.roomStyle = attribute.values[0].id;
          break;
      }
    });

    return panelInfo;
  }

  buildWholehousePanelInfo(panelInfo: PanelInfo, productMeta: ProductMeta): PanelInfo {
    productMeta.attributes.forEach((attribute) => {
      switch (attribute.id) {
        case HSApp.PartnerConfig.PRODUCTS_ROOM_STYLE:
          panelInfo.roomStyleName = attribute.values[0].value;
          panelInfo.roomStyle = attribute.values[0].id;
          break;
        case HSApp.PartnerConfig.PRODUCTS_WHOLEHOUSE_AREA:
          const areaValue = attribute.free?.[0];
          if (areaValue !== undefined) {
            const areaDisplay = HSApp.Util.UnitFormater.toAreaDisplayString(
              areaValue,
              this._app.floorplan.displayAreaUnit,
              this._app.floorplan.displayAreaPrecisionDigits,
              true
            );
            panelInfo.area = areaDisplay;
          } else {
            panelInfo.area = undefined;
          }
          break;
        case HSApp.PartnerConfig.PRODUCTS_WHOLEHOUSE_BEDROOM_COUNT:
          const bedroomValue = attribute.values[0].value;
          panelInfo.bedroom = bedroomValue;
          break;
        case HSApp.PartnerConfig.PRODUCTS_WHOLEHOUSE_LIVEINGROOM_COUNT:
          const livingroomValue = attribute.free?.[0];
          panelInfo.livingroom = livingroomValue;
          break;
        case HSApp.PartnerConfig.PRODUCTS_WHOLEHOUSE_BATHROOM_COUNT:
          const bathroomValue = attribute.free?.[0];
          panelInfo.bathroom = bathroomValue;
          break;
      }
    });

    return panelInfo;
  }

  buildContextMenu(panelInfo: PanelInfo, productMeta: ProductMeta): void {
    const userId = adskUser?.uid ?? "";
    
    if (userId && productMeta.isUserUpload) {
      const menuName = ResourceManager.getString("catalog_menu_edit");
      const modifyText = ResourceManager.getString("catalog_menu_modify");
      const deleteText = ResourceManager.getString("catalog_menu_delete");

      panelInfo.contextmenu = {
        name: menuName,
        items: [
          {
            id: "edit",
            name: modifyText,
            icon: i.default.parseURL("modify.svg"),
            onclick: (item: PanelInfo, callback: () => void) => {
              const params: any = {};
              
              if (HSApp.Config.TENANT === "fp") {
                params.templateId = item.id;
              } else {
                params.roomId = item.id;
              }

              NWTK.mtop.Catalog.getMyStylerProductDetail({
                data: params
              }).then((response: any) => {
                const responseData = response.data;
                const designData = {
                  designId: response.data.customizedRoom.designId,
                  roomType: response.data.customizedRoom.roomType
                };
                responseData.free = JSON.stringify(designData);

                const product = HSCatalog.Manager.instance().getProductBySeekIdSync(
                  responseData.id,
                  { data: responseData },
                  HSCatalog.OriginalMetaCreatorType.Local,
                  HSCatalog.MetaCreatorType.LocalParse
                );

                const commandConfig: CommandConfig = {
                  app: this._app,
                  cmdMgr: this._app.cmdManager,
                  editingPanelDomNode: this._editingPanelDomNode,
                  pickImagePanelDomNode: this._pickImagePanelDomNode,
                  catalogPlugin: this._catalogPlugin,
                  signalSendingStylerTemplate: this._signalSendingStylerTemplate,
                  customizedUIArr: this._editingPanelCustomizedUIArr,
                  productMeta: product,
                  callback
                };

                const command = this._app.cmdManager.createCommand(
                  HSFPConstants.CommandType.EditStylerTemplate,
                  [commandConfig]
                );
                this._app.cmdManager.execute(command);
              });
            }
          },
          {
            id: "delete",
            name: deleteText,
            icon: i.default.parseURL("delete.svg"),
            onclick: (item: PanelInfo, callback: () => void) => {
              this._deleteConfirm(item, callback);
            }
          }
        ]
      };
    }
  }

  miniProcess(panelInfo: PanelInfo, productMeta: ProductMeta): void {
    if (
      productMeta.productType !== HSCatalog.ProductTypeEnum.StylerTemplate &&
      productMeta.productType !== HSCatalog.ProductTypeEnum.FullRoom
    ) {
      return;
    }

    this.buildContextMenu(panelInfo, productMeta);

    if (
      productMeta.productType === HSCatalog.ProductTypeEnum.StylerTemplate &&
      i.default.isAutomationTest()
    ) {
      this._meta.push(panelInfo);
    }
  }

  process(panelInfo: PanelInfo, productMeta: ProductMeta): PanelInfo {
    if (
      productMeta.productType !== HSCatalog.ProductTypeEnum.StylerTemplate &&
      productMeta.productType !== HSCatalog.ProductTypeEnum.FullRoom
    ) {
      return panelInfo;
    }

    this.buildContextMenu(panelInfo, productMeta);

    if (productMeta.productType === HSCatalog.ProductTypeEnum.FullRoom) {
      return this.buildWholehousePanelInfo(panelInfo, productMeta);
    } else {
      return this.buildSinglePanelInfo(panelInfo, productMeta);
    }
  }

  meta(): PanelInfo[] {
    return this._meta;
  }

  clearMeta(): void {
    this._meta = [];
  }
}

export default StylerTemplateProcessor;