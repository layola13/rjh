import { Point, Vector, Matrix } from './geometry';
import { WinPolygon, PolygonCreator, PolyType } from './polygon';
import { Edge } from './edge';

/**
 * 四分之一圆形多边形类
 * 表示一个由直线和圆弧组成的四分之一圆形状
 */
export class QuarterCirclePoly extends WinPolygon {
  /**
   * 圆心位置
   */
  position: Point;

  /**
   * 圆的半径
   */
  radius: number;

  /**
   * 控制尺寸标志
   * @returns 始终返回true，表示该图形支持尺寸控制
   */
  get controlDimFlag(): boolean {
    return true;
  }

  /**
   * 构造四分之一圆形多边形
   * @param position - 圆心位置点
   * @param radius - 圆的半径
   * @param edges - 边缘数组，如果未提供则自动创建
   */
  constructor(position: Point, radius: number, edges?: Edge[]) {
    super(edges ?? QuarterCirclePoly.create(position, radius));
    this.position = position;
    this.radius = radius;
  }

  /**
   * 创建四分之一圆形的边缘数组
   * @param center - 圆心位置
   * @param radius - 圆的半径
   * @returns 构成四分之一圆形的边缘数组
   */
  static create(center: Point, radius: number): Edge[] {
    // 计算圆弧的圆心位置（向左上方平移）
    const arcCenter = center.translate(Vector.vector(-radius, radius));
    
    // 创建四分之一圆形的路径：
    // 1. 从中心点向左下移动
    // 2. 向上移动两倍半径
    // 3. 向右移动两倍半径
    // 4. 圆弧连接回起点（逆时针-90度）
    return PolygonCreator.Ins.joinRelative(
      center,
      [
        Vector.vector(-radius, -radius),
        Vector.vector(0, 2 * radius),
        Vector.vector(2 * radius, 0),
        Vector.arc(arcCenter, 2 * radius, 0, -Math.PI / 2, false)
      ],
      false
    ).edges;
  }

  /**
   * 缩放图形
   * @param factor - 缩放因子
   * @returns 缩放后的图形实例
   */
  scale(factor: number): this {
    this.radius *= factor;
    return super.scale(factor);
  }

  /**
   * 克隆图形
   * @returns 新的四分之一圆形多边形实例
   */
  protected _clone(): QuarterCirclePoly {
    return new QuarterCirclePoly(this.position.clone(), this.radius, []);
  }

  /**
   * 序列化为JSON对象
   * @returns 包含类型、位置和半径信息的JSON对象
   */
  toJSON(): {
    type: PolyType;
    position: ReturnType<Point['toJSON']>;
    radius: number;
    [key: string]: unknown;
  } {
    const json = super.toJSON();
    json.type = PolyType.quarterCircle;
    json.position = this.position.toJSON();
    json.radius = this.radius;
    return json;
  }

  /**
   * 平移图形
   * @param offset - 平移向量
   * @returns 平移后的图形实例
   */
  translate(offset: Vector): this {
    super.translate(offset);
    this.position = this.position.translate(offset);
    return this;
  }

  /**
   * 旋转图形
   * @param angle - 旋转角度（弧度）
   * @param pivot - 旋转中心点
   * @returns 旋转后的图形实例
   */
  rotate(angle: number, pivot: Point): this {
    super.rotate(angle, pivot);
    this.position = this.position.rotate(angle, pivot);
    return this;
  }

  /**
   * 调整图形大小
   * @param size1 - 新的尺寸参数1
   * @param size2 - 新的尺寸参数2
   * @returns 新的调整大小后的图形实例
   */
  resize(size1: number, size2?: number): QuarterCirclePoly {
    const newSize = size1 ?? size2;
    const newRadius = newSize ? newSize / 2 : this.radius;
    return new QuarterCirclePoly(this.position, newRadius);
  }

  /**
   * 拖拽边缘以调整图形
   * @param edgeIndex - 被拖拽的边缘索引
   * @param dragVector - 拖拽向量
   * @param dragPoint - 拖拽点（默认为原点）
   * @returns 新的调整后的图形实例
   * @throws 如果拖拽方向与原方向相反则抛出错误
   */
  dragEdge(edgeIndex: number, dragVector: Vector, dragPoint: Point = Point.point()): QuarterCirclePoly {
    const center = this.position;
    const originalVector = Vector.vector(center, dragPoint);
    const newVector = Vector.vector(center, dragPoint.translate(dragVector));
    const projection = newVector.projectionOn(originalVector);

    // 检查拖拽方向是否与原方向一致
    if (!projection.normalize().equalTo(originalVector.normalize())) {
      throw new Error('drag reverse not support');
    }

    // 计算缩放比例
    const scaleFactor = 
      Math.sqrt(newVector.x * newVector.x + newVector.y * newVector.y) /
      Math.sqrt(originalVector.x * originalVector.x + originalVector.y * originalVector.y);

    // 变换所有边缘
    const transformedEdges = this.edges.map(edge => 
      edge
        .translate(-center.x, -center.y)
        .transform(Matrix.matrix(scaleFactor, 0, 0, scaleFactor, 0, 0))
        .translate(center.x, center.y)
    );

    return new QuarterCirclePoly(this.position, this.radius, transformedEdges);
  }

  /**
   * 拖拽顶点以调整图形（委托给dragEdge方法）
   * @param vertexIndex - 被拖拽的顶点索引
   * @param dragVector - 拖拽向量
   * @param edgeIndex - 相关边缘索引
   * @param dragPoint - 拖拽点（默认为原点）
   * @returns 新的调整后的图形实例
   */
  dragVertex(
    vertexIndex: number,
    dragVector: Vector,
    edgeIndex: number,
    dragPoint: Point = Point.point()
  ): QuarterCirclePoly {
    return this.dragEdge(vertexIndex, dragVector, dragPoint);
  }

  /**
   * 拖拽圆弧（当前实现不做任何改变）
   * @param arcIndex - 圆弧索引
   * @param dragVector - 拖拽向量
   * @returns 当前图形实例
   */
  dragArc(arcIndex: number, dragVector: Vector): this {
    return this;
  }

  /**
   * 编辑尺寸
   * @param dimensionType - 尺寸类型
   * @param scaleFactor - 缩放因子
   * @param additionalParam - 额外参数
   * @returns 变换后的图形实例
   */
  editDim(dimensionType: number, scaleFactor: number, additionalParam: number): this {
    return this.transform(Matrix.matrix(scaleFactor, 0, 0, scaleFactor, 0, 0));
  }
}