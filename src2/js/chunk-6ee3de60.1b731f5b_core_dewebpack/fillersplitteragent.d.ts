import Geometry from './geometry';
import { Dock, Utils } from './utils';

/**
 * 分隔线信息接口
 * 用于描述分割多边形的线条及其所属关系
 */
interface SplitterLine {
  /** 分隔线的几何形状（线段或圆弧） */
  line: Geometry.Segment | Geometry.Arc;
  /** 所属多边形的标识 */
  polyId: PolygonId;
  /** 移动分隔线 */
  translate(offset: Geometry.Point): void;
}

/**
 * 多边形标识接口
 */
interface PolygonId {
  /** 索引位置 */
  idx: number;
  /** 在同层级中的位置 */
  pos: number;
  /** 判断是否与另一个ID相等 */
  equalTo(other: PolygonId): boolean;
}

/**
 * 子多边形接口
 * 表示分割后的多边形区域
 */
interface SubPolygon {
  /** 是否为竖挺（分隔条） */
  IsMullion: boolean;
  /** 多边形标识 */
  polyId: PolygonId;
  /** 多边形的边缘集合 */
  edges: Array<Geometry.Segment | Geometry.Arc>;
  /** 竖挺的几何形状 */
  mulShape?: Geometry.Segment | Geometry.Arc;
  /** 端点对接信息 */
  epDock: EndpointDock;
  /** 边缘对接信息 */
  edDock?: EdgeDock;
  /** 使用线条分割多边形 */
  split(line: Geometry.Segment | Geometry.Arc, profileSize: number): SubPolygon[];
  /** 克隆多边形 */
  clone(): SubPolygon;
}

/**
 * 端点对接信息接口
 */
interface EndpointDock {
  /** 设置端点的对接关系 */
  setDock(isStart: boolean, dock: Dock): void;
}

/**
 * 边缘对接信息接口
 */
interface EdgeDock {
  /** 对接点集合 */
  docks: Dock[];
}

/**
 * 宿主多边形接口
 */
interface HostPolygon {
  /** 多边形几何数据 */
  polygon: SubPolygon;
}

/**
 * 填充分割代理类
 * 负责管理和执行多边形的分割操作，生成竖挺（mullion）结构
 * 
 * @example
 * const agent = new FillerSplitterAgent(hostPolygon, 'inner');
 * agent.profileSize = 50;
 * const mullions = agent.updatePoly();
 */
export class FillerSplitterAgent {
  /** 宿主多边形 */
  private readonly host: HostPolygon;
  
  /** 分割位置标识 */
  private readonly where: string;
  
  /** 分割后的子多边形集合 */
  private subs: SubPolygon[];
  
  /** 分隔线集合 */
  private lines: SplitterLine[];
  
  /** 型材尺寸（用于计算分割偏移） */
  public profileSize: number;

  /**
   * 构造函数
   * @param host - 宿主多边形对象
   * @param where - 分割位置标识
   */
  constructor(host: HostPolygon, where: string) {
    this.host = host;
    this.where = where;
    this.subs = [host.polygon];
    this.lines = [];
    this.profileSize = 0;
  }

  /**
   * 清除所有分割数据
   * 重置子多边形和分隔线集合
   */
  public clear(): void {
    this.subs = [];
    this.lines = [];
  }

  /**
   * 更新多边形分割
   * 根据分隔线集合逐步分割多边形，生成竖挺结构
   * 
   * @returns 排序后的竖挺多边形数组
   */
  public updatePoly(): SubPolygon[] {
    // 重置为初始状态
    this.subs = [this.host.polygon];

    // 逐条应用分隔线
    for (let lineIndex = 0; lineIndex < this.lines.length; lineIndex++) {
      const currentLine = this.lines[lineIndex];
      const newSubs: SubPolygon[] = [];

      // 对每个子多边形尝试分割
      this.subs.forEach((subPolygon) => {
        // 只分割非竖挺且匹配polyId的多边形
        if (!subPolygon.IsMullion && currentLine.polyId.equalTo(subPolygon.polyId)) {
          // 执行分割
          const splitResult = subPolygon.split(currentLine.line, this.profileSize);

          // 如果分隔线是圆弧，更新其几何形状
          if (currentLine.line instanceof Geometry.Arc) {
            const mullionPart = splitResult.find((part) => part.IsMullion);
            if (mullionPart && mullionPart.mulShape) {
              currentLine.line = mullionPart.mulShape.clone() as Geometry.Arc;
            }
          }

          // 更新polyId标识
          let positionCounter = 0;
          splitResult.forEach((part) => {
            part.polyId.idx = lineIndex;
            if (part.IsMullion) {
              part.polyId.pos = positionCounter++;
            }
            newSubs.push(part);
          });
        } else {
          // 不符合条件，直接保留
          newSubs.push(subPolygon);
        }
      });

      this.subs = newSubs;
    }

    // 提取并排序竖挺
    const mullions = this.subs
      .filter((sub) => sub.IsMullion)
      .map((sub) => sub.clone())
      .sort((a, b) => a.polyId.idx - b.polyId.idx);

    // 检查对接关系
    this.checkFrameDock(mullions);
    this.checkMullionDock(mullions);

    return mullions;
  }

