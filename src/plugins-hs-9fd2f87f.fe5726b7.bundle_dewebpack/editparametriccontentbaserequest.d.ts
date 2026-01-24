import { HSCore } from './HSCore';
import { MaterialApi, PavingOptionApi } from './MaterialApi';
import { EN_PROPERTY_PANEL_CONTENT_TYPE, EN_PROPERTY_PANEL_WIN_SUB_PART_TYPE } from './PropertyPanelTypes';

/**
 * 参数变化事件数据
 */
interface ParamChangeEvent {
  /** 元素ID */
  eId?: string;
  /** 节点对象 */
  node?: PropertyTreeNode;
  /** 新值 */
  newValue: any;
  /** 面标签列表 */
  faceTags?: FaceTagInfo[];
  /** 是否锁定比例 */
  lockRatio?: boolean;
}

/**
 * 属性树节点
 */
interface PropertyTreeNode {
  /** 元素ID */
  eId: string;
  /** 节点名称 */
  name: string;
  /** 节点类型 */
  type?: string;
  /** 子节点列表 */
  children?: PropertyTreeNode[];
  /** 右侧标题点击回调 */
  onRightTitleClick?: (node: PropertyTreeNode) => void;
  /** 输入变化回调 */
  onEnter?: (node: PropertyTreeNode, value: any) => void;
}

/**
 * 面标签信息
 */
interface FaceTagInfo {
  /** 面标签 */
  faceTag: string;
  /** 实体对象 */
  entity: any;
  /** 是否支持绘制材质 */
  isFaceSupportPaintMaterial: boolean;
}

/**
 * 材质缩放参数
 */
interface MaterialScaleParams {
  /** X轴缩放比例 */
  scaleX?: number;
  /** Y轴缩放比例 */
  scaleY?: number;
  /** 是否锁定宽高比 */
  lockRatio?: boolean;
}

/**
 * 材质铺贴选项参数
 */
interface MaterialPavingParams {
  /** 旋转角度 */
  rotation?: number;
  /** 水平偏移 */
  sliderOffsetX?: number;
  /** 垂直偏移 */
  sliderOffsetY?: number;
}

/**
 * 接收消息数据结构
 */
interface ReceiveMessage {
  /** 消息类型 */
  msg: string;
  /** 参数 */
  param: ParamChangeEvent;
}

/**
 * 编辑参数化内容基础请求类
 * 负责处理参数化模型（窗帘、浴室柜等）的编辑操作
 */
export class EditParametricContentBaseRequest extends HSCore.Transaction.Common.StateRequest {
  /** 参数化内容对象 */
  private _content: HSCore.Model.ParametricContent;

  /**
   * 构造函数
   * @param content 参数化内容对象
   */
  constructor(content: HSCore.Model.ParametricContent) {
    super();
    this._content = content;
  }

