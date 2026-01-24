/**
 * 样板间模板面板信息构建器
 * 用于处理样板间和全屋模板的面板信息展示、编辑和删除功能
 */

/** 应用程序实例接口 */
interface IApp {
  floorplan: {
    displayAreaUnit: string;
    displayAreaPrecisionDigits: number;
  };
  userTrackLogger: {
    push(event: string, data: unknown): void;
  };
  cmdManager: ICommandManager;
  pluginManager: {
    getPlugin(type: string): ICatalogPlugin;
  };
}

/** 命令管理器接口 */
interface ICommandManager {
  createCommand(type: string, args: unknown[]): ICommand;
  execute(command: ICommand): void;
}

/** 命令接口 */
interface ICommand {}

/** 目录插件接口 */
interface ICatalogPlugin {
  BaseApiManager: {
    dataManager: {
      deleteMyStylerProduct(params: { roomId: string; includeSingleRoom: boolean }): Promise<void>;
    };
  };
}

/** 产品属性值 */
interface IAttributeValue {
  id: string;
  value: string;
}

/** 产品属性 */
interface IAttribute {
  id: string;
  values: IAttributeValue[];
  free?: unknown[];
}

/** 产品元数据 */
interface IProductMeta {
  id: string;
  productType: string;
  isUserUpload?: boolean;
  attributes: IAttribute[];
  userFreeData?: {
    area?: number;
    templateData?: unknown;
  };
}

/** 面板信息基础接口 */
interface IPanelInfoBase {
  id: string;
  area?: string;
  contextmenu?: IContextMenu;
}

/** 单间面板信息 */
interface ISinglePanelInfo extends IPanelInfoBase {
  roomTypeName?: string;
  roomType?: string;
  roomStyleName?: string;
  roomStyle?: string;
  templateData?: unknown;
}

/** 全屋面板信息 */
interface IWholehousePanelInfo extends IPanelInfoBase {
  roomStyleName?: string;
  roomStyle?: string;
  bedroom?: string;
  livingroom?: number;
  bathroom?: number;
}

/** 右键菜单项 */
interface IContextMenuItem {
  id: string;
  name: string;
  icon: string;
  onclick: (item: IPanelInfoBase, callback: () => void) => void;
}

/** 右键菜单 */
interface IContextMenu {
  name: string;
  items: IContextMenuItem[];
}

/** 构造函数参数 */
interface IStylerTemplatePanelInfoBuilderOptions {
  editingPanelDomNode: HTMLElement;
  pickImagePanelDomNode: HTMLElement;
  app: IApp;
  cmdMgr: ICommandManager;
  catalogPlugin: ICatalogPlugin;
  signalSendingStylerTemplate: unknown;
  editingPanelCustomizedUIArr: unknown[];
}

/** 编辑命令参数 */
interface IEditCommandParams {
  app: IApp;
  cmdMgr: ICommandManager;
  editingPanelDomNode: HTMLElement;
  pickImagePanelDomNode: HTMLElement;
  catalogPlugin: ICatalogPlugin;
  signalSendingStylerTemplate: unknown;
  customizedUIArr: unknown[];
  productMeta: unknown;
  callback: () => void;
}

/**
 * 样板间模板面板信息构建器类
 * 负责构建样板间和全屋模板的展示面板信息，包括右键菜单、编辑和删除功能
 */
export default class StylerTemplatePanelInfoBuilder {
  private readonly _editingPanelDomNode: HTMLElement;
  private readonly _pickImagePanelDomNode: HTMLElement;
  private readonly _app: IApp;
  private readonly _cmdMgr: ICommandManager;
  private readonly _catalogPlugin: ICatalogPlugin;
  private readonly _signalSendingStylerTemplate: unknown;
  private readonly _editingPanelCustomizedUIArr: unknown[];
  private _meta: IPanelInfoBase[];

  constructor(options: IStylerTemplatePanelInfoBuilderOptions) {
    this._editingPanelDomNode = options.editingPanelDomNode;
    this._pickImagePanelDomNode = options.pickImagePanelDomNode;
    this._app = options.app;
    this._cmdMgr = options.cmdMgr;
    this._catalogPlugin = options.catalogPlugin;
    this._signalSendingStylerTemplate = options.signalSendingStylerTemplate;
    this._editingPanelCustomizedUIArr = options.editingPanelCustomizedUIArr;
    this._meta = [];
  }

