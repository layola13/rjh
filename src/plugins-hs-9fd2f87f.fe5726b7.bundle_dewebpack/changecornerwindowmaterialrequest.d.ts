/**
 * 转角窗材质和参数修改请求模块
 * 提供转角窗相关组件的材质、尺寸、样式等修改功能
 */

import type * as HSCore from 'HSCore';
import type * as HSConstants from 'HSConstants';
import type * as THREE from 'three';

/**
 * 材质数据接口
 */
interface MaterialData {
  seekId?: string;
  rotation: number;
  clone(): MaterialData;
}

/**
 * 材质元数据接口
 */
interface MaterialMeta {
  seekId?: string;
  normalTexture?: string;
  profile?: string;
  profileSizeX?: number;
  profileSizeY?: number;
  thumbnail?: string;
  images?: string[];
  instanceOf?(className: string): boolean;
}

/**
 * 窗框参数接口
 */
interface FrameParameters {
  materialData: MaterialData;
  width: number;
  frameNumber: number;
}

/**
 * 窗口洞参数接口
 */
interface WindowHoleParameters {
  sideMaterialData?: MaterialData;
  topMaterialData?: MaterialData;
  bottomMaterialData?: MaterialData;
  materialData: MaterialData;
}

/**
 * 窗袋参数接口
 */
interface WindowPocketParameters {
  profileData: {
    seekId: string;
    normalTexture: string;
    profile: string;
    profileSizeX: number;
    profileSizeY: number;
    thumbnail: string;
  };
  materialData: MaterialData;
  outerMoldingSizeX: number;
  outerMoldingSizeY: number;
}

/**
 * 墙体/天花参数接口
 */
interface WallCeilingParameters {
  innerMaterialData?: MaterialData;
}

/**
 * 参数化模型基类接口
 */
interface ParametricModel extends HSCore.Model.Entity {
  parameters: any;
  onParametersChanged(): void;
  dirtyMaterial(): void;
  dirtyGeometry(): void;
  getUniqueParent(): CornerWindow;
  instanceOf(className: string): boolean;
}

/**
 * 参数化窗口接口
 */
interface ParametricWindow extends ParametricModel {
  parameters: {
    frame: FrameParameters;
  };
}

/**
 * 参数化窗袋接口
 */
interface ParametricWindowPocket extends ParametricModel {
  parameters: WindowPocketParameters;
  side: string;
  getDefaultSide(): string;
}

/**
 * 参数化窗台接口
 */
interface ParametricWindowSill extends ParametricModel {
  parameters: {
    materialData: MaterialData;
  };
}

/**
 * 转角窗接口
 */
interface CornerWindow extends HSCore.Model.Entity {
  __parameters: {
    showSill: boolean;
    showPocket: boolean;
  };
  x: number;
  y: number;
  z: number;
  ZSize: number;
  buildPartsInfo(): void;
  getWindowHoles(): ParametricModel[];
  getHost(): any;
  instanceOf(className: string): boolean;
}

/**
 * 墙面信息接口
 */
interface WallInfo {
  outerWallSide: string;
  next: any;
}

/**
 * 墙面接口
 */
interface WallFace {
  material: {
    mixpaint?: {
      mixPave?: boolean;
    };
  };
}

/**
 * 转角窗材质修改请求
 * 用于批量修改转角窗相关组件（窗框、墙体、窗洞等）的材质
 */
export declare class ChangeCornerWindowMaterialRequest extends HSCore.Transaction.Request {
  private _parametricmodels: ParametricModel[];
  private _cornerWindow: CornerWindow;
  private _savedMaterialDatas: (MaterialData | null)[];
  private _materialMeta: MaterialMeta;

  /**
   * @param parametricModels - 需要修改材质的参数化模型数组
   * @param materialMeta - 新材质的元数据
   */
  constructor(parametricModels: ParametricModel[], materialMeta: MaterialMeta);

  /** 提交材质修改 */
  onCommit(): void;

  /** 撤销材质修改 */
  onUndo(): void;

  /** 重做材质修改 */
  onRedo(): void;

  /** 执行撤销/重做操作 */
  private _executeUndoRedo(): void;

  /**
   * 修改单个模型的材质
   * @param model - 目标模型
   * @param materialData - 新材质数据
   */
  private _changeMaterial(model: ParametricModel, materialData: MaterialData): void;
}

/**
 * 转角窗窗袋样式修改请求
 * 用于修改窗袋的轮廓样式（profile）
 */
export declare class ChangeCornerWindowPocketStyleRequest extends HSCore.Transaction.Request {
  private _parametricmodels: ParametricModel[];
  private _cornerWindow: CornerWindow;
  private _meta: MaterialMeta;
  private _savedProfileData: Partial<WindowPocketParameters['profileData']>;

  /**
   * @param parametricModels - 需要修改样式的窗袋模型数组
   * @param meta - 新样式的元数据
   */
  constructor(parametricModels: ParametricModel[], meta: MaterialMeta);

