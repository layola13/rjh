/**
 * PixiJS Constants Module
 * @module @pixi/constants
 * @version 5.2.4
 * @license MIT
 */

/**
 * WebGL环境类型枚举
 * 用于标识不同版本的WebGL上下文
 */
export enum ENV {
  /** 传统WebGL 1.0上下文 */
  WEBGL_LEGACY = 0,
  /** 标准WebGL 1.0上下文 */
  WEBGL = 1,
  /** WebGL 2.0上下文 */
  WEBGL2 = 2
}

/**
 * 渲染器类型枚举
 * 用于标识PixiJS使用的渲染后端
 */
export enum RENDERER_TYPE {
  /** 未知渲染器类型 */
  UNKNOWN = 0,
  /** WebGL渲染器 */
  WEBGL = 1,
  /** Canvas 2D渲染器 */
  CANVAS = 2
}

/**
 * 混合模式枚举
 * 定义图层混合时的计算方式
 */
export enum BLEND_MODES {
  /** 正常混合模式 */
  NORMAL = 0,
  /** 相加混合模式 */
  ADD = 1,
  /** 正片叠底混合模式 */
  MULTIPLY = 2,
  /** 滤色混合模式 */
  SCREEN = 3,
  /** 叠加混合模式 */
  OVERLAY = 4,
  /** 变暗混合模式 */
  DARKEN = 5,
  /** 变亮混合模式 */
  LIGHTEN = 6,
  /** 颜色减淡混合模式 */
  COLOR_DODGE = 7,
  /** 颜色加深混合模式 */
  COLOR_BURN = 8,
  /** 强光混合模式 */
  HARD_LIGHT = 9,
  /** 柔光混合模式 */
  SOFT_LIGHT = 10,
  /** 差值混合模式 */
  DIFFERENCE = 11,
  /** 排除混合模式 */
  EXCLUSION = 12,
  /** 色相混合模式 */
  HUE = 13,
  /** 饱和度混合模式 */
  SATURATION = 14,
  /** 颜色混合模式 */
  COLOR = 15,
  /** 亮度混合模式 */
  LUMINOSITY = 16,
  /** 正常混合模式（非预乘Alpha） */
  NORMAL_NPM = 17,
  /** 相加混合模式（非预乘Alpha） */
  ADD_NPM = 18,
  /** 滤色混合模式（非预乘Alpha） */
  SCREEN_NPM = 19,
  /** 无混合 */
  NONE = 20,
  /** 源覆盖目标（Porter-Duff合成） */
  SRC_OVER = 0,
  /** 源在目标内部 */
  SRC_IN = 21,
  /** 源在目标外部 */
  SRC_OUT = 22,
  /** 源在目标上方 */
  SRC_ATOP = 23,
  /** 目标覆盖源 */
  DST_OVER = 24,
  /** 目标在源内部 */
  DST_IN = 25,
  /** 目标在源外部 */
  DST_OUT = 26,
  /** 目标在源上方 */
  DST_ATOP = 27,
  /** 擦除模式（等同于DST_OUT） */
  ERASE = 26,
  /** 减法混合模式 */
  SUBTRACT = 28,
  /** 异或混合模式 */
  XOR = 29
}

/**
 * WebGL绘制模式枚举
 * 对应WebGL原生绘制图元类型
 */
export enum DRAW_MODES {
  /** 点图元 */
  POINTS = 0,
  /** 线段图元 */
  LINES = 1,
  /** 闭合线条图元 */
  LINE_LOOP = 2,
  /** 连续线条图元 */
  LINE_STRIP = 3,
  /** 三角形图元 */
  TRIANGLES = 4,
  /** 三角形带图元 */
  TRIANGLE_STRIP = 5,
  /** 三角形扇图元 */
  TRIANGLE_FAN = 6
}

/**
 * WebGL纹理格式枚举
 * 对应WebGL纹理内部格式常量
 */
export enum FORMATS {
  /** RGBA格式（红绿蓝透明） */
  RGBA = 6408,
  /** RGB格式（红绿蓝） */
  RGB = 6407,
  /** Alpha格式（仅透明通道） */
  ALPHA = 6406,
  /** 亮度格式 */
  LUMINANCE = 6409,
  /** 亮度+Alpha格式 */
  LUMINANCE_ALPHA = 6410,
  /** 深度分量格式 */
  DEPTH_COMPONENT = 6402,
  /** 深度+模板格式 */
  DEPTH_STENCIL = 34041
}

