import { Vector3 } from '815362';
import { HSApp } from '518193';
import { HSCore } from '635589';
import { Node, MeshComponent, LineBasicMaterial, BoundingBox } from '367441';

/**
 * 切割线脚尺寸标注交互组件
 * 用于在3D视图中显示和编辑线脚（踢脚线/顶角线）的切割尺寸
 */
export declare class CutMoldingDimension extends HSApp.View.Base.Gizmo {
  /**
   * 左侧线性标注
   */
  lineDimLeft: HSApp.View.T3d.LinearDimension | undefined;

  /**
   * 右侧线性标注
   */
  lineDimRight: HSApp.View.T3d.LinearDimension | undefined;

  /**
   * 中间辅助线标注
   */
  lineDimMid: MidLineDimension | undefined;

  /**
   * 起始点坐标（模型空间）
   */
  startPt: Vector3 | undefined;

  /**
   * 结束点坐标（模型空间）
   */
  endPt: Vector3 | undefined;

  /**
   * 用户拾取点坐标
   */
  pickPt: Vector3 | undefined;

  /**
   * 当前激活的标注索引（0或1，用于切换左右标注焦点）
   */
  activeDimIndex: number;

  /**
   * 线性标注数组（包含左右两个标注）
   */
  linearDimensions: HSApp.View.T3d.LinearDimension[];

  /**
   * 关联的内容实体（踢脚线或顶角线）
   */
  content: HSCore.Model.Cornice | HSCore.Model.Baseboard | undefined;

  /**
   * 中间辅助线的起始Z坐标
   */
  midLineStartZ: number | undefined;

  /**
   * @param engine - 3D引擎实例
   * @param workspace - 工作空间
   * @param entity - 要标注的实体对象
   * @param options - 配置选项
   * @param options.startPt - 线脚起始点
   * @param options.endPt - 线脚结束点
   */
  constructor(
    engine: unknown,
    workspace: unknown,
    entity: HSCore.Model.Cornice | HSCore.Model.Baseboard,
    options: {
      startPt: Vector3;
      endPt: Vector3;
    }
  );

  /**
   * 处理标注输入焦点切换（左右标注之间切换）
   */
  handleInputSwitch(): void;

  /**
   * 初始化左右标注和中间辅助线
   * @param engine - 3D引擎实例
   * @param workspace - 工作空间
   * @param entity - 要标注的实体对象
   */
  initDimensions(
    engine: unknown,
    workspace: unknown,
    entity: HSCore.Model.Cornice | HSCore.Model.Baseboard
  ): void;

  /**
   * 计算中间辅助线的起始Z坐标
   * 根据实体类型（顶角线/踢脚线）计算不同的偏移量
   * @returns Z坐标值
   */
  computeMidLineStartZ(): number;

  /**
   * 更新标注显示
   * @param pickPoint - 用户拾取的新位置，若为undefined则隐藏标注
   */
  update(pickPoint?: Vector3): void;

  /**
   * 隐藏所有标注
   */
  hide(): void;

  /**
   * 清理资源，释放信号监听器
   */
  onCleanup(): void;

  /**
   * 创建线段可视化对象
   * @param start - 起点坐标（模型空间）
   * @param end - 终点坐标（模型空间）
   * @returns 线段节点对象
   */
  createLine(start: Vector3, end: Vector3): Node;
}

/**
 * 中间辅助线标注组件
 * 用于显示垂直于切割线的参考线
 */
declare class MidLineDimension extends HSApp.View.T3d.Gizmo {
  /**
   * 辅助线起点（视图空间）
   */
  startPt: Vector3;

  /**
   * 辅助线终点（视图空间）
   */
  endPt: Vector3;

  /**
   * 线段网格对象
   */
  mesh: Node | undefined;

  /**
   * 辅助线长度
   */
  length: number | undefined;

  /**
   * @param engine - 3D引擎实例
   * @param workspace - 工作空间
   * @param entity - 关联的实体对象
   * @param options - 配置选项
   * @param options.length - 辅助线长度
   */
  constructor(
    engine: unknown,
    workspace: unknown,
    entity: HSCore.Model.Cornice | HSCore.Model.Baseboard,
    options: {
      length: number;
    }
  );

  /**
   * 创建线段网格
   * @returns 网格节点对象
   */
  createMesh(): Node;

  /**
   * 更新网格变换（位置）
   */
  updateMesh(): void;

  /**
   * 更新辅助线数据
   * @param data - 更新数据
   * @param data.start - 新的起点坐标（模型空间）
   */
  updateData(data: { start: Vector3 }): void;

  /**
   * 绘制辅助线到场景
   */
  draw(): void;

  /**
   * 隐藏辅助线
   */
  hide(): void;

  /**
   * 清理资源
   */
  onCleanup(): void;
}

export default MidLineDimension;