  /**
   * 平移所有分隔线
   * @param offset - 平移偏移量
   */
  public translate(offset: Geometry.Point): void {
    this.lines.forEach((line) => line.translate(offset));
  }

  /**
   * 检查竖挺与边框的对接关系
   * 判断竖挺端点是否与宿主多边形的边缘重合
   * 
   * @param mullions - 竖挺多边形数组
   */
  private checkFrameDock(mullions: SubPolygon[]): void {
    const hostEdges = this.host.polygon.edges;
    const hostDocks = this.host.polygon.edDock?.docks;

    if (!hostDocks) return;

    mullions.forEach((mullion) => {
      if (!mullion.mulShape) return;

      /**
       * 检查单个端点的对接
       * @param isStart - true检查起点，false检查终点
       */
      const checkEndpoint = (isStart: boolean): void => {
        const point = isStart ? mullion.mulShape!.start : mullion.mulShape!.end;
        
        // 查找包含该端点的边缘索引
        const edgeIndex = hostEdges.findIndex((edge) => edge.contains(point));
        
        if (edgeIndex >= 0) {
          mullion.epDock.setDock(isStart, hostDocks[edgeIndex]);
        }
      };

      checkEndpoint(true);  // 检查起点
      checkEndpoint(false); // 检查终点
    });
  }

  /**
   * 检查竖挺之间的对接关系
   * 判断竖挺端点是否与其他竖挺的边缘相交
   * 
   * @param mullions - 竖挺多边形数组
   */
  private checkMullionDock(mullions: SubPolygon[]): void {
    /**
     * 查找并设置与目标竖挺相交的其他竖挺
     * @param targetMullion - 目标竖挺
     * @param targetEdges - 目标竖挺的边缘集合
     * @param isStart - 检查起点还是终点
     */
    const findAndSetDock = (
      targetMullion: SubPolygon,
      targetEdges: Array<Geometry.Segment | Geometry.Arc>,
      isStart: boolean
    ): void => {
      // 查找相交的竖挺
      const intersectingMullions = mullions.filter((mullion) => {
        if (mullion === targetMullion || !mullion.mulShape) return false;

        const point = isStart ? mullion.mulShape.start : mullion.mulShape.end;
        return targetEdges.some((edge) => edge.contains(point));
      });

      // 设置对接关系
      intersectingMullions.forEach((mullion) => {
        mullion.epDock.setDock(isStart, Dock.Mullion(targetMullion.polyId));
      });
    };

    mullions.forEach((mullion) => {
      if (!mullion.mulShape) return;

      // 获取与mulShape平行或同心的边缘
      const relevantEdges = mullion.edges.filter((edge) => {
        if (mullion.mulShape instanceof Geometry.Arc) {
          // 圆弧：检查是否同心
          return (
            edge instanceof Geometry.Arc &&
            edge.center.equalTo(mullion.mulShape.center)
          );
        } else {
          // 线段：检查是否平行
          const edgeLine = Geometry.line(edge.start, edge.end);
          const mulLine = Geometry.line(mullion.mulShape.start, mullion.mulShape.end);
          return (
            edge instanceof Geometry.Segment &&
            Utils.isZero(edgeLine.norm.cross(mulLine.norm), 1e-4)
          );
        }
      });

      findAndSetDock(mullion, relevantEdges, true);  // 检查起点
      findAndSetDock(mullion, relevantEdges, false); // 检查终点
    });
  }
}