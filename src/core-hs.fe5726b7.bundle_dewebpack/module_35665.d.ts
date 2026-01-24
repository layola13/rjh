/**
 * SVG路径解析和轮廓简化工具模块
 * 提供解析SVG路径数据、开口轮廓解析和轮廓简化功能
 */

/**
 * 二维坐标点接口
 */
export interface Point2D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * SVG路径命令接口
 */
interface PathCommand {
  /** 命令类型：M(移动)、L(直线)、C(三次贝塞尔曲线)、Q(二次贝塞尔曲线) */
  cmd: 'M' | 'L' | 'C' | 'Q';
  /** 命令参数字符串 */
  arg: string;
}

/**
 * 开口轮廓配置接口
 */
export interface OpeningProfileConfig {
  /** SVG路径数据 */
  profile: string;
  /** 摆动类型（2或3时需要镜像X坐标） */
  swing: number;
}

/**
 * 贝塞尔曲线采样步进值（10个采样点）
 */
const BEZIER_SAMPLE_STEP = 0.1;

/**
 * 贝塞尔曲线采样数量
 */
const BEZIER_SAMPLE_COUNT = 10;

/**
 * 三次贝塞尔曲线控制点数量
 */
const CUBIC_BEZIER_CONTROL_POINTS = 3;

/**
 * 二次贝塞尔曲线控制点数量
 */
const QUADRATIC_BEZIER_CONTROL_POINTS = 2;

/**
 * SVG路径解析器
 * 解析SVG路径字符串为坐标点数组
 */
const createPathParser = (() => {
  /** 匹配路径命令的正则表达式 */
  const commandRegex = /^\s*([CLMQ])\s*([\-0-9,.E|e]+)/;
  
  /** 匹配坐标对的正则表达式 */
  const coordinateRegex = /^\s*([\-0-9.E|e]+)\s*,\s*([\-0-9.E|e]+)/;

  /**
   * 解析坐标字符串为点数组
   * @param coordString - 坐标字符串
   * @param shouldRound - 是否对坐标值进行四舍五入（保留4位小数）
   * @returns 坐标点数组
   */
  const parseCoordinates = (coordString: string, shouldRound: boolean): Point2D[] => {
    const points: Point2D[] = [];
    let remainingString = coordString;

    while (remainingString.length > 0) {
      const match = coordinateRegex.exec(remainingString);
      if (!match) break;

      const xValue = shouldRound 
        ? Number(parseFloat(match[1]).toFixed(4)) 
        : parseFloat(match[1]);
      const yValue = shouldRound 
        ? Number(parseFloat(match[2]).toFixed(4)) 
        : parseFloat(match[2]);

      points.push({ x: xValue, y: yValue });
      remainingString = remainingString.replace(match[0], '');
    }

    return points;
  };

  /**
   * 计算三次贝塞尔曲线上的采样点
   * @param p0 - 起始点
   * @param p1 - 第一个控制点
   * @param p2 - 第二个控制点
   * @param p3 - 结束点
   * @returns 曲线上的采样点数组
   */
  const sampleCubicBezier = (
    p0: Point2D,
    p1: Point2D,
    p2: Point2D,
    p3: Point2D
  ): Point2D[] => {
    const samples: Point2D[] = [];

    for (let i = 1; i < BEZIER_SAMPLE_COUNT; i++) {
      const t = BEZIER_SAMPLE_STEP * i;
      const oneMinusT = 1 - t;
      const oneMinusT2 = oneMinusT * oneMinusT;
      const oneMinusT3 = oneMinusT2 * oneMinusT;
      const t2 = t * t;
      const t3 = t2 * t;

      const x = oneMinusT3 * p0.x + 
                3 * t * oneMinusT2 * p1.x + 
                3 * t2 * oneMinusT * p2.x + 
                t3 * p3.x;

      const y = oneMinusT3 * p0.y + 
                3 * t * oneMinusT2 * p1.y + 
                3 * t2 * oneMinusT * p2.y + 
                t3 * p3.y;

      samples.push({ x, y });
    }

    samples.push(p3);
    return samples;
  };

  /**
   * 计算二次贝塞尔曲线上的采样点
   * @param p0 - 起始点
   * @param p1 - 控制点
   * @param p2 - 结束点
   * @returns 曲线上的采样点数组
   */
  const sampleQuadraticBezier = (
    p0: Point2D,
    p1: Point2D,
    p2: Point2D
  ): Point2D[] => {
    const samples: Point2D[] = [];

    for (let i = 1; i < BEZIER_SAMPLE_COUNT; i++) {
      const t = BEZIER_SAMPLE_STEP * i;
      const oneMinusT = 1 - t;
      const oneMinusT2 = oneMinusT * oneMinusT;
      const t2 = t * t;

      const x = oneMinusT2 * p0.x + 2 * t * oneMinusT * p1.x + t2 * p2.x;
      const y = oneMinusT2 * p0.y + 2 * t * oneMinusT * p1.y + t2 * p2.y;

      samples.push({ x, y });
    }

    samples.push(p2);
    return samples;
  };

  /**
   * 路径命令处理器
   */
  const commandHandlers = {
    /** 当前位置 */
    currentPos: null as Point2D | null,

    /**
     * 处理M(移动)命令
     */
    M(argString: string, shouldRound: boolean): Point2D[] {
      const points = parseCoordinates(argString, shouldRound);
      commandHandlers.currentPos = points[0];
      return [points[0]];
    },

    /**
     * 处理L(直线)命令
     */
    L(argString: string, shouldRound: boolean): Point2D[] {
      const points = parseCoordinates(argString, shouldRound);
      commandHandlers.currentPos = points[0];
      return [points[0]];
    },

    /**
     * 处理C(三次贝塞尔曲线)命令
     */
    C(argString: string, shouldRound: boolean): Point2D[] {
      const points = parseCoordinates(argString, shouldRound);
      if (points.length !== CUBIC_BEZIER_CONTROL_POINTS) return [];

      const startPoint = commandHandlers.currentPos!;
      const controlPoint1 = points[0];
      const controlPoint2 = points[1];
      const endPoint = points[2];

      const samples = sampleCubicBezier(startPoint, controlPoint1, controlPoint2, endPoint);
      commandHandlers.currentPos = endPoint;
      return samples;
    },

    /**
     * 处理Q(二次贝塞尔曲线)命令
     */
    Q(argString: string, shouldRound: boolean): Point2D[] {
      const points = parseCoordinates(argString, shouldRound);
      if (points.length !== QUADRATIC_BEZIER_CONTROL_POINTS) return [];

      const startPoint = commandHandlers.currentPos!;
      const controlPoint = points[0];
      const endPoint = points[1];

      const samples = sampleQuadraticBezier(startPoint, controlPoint, endPoint);
      commandHandlers.currentPos = endPoint;
      return samples;
    }
  };

  /**
   * 解析SVG路径字符串
   * @param pathString - SVG路径字符串
   * @param shouldRound - 是否对坐标进行四舍五入，默认为true
   * @returns 解析后的坐标点数组
   */
  return (pathString: string, shouldRound: boolean = true): Point2D[] => {
    if (!pathString) return [];

    const commands: PathCommand[] = [];
    let remainingPath = pathString;

    while (remainingPath.length > 0) {
      const match = commandRegex.exec(remainingPath);
      if (!match) break;

      commands.push({
        cmd: match[1] as PathCommand['cmd'],
        arg: match[2]
      });
      remainingPath = remainingPath.replace(match[0], '');
    }

    let result: Point2D[] = [];
    for (const command of commands) {
      const points = commandHandlers[command.cmd](command.arg, shouldRound);
      result = result.concat(points);
    }

    return result;
  };
})();