  /**
   * 接收并处理各类编辑事件
   * @param eventType 事件类型
   * @param eventData 事件数据
   */
  onReceive(eventType: string, eventData: ParamChangeEvent): void {
    switch (eventType) {
      case "onValueChange":
      case "onValueChangeEnd":
        if (eventData.node) {
          this.onParamsChangedCallback(eventData.node, eventData.newValue);
        } else {
          const node = this._getNodeById(eventData.eId);
          if (!node) return;
          this.onParamsChangedCallback(node, eventData.newValue);
        }
        break;

      case "onElevationValueChange":
      case "onElevationValueChangeEnd":
        this._content.z = eventData.newValue;
        break;

      case "onRedAxisValueChange":
      case "onRedAxisValueChangeEnd":
        this._content.XRotation = eventData.newValue;
        break;

      case "onBlueAxisValueChange":
      case "onBlueAxisValueChangeEnd":
        this._content.ZRotation = eventData.newValue;
        break;

      case "onGreenAxisValueChange":
      case "onGreenAxisValueChangeEnd":
        this._content.YRotation = eventData.newValue;
        break;

      case "onReset":
        if (eventData.faceTags?.length > 0) {
          this._resetMaterial(eventData.faceTags);
        }
        if (eventData.node.onRightTitleClick) {
          eventData.node.onRightTitleClick(eventData.node);
        } else {
          const resetNode = this._getNodeById(eventData.node.eId);
          if (!resetNode?.onRightTitleClick) return;
          resetNode.onRightTitleClick(resetNode);
        }
        break;

      case "onBasicPropertyReset":
        const originSize = this._content.getOriginSize();
        this._content.initParametricContentDocument(originSize);
        const host = this._content.host instanceof HSCore.Model.Face
          ? this._content.host.getMaster?.() || this._content.host
          : this._content.host;

        if (host instanceof HSCore.Model.Wall) {
          const decorator = new HSCore.Model.ParametricModelDecorator(this._content);
          const moveVec = decorator.getMinMoveVecToWall(host);
          this._content.x += moveVec.x;
          this._content.y += moveVec.y;
        }
        break;

      case "onBoolInputDataChange":
        eventData.node.onEnter?.(eventData.node, eventData.newValue);
        break;

      case "onMaterialRotateChange":
        this._setMaterialPavingOption(eventData.faceTags, { rotation: eventData.newValue });
        break;

      case "onMaterialHorizontalOffsetChange":
        this._setMaterialPavingOption(eventData.faceTags, { sliderOffsetX: eventData.newValue });
        break;

      case "onMaterialVerticalOffsetChange":
        this._setMaterialPavingOption(eventData.faceTags, { sliderOffsetY: eventData.newValue });
        break;

      case "onMaterialScaleXChange":
        this._setMaterialScale(eventData.faceTags, {
          scaleX: eventData.newValue,
          lockRatio: eventData.lockRatio
        });
        break;

      case "onMaterialScaleYChange":
        this._setMaterialScale(eventData.faceTags, {
          scaleY: eventData.newValue,
          lockRatio: eventData.lockRatio
        });
        break;

      case "onMaterialPositionReset":
        if (eventData.faceTags?.length > 0) {
          this._resetMaterialPosition(eventData.faceTags);
        }
        break;

      case "onMaterialScaleReset":
        if (eventData.faceTags?.length > 0) {
          this._resetMaterialScale(eventData.faceTags);
        }
        break;
    }

    super.onReceive(eventType, eventData);
  }

  /**
   * 参数变化回调
   * @param node 属性节点
   * @param value 新值
   */
  onParamsChangedCallback(node: PropertyTreeNode, value: any): void {
    const params: Record<string, any> = {};
    params[node.name] = value;
    HSCore.Util.NCustomizedParametricModel.onParamsChangedCallback(
      this._content.seekId,
      this._content.id,
      params
    );
  }

  /**
   * 设置材质缩放
   * @param faceTags 面标签列表
   * @param scaleParams 缩放参数
   */
  private _setMaterialScale(faceTags: FaceTagInfo[], scaleParams: MaterialScaleParams): void {
    for (const faceTag of faceTags) {
      if (faceTag.isFaceSupportPaintMaterial) {
        const material = faceTag.entity.facematerialmap.get(faceTag.faceTag)?.material;
        if (material) {
          const clonedMaterial = material.clone();
          if (clonedMaterial instanceof HSCore.Material.Material && clonedMaterial.mixpaint) {
            const region = clonedMaterial.mixpaint.mixPave.getUniqueRegion();
            MaterialApi.editScale(region.pattern.patternUnits[0].materials[0], scaleParams);
            region.dirtyMaterial();
          }
          faceTag.entity.setFaceMaterialByTag(faceTag.faceTag, clonedMaterial);
        }
      } else {
        const defaultMaterial = faceTag.entity.defaultmaterialmap.get(faceTag.faceTag)?.material;
        if (defaultMaterial) {
          const clonedMaterial = defaultMaterial.clone();
          if (clonedMaterial instanceof HSCore.Material.MaterialData) {
            const paveMaterial = new HSPaveSDK.Material().setFrom({
              scaleX: clonedMaterial.tileSize_x / clonedMaterial.initTileSize_x,
              scaleY: clonedMaterial.tileSize_y / clonedMaterial.initTileSize_y
            });

            if (scaleParams.scaleX) {
              HSPaveSDK.MaterialApi.editScale(paveMaterial, {
                lockRatio: scaleParams.lockRatio,
                scaleX: scaleParams.scaleX
              });
            } else if (scaleParams.scaleY) {
              HSPaveSDK.MaterialApi.editScale(paveMaterial, {
                lockRatio: scaleParams.lockRatio,
                scaleY: scaleParams.scaleY
              });
            }

            clonedMaterial.tileSize_x = clonedMaterial.initTileSize_x * paveMaterial.scaleX;
            clonedMaterial.tileSize_y = clonedMaterial.initTileSize_y * paveMaterial.scaleY;
          }
          faceTag.entity.setMaterialData(faceTag.faceTag, clonedMaterial);
        }
      }
    }

    this._content.dirtyGeometry();
    this._content.dirtyChildModels(true, true);
  }

