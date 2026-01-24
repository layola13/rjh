import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';
import { Util } from './Util';

/**
 * 点的约束信息接口
 * 描述点在移动时的约束条件
 */
interface ConstraintInfo {
  /** 约束线：由两个点定义的约束线段 */
  constraintLine: [{ x: number; y: number }, { x: number; y: number }];
  /** 是否需要在该点插入新边 */
  isNeedInsertNewEdge: boolean;
}

/**
 * 二维坐标点接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 移动楼板轮廓边请求类
 * 
 * 用于处理楼板边缘的移动操作，包括约束计算、边的插入、顶点合并等功能。
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 * 
 * @example
 * const request = new MoveSlabProfileEdgeRequest(coEdge, layer);
 * request.move(offsetX, offsetY);
 */
export class MoveSlabProfileEdgeRequest extends HSCore.Transaction.Common.StateRequest {
  /** 要移动的边实体（CoEdge） */
  entity: HSCore.Model.CoEdge;
  
  /** 所属图层 */
  layer: HSCore.Model.Layer;
  
  /** 起始点的原始数据 */
  dataFrom: Point2D;
  
  /** 结束点的原始数据 */
  dataTo: Point2D;
  
  /** 起始点的约束信息 */
  private _fromPointConstraintInfo: ConstraintInfo;
  
  /** 结束点的约束信息 */
  private _toPointConstraintInfo: ConstraintInfo;
  
  /** 最小墙体长度阈值（米） */
  private _miniWallLen: number;

  /**
   * 构造函数
   * 
   * @param entity - 要移动的CoEdge实体
   * @param layer - 实体所在的图层
   */
  constructor(entity: HSCore.Model.CoEdge, layer: HSCore.Model.Layer) {
    super();
    
    this.entity = entity;
    this.layer = layer;
    this._miniWallLen = 0.05;
    
    // 保存原始位置数据
    this.dataFrom = {
      x: this.entity.from.x,
      y: this.entity.from.y
    };
    
    this.dataTo = {
      x: this.entity.to.x,
      y: this.entity.to.y
    };
    
    // 计算约束方向
    this._computeConstraintDirection();
  }

  /**
   * 接收并处理请求事件
   * 
   * @param eventType - 事件类型
   * @param data - 事件数据，对于move事件包含offset属性
   * @returns 是否成功处理该事件
   */
  onReceive(eventType: string, data: { offset: { x: number; y: number } }): boolean {
    if (eventType === 'move') {
      this.move(data.offset.x, data.offset.y);
      return true;
    }
    return super.onReceive(eventType, data);
  }

  /**
   * 激活请求时的回调
   * 在必要的位置插入新边
   */
  onActivate(): void {
    this._tryInsertNewEdges();
  }

  /**
   * 尝试在起点和终点插入新边
   * 根据约束信息判断是否需要插入
   * @private
   */
  private _tryInsertNewEdges(): void {
    if (this._fromPointConstraintInfo.isNeedInsertNewEdge) {
      this._insertEdgeAtPoint(this.entity.from);
    }
    
    if (this._toPointConstraintInfo.isNeedInsertNewEdge) {
      this._insertEdgeAtPoint(this.entity.to);
    }
  }

  /**
   * 在指定点插入新边
   * 
   * @param point - 要插入新边的顶点
   * @private
   */
  private _insertEdgeAtPoint(point: HSCore.Model.Vertex): void {
    if (!this.entity) {
      return;
    }

    const EPSILON = 0.001;
    const isFromPoint = HSCore.Util.Math.isSamePoint(this.entity.from, point, EPSILON);
    
    // 创建新顶点和新边
    const newVertex = HSCore.Model.Vertex.create(point.x, point.y);
    const newEdgeFrom = isFromPoint ? point : newVertex;
    const newEdgeTo = isFromPoint ? newVertex : point;
    const newCoEdge = HSCore.Model.CoEdge.create(newEdgeFrom, newEdgeTo);
    
    // 更新当前边的端点
    if (isFromPoint) {
      this.entity.from = newCoEdge.to;
    } else {
      this.entity.to = newCoEdge.from;
    }
    
    // 将新边添加到CoEdge循环中
    const coEdgeLoop = HSCore.Util.Edge.getCoEdgeLoop(this.entity);
    if (coEdgeLoop) {
      if (isFromPoint) {
        coEdgeLoop.appendCoEdge(newCoEdge, this.entity.prev);
      } else {
        coEdgeLoop.appendCoEdge(newCoEdge, this.entity);
      }
      
      assert(coEdgeLoop.validate(), 'CoEdge loop validation failed');
    }
  }

