/**
 * 圆顶灯光选项配置类
 * 用于管理场景中圆顶光源的亮度、反射、色调等参数
 */
export declare class DomeLightOption {
  /**
   * 色温映射表
   * 索引对应不同的预设色温值（单位：开尔文K）
   */
  static readonly TemperatureMap: readonly [6500, 3800, 5300, 6500, 8700, 11400];

  /**
   * 亮度值
   * @default 1
   */
  brightness: number;

  /**
   * 反射强度
   * @default 1
   */
  reflection: number;

  /**
   * 色调索引
   * 对应 TemperatureMap 数组的索引
   * @default 3
   */
  toneIndex: number;

  /**
   * 色温值（单位：开尔文K）
   * @default 6500
   */
  toneTemperature: number;

  /**
   * 构造函数
   * 初始化默认值：brightness=1, reflection=1, toneIndex=3, toneTemperature=6500
   */
  constructor();

  /**
   * 设置灯光参数
   * @param brightness - 亮度值，默认 1
   * @param reflection - 反射强度，默认 1
   * @param toneIndex - 色调索引，默认 3
   * @param toneTemperature - 色温值，默认 6500K
   */
  set(
    brightness?: number,
    reflection?: number,
    toneIndex?: number,
    toneTemperature?: number
  ): void;

  /**
   * 获取当前灯光参数
   * @returns 包含所有灯光参数的对象
   */
  get(): {
    brightness: number;
    reflection: number;
    toneIndex: number;
    toneTemperature: number;
  };

  /**
   * 重置为默认参数
   * brightness=1, reflection=1, toneIndex=3, toneTemperature=6500
   */
  reset(): void;

  /**
   * 获取 VRay 渲染器的灯光配置
   * 返回两个光源配置：漫反射光源和镜面反射光源
   * @returns VRay 灯光选项数组
   */
  getVrayLightOption(): [
    {
      /** 漫反射光强度 */
      intensity: number;
      /** 纹理色温 */
      textureTemperature: number;
      /** 是否影响镜面反射 */
      affectSpecular: false;
      /** 是否影响漫反射 */
      affectDiffuse: true;
      /** 纹理类型 */
      textureType: "diffuse";
    },
    {
      /** 镜面反射光强度 */
      intensity: number;
      /** 纹理色温 */
      textureTemperature: number;
      /** 是否影响镜面反射 */
      affectSpecular: true;
      /** 是否影响漫反射 */
      affectDiffuse: false;
      /** 纹理类型 */
      textureType: "specular";
    }
  ];
}