  /**
   * 删除确认对话框
   * @param item - 面板信息项
   * @param callback - 删除成功后的回调函数
   */
  private _deleteConfirm(item: IPanelInfoBase & { isWholeHouse?: boolean }, callback: () => void): void {
    const deleteContent = ResourceManager.getString("catalog_menu_delete_content");
    const cancelText = ResourceManager.getString("catalog_menu_delete_cancel");
    const confirmText = ResourceManager.getString("catalog_menu_delete_confirm");
    const checkboxContent = ResourceManager.getString("catalog_menu_delete_checkbox");
    
    let includeSingleRoom = true;
    
    const messageBox = MessageBox.create(
      "",
      [cancelText, confirmText],
      1,
      {
        title: deleteContent,
        checkboxContent: item.isWholeHouse ? checkboxContent : undefined,
        isChecked: includeSingleRoom
      },
      false,
      false
    );

    // 记录删除提示框日志
    this._app.userTrackLogger.push("delete.TemplateDesign", {
      description: "删除样本间提示框",
      argInfo: { id: item.id },
      group: HSFPConstants.LogGroupTypes.TemplateDesign
    });

    messageBox.show((buttonIndex: number, _arg: unknown, isChecked: boolean) => {
      // 更新复选框状态
      if (buttonIndex === -1) {
        includeSingleRoom = !!isChecked;
      }

      // 确认删除
      if (buttonIndex === 0) {
        HSApp.App.getApp()
          .pluginManager.getPlugin(HSFPConstants.PluginType.Catalog)
          .BaseApiManager.dataManager.deleteMyStylerProduct({
            roomId: item.id,
            includeSingleRoom
          })
          .then(() => {
            setTimeout(() => {
              callback();
            }, 1000);
          });
      }

      // 记录删除操作结果日志
      this._app.userTrackLogger.push("delete.TemplateDesign", {
        description: buttonIndex === 0 ? "删除样本间" : "未删除样本间",
        argInfo: { id: item.id },
        group: HSFPConstants.LogGroupTypes.TemplateDesign
      });
    });
  }

