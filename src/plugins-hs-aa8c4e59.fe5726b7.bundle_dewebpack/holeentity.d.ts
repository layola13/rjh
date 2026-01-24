import { OpeningEntity } from './OpeningEntity';
import { Parameter, DataType } from './Parameter';
import { FaceEntity } from './FaceEntity';
import { HSCore } from './HSCore';
import { Utils } from './Utils';

/**
 * 圆弧孔洞数据结构
 * @description 描述带有圆弧轮廓的孔洞几何信息
 */
interface ArcHoleData {
  /** 圆弧长度 */
  arcLength: number;
  /** 圆弧摆动高度/矢高 */
  swing: number;
  /** 基础宽度 */
  baseWidth: number;
  /** 基础高度 */
  baseHeight: number;
  /** 总面积 */
  area: number;
}

/**
 * 二维坐标点
 */
interface Point2D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 孔洞实体类
 * @description 表示墙体孔洞(门窗洞口)或楼板孔洞的实体对象
 * @extends OpeningEntity
 */
export declare class HoleEntity extends OpeningEntity {
  /** 所属房间ID */
  roomId: string;

  /**
   * 构造函数
   * @param roomId - 房间唯一标识符
   */
  constructor(roomId: string);

  /**
   * 获取实例数据
   * @description 根据内容对象类型(墙洞/板洞)提取相关参数
   * @param content - 内容对象,可以是墙体开口或楼板开口
   * @returns 包含实例参数的数据对象
   */
  getInstanceData(content: unknown): unknown;

  /**
   * 构建子实体
   * @description 为墙洞或板洞创建面实体(FaceEntity)子节点
   * @param content - 内容对象
   */
  buildChildren(content: unknown): void;

  /**
   * 构建圆弧孔洞数据
   * @description 计算带有圆弧轮廓的孔洞几何参数(弧长、矢高、面积等)
   * @param content - 包含圆弧轮廓点的内容对象
   * @returns 圆弧孔洞的几何数据
   */
  buildArcHoleData(content: {
    baseProfile: { points: Point2D[] };
    XScale: number;
    ZScale: number;
  }): ArcHoleData;
}