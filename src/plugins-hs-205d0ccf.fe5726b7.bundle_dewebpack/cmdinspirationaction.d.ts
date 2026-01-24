/**
 * CmdInspirationAction - 社区灵感库应用命令
 * 用于从灵感库导入模板并应用到指定房间
 */

import { HSApp } from './HSApp';
import { NWTK } from './NWTK';
import { HSFPConstants } from './HSFPConstants';

/**
 * 灵感详情数据结构
 */
interface InspirationDetailData {
  /** 详情数据 */
  data?: TemplateRoomProductData;
  [key: string]: unknown;
}

/**
 * 模板房间产品数据
 */
interface TemplateRoomProductData {
  /** 应用范围 */
  apply?: string;
  [key: string]: unknown;
}

/**
 * 模板房间产品构建结果
 */
interface TemplateRoomProduct {
  /** 应用范围: "all" 表示应用到全部 */
  apply: string;
  [key: string]: unknown;
}

/**
 * 目录插件接口
 */
interface CatalogPlugin {
  /**
   * 获取模板房间产品构建器
   */
  getTemplateRoomProductBuilder(): TemplateRoomProductBuilder;
}

/**
 * 模板房间产品构建器接口
 */
interface TemplateRoomProductBuilder {
  /**
   * 根据数据构建产品对象
   * @param data - 模板数据
   */
  build(data: TemplateRoomProductData): TemplateRoomProduct | null;
}

/**
 * 自动样式插件接口
 */
interface AutostylerPlugin {
  /**
   * 导入样式模板
   * @param template - 模板产品对象
   * @param room - 目标房间
   */
  importStylerTemplate(template: TemplateRoomProduct, room: unknown): void;
}

/**
 * 房间类型（具体结构取决于业务定义）
 */
type Room = unknown;

/**
 * 社区灵感库应用命令
 * 负责从灵感库选择模板并应用到指定房间
 */
export class CmdInspirationAction extends HSApp.Cmd.Command {
  /** 目标房间 */
  private readonly _room: Room;
  
  /** 模板ID或房间ID */
  private readonly _templateId: string;

  /**
   * 构造函数
   * @param room - 目标房间对象
   * @param templateId - 灵感模板ID
   */
  constructor(room: Room, templateId: string) {
    super();
    this._room = room;
    this._templateId = templateId;
  }

  /**
   * 执行命令
   */
  onExecute(): void {
    this._selectRoom(this._room);
  }

  /**
   * 选择房间并应用模板
   * @param room - 目标房间
   */
  private _selectRoom(room: Room): void {
    this._getInspirationDetail()
      .then((response) => {
        if (response?.data) {
          this.mgr.complete(this);
          this._import(response.data, room);
        } else {
          this.mgr.cancel(this);
        }
      })
      .catch(() => {
        this.mgr.cancel(this);
      });
  }

  /**
   * 获取灵感详情数据
   * @returns 灵感详情响应
   */
  private async _getInspirationDetail(): Promise<InspirationDetailData | undefined> {
    if (!this._templateId) {
      return undefined;
    }

    const params: Record<string, string> = {};
    
    // 根据租户类型设置不同的参数
    if (HSApp.Config.TENANT === 'fp') {
      params.templateId = this._templateId;
    } else {
      params.roomId = this._templateId;
    }

    return await NWTK.mtop.Catalog.getMyStylerProductDetail({
      data: params
    });
  }

  /**
   * 导入模板到房间
   * @param data - 模板数据
   * @param room - 目标房间
   */
  private _import(data: TemplateRoomProductData, room: Room): void {
    const catalogPlugin = HSApp.App.getApp()
      .pluginManager
      .getPlugin<CatalogPlugin>(HSFPConstants.PluginType.Catalog);
    
    const templateProduct = catalogPlugin
      ?.getTemplateRoomProductBuilder()
      .build(data);

    if (!templateProduct) {
      return;
    }

    // 设置应用范围为全部
    templateProduct.apply = 'all';

    const autostylerPlugin = HSApp.App.getApp()
      .pluginManager
      .getPlugin<AutostylerPlugin>(HSFPConstants.PluginType.Autostyler);
    
    autostylerPlugin?.importStylerTemplate(templateProduct, room);
  }

  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string {
    return '社区灵感库应用 选择房间';
  }

  /**
   * 获取命令分类
   * @returns 日志分组类型
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.TemplateDesign;
  }
}