/**
 * 解析SVG路径字符串为坐标点数组
 * @param pathString - SVG路径字符串
 * @param shouldRound - 是否对坐标进行四舍五入，默认为true
 * @returns 解析后的坐标点数组
 */
export const parse = createPathParser;

/**
 * 解析开口轮廓配置
 * 根据摆动类型决定是否需要镜像X坐标
 * @param config - 开口轮廓配置
 * @returns 解析后的坐标点数组
 */
export const parseOpeningProfile = (config: OpeningProfileConfig): Point2D[] => {
  let points = parse(config.profile);

  // 摆动类型为2或3时，镜像X坐标
  if (config.swing === 2 || config.swing === 3) {
    points = points.map(point => ({
      x: -point.x,
      y: point.y
    }));
  }

  return points;
};

/**
 * 简化轮廓路径
 * 移除共线的中间点以减少路径复杂度
 * 依赖全局HSCore.Util.Math工具函数
 * @param profile - 原始轮廓点数组
 * @returns 简化后的轮廓点数组，如果输入少于3个点则返回undefined
 */
export const simplifyProfile = (profile: Point2D[]): Point2D[] | undefined => {
  if (profile.length < 3) return undefined;

  // 确保路径闭合
  if (!HSCore.Util.Math.isSamePoint(profile[0], profile[profile.length - 1])) {
    profile.push(profile[0]);
  }

  const simplified: Point2D[] = [profile[0], profile[1]];

  for (let i = 1; i < profile.length - 1; i++) {
    const lastIndex = simplified.length;
    const tolerance = HSCore.Util.Math.defaultTolerance;

    // 如果当前线段与上一线段平行，移除上一个点
    if (HSCore.Util.Math.isParallel(
      profile[i],
      profile[i + 1],
      simplified[lastIndex - 2],
      simplified[lastIndex - 1],
      tolerance
    )) {
      simplified.pop();
    }

    simplified.push(profile[i + 1]);
  }

  // 移除重复的闭合点
  simplified.pop();
  return simplified;
};

/**
 * 全局HSCore命名空间声明（外部依赖）
 */
declare global {
  const HSCore: {
    Util: {
      Math: {
        /** 判断两点是否相同 */
        isSamePoint(p1: Point2D, p2: Point2D): boolean;
        /** 判断两条线段是否平行 */
        isParallel(p1: Point2D, p2: Point2D, p3: Point2D, p4: Point2D, tolerance: number): boolean;
        /** 默认容差值 */
        defaultTolerance: number;
      };
    };
  };
}