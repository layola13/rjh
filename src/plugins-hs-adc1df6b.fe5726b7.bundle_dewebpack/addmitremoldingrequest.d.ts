import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 产品元数据接口
 * 描述斜角线条的配置信息
 */
interface ProductMeta {
  /** 线条轮廓配置 */
  profile: unknown;
  /** 材质信息（可选） */
  material?: unknown;
  /** 其他线条属性 */
  [key: string]: unknown;
}

/**
 * 添加斜角线条请求
 * 用于在场景中添加斜角（Mitre）类型的装饰线条
 * 继承自状态请求基类，支持事务操作
 */
export class AddMitreMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  /** 产品元数据，包含线条的轮廓和材质等配置 */
  productMeta: ProductMeta;

  /** 关联的面ID数组，至少需要2个面才能形成斜角线条 */
  faceIds: string[];

  /** 线条类型，固定为斜角类型 */
  moldingType: HSCore.Model.MoldingTypeEnum.Mitre;

  /**
   * 构造函数
   * @param productMeta 产品元数据，包含线条配置
   * @param faceIds 关联的面ID数组
   */
  constructor(productMeta: ProductMeta, faceIds: string[]) {
    super();
    this.moldingType = HSCore.Model.MoldingTypeEnum.Mitre;
    this.productMeta = productMeta;
    this.faceIds = faceIds;
  }

  /**
   * 添加线条到场景
   * 1. 验证至少有2个面和产品元数据
   * 2. 查找并移除现有的相关线条
   * 3. 创建新的斜角线条并初始化
   * 4. 选中新创建的线条
   */
  addMolding(): void {
    // 验证至少有2个面ID且存在产品元数据
    if ((this.faceIds?.length ?? 0) < 2 || !this.productMeta) {
      return;
    }

    const app = HSApp.App.getApp();
    const activeLayer = app.floorplan.scene.activeLayer;

    // 查找是否已存在关联相同面的斜角线条
    const existingMolding = Object.values(activeLayer.children).find((child): child is HSCore.Model.Mitre => {
      return child instanceof HSCore.Model.Mitre && this.relatedFaces(child);
    });

    // 移除旧的线条（如果存在）
    if (existingMolding) {
      HSCore.Util.Content.removeContent(existingMolding);
    }

    // 创建新的斜角线条
    const newMolding = HSCore.Util.Molding.createFromType(this.moldingType) as HSCore.Model.Mitre;
    newMolding.initByMeta(this.productMeta.profile);

    // 设置材质（如果存在）
    if (this.productMeta.material) {
      newMolding.material = HSCore.Material.Material.create(this.productMeta.material);
    }

    // 复制其他属性
    HSCore.Util.Molding.copyMoldingAttribute(newMolding, this.productMeta);

    // 设置关联的面ID
    newMolding.relatedFaceIds = [...this.faceIds];

    // 添加到图层并更新几何体
    activeLayer.addChild(newMolding);
    newMolding.dirtyGeometry();

    // 选中新创建的线条
    const selectionManager = app.selectionManager;
    selectionManager.unselectAll();
    selectionManager.select(newMolding, undefined);
  }

  /**
   * 检查给定的线条是否关联了相同的面
   * @param molding 要检查的斜角线条对象
   * @returns 如果所有面ID都匹配则返回true
   */
  relatedFaces(molding: HSCore.Model.Mitre): boolean {
    return this.faceIds.every((faceId) => molding.relatedFaceIds.includes(faceId));
  }

  /**
   * 提交事务时执行
   * 调用addMolding方法创建线条
   */
  onCommit(): void {
    this.addMolding();
    super.onCommit([]);
  }

  /**
   * 撤销事务时执行
   */
  onUndo(): void {
    super.onUndo([]);
  }

  /**
   * 重做事务时执行
   */
  onRedo(): void {
    super.onRedo([]);
  }

  /**
   * 是否可以对字段进行事务处理
   * @returns 始终返回true
   */
  canTransactField(): boolean {
    return true;
  }

  /**
   * 获取操作描述
   * @returns 操作的中文描述
   */
  getDescription(): string {
    return '添加阳角线';
  }

  /**
   * 获取操作分类
   * @returns 操作所属的日志分组类型
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}