  /**
   * 设置材质铺贴选项
   * @param faceTags 面标签列表
   * @param pavingParams 铺贴参数
   */
  private _setMaterialPavingOption(faceTags: FaceTagInfo[], pavingParams: MaterialPavingParams): void {
    const pavingApi = new PavingOptionApi();

    for (const faceTag of faceTags) {
      if (faceTag.isFaceSupportPaintMaterial) {
        const material = faceTag.entity.facematerialmap.get(faceTag.faceTag)?.material;
        if (material) {
          const clonedMaterial = material.clone();
          if (clonedMaterial?.mixpaint) {
            const region = clonedMaterial.mixpaint.mixPave.getUniqueRegion();
            pavingApi.setPavingOptionParams(region, pavingParams);
          }
          faceTag.entity.setFaceMaterialByTag(faceTag.faceTag, clonedMaterial);
        }
      } else {
        const defaultMaterial = faceTag.entity.defaultmaterialmap.get(faceTag.faceTag)?.material;
        if (defaultMaterial) {
          const clonedMaterial = defaultMaterial.clone();
          if (clonedMaterial instanceof HSCore.Material.MaterialData) {
            if (pavingParams.rotation !== undefined) {
              clonedMaterial.rotation = pavingParams.rotation;
            } else if (pavingParams.sliderOffsetX !== undefined) {
              clonedMaterial.offsetX = -pavingParams.sliderOffsetX;
            } else if (pavingParams.sliderOffsetY !== undefined) {
              clonedMaterial.offsetY = pavingParams.sliderOffsetY;
            }
          }
          faceTag.entity.setMaterialData(faceTag.faceTag, clonedMaterial);
        }
      }
    }

    this._content.dirtyGeometry();
    this._content.dirtyChildModels(true, true);
  }

  /**
   * 撤销操作
   */
  onUndo(): void {
    super.onUndo();
    this._contentUpdate();
  }

  /**
   * 重做操作
   */
  onRedo(): void {
    super.onRedo();
    this._contentUpdate();
  }

  /**
   * 更新内容
   */
  private _contentUpdate(): void {
    this._content.constructBrep();
    this._content.dirtyChildModels(true);
  }

  /**
   * 是否可以事务化字段
   */
  canTransactField(): boolean {
    return true;
  }

  /**
   * 根据ID获取节点
   * @param elementId 元素ID
   * @returns 属性树节点
   */
  private _getNodeById(elementId: string): PropertyTreeNode | undefined {
    let foundNode: PropertyTreeNode | undefined;

    const searchNode = (nodes: PropertyTreeNode[]): void => {
      for (const node of nodes) {
        if (foundNode) return;
        if (node.eId === elementId) {
          foundNode = node;
          return;
        }
        if (node.children?.length > 0) {
          searchNode(node.children);
        }
      }
    };

    const propertyTree = this._content.parameters.propertytree;
    searchNode(propertyTree?.children ?? []);
    return foundNode;
  }

  /**
   * 重置材质（位置和缩放）
   * @param faceTags 面标签列表
   */
  private _resetMaterial(faceTags: FaceTagInfo[]): void {
    this._resetMaterialPosition(faceTags);
    this._resetMaterialScale(faceTags);
  }

  /**
   * 重置材质位置
   * @param faceTags 面标签列表
   */
  private _resetMaterialPosition(faceTags: FaceTagInfo[]): void {
    const pavingApi = new PavingOptionApi();
    const defaultParams: MaterialPavingParams = {
      rotation: 0,
      sliderOffsetX: 0,
      sliderOffsetY: 0
    };

    for (const faceTag of faceTags) {
      if (faceTag.isFaceSupportPaintMaterial) {
        const material = faceTag.entity.facematerialmap.get(faceTag.faceTag)?.material;
        if (material) {
          const clonedMaterial = material.clone();
          if (clonedMaterial?.mixpaint) {
            const region = clonedMaterial.mixpaint.mixPave.getUniqueRegion();
            pavingApi.setPavingOptionParams(region, defaultParams);
          }
          faceTag.entity.setFaceMaterialByTag(faceTag.faceTag, clonedMaterial);
        }
      } else {
        const defaultMaterial = faceTag.entity.defaultmaterialmap.get(faceTag.faceTag)?.material;
        if (defaultMaterial) {
          const clonedMaterial = defaultMaterial.clone();
          if (clonedMaterial instanceof HSCore.Material.MaterialData) {
            clonedMaterial.rotation = 0;
            clonedMaterial.offsetX = 0;
            clonedMaterial.offsetY = 0;
          }
          faceTag.entity.setMaterialData(faceTag.faceTag, clonedMaterial);
        }
      }
    }

    this._content.dirtyGeometry();
    this._content.dirtyChildModels(true);
  }

