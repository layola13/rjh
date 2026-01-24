/**
 * 参数化开口编辑命令
 * 用于处理参数化开口的属性栏交互操作，包括分割面切换和面材质切换
 */

import { HSApp } from './518193';
import { HSCore } from './635589';
import { ParametricopeingRequestType } from './88182';
import { IPropertybarEditParametricopeingHoldAction } from './900079';

/**
 * 参数化开口的属性栏操作枚举
 */
export enum PropertybarEditAction {
  /** 分割面开关 */
  SplitFaceSwitch = 'SplitFaceSwitch',
  /** A面材质开关 */
  AFaceMaterialSwitch = 'AFaceMaterialSwitch',
  /** B面材质开关 */
  BFaceMaterialSwitch = 'BFaceMaterialSwitch'
}

/**
 * 属性值接口
 */
interface PropertyValue {
  /** 属性值 */
  value: boolean;
}

/**
 * 参数化开口编辑命令类
 * 继承自HSApp命令基类，处理参数化开口的编辑操作
 */
export default class EditParametricOpeningCommand extends HSApp.Cmd.Command {
  /** 参数化开口实例 */
  private readonly _parametricOpening: HSCore.Model.ParametricOpening;
  
  /** 应用实例 */
  private readonly _app: HSApp.App;

  /**
   * 构造函数
   * @param parametricOpening - 要编辑的参数化开口对象
   */
  constructor(parametricOpening: HSCore.Model.ParametricOpening) {
    super();
    this._parametricOpening = parametricOpening;
    this._app = HSApp.App.getApp();
  }

  /**
   * 清除面材质
   * @param faces - 需要清除材质的面列表
   */
  private _clearFaceMaterial(faces: HSCore.Model.Face[]): void {
    const messageType = HSApp.PaintPluginHelper.Enum.PaintCmdMessageEnum.clearMaterial;
    
    faces.forEach((face) => {
      const faceType = HSCore.Util.Face.getFaceType(face);
      const request = this._app.transManager.createRequest(
        HSFPConstants.RequestType.EditMaterial,
        [face, faceType, { msg: messageType }]
      );
      this._app.transManager.commit(request);
    });
  }

  /**
   * 执行命令
   */
  onExecute(): void {
    // 命令执行入口
  }

  /**
   * 接收属性栏操作
   * @param action - 操作类型
   * @param propertyValue - 属性值
   * @returns 是否成功处理
   */
  onReceive(
    action: IPropertybarEditParametricopeingHoldAction,
    propertyValue: PropertyValue
  ): boolean {
    const session = this._app.transManager.startSession();
    
    const editRequest = this._app.transManager.createRequest(
      ParametricopeingRequestType.EditParametricOpeningHoleRequest,
      [this._parametricOpening]
    );
    editRequest.receive(action, propertyValue);

    // 处理分割面开关
    if (action === IPropertybarEditParametricopeingHoldAction.SplitFaceSwitch) {
      if (propertyValue.value) {
        // 开启分割面
        this._app.transManager.commit(editRequest);
        const splitRequest = this._app.transManager.createRequest(
          HSFPConstants.RequestType.SplitParamOpening,
          [this._parametricOpening]
        );
        this._app.transManager.commit(splitRequest);
      } else {
        // 关闭分割面，清除材质
        const splitFaces = this._parametricOpening.splitFaceList;
        this._clearFaceMaterial(splitFaces);
        this._app.transManager.commit(editRequest);
      }
    }
    // 处理A面材质开关
    else if (action === IPropertybarEditParametricopeingHoldAction.AFaceMaterialSwitch) {
      this._app.transManager.commit(editRequest);
      if (!propertyValue.value) {
        const decorator = new HSCore.Model.ParametricOpeningDecorator(this._parametricOpening);
        const aFaces = decorator.getSplitABFacePairs().aFaces;
        this._clearFaceMaterial(aFaces);
      }
    }
    // 处理B面材质开关
    else if (action === IPropertybarEditParametricopeingHoldAction.BFaceMaterialSwitch) {
      this._app.transManager.commit(editRequest);
      if (!propertyValue.value) {
        const decorator = new HSCore.Model.ParametricOpeningDecorator(this._parametricOpening);
        const bFaces = decorator.getSplitABFacePairs().bFaces;
        this._clearFaceMaterial(bFaces);
      }
    }

    session.commit();
    this._app.cmdManager.complete(this);
    
    // 调用父类onReceive方法
    return super.onReceive?.(action, propertyValue) ?? true;
  }
}