  /**
   * 构建单间面板信息
   * @param panelInfo - 面板信息对象
   * @param productMeta - 产品元数据
   * @returns 填充后的单间面板信息
   */
  buildSinglePanelInfo(panelInfo: ISinglePanelInfo, productMeta: IProductMeta): ISinglePanelInfo {
    const userFreeData = productMeta.userFreeData;
    
    if (userFreeData) {
      const { area, templateData } = userFreeData;
      
      // 处理面积信息
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

      // 设置模板数据
      if (templateData) {
        panelInfo.templateData = templateData;
      }
    }

    // 处理属性信息
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

  /**
   * 构建全屋面板信息
   * @param panelInfo - 面板信息对象
   * @param productMeta - 产品元数据
   * @returns 填充后的全屋面板信息
   */
  buildWholehousePanelInfo(panelInfo: IWholehousePanelInfo, productMeta: IProductMeta): IWholehousePanelInfo {
    productMeta.attributes.forEach((attribute) => {
      switch (attribute.id) {
        case HSApp.PartnerConfig.PRODUCTS_ROOM_STYLE:
          panelInfo.roomStyleName = attribute.values[0].value;
          panelInfo.roomStyle = attribute.values[0].id;
          break;
          
        case HSApp.PartnerConfig.PRODUCTS_WHOLEHOUSE_AREA:
          const area = attribute.free?.[0] as number | undefined;
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
          break;
          
        case HSApp.PartnerConfig.PRODUCTS_WHOLEHOUSE_BEDROOM_COUNT:
          panelInfo.bedroom = attribute.values[0].value;
          break;
          
        case HSApp.PartnerConfig.PRODUCTS_WHOLEHOUSE_LIVEINGROOM_COUNT:
          panelInfo.livingroom = attribute.free?.[0] as number;
          break;
          
        case HSApp.PartnerConfig.PRODUCTS_WHOLEHOUSE_BATHROOM_COUNT:
          panelInfo.bathroom = attribute.free?.[0] as number;
          break;
      }
    });

    return panelInfo;
  }

  /**
   * 构建右键菜单
   * @param panelInfo - 面板信息对象
   * @param productMeta - 产品元数据
   */
  buildContextMenu(panelInfo: IPanelInfoBase, productMeta: IProductMeta): void {
    const currentUserId = adskUser?.uid ?? "";
    
    // 只有用户上传的模板才显示右键菜单
    if (currentUserId && productMeta.isUserUpload) {
      const menuTitle = ResourceManager.getString("catalog_menu_edit");
      const modifyText = ResourceManager.getString("catalog_menu_modify");
      const deleteText = ResourceManager.getString("catalog_menu_delete");

      panelInfo.contextmenu = {
        name: menuTitle,
        items: [
          {
            id: "edit",
            name: modifyText,
            icon: i.default.parseURL("modify.svg"),
            onclick: (item: IPanelInfoBase, callback: () => void) => {
              const requestParams: Record<string, string> = {};
              
              // 根据租户类型设置不同的参数
              if (HSApp.Config.TENANT === "fp") {
                requestParams.templateId = item.id;
              } else {
                requestParams.roomId = item.id;
              }

              // 获取样板间详情
              NWTK.mtop.Catalog.getMyStylerProductDetail({ data: requestParams }).then((response) => {
                const detailData = response.data;
                
                // 构建自由数据
                const freeData = {
                  designId: detailData.customizedRoom.designId,
                  roomType: detailData.customizedRoom.roomType
                };
                detailData.free = JSON.stringify(freeData);

                // 获取产品元数据
                const productMeta = HSCatalog.Manager.instance().getProductBySeekIdSync(
                  detailData.id,
                  { data: detailData },
                  HSCatalog.OriginalMetaCreatorType.Local,
                  HSCatalog.MetaCreatorType.LocalParse
                );

                // 创建编辑命令参数
                const editParams: IEditCommandParams = {
                  app: this._app,
                  cmdMgr: this._app.cmdManager,
                  editingPanelDomNode: this._editingPanelDomNode,
                  pickImagePanelDomNode: this._pickImagePanelDomNode,
                  catalogPlugin: this._catalogPlugin,
                  signalSendingStylerTemplate: this._signalSendingStylerTemplate,
                  customizedUIArr: this._editingPanelCustomizedUIArr,
                  productMeta,
                  callback
                };

                // 执行编辑命令
                const editCommand = this._app.cmdManager.createCommand(
                  HSFPConstants.CommandType.EditStylerTemplate,
                  [editParams]
                );
                this._app.cmdManager.execute(editCommand);
              });
            }
          },
          {
            id: "delete",
            name: deleteText,
            icon: i.default.parseURL("delete.svg"),
            onclick: (item: IPanelInfoBase, callback: () => void) => {
              this._deleteConfirm(item, callback);
            }
          }
        ]
      };
    }
  }

  /**
   * 最小化处理（仅构建右键菜单，用于列表展示）
   * @param panelInfo - 面板信息对象
   * @param productMeta - 产品元数据
   */
  miniProcess(panelInfo: IPanelInfoBase, productMeta: IProductMeta): void {
    const isStylerOrFullRoom = 
      productMeta.productType === HSCatalog.ProductTypeEnum.StylerTemplate ||
      productMeta.productType === HSCatalog.ProductTypeEnum.FullRoom;

    if (!isStylerOrFullRoom) {
      return;
    }

    this.buildContextMenu(panelInfo, productMeta);

    // 自动化测试时收集元数据
    if (
      productMeta.productType === HSCatalog.ProductTypeEnum.StylerTemplate &&
      i.default.isAutomationTest()
    ) {
      this._meta.push(panelInfo);
    }
  }

  /**
   * 完整处理（构建所有面板信息）
   * @param panelInfo - 面板信息对象
   * @param productMeta - 产品元数据
   * @returns 处理后的面板信息
   */
  process(
    panelInfo: ISinglePanelInfo | IWholehousePanelInfo,
    productMeta: IProductMeta
  ): ISinglePanelInfo | IWholehousePanelInfo {
    const isStylerOrFullRoom = 
      productMeta.productType === HSCatalog.ProductTypeEnum.StylerTemplate ||
      productMeta.productType === HSCatalog.ProductTypeEnum.FullRoom;

    if (!isStylerOrFullRoom) {
      return panelInfo;
    }

    this.buildContextMenu(panelInfo, productMeta);

    if (productMeta.productType === HSCatalog.ProductTypeEnum.FullRoom) {
      return this.buildWholehousePanelInfo(panelInfo as IWholehousePanelInfo, productMeta);
    } else {
      return this.buildSinglePanelInfo(panelInfo as ISinglePanelInfo, productMeta);
    }
  }

  /**
   * 获取收集的元数据（用于自动化测试）
   * @returns 元数据数组
   */
  meta(): IPanelInfoBase[] {
    return this._meta;
  }

  /**
   * 清空收集的元数据
   */
  clearMeta(): void {
    this._meta = [];
  }
}