  /** 提交样式修改 */
  onCommit(): void;

  /** 撤销样式修改 */
  onUndo(): void;

  /** 重做样式修改 */
  onRedo(): void;

  /** 执行撤销/重做操作 */
  private _executeUndoRedo(): void;

  /**
   * 构造轮廓数据对象
   * @param meta - 源元数据
   * @returns 标准化的轮廓数据
   */
  private _constructProfileData(meta: MaterialMeta): WindowPocketParameters['profileData'];

  /**
   * 修改窗袋样式
   * @param model - 目标窗袋模型
   * @param meta - 新样式元数据
   */
  private _changeStyle(model: ParametricModel, meta: MaterialMeta): void;
}

/**
 * 转角窗材质旋转请求
 * 每次旋转45度
 */
export declare class ChangeCornerWindowMaterialRotation extends HSCore.Transaction.Request {
  private _parametricmodels: ParametricModel[];
  private _cornerWindow: CornerWindow;
  private _savedRotation: number;

  /**
   * @param parametricModels - 需要旋转材质的模型数组
   */
  constructor(parametricModels: ParametricModel[]);

  /** 提交旋转操作 */
  onCommit(): void;

  /** 撤销旋转 */
  onUndo(): void;

  /** 重做旋转 */
  onRedo(): void;

  /** 执行撤销/重做操作 */
  private _executeUndoRedo(): void;

  /**
   * 旋转材质45度
   * @param model - 目标模型
   */
  private _changeRotation(model: ParametricModel): void;
}

/**
 * 显示/隐藏转角窗子组件请求
 * 用于控制窗台（Sill）和窗袋（Pocket）的显示状态
 */
export declare class ShowHideCornerWindowChildRequest extends HSCore.Transaction.Request {
  private _parametricModels: ParametricModel[];
  private _cornerWindow: CornerWindow;
  private _isHide: boolean;
  private _prePocketSide?: string;

  /**
   * @param parametricModels - 需要显示/隐藏的子组件模型数组
   * @param isHide - true表示隐藏，false表示显示
   */
  constructor(parametricModels: ParametricModel[], isHide: boolean);

  /** 提交显示/隐藏操作 */
  onCommit(): void;

  /** 撤销操作 */
  onUndo(): void;

  /** 重做操作 */
  onRedo(): void;

  /** 恢复窗袋的侧面设置 */
  private _recoverPocketSide(): void;

  /**
   * 执行显示/隐藏逻辑
   * @param isHide - 是否隐藏
   */
  private _showHideChild(isHide: boolean): void;
}

/**
 * 窗框数量修改请求
 */
export declare class ChangeWindowFrameNumberRequest extends HSCore.Transaction.Request {
  private _windowFrames: ParametricWindow[];
  private _frameNumber: number;
  private _oldframeNumber?: number;

  /**
   * @param windowFrames - 需要修改的窗框模型数组
   * @param frameNumber - 新的窗框数量
   */
  constructor(windowFrames: ParametricWindow[], frameNumber: number);

  /** 提交修改 */
  onCommit(): void;

  /** 撤销修改 */
  onUndo(): void;

  /** 重做修改 */
  onRedo(): void;

  /**
   * 修改窗框数量
   * @param frameNumber - 新的窗框数量
   */
  private _editWindowFrameNumber(frameNumber: number): void;
}

/**
 * 窗框宽度修改请求
 */
export declare class ChangeWindowFrameWidthRequest extends HSCore.Transaction.Request {
  private _windowFrames: ParametricWindow[];
  private _width: number;
  private _oldWidth: number;

  /**
   * @param windowFrames - 需要修改的窗框模型数组
   * @param width - 新宽度值
   * @param oldWidth - 旧宽度值（用于撤销）
   */
  constructor(windowFrames: ParametricWindow[], width: number, oldWidth: number);

  /** 提交宽度修改 */
  onCommit(): void;

  /** 撤销修改 */
  onUndo(): void;

  /** 重做修改 */
  onRedo(): void;

  /**
   * 修改窗框宽度
   * @param width - 新宽度值
   */
  private _editWindowFrameWidth(width: number): void;
}

/**
 * 窗洞材质同步到宿主墙体请求
 * 用于将窗洞的材质与所在墙体的材质同步
 */
export declare class ChangeMaterialTohostRequest extends HSCore.Transaction.Request {
  private _cornerWindow: CornerWindow;
  private _windowHoles: ParametricModel[];
  private _sameToHost: boolean;
  private _savedMaterialDatas: (MaterialData | null)[];

  /**
   * @param windowHoles - 需要同步材质的窗洞数组
   * @param sameToHost - 是否与宿主墙体材质保持一致
   */
  constructor(windowHoles: ParametricModel[], sameToHost: boolean);

  /** 提交同步操作 */
  onCommit(): void;

  /** 撤销操作 */
  onUndo(): void;

