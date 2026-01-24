import { default as BaseComputer } from './module_42288';
import { getOpeningLine } from './module_53557';
import { isTemplateV3 } from './module_34991';

/**
 * 开口光源计算器
 * 负责为房间的门窗等开口实体计算并生成平面光源配置
 */
export default class OpeningLightComputer extends BaseComputer {
  /**
   * 初始化计算器
   */
  init(): void;

  /**
   * 判断是否对该实体感兴趣（需要计算光源）
   * @param entity - 场景实体
   * @returns 始终返回true，对所有实体感兴趣
   */
  protected _interested(entity: unknown): boolean;

  /**
   * 计算房间开口的光源配置
   * @param scene - 场景对象
   * @param room - 房间实体
   * @param renderSettings - 渲染设置（包含模板键等信息）
   * @param context - 计算上下文（包含已生成的开口光源映射表）
   * @returns 光源配置对象数组
   */
  protected _compute(
    scene: unknown,
    room: RoomEntity,
    renderSettings: RenderSettings,
    context: ComputeContext
  ): FlatLightConfig[];

  /**
   * 验证计算结果是否有效
   * @param result - 计算结果
   * @param entity - 实体对象
   * @param settings - 设置对象
   * @returns 始终返回true
   */
  protected _isValid(result: unknown, entity: unknown, settings: unknown): boolean;
}

/**
 * 房间实体接口
 */
interface RoomEntity {
  /**
   * 判断天花板面是否隐藏
   */
  isCeilingFaceHidden(): boolean;

  /**
   * 获取房间的所有开口实体（门、窗等）
   */
  getRoomOpenings(): OpeningEntity[] | null;
}

/**
 * 开口实体（门、窗、洞口等）
 */
interface OpeningEntity {
  /** X方向长度 */
  XLength: number;
  /** Y方向长度 */
  YLength: number;
  /** Z方向长度 */
  ZLength: number;
  /** X方向缩放 */
  XScale: number;
  /** Y方向缩放 */
  YScale: number;
  /** Z方向缩放 */
  ZScale: number;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;

  /**
   * 检查实体是否设置了指定标志位
   * @param flag - 实体标志枚举值
   */
  isFlagOn(flag: number): boolean;

  /**
   * 获取开口的宿主实体（如窗户所在的墙体）
   */
  getHost?(): WallEntity | null;
}

/**
 * 墙体实体
 */
interface WallEntity {
  /** 墙体包含的内容物（如窗帘等） */
  contents?: Record<string, WallContent>;
}

/**
 * 墙体内容物
 */
interface WallContent {
  /** 内容物类型 */
  contentType: {
    /**
     * 判断是否为指定类型
     * @param type - 内容类型枚举值
     */
    isTypeOf(type: number): boolean;
  };
  /** Y方向尺寸 */
  YSize: number;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
}

/**
 * 渲染设置
 */
interface RenderSettings {
  /** 渲染模板键名（如REALISTIC、GENERAL、NIGHT、CHILLY_3等） */
  templateKey: string;
}

/**
 * 计算上下文
 */
interface ComputeContext {
  /**
   * 开口实体到光源配置的映射表
   * 用于避免重复为同一开口生成光源
   */
  openingLightMap: Map<OpeningEntity, FlatLightConfig>;
}

/**
 * 平面光源配置
 */
interface FlatLightConfig {
  /** 光源类型（平面光） */
  type: number;
  /** 色温（单位：K） */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** 光源中心位置（2D坐标） */
  position: THREE.Vector2;
  /** 光源高度（Z坐标） */
  height: number;
  /** 光源尺寸 */
  size: LightSize;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** 是否为双面平面光（门和洞口为true） */
  double_flat: boolean;
}

/**
 * 光源尺寸
 */
interface LightSize {
  /** 宽度（单位：米） */
  width: number;
  /** 长度（单位：米） */
  length: number;
}