  /**
   * 移动边
   * 
   * @param offsetX - X方向的偏移量
   * @param offsetY - Y方向的偏移量
   */
  move(offsetX: number, offsetY: number): void {
    const newFrom: Point2D = {
      x: this.dataFrom.x + offsetX,
      y: this.dataFrom.y + offsetY
    };
    
    const newTo: Point2D = {
      x: this.dataTo.x + offsetX,
      y: this.dataTo.y + offsetY
    };
    
    this._move(newFrom, newTo);
  }

  /**
   * 内部移动实现，根据约束条件计算新位置
   * 
   * @param targetFrom - 目标起点位置
   * @param targetTo - 目标终点位置
   * @private
   */
  private _move(targetFrom: Point2D, targetTo: Point2D): void {
    const fromVertex = this.entity.from;
    const toVertex = this.entity.to;
    const fromConstraintLine = this._fromPointConstraintInfo.constraintLine;
    const toConstraintLine = this._toPointConstraintInfo.constraintLine;
    
    // 如果两端都有约束线，则需要计算交点
    const shouldDirectMove = !fromConstraintLine || !toConstraintLine;
    
    if (shouldDirectMove) {
      // 无约束或只有一端约束，直接移动
      fromVertex.set(targetFrom.x, targetFrom.y);
      toVertex.set(targetTo.x, targetTo.y);
      return;
    }
    
    // 计算新位置与约束线的交点
    const newFromPoint = HSCore.Util.Math.lineLineIntersection(
      fromConstraintLine[0],
      fromConstraintLine[1],
      targetFrom,
      targetTo
    );
    
    const newToPoint = HSCore.Util.Math.lineLineIntersection(
      toConstraintLine[0],
      toConstraintLine[1],
      targetFrom,
      targetTo
    );
    
    // 验证交点是否有效
    if (!newFromPoint || !newToPoint) {
      return;
    }
    
    // 检查新边长度是否满足最小长度要求
    const newLength = HSCore.Util.Math.getDistance(newFromPoint, newToPoint);
    if (newLength < this._miniWallLen) {
      return;
    }
    
    // 检查移动方向是否与原方向一致（点积应为正）
    const originalDirection = HSCore.Util.Math.Vec2.difference(fromVertex, toVertex);
    const newDirection = HSCore.Util.Math.Vec2.difference(newFromPoint, newToPoint);
    const dotProduct = HSCore.Util.Math.Vec2.dot(originalDirection, newDirection);
    
    if (dotProduct < 0) {
      return; // 方向相反，不允许移动
    }
    
    // 验证坐标值的有效性
    if (
      isNaN(newFromPoint.x) || isNaN(newFromPoint.y) ||
      isNaN(newToPoint.x) || isNaN(newToPoint.y) ||
      !isFinite(newFromPoint.x) || !isFinite(newFromPoint.y) ||
      !isFinite(newToPoint.x) || !isFinite(newToPoint.y)
    ) {
      assert(false, 'Invalid calculation result: NaN or Infinity detected');
      return;
    }
    
    // 应用新位置
    fromVertex.set(newFromPoint.x, newFromPoint.y);
    toVertex.set(newToPoint.x, newToPoint.y);
  }

  /**
   * 移除重复的顶点
   * 合并在同一位置的顶点
   */
  removeDuplicatePoints(): void {
    const fromVertex = this.entity.from;
    const toVertex = this.entity.to;
    
    // 处理起点的重复顶点
    const fromConnectedPoints = HSCore.Util.Point.getConnectPoints(fromVertex);
    fromConnectedPoints.forEach((point: HSCore.Model.Vertex) => {
      if (HSCore.Util.Math.isSamePoint(point, fromVertex)) {
        Util.tryMergeVertexOnLoop(point);
      }
    });
    
    // 处理终点的重复顶点
    const toConnectedPoints = HSCore.Util.Point.getConnectPoints(toVertex);
    toConnectedPoints.forEach((point: HSCore.Model.Vertex) => {
      if (HSCore.Util.Math.isSamePoint(point, toVertex)) {
        Util.tryMergeVertexOnLoop(point);
      }
    });
  }