  /**
   * 重置材质缩放
   * @param faceTags 面标签列表
   */
  private _resetMaterialScale(faceTags: FaceTagInfo[]): void {
    const defaultScale: MaterialScaleParams = {
      scaleX: 1,
      scaleY: 1
    };

    for (const faceTag of faceTags) {
      if (faceTag.isFaceSupportPaintMaterial) {
        const material = faceTag.entity.facematerialmap.get(faceTag.faceTag)?.material;
        if (material) {
          const clonedMaterial = material.clone();
          if (clonedMaterial?.mixpaint) {
            const region = clonedMaterial.mixpaint.mixPave.getUniqueRegion();
            MaterialApi.editScale(region.pattern.patternUnits[0].materials[0], defaultScale);
            region.dirtyMaterial();
          }
          faceTag.entity.setFaceMaterialByTag(faceTag.faceTag, clonedMaterial);
        }
      } else {
        const defaultMaterial = faceTag.entity.defaultmaterialmap.get(faceTag.faceTag)?.material;
        if (defaultMaterial) {
          const clonedMaterial = defaultMaterial.clone();
          if (clonedMaterial instanceof HSCore.Material.MaterialData) {
            const paveMaterial = new HSPaveSDK.Material().setFrom({
              scaleX: clonedMaterial.tileSize_x / clonedMaterial.initTileSize_x,
              scaleY: clonedMaterial.tileSize_y / clonedMaterial.initTileSize_y
            });

            HSPaveSDK.MaterialApi.editScale(paveMaterial, {
              lockRatio: false,
              scaleX: defaultScale.scaleX,
              scaleY: defaultScale.scaleY
            });

            clonedMaterial.tileSize_x = clonedMaterial.initTileSize_x * paveMaterial.scaleX;
            clonedMaterial.tileSize_y = clonedMaterial.initTileSize_y * paveMaterial.scaleY;
          }
          faceTag.entity.setMaterialData(faceTag.faceTag, clonedMaterial);
        }
      }
    }

    this._content.dirtyGeometry();
    this._content.dirtyChildModels(true);
  }

  /**
   * 获取日志分类
   */
  getCategory(): string {
    if (this._content instanceof HSCore.Model.ParametricCurtain) {
      return HSFPConstants.LogGroupTypes.ParametricCurtain;
    } else if (this._content instanceof HSCore.Model.ParametricBathroomCabinet) {
      return HSFPConstants.LogGroupTypes.ParametricBathroomCabinet;
    }
    return HSFPConstants.LogGroupTypes.ParametricContentBase;
  }

  /**
   * 获取操作描述
   */
  getDescription(): string {
    if (this._content instanceof HSCore.Model.ParametricCurtain) {
      return "编辑参数化窗帘";
    } else if (this._content instanceof HSCore.Model.ParametricBathroomCabinet) {
      return "编辑参数化浴室柜";
    }
    return "编辑参数化软装";
  }

  /**
   * 异步解析接收消息
   * @param messages 消息数组
   */
  static async parseReceiveMsgsAsync(messages: string[]): Promise<void> {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return;
    }

    const messageData: ReceiveMessage = JSON.parse(messages[0]);
    const { msg, param } = messageData;

    if (msg === "onValueChange") {
      const nodeType = param.node.type;
      if (nodeType === "MATERIIAL" || nodeType === EN_PROPERTY_PANEL_CONTENT_TYPE) {
        await HSApp.App.getApp().catalogManager.getProductBySeekId(param.newValue);
      } else if (nodeType === EN_PROPERTY_PANEL_WIN_SUB_PART_TYPE) {
        await HSApp.Util.NCustomizedFeatureModel.loadMetaRecursively(param.newValue);
      }
    }
  }
}