/**
 * WebGL纹理目标枚举
 * 定义纹理绑定的目标类型
 */
export enum TARGETS {
  /** 2D纹理目标 */
  TEXTURE_2D = 3553,
  /** 立方体贴图纹理目标 */
  TEXTURE_CUBE_MAP = 34067,
  /** 2D纹理数组目标（WebGL2） */
  TEXTURE_2D_ARRAY = 35866,
  /** 立方体贴图正X面 */
  TEXTURE_CUBE_MAP_POSITIVE_X = 34069,
  /** 立方体贴图负X面 */
  TEXTURE_CUBE_MAP_NEGATIVE_X = 34070,
  /** 立方体贴图正Y面 */
  TEXTURE_CUBE_MAP_POSITIVE_Y = 34071,
  /** 立方体贴图负Y面 */
  TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072,
  /** 立方体贴图正Z面 */
  TEXTURE_CUBE_MAP_POSITIVE_Z = 34073,
  /** 立方体贴图负Z面 */
  TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074
}

/**
 * WebGL数据类型枚举
 * 定义纹理和顶点数据的存储类型
 */
export enum TYPES {
  /** 无符号字节类型（8位） */
  UNSIGNED_BYTE = 5121,
  /** 无符号短整型（16位） */
  UNSIGNED_SHORT = 5123,
  /** 5-6-5位RGB打包格式 */
  UNSIGNED_SHORT_5_6_5 = 33635,
  /** 4-4-4-4位RGBA打包格式 */
  UNSIGNED_SHORT_4_4_4_4 = 32819,
  /** 5-5-5-1位RGBA打包格式 */
  UNSIGNED_SHORT_5_5_5_1 = 32820,
  /** 32位浮点数类型 */
  FLOAT = 5126,
  /** 16位半精度浮点数类型 */
  HALF_FLOAT = 36193
}

/**
 * 纹理缩放模式枚举
 * 控制纹理放大/缩小时的采样方式
 */
export enum SCALE_MODES {
  /** 最近邻采样（像素化效果） */
  NEAREST = 0,
  /** 线性插值采样（平滑效果） */
  LINEAR = 1
}

/**
 * 纹理环绕模式枚举
 * 控制纹理坐标超出[0,1]范围时的行为
 */
export enum WRAP_MODES {
  /** 钳位到边缘 */
  CLAMP = 33071,
  /** 重复平铺 */
  REPEAT = 10497,
  /** 镜像重复平铺 */
  MIRRORED_REPEAT = 33648
}

/**
 * Mipmap生成模式枚举
 * 控制纹理多级渐远纹理的生成策略
 */
export enum MIPMAP_MODES {
  /** 关闭Mipmap */
  OFF = 0,
  /** 仅对2的幂次方尺寸纹理生成 */
  POW2 = 1,
  /** 强制开启Mipmap */
  ON = 2
}

/**
 * Alpha通道处理模式枚举
 * 控制纹理透明度的预乘处理方式
 */
export enum ALPHA_MODES {
  /** 非预乘Alpha（NPM - Non-Premultiplied） */
  NPM = 0,
  /** 解包模式 */
  UNPACK = 1,
  /** 预乘Alpha（PMA - Premultiplied Alpha） */
  PMA = 2,
  /** 无预乘Alpha（别名） */
  NO_PREMULTIPLIED_ALPHA = 0,
  /** 上传时预乘（别名） */
  PREMULTIPLY_ON_UPLOAD = 1,
  /** 预乘Alpha（别名） */
  PREMULTIPLY_ALPHA = 2
}

/**
 * 垃圾回收模式枚举
 * 控制PixiJS资源的自动清理策略
 */
export enum GC_MODES {
  /** 自动垃圾回收 */
  AUTO = 0,
  /** 手动垃圾回收 */
  MANUAL = 1
}

/**
 * 着色器精度枚举
 * 定义GLSL着色器的浮点精度级别
 */
export enum PRECISION {
  /** 低精度（lowp） */
  LOW = 'lowp',
  /** 中等精度（mediump） */
  MEDIUM = 'mediump',
  /** 高精度（highp） */
  HIGH = 'highp'
}

/**
 * 遮罩类型枚举
 * 定义不同的遮罩实现方式
 */
export enum MASK_TYPES {
  /** 无遮罩 */
  NONE = 0,
  /** 剪裁矩形遮罩（scissor test） */
  SCISSOR = 1,
  /** 模板缓冲遮罩（stencil buffer） */
  STENCIL = 2,
  /** 精灵遮罩 */
  SPRITE = 3
}