  /** 重做操作 */
  onRedo(): void;

  /**
   * 执行撤销/重做逻辑
   * @param sameToHost - 是否同步到宿主
   */
  private _executeUndoRedo(sameToHost: boolean): void;

  /**
   * 修改单个模型的材质
   * @param model - 目标模型
   * @param sameToHost - 是否同步到宿主
   * @param materialData - 新材质数据
   */
  private _changeMaterial(model: ParametricModel, sameToHost: boolean, materialData: MaterialData): void;

  /**
   * 应用材质同步逻辑
   * @param sameToHost - 是否同步到宿主
   */
  private _changeSameToHost(sameToHost: boolean): void;

  /**
   * 从墙面材质获取材质数据（支持混合贴图）
   * @param wallFace - 墙面对象
   * @param position - 采样位置（3D坐标）
   * @returns 材质数据的Promise
   */
  private _getMaterialDataFromFaceMaterial(wallFace: WallFace, position: THREE.Vector3): Promise<MaterialData>;
}

/**
 * 窗袋宽度修改请求
 */
export declare class ChangeCornerWindowPocketWidthRequest extends HSCore.Transaction.Request {
  private _parametricmodels: ParametricModel[];
  private _cornerWindow: CornerWindow;
  private _width: number;
  private _savedProfileX: number;

  /**
   * @param parametricModels - 需要修改的窗袋模型数组
   * @param width - 新宽度值（profileSizeX）
   */
  constructor(parametricModels: ParametricModel[], width: number);

  /** 提交宽度修改 */
  onCommit(): void;

  /** 撤销修改 */
  onUndo(): void;

  /** 重做修改 */
  onRedo(): void;

  /** 执行撤销/重做操作 */
  private _executeUndoRedo(): void;

  /**
   * 修改窗袋宽度
   * @param model - 目标窗袋模型
   * @param width - 新宽度值
   */
  private _changeWidth(model: ParametricModel, width: number): void;
}

/**
 * 窗袋厚度修改请求
 */
export declare class ChangeCornerWindowPocketThicknessRequest extends HSCore.Transaction.Request {
  private _parametricmodels: ParametricModel[];
  private _cornerWindow: CornerWindow;
  private _thickness: number;
  private _savedProfileY: number;

  /**
   * @param parametricModels - 需要修改的窗袋模型数组
   * @param thickness - 新厚度值（profileSizeY）
   */
  constructor(parametricModels: ParametricModel[], thickness: number);

  /** 提交厚度修改 */
  onCommit(): void;

  /** 撤销修改 */
  onUndo(): void;

  /** 重做修改 */
  onRedo(): void;

  /** 执行撤销/重做操作 */
  private _executeUndoRedo(): void;

  /**
   * 修改窗袋厚度
   * @param model - 目标窗袋模型
   * @param thickness - 新厚度值
   */
  private _changeWidth(model: ParametricModel, thickness: number): void;
}

/**
 * 窗袋外框宽度修改请求
 */
export declare class ChangeCornerWindowPocketOuterWidthRequest extends HSCore.Transaction.Request {
  private _parametricmodels: ParametricModel[];
  private _cornerWindow: CornerWindow;
  private _width: number;
  private _savedProfileX: number;

  /**
   * @param parametricModels - 需要修改的窗袋模型数组
   * @param width - 新外框宽度值（outerMoldingSizeX）
   */
  constructor(parametricModels: ParametricModel[], width: number);

  /** 提交外框宽度修改 */
  onCommit(): void;

  /** 撤销修改 */
  onUndo(): void;

  /** 重做修改 */
  onRedo(): void;

  /** 执行撤销/重做操作 */
  private _executeUndoRedo(): void;

  /**
   * 修改窗袋外框宽度
   * @param model - 目标窗袋模型
   * @param width - 新外框宽度值
   */
  private _changeWidth(model: ParametricModel, width: number): void;
}

/**
 * 窗袋外框厚度修改请求
 */
export declare class ChangeCornerWindowPocketOuterThicknessRequest extends HSCore.Transaction.Request {
  private _parametricmodels: ParametricModel[];
  private _cornerWindow: CornerWindow;
  private _thickness: number;
  private _savedProfileY: number;

  /**
   * @param parametricModels - 需要修改的窗袋模型数组
   * @param thickness - 新外框厚度值（outerMoldingSizeY）
   */
  constructor(parametricModels: ParametricModel[], thickness: number);

  /** 提交外框厚度修改 */
  onCommit(): void;

  /** 撤销修改 */
  onUndo(): void;

  /** 重做修改 */
  onRedo(): void;

  /** 执行撤销/重做操作 */
  private _executeUndoRedo(): void;

  /**
   * 修改窗袋外框厚度
   * @param model - 目标窗袋模型
   * @param thickness - 新外框厚度值
   */
  private _changeWidth(model: ParametricModel, thickness: number): void;
}