  /**
   * 获取指定顶点的约束信息
   * 
   * @param vertex - 要计算约束信息的顶点
   * @returns 约束信息对象
   * @private
   */
  private _getConstraintInfo(vertex: HSCore.Model.Vertex): ConstraintInfo {
    // 收集该顶点关联的其他边（排除当前边）
    const connectedEdges: HSCore.Model.Edge[] = [];
    for (const parentId in vertex.parents) {
      const edge = vertex.parents[parentId];
      if (edge !== this.entity.edge) {
        connectedEdges.push(edge);
      }
    }
    
    let constraintLine: [Point2D, Point2D];
    let isNeedInsertNewEdge = false;
    const PARALLEL_ANGLE_THRESHOLD = 20; // 度
    
    if (connectedEdges.length === 2) {
      // 两条边相连：检查是否平行
      const edge1 = connectedEdges[0];
      const edge2 = connectedEdges[1];
      
      if (HSCore.Util.Math.isParallel(edge1.from, edge1.to, edge2.from, edge2.to)) {
        // 平行时，使用第一条边的方向作为约束
        constraintLine = [
          { x: edge1.from.x, y: edge1.from.y },
          { x: edge1.to.x, y: edge1.to.y }
        ];
        isNeedInsertNewEdge = true;
      } else {
        // 不平行时，使用垂直于当前边的方向作为约束
        const perpendicular = new HSCore.Util.Math.Vec2(
          this.entity.from.x - this.entity.to.x,
          this.entity.from.y - this.entity.to.y
        ).rotate(HSCore.Util.Math.toRadians(90));
        
        constraintLine = [
          { x: vertex.x, y: vertex.y },
          { x: perpendicular.x + vertex.x, y: perpendicular.y + vertex.y }
        ];
        isNeedInsertNewEdge = true;
      }
    } else if (connectedEdges.length === 1) {
      // 一条边相连：检查角度
      const edge = connectedEdges[0];
      const angle = HSCore.Util.Math.lineLineAngle(
        edge.from,
        edge.to,
        this.entity.from,
        this.entity.to
      );
      
      if (angle < PARALLEL_ANGLE_THRESHOLD) {
        // 角度较小，使用垂直约束
        const perpendicular = new HSCore.Util.Math.Vec2(
          this.entity.from.x - this.entity.to.x,
          this.entity.from.y - this.entity.to.y
        ).rotate(HSCore.Util.Math.toRadians(90));
        
        constraintLine = [
          { x: vertex.x, y: vertex.y },
          { x: perpendicular.x + vertex.x, y: perpendicular.y + vertex.y }
        ];
        isNeedInsertNewEdge = true;
      } else {
        // 角度较大，使用该边的方向作为约束
        constraintLine = [
          { x: edge.from.x, y: edge.from.y },
          { x: edge.to.x, y: edge.to.y }
        ];
      }
    } else {
      // 零条或多条边相连：使用垂直约束
      if (connectedEdges.length > 2) {
        isNeedInsertNewEdge = true;
      }
      
      const perpendicular = new HSCore.Util.Math.Vec2(
        this.entity.from.x - this.entity.to.x,
        this.entity.from.y - this.entity.to.y
      ).rotate(HSCore.Util.Math.toRadians(90));
      
      constraintLine = [
        { x: vertex.x, y: vertex.y },
        { x: perpendicular.x + vertex.x, y: perpendicular.y + vertex.y }
      ];
    }
    
    return {
      constraintLine,
      isNeedInsertNewEdge
    };
  }

  /**
   * 计算起点和终点的约束方向
   * @private
   */
  private _computeConstraintDirection(): void {
    this._fromPointConstraintInfo = this._getConstraintInfo(this.entity.from);
    this._toPointConstraintInfo = this._getConstraintInfo(this.entity.to);
  }

  /**
   * 提交事务时的回调
   * 移除重复顶点并更新楼板面
   */
  onCommit(): void {
    this.removeDuplicatePoints();
    HSCore.Util.TgSlab.updateLayerSlabFaces(this.layer);
    super.onCommit();
  }

  /**
   * 是否可以对字段进行事务处理
   * @returns 总是返回true
   */
  canTransactField(): boolean {
    return true;
  }

  /**
   * 获取操作描述
   * @returns 操作的中文描述
   */
  getDescription(): string {
    return '移动楼板边';
  }

  /**
   * 获取操作分类
   * @returns 日志分组类型
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabOperation;
  }
}