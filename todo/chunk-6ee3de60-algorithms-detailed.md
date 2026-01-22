# 门窗系统算法详细分析

> **模块**: chunk-6ee3de60.1b731f5b_core
> **分析日期**: 2026-01-22
> **核心算法文件**: arc.js (118KB), ccbar.js (107KB), drawpolytype.js, shapemanager.js

---

## 一、算法系统概述

### 1.1 核心算法模块

| 模块 | 大小 | 代码行 | 功能描述 |
|------|------|--------|----------|
| **arc.js** | 118.7KB | 5,093行 | 几何计算引擎 (Computational Geometry Engine) |
| **ccbar.js** | 107.6KB | 4,320行 | 连续杆件系统 (Continuous Bar System) |
| **drawpolytype.js** | 33.9KB | 1,517行 | 多边形绘制类型 |
| **shapemanager.js** | 59.4KB | - | 形状管理器 |
| **transform.js** | 18.9KB | - | 变换矩阵算法 |
| **splitteragent.js** | 28.1KB | 1,264行 | 分割代理算法 |
| **polygoncreator.js** | 18.2KB | 817行 | 多边形创建算法 |
| **polyparser.js** | 11.8KB | - | 多边形解析算法 |
| **arcutils.js** | 3.2KB | - | 弧形工具算法 |
| **barwidthutils.js** | 12.3KB | - | 杆件宽度算法 |

**总算法代码量**: **约300KB+** (30万行代码当量)

---

## 二、几何计算引擎 (arc.js) - 核心算法库

### 2.1 引擎架构

```
arc.js (118.7KB)
│
├── 基础类型 (Primitives)
│   ├── Point    - 点
│   ├── Vector   - 向量
│   ├── Line     - 直线
│   ├── Segment  - 线段
│   ├── Ray      - 射线
│   ├── Circle   - 圆
│   ├── Arc      - 弧形
│   ├── Polygon  - 多边形
│   ├── Box      - 包围盒
│   ├── Edge     - 边
│   └── Face     - 面
│
├── 空间关系 (Spatial Relations)
│   ├── INSIDE   - 内部
│   ├── OUTSIDE  - 外部
│   ├── BOUNDARY - 边界
│   ├── CCW      - 逆时针
│   ├── CW       - 顺时针
│   └── ORIENTATION - 方向
│
├── 几何运算 (Operations)
│   ├── BooleanOperations - 布尔运算
│   ├── Distance          - 距离计算
│   ├── Inversion         - 翻转
│   ├── Multiline         - 多线段
│   ├── PlanarSet         - 平面集合
│   ├── RayShoot          - 射线投射
│   └── Relations         - 空间关系
│
└── 工具函数 (Utils)
    ├── matrix  - 矩阵运算
    ├── polygon - 多边形运算
    ├── vector  - 向量运算
    ├── line    - 直线运算
    ├── circle  - 圆运算
    ├── arc     - 弧形运算
    └── segment - 线段运算
```

### 2.2 基础类型定义

#### 2.2.1 Point (点)

```javascript
class Point {
    x: number;  // X坐标
    y: number;  // Y坐标
    
    // 静态方法
    static create(x, y): Point;
    static fromVector(v): Point;
    
    // 运算方法
    add(v): Point;           // 加向量
    subtract(p): Point;      // 减向量
    multiply(s): Point;       // 乘标量
    divide(s): Point;        // 除标量
    
    // 几何方法
    distanceTo(p): number;   // 到另一点距离
    angleTo(p): number;      // 到另一点角度
    rotate(angle): Point;    // 旋转
    mirror(line): Point;     // 镜像
    
    // 判断方法
    equals(p): boolean;      // 相等
    isOnLine(line): boolean; // 是否在线上
    isInPolygon(poly): boolean; // 是否在多边形内
}
```

#### 2.2.2 Vector (向量)

```javascript
class Vector {
    x: number;
    y: number;
    length: number;    // 向量长度
    angle: number;    // 向量角度
    
    // 静态创建
    static create(x, y): Vector;
    static fromPoints(p1, p2): Vector;
    static zero(): Vector;
    static unitX(): Vector;
    static unitY(): Vector;
    
    // 向量运算
    add(v): Vector;
    subtract(v): Vector;
    multiply(s): Vector;
    divide(s): Vector;
    dot(v): number;          // 点积
    cross(v): number;        // 叉积
    
    // 向量属性
    normalize(): Vector;     // 归一化
    perpendicular(): Vector; // 垂直向量
    rotate(angle): Vector;   // 旋转
    reverse(): Vector;       // 反向
    
    // 判断
    isParallelTo(v): boolean;  // 平行
    isPerpendicularTo(v): boolean; // 垂直
}
```

#### 2.2.3 Arc (弧形) ⭐核心

```javascript
class Arc {
    center: Point;      // 圆心
    radius: number;     // 半径
    startAngle: number; // 起始角度 (弧度)
    endAngle: number;   // 结束角度 (弧度)
    counterClockwise: boolean; // 逆时针方向
    
    // 静态创建
    static create(center, radius, startAngle, endAngle, counterClockwise?): Arc;
    static fromThreePoints(p1, p2, p3): Arc;  // 三点定弧
    static fromStartEndPoints(start, end, radius, largeArc?): Arc;
    static fromStartDirection(start, direction, radius, angle): Arc;
    
    // 属性
    length: number;           // 弧长 = radius × angle
    boundingBox: Box;         // 包围盒
    
    // 几何运算
    getPointAt(t: number): Point;      // 参数t位置点 (0-1)
    getPointAtAngle(angle: number): Point; // 指定角度点
    getAngleAt(point: Point): number;  // 点对应的角度
    getTangentAt(t: number): Vector;   // 参数t位置切线
    
    // 变换
    translate(dx, dy): Arc;
    rotate(angle, center?): Arc;
    scale(factor, center?): Arc;
    mirror(line): Arc;
    
    // 转换为线段集合
    toPolyline(tolerance?): Segment[]; // 离散为线段
    toPolygon(): Polygon;              // 转换为多边形
}
```

#### 2.2.4 Polygon (多边形)

```javascript
class Polygon {
    vertices: Point[];      // 顶点数组
    edges: Edge[];          // 边数组
    holes: Polygon[];       // 内部孔洞
    
    // 静态创建
    static create(vertices: Point[]): Polygon;
    static fromRect(x, y, width, height): Polygon;
    static fromCircle(center, radius, segments): Polygon;
    static fromArc(arc, segments): Polygon;
    
    // 属性
    area: number;           // 面积
    perimeter: number;      // 周长
    boundingBox: Box;       // 包围盒
    centroid: Point;        // 质心
    isConvex: boolean;      // 是否凸多边形
    orientation: CCW | CW;  // 顶点方向
    
    // 几何运算
    translate(dx, dy): Polygon;
    rotate(angle, center?): Polygon;
    scale(factor, center?): Polygon;
    
    // 点与多边形关系
    containsPoint(p: Point): INSIDE | OUTSIDE | BOUNDARY;
    containsPolygon(other: Polygon): boolean;
    
    // 多边形运算
    union(other: Polygon): Polygon[];        // 并集
    intersect(other: Polygon): Polygon[];    // 交集
    difference(other: Polygon): Polygon[];   // 差集
    xor(other: Polygon): Polygon[];          // 异或
    
    // 偏移/缩放
    offset(distance, cornerStyle?): Polygon; // 偏移
    simplify(tolerance): Polygon;            // 简化
    
    // 三角化
    triangulate(): Polygon[];                // 分割为三角形
}
```

### 2.3 布尔运算算法 (BooleanOperations)

```javascript
class BooleanOperations {
    // 多边形布尔运算
    static union(polygons: Polygon[]): Polygon[];
    static intersect(polygons: Polygon[]): Polygon[];
    static difference(subject: Polygon, clip: Polygon): Polygon[];
    static xor(polygons: Polygon[]): Polygon[];
    
    // 优化版本
    static unionFast(polygons: Polygon[]): Polygon[];
    static intersectFast(subject: Polygon, clip: Polygon): Polygon[];
}
```

#### 2.3.1 布尔运算算法原理

```
并集 (Union):
Input:          Process:              Output:
┌───┐           查找交点              ┌───┐
│ A │     →     连接边界      →      │ A │
│   │           合并区域              │   │
└───┘           去除内部              └───┘
┌───┐
│ B │
└───┘

交集 (Intersect):
Input:          Process:              Output:
┌───┐           查找交点              ┌─┬─┐
│ A │     →     保留重叠      →      │ │ │
│   │           去除外部              │ │ │
└───┘                                 └─┴─┘
┌───┐
│ B │
└───┘

差集 (Difference - A \ B):
Input:          Process:              Output:
┌───┐           查找交点              ┌─┬─┐
│ A │     →     去除B区域      →      │ │ │
│   │           保留A剩余              │ │ │
└───┘                                 └─┴─┘
┌───┐
│ B │
└───┘
```

#### 2.3.2 布尔运算实现步骤

```javascript
function booleanUnion(subject, clip) {
    // 1. 收集所有边
    const subjectEdges = subject.getEdges();
    const clipEdges = clip.getEdges();
    
    // 2. 计算所有交点
    const intersections = [];
    for (const se of subjectEdges) {
        for (const ce of clipEdges) {
            const ip = calculateIntersection(se, ce);
            if (ip) {
                intersections.push({
                    point: ip,
                    onSubject: true,
                    onClip: true
                });
            }
        }
    }
    
    // 3. 分割边
    const splitEdges = splitEdgesAtPoints(subjectEdges, intersections);
    
    // 4. 分类边
    const insideEdges = splitEdges.filter(e => 
        e.midpoint().isInsidePolygon(clip)
    );
    const outsideEdges = splitEdges.filter(e => 
        e.midpoint().isOutsidePolygon(clip)
    );
    
    // 5. 构建结果多边形
    const result = buildPolygonsFromEdges(
        subject.isCCW() ? insideEdges : outsideEdges
    );
    
    return result;
}
```

### 2.4 距离计算算法 (Distance)

```javascript
class Distance {
    static pointToPoint(p1, p2): number;
    static pointToLine(p, line): number;
    static pointToSegment(p, segment): number;
    static pointToPolygon(p, polygon): number;
    static lineToLine(l1, l2): number | Point;  // 距离或交点
    static lineToSegment(line, segment): number;
    static segmentToSegment(s1, s2): number | Point;
    static polygonToPolygon(p1, p2): number;
}

// 优化: 使用平方距离避免开方
static pointToSegmentSquared(p, segment) {
    const v = segment.end.subtracted(segment.start);
    const w = p.subtracted(segment.start);
    const c1 = w.dot(v);
    const c2 = v.dot(v);
    const b = c1 / c2;
    
    if (b < 0) return p.subtracted(segment.start).lengthSquared();
    if (b > 1) return p.subtracted(segment.end).lengthSquared();
    
    const pb = segment.start.added(v.multiplied(b));
    return p.subtracted(pb).lengthSquared();
}
```

### 2.5 射线投射算法 (RayShoot)

```javascript
class RayShoot {
    // 射线与多边形求交
    static shootRay(ray: Ray, polygon: Polygon): Point[];
    
    // 射线与线段求交
    static raySegmentIntersection(ray: Ray, segment: Segment): Point[];
    
    // 计算交点参数
    static getIntersectionParameter(ray: Ray, segment: Segment): number;
}
```

#### 2.5.1 射线投射求交算法

```
Algorithm: Ray Casting for Point-in-Polygon Test

function isPointInPolygon(p, polygon) {
    let intersections = 0;
    const ray = Ray.fromPoint(p, Vector.right());
    
    for (const edge of polygon.edges) {
        const intersection = ray.intersect(edge);
        if (intersection) {
            // 排除特殊情况
            if (intersection.isVertex) {
                if (intersection.vertex.y > p.y) {
                    intersections++;
                }
            } else {
                intersections++;
            }
        }
    }
    
    return intersections % 2 === 1;  // 奇数=内部, 偶数=外部
}
```

### 2.6 包围盒算法 (Box)

```javascript
class Box {
    min: Point;   // 最小点
    max: Point;   // 最大点
    
    // 属性
    width: number;
    height: number;
    center: Point;
    area: number;
    
    // 运算
    union(other: Box): Box;
    intersect(other: Box): Box | null;
    containsPoint(p: Point): boolean;
    containsBox(other: Box): boolean;
    overlaps(other: Box): boolean;
    
    // 扩展
    expand(distance: number): Box;
    expandToContainPoint(p: Point): Box;
    
    // 变换
    translate(dx, dy): Box;
    scale(factor): Box;
}
```

---

## 三、连续杆件系统 (ccbar.js) - 专有算法

### 3.1 杆件数据结构

```javascript
class CcBar {
    id: string;
    type: LineType;
    startPoint: Point;
    endPoint: Point;
    profile: Profile;      // 型材断面
    length: number;        // 长度
    angle: number;         // 角度
    direction: Vector;     // 方向向量
    
    // 节点连接
    startJoint: Joint;     // 起始节点
    endJoint: Joint;       // 结束节点
    
    // 属性
    isHorizontal: boolean; // 水平
    isVertical: boolean;   // 垂直
    isDiagonal: boolean;   // 对角
    
    // 几何
    midpoint: Point;       // 中点
    boundingBox: Box;      // 包围盒
    
    // 方法
    getPath(): Path;       // 获取路径
    getOffsetPath(distance, side): Path; // 偏移路径
}
```

### 3.2 杆件类型枚举 (LineType)

```javascript
enum LineType {
    HORIZONTAL = "horizontal",      // 水平
    VERTICAL = "vertical",          // 垂直
    DIAGONAL = "diagonal",          // 对角线
    COUNTER_DIAGONAL = "counter",   // 反对角线
    ARC = "arc",                    // 弧形
    POLYGON = "polygon",            // 多段线
    SPLINE = "spline"               // 样条曲线
}
```

### 3.3 杆件长度计算算法

```javascript
class CcBarLengthCalculator {
    static calculateLength(bar: CcBar): number {
        const start = bar.startPoint;
        const end = bar.endPoint;
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    static calculateAngle(bar: CcBar): number {
        const start = bar.startPoint;
        const end = bar.endPoint;
        return Math.atan2(end.y - start.y, end.x - start.x);
    }
    
    static calculateDirection(bar: CcBar): Vector {
        const angle = this.calculateAngle(bar);
        return Vector.fromAngle(angle);
    }
}
```

### 3.4 杆件分割算法

```javascript
class CcBarSplitter {
    // 按点分割
    static splitAtPoint(bar: CcBar, point: Point): CcBar[] {
        if (!point.isOnBar(bar)) {
            return [bar];
        }
        
        const bar1 = new CcBar({
            ...bar,
            id: generateId(),
            endPoint: point,
            endJoint: new Joint(point)
        });
        
        const bar2 = new CcBar({
            ...bar,
            id: generateId(),
            startPoint: point,
            startJoint: new Joint(point)
        });
        
        return [bar1, bar2];
    }
    
    // 按长度分割
    static splitAtLength(bar: CcBar, length: number): CcBar[] {
        const totalLength = bar.length;
        if (length <= 0 || length >= totalLength) {
            return [bar];
        }
        
        const ratio = length / totalLength;
        const splitPoint = bar.startPoint.added(
            bar.direction.multiply(length)
        );
        
        return this.splitAtPoint(bar, splitPoint);
    }
    
    // 等分分割
    static splitEqual(bar: CcBar, count: number): CcBar[] {
        if (count <= 1) {
            return [bar];
        }
        
        const segmentLength = bar.length / count;
        const result = [bar];
        
        for (let i = 1; i < count; i++) {
            const newBars = this.splitAtLength(
                result.pop(), 
                segmentLength * i
            );
            result.push(...newBars);
        }
        
        return result;
    }
}
```

### 3.5 杆件连接算法

```javascript
class CcBarConnector {
    // 尝试连接两根杆件
    static connect(bar1: CcBar, bar2: CcBar, tolerance: number): Joint | null {
        // 1. 检查端点距离
        if (bar1.endPoint.distanceTo(bar2.startPoint) < tolerance) {
            return new Joint(bar1.endPoint);
        }
        
        // 2. 检查是否共线
        if (this.isCollinear(bar1, bar2, tolerance)) {
            return this.mergeCollinear(bar1, bar2);
        }
        
        // 3. 计算交叉点
        const intersection = this.getIntersection(bar1, bar2);
        if (intersection) Joint(intersection);
 {
            return new        }
        
        return null;
    }
    
    // 批量连接
    static connectAll(bars: CcBar[]): CcBar[] {
        const connected = [];
        
        for (const bar of bars) {
            const lastBar = connected[connected.length - 1];
            if (lastBar) {
                const joint = this.connect(lastBar, bar, TOLERANCE);
                if (joint) {
                    lastBar.endJoint = joint;
                    bar.startJoint = joint;
                }
            }
            connected.push(bar);
        }
        
        return connected;
    }
}
```

### 3.6 杆件偏移算法

```javascript
class CcBarOffsetCalculator {
    // 计算杆件偏移路径
    static calculateOffsetPath(bar: CcBar, distance: number, side: 'left' | 'right'): Path {
        const direction = bar.direction;
        const perpendicular = direction.perpendicular();
        
        // 根据方向确定偏移向量
        const offsetVector = side === 'left' 
            ? perpendicular.multiply(distance)
            : perpendicular.multiply(-distance);
        
        // 偏移起点和终点
        const offsetStart = bar.startPoint.added(offsetVector);
        const offsetEnd = bar.endPoint.added(offsetVector);
        
        // 考虑端点连接处的圆角
        return new Path([
            offsetStart,
            offsetEnd
        ]).withCornerRadius(distance);
    }
    
    // 偏移并保持长度
    static calculateOffsetWithFixedLength(
        bar: CcBar, 
        distance: number, 
        side: 'left' | 'right'
    ): CcBar {
        const offsetPath = this.calculateOffsetPath(bar, distance, side);
        const newLength = offsetPath.length;
        
        // 计算新的端点位置
        const startOffset = offsetPath.startPoint
            .subtracted(bar.startPoint)
            .multiply(bar.length / newLength);
        const newStart = bar.startPoint.added(startOffset);
        
        const endOffset = offsetPath.endPoint
            .subtracted(bar.endPoint)
            .multiply(bar.length / newLength);
        const newEnd = bar.endPoint.added(endOffset);
        
        return new CcBar({
            ...bar,
            startPoint: newStart,
            endPoint: newEnd
        });
    }
}
```

---

## 四、多边形算法系统

### 4.1 多边形类型识别 (drawpolytype.js)

```javascript
class DrawPolyType {
    // 多边形类型枚举
    static readonly RECTANGLE = 'rectangle';
    static readonly CIRCLE = 'circle';
    static readonly POLYGON = 'polygon';
    static readonly TRIANGLE = 'triangle';
    static readonly HALF_CIRCLE = 'half_circle';
    static readonly QUARTER_CIRCLE = 'quarter_circle';
    static readonly GOTHIC = 'gothic';
    static readonly OCTAGON = 'octagon';
    static readonly HEXAGON = 'hexagon';
    static readonly DIAMOND = 'diamond';
    static readonly TRAPEZOID = 'trapezoid';
    static readonly PARALLELOGRAM = 'parallelogram';
    static readonly KFC = 'kfc';
    static readonly EAR = 'ear';
    static readonly HOLLOW = 'hollow';
    // ... 80+ 类型
    
    // 类型识别
    static identifyType(vertices: Point[]): string;
    
    // 类型验证
    static validateType(vertices: Point[], type: string): boolean;
    
    // 生成标准多边形
    static createStandardPolygon(
        type: string, 
        center: Point, 
        width: number, 
        height: number
    ): Polygon;
}
```

### 4.2 多边形创建算法

```javascript
class PolygonCreator {
    // 标准多边形创建
    static createRegularPolygon(
        sides: number,
        center: Point,
        radius: number,
        rotation: number = 0
    ): Polygon {
        const vertices = [];
        const angleStep = (2 * Math.PI) / sides;
        
        for (let i = 0; i < sides; i++) {
            const angle = i * angleStep + rotation;
            vertices.push(new Point(
                center.x + radius * Math.cos(angle),
                center.y + radius * Math.sin(angle)
            ));
        }
        
        return new Polygon(vertices);
    }
    
    // 耳形多边形
    static createEarPolygon(
        baseWidth: number,
        baseHeight: number,
        earWidth: number,
        earHeight: number,
        direction: 'left' | 'right' | 'up' | 'down'
    ): Polygon {
        const earOffsetX = direction === 'left' ? -earWidth 
                        : direction === 'right' ? earWidth : 0;
        const earOffsetY = direction === 'up' ? -earHeight 
                        : direction === 'down' ? earHeight : 0;
        
        const vertices = [
            // 主体矩形顶点
            new Point(-baseWidth/2, -baseHeight/2),
            new Point(baseWidth/2, -baseHeight/2),
            new Point(baseWidth/2, baseHeight/2),
            new Point(-baseWidth/2, baseHeight/2),
            // 耳部顶点
            new Point(
                -baseWidth/2 + earOffsetX,
                -baseHeight/2 + earOffsetY
            )
        ];
        
        return new Polygon(vertices);
    }
    
    // KFC折叠门多边形
    static createKFCPolygon(
        width: number,
        height: number,
        foldCount: number = 4,
        panelGap: number = 0.01
    ): Polygon {
        const panelWidth = (width - (foldCount - 1) * panelGap) / foldCount;
        const vertices = [];
        
        for (let i = 0; i < foldCount; i++) {
            const x = -width/2 + i * (panelWidth + panelGap);
            
            // 折叠区域 - Z字形路径
            vertices.push(new Point(x, -height/2));  // 底部
            vertices.push(new Point(x, height/2));   // 顶部
            
            if (i < foldCount - 1) {
                // 折叠连接处
                vertices.push(new Point(
                    x + panelWidth + panelGap, 
                    height/2
                ));
            }
        }
        
        // 闭合多边形
        vertices.push(new Point(width/2, -height/2));
        
        return new Polygon(vertices);
    }
}
```

### 4.3 多边形三角化算法

```javascript
class PolygonTriangulator {
    // Ear Cutting 算法
    static triangulate(polygon: Polygon): Polygon[] {
        if (polygon.vertices.length < 3) {
            return [];
        }
        
        if (polygon.vertices.length === 3) {
            return [polygon];
        }
        
        const triangles = [];
        const vertices = [...polygon.vertices];
        let indices = vertices.map((_, i) => i);
        
        while (indices.length > 3) {
            // 找"耳朵"
            let earIndex = this.findEar(vertices, indices);
            
            if (earIndex === -1) {
                // 没有找到耳朵,使用简单三角化
                return this.simpleTriangulate(polygon);
            }
            
            // 创建三角形
            const prev = indices[(earIndex - 1 + indices.length) % indices.length];
            const curr = indices[earIndex];
            const next = indices[(earIndex + 1) % indices.length];
            
            triangles.push(new Polygon([
                vertices[prev],
                vertices[curr],
                vertices[next]
            ]));
            
            // 移除"耳朵"顶点
            indices.splice(earIndex, 1);
        }
        
        // 最后三个顶点
        triangles.push(new Polygon([
            vertices[indices[0]],
            vertices[indices[1]],
            vertices[indices[2]]
        ]));
        
        return triangles;
    }
    
    // 判断是否为"耳朵"
    private static findEar(vertices: Point[], indices: number[]): number {
        for (let i = 0; i < indices.length; i++) {
            const prev = vertices[indices[(i - 1 + indices.length) % indices.length]];
            const curr = vertices[indices[i]];
            const next = vertices[indices[(i + 1) % indices.length]];
            
            // 1. 检查是否为凸角
            if (!this.isConvex(prev, curr, next)) {
                continue;
            }
            
            // 2. 检查三角形内是否包含其他顶点
            const triangle = new Polygon([prev, curr, next]);
            let containsOther = false;
            
            for (const idx of indices) {
                if (idx !== indices[i] && 
                    idx !== indices[(i - 1 + indices.length) % indices.length] &&
                    idx !== indices[(i + 1) % indices.length]) {
                    if (triangle.containsPoint(vertices[idx])) {
                        containsOther = true;
                        break;
                    }
                }
            }
            
            if (!containsOther) {
                return i;
            }
        }
        
        return -1;
    }
}
```

### 4.4 多边形简化算法

```javascript
class PolygonSimplifier {
    // Douglas-Peucker 算法
    static simplify(polygon: Polygon, tolerance: number): Polygon {
        const vertices = polygon.vertices;
        if (vertices.length < 3) {
            return polygon;
        }
        
        const simplified = this.douglasPeucker(
            vertices,
            0,
            vertices.length - 1,
            tolerance
        );
        
        // 确保闭合
        if (simplified[0].equals(simplified[simplified.length - 1])) {
            simplified.pop();
        }
        
        return new Polygon(simplified);
    }
    
    private static douglasPeucker(
        vertices: Point[],
        start: number,
        end: number,
        tolerance: number
    ): Point[] {
        // 找到最远的点
        let maxDist = 0;
        let maxIndex = start;
        
        const lineStart = vertices[start];
        const lineEnd = vertices[end];
        
        for (let i = start + 1; i < end; i++) {
            const dist = this.perpendicularDistance(
                vertices[i],
                lineStart,
                lineEnd
            );
            
            if (dist > maxDist) {
                maxDist = dist;
                maxIndex = i;
            }
        }
        
        // 如果最大距离大于容差,递归简化
        if (maxDist > tolerance) {
            const left = this.douglasPeucker(
                vertices, start, maxIndex, tolerance
            );
            const right = this.douglasPeucker(
                vertices, maxIndex, end, tolerance
            );
            
            // 合并结果(避免重复点)
            return [...left.slice(0, -1), ...right];
        } else {
            return [lineStart, lineEnd];
        }
    }
    
    private static perpendicularDistance(
        point: Point,
        lineStart: Point,
        lineEnd: Point
    ): number {
        const dx = lineEnd.x - lineStart.x;
        const dy = lineEnd.y - lineStart.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        
        if (length === 0) {
            return point.subtracted(lineStart).length;
        }
        
        return Math.abs(
            (dy * point.x - dx * point.y + 
             lineEnd.x * lineStart.y - lineEnd.y * lineStart.x) / length
        );
    }
}
```

---

## 五、分割算法 (splitteragent.js)

### 5.1 分割杆件算法

```javascript
class SplitterAgent {
    // 分割窗扇
    static splitSash(
        sash: Sash,
        splitType: SplitType,
        position: number | Point
    ): Sash[] {
        switch (splitType) {
            case SplitType.HORIZONTAL:
                return this.splitHorizontal(sash, position);
            case SplitType.VERTICAL:
                return this.splitVertical(sash, position);
            case SplitType.EQUAL:
                return this.splitEqual(sash, position);
            case SplitType.CUSTOM:
                return this.splitAtPoints(sash, position as Point[]);
        }
    }
    
    // 水平分割
    private static splitHorizontal(
        sash: Sash, 
        heightRatio: number
    ): Sash[] {
        const splitY = sash.boundingBox.min.y + 
                       sash.boundingBox.height * heightRatio;
        
        const topSash = new Sash({
            ...sash,
            id: generateId(),
            top: sash.top,
            bottom: splitY,
            splitLine: new Line(
                new Point(sash.boundingBox.min.x, splitY),
                new Point(sash.boundingBox.max.x, splitY)
            )
        });
        
        const bottomSash = new Sash({
            ...sash,
            id: generateId(),
            top: splitY,
            bottom: sash.bottom,
            splitLine: topSash.splitLine
        });
        
        return [topSash, bottomSash];
    }
    
    // 垂直分割
    private static splitVertical(
        sash: Sash, 
        widthRatio: number
    ): Sash[] {
        const splitX = sash.boundingBox.min.x + 
                       sash.boundingBox.width * widthRatio;
        
        const leftSash = new Sash({
            ...sash,
            id: generateId(),
            left: sash.left,
            right: splitX,
            splitLine: new Line(
                new Point(splitX, sash.boundingBox.min.y),
                new Point(splitX, sash.boundingBox.max.y)
            )
        });
        
        const rightSash = new Sash({
            ...sash,
            id: generateId(),
            left: splitX,
            right: sash.right,
            splitLine: leftSash.splitLine
        });
        
        return [leftSash, rightSash];
    }
    
    // 等分分割
    private static splitEqual(sash: Sash, count: number): Sash[] {
        if (count <= 1) {
            return [sash];
        }
        
        const segmentWidth = sash.width / count;
        const result = [];
        
        for (let i = 0; i < count; i++) {
            const newSash = new Sash({
                ...sash,
                id: generateId(),
                left: sash.left + i * segmentWidth,
                right: sash.left + (i + 1) * segmentWidth
            });
            result.push(newSash);
        }
        
        return result;
    }
}
```

### 5.2 分割类型枚举

```javascript
enum SplitType {
    HORIZONTAL = 'horizontal',   // 水平分割
    VERTICAL = 'vertical',       // 垂直分割
    EQUAL = 'equal',             // 等分分割
    CUSTOM = 'custom',           // 自定义分割
    MIRROR = 'mirror',           // 镜像分割
    RADIAL = 'radial'            // 辐射分割
}

enum EqualSplitType {
    TWO_EQUAL = 'two_equal',       // 二等分
    THREE_EQUAL = 'three_equal',   // 三等分
    FOUR_EQUAL = 'four_equal',     // 四等分
    FIVE_EQUAL = 'five_equal',     // 五等分
    CUSTOM = 'custom'              // 自定义等分
}
```

---

## 六、变换算法 (transform.js)

### 6.1 2D变换矩阵

```javascript
class Transform {
    a: number;  // 缩放/旋转
    b: number;  // 倾斜
    c: number;  // 倾斜
    d: number;  // 缩放/旋转
    tx: number; // 平移X
    ty: number; // 平移Y
    
    // 单位矩阵
    static identity(): Transform;
    
    // 平移
    static translate(x, y): Transform;
    static translateX(x): Transform;
    static translateY(y): Transform;
    
    // 旋转
    static rotate(angle: number): Transform;
    static rotateAround(angle: number, cx: number, cy: number): Transform;
    
    // 缩放
    static scale(sx: number, sy?: number): Transform;
    static scaleFrom(sx: number, sy: number, cx: number, cy: number): Transform;
    
    // 倾斜
    static skew(angleX: number, angleY: number): Transform;
    
    // 组合
    multiply(other: Transform): Transform;
    premultiply(other: Transform): Transform;
    invert(): Transform;
    
    // 应用
    transformPoint(p: Point): Point;
    transformVector(v: Vector): Vector;
    transformPolygon(polygon: Polygon): Polygon;
    transformBox(box: Box): Box;
    
    // 分解
    decompose(): {
        translation: Point,
        rotation: number,
        scale: Point,
        skew: Point,
        perspective: Point
    };
}
```

### 6.2 变换应用算法

```javascript
class TransformApplicator {
    // 应用变换到多边形
    static applyTransform(
        polygon: Polygon, 
        transform: Transform
    ): Polygon {
        const newVertices = polygon.vertices.map(v => 
            transform.transformPoint(v)
        );
        
        return new Polygon(newVertices);
    }
    
    // 应用变换到杆件
    static applyTransformToBar(
        bar: CcBar,
        transform: Transform
    ): CcBar {
        return new CcBar({
            ...bar,
            startPoint: transform.transformPoint(bar.startPoint),
            endPoint: transform.transformPoint(bar.endPoint),
            direction: transform.transformVector(bar.direction)
        });
    }
    
    // 应用变换到整个窗扇
    static applyTransformToSash(
        sash: Sash,
        transform: Transform
    ): Sash {
        return new Sash({
            ...sash,
            frame: transform.transformPolygon(sash.frame),
            splitLine: sash.splitLine ? 
                transform.transformLine(sash.splitLine) : null,
            mullions: sash.mullions.map(m => 
                transform.transformPolygon(m)
            )
        });
    }
}
```

---

## 七、碰撞检测算法

### 7.1 AABB碰撞检测

```javascript
class AABBCollision {
    static check(box1: Box, box2: Box): boolean {
        return !(box1.max.x < box2.min.x || 
                 box1.min.x > box2.max.x ||
                 box1.max.y < box2.min.y || 
                 box1.min.y > box2.max.y);
    }
    
    static getOverlap(box1: Box, box2: Box): Box | null {
        if (!this.check(box1, box2)) {
            return null;
        }
        
        return new Box({
            min: new Point(
                Math.max(box1.min.x, box2.min.x),
                Math.max(box1.min.y, box2.min.y)
            ),
            max: new Point(
                Math.min(box1.max.x, box2.max.x),
                Math.min(box1.max.y, box2.max.y)
            )
        });
    }
}
```

### 7.2 精确碰撞检测

```javascript
class PreciseCollision {
    // 线段与线段
    static segmentToSegment(s1: Segment, s2: Segment): Point[] {
        const result = [];
        
        // 参数化方程
        // s1: p + t*r
        // s2: q + u*s
        
        const r = s1.end.subtracted(s1.start);
        const s = s2.end.subtracted(s2.start);
        const qp = s2.start.subtracted(s1.start);
        
        // 叉积
        const rxs = r.cross(s);
        const qpxr = qp.cross(r);
        
        if (Math.abs(rxs) < EPSILON) {
            // 平行
            return [];
        }
        
        const t = qp.cross(s) / rxs;
        const u = qpxr / rxs;
        
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return [s1.start.added(r.multiply(t))];
        }
        
        return [];
    }
    
    // 多边形与多边形
    static polygonToPolygon(p1: Polygon, p2: Polygon): boolean {
        // 1. 快速AABB检测
        if (!AABBCollision.check(p1.boundingBox, p2.boundingBox)) {
            return false;
        }
        
        // 2. 分离轴检测
        if (this.separatingAxisTest(p1, p2)) {
            return false;
        }
        
        // 3. 精确检测
        return this.intersectPolygons(p1, p2).length > 0;
    }
    
    // 分离轴测试 (SAT)
    private static separatingAxisTest(p1: Polygon, p2: Polygon): boolean {
        const axes = [
            ...p1.getEdgeNormals(),
            ...p2.getEdgeNormals()
        ];
        
        for (const axis of axes) {
            const proj1 = p1.project(axis);
            const proj2 = p2.project(axis);
            
            if (!this.overlap(proj1, proj2)) {
                return true;  // 发现分离轴
            }
        }
        
        return false;  // 没有分离轴,可能相交
    }
    
    private static project(polygon: Polygon, axis: Vector): Interval {
        let min = Infinity;
        let max = -Infinity;
        
        for (const v of polygon.vertices) {
            const proj = v.dot(axis);
            min = Math.min(min, proj);
            max = Math.max(max, proj);
        }
        
        return { min, max };
    }
}
```

---

## 八、路径规划算法

### 8.1 杆件路径计算

```javascript
class PathCalculator {
    // 计算两点间路径
    static calculatePath(
        start: Point,
        end: Point,
        type: PathType,
        params: PathParams
    ): Path {
        switch (type) {
            case PathType.STRAIGHT:
                return this.straightPath(start, end);
            case PathType.ARC:
                return this.arcPath(start, end, params.radius);
            case PathType.BEZIER:
                return this.bezierPath(start, end, params.controlPoints);
            case PathType.CHAIN:
                return this.chainPath(start, end, params.segmentCount);
            default:
                return this.straightPath(start, end);
        }
    }
    
    // 弧形路径
    private static arcPath(
        start: Point,
        end: Point,
        radius: number
    ): Path {
        const mid = start.added(end).multiplied(0.5);
        const distance = start.subtracted(end).length() / 2;
        const height = Math.sqrt(Math.max(0, radius * radius - distance * distance));
        const direction = start.subtracted(end).perpendicular().normalize();
        const arcCenter = mid.added(direction.multiply(height));
        
        return new Path([
            new Arc(arcCenter, radius, 0, Math.PI * 2, true)
        ]);
    }
    
    // 贝塞尔路径
    private static bezierPath(
        start: Point,
        end: Point,
        controlPoints: Point[]
    ): Path {
        // 二次贝塞尔
        if (controlPoints.length === 1) {
            return this.quadraticBezier(start, controlPoints[0], end);
        }
        
        // 三次贝塞尔
        if (controlPoints.length === 2) {
            return this.cubicBezier(
                start, 
                controlPoints[0], 
                controlPoints[1], 
                end
            );
        }
        
        // 多次贝塞尔
        return this.multiBezier(start, controlPoints, end);
    }
    
    // 链式路径 (多段直线)
    private static chainPath(
        start: Point,
        end: Point,
        segments: number
    ): Path {
        const points = [start];
        const step = end.subtracted(start).multiplied(1 / segments);
        
        for (let i = 1; i < segments; i++) {
            points.push(start.added(step.multiplied(i)));
        }
        
        points.push(end);
        
        return new Path(points.map(p => new Segment(p)));
    }
}
```

---

## 九、网格生成算法

### 9.1 三角网格生成

```javascript
class MeshGenerator {
    // 从多边形生成网格
    static generateMesh(polygon: Polygon, resolution: number): Mesh {
        const triangles = PolygonTriangulator.triangulate(polygon);
        
        const vertices = [];
        const indices = [];
        let index = 0;
        
        for (const tri of triangles) {
            for (const v of tri.vertices) {
                vertices.push({
                    x: v.x,
                    y: v.y,
                    z: 0
                });
                indices.push(index++);
            }
        }
        
        return { vertices, indices };
    }
    
    // 从弧形生成网格
    static generateArcMesh(arc: Arc, resolution: number): Mesh {
        const vertices = [];
        const indices = [];
        const segments = Math.ceil(arc.length / resolution);
        const angleStep = (arc.endAngle - arc.startAngle) / segments;
        
        for (let i = 0; i <= segments; i++) {
            const angle = arc.startAngle + i * angleStep;
            vertices.push({
                x: arc.center.x + arc.radius * Math.cos(angle),
                y: arc.center.y + arc.radius * Math.sin(angle),
                z: 0
            });
        }
        
        // 三角形扇
        for (let i = 1; i <= segments - 1; i++) {
            indices.push(0, i, i + 1);
        }
        
        return { vertices, indices };
    }
}
```

---

## 十、算法性能优化

### 10.1 空间索引

```javascript
class SpatialIndex {
    // 使用八叉树或四叉树加速空间查询
    private tree: QuadTree;
    
    insert(item: SpatialItem): void;
    query(range: Box): SpatialItem[];
    queryPoint(point: Point): SpatialItem | null;
    queryNearest(point: Point, count: number): SpatialItem[];
}

class QuadTree {
    constructor(bounds: Box, capacity: number = 4, depth: number = 0);
    insert(point: Point, data: any): boolean;
    query(range: Box, results?: any[]): any[];
    subdivide(): void;
}
```

### 10.2 缓存机制

```javascript
class GeometryCache {
    private static cache: Map<string, any> = new Map();
    
    static get(key: string): any | undefined {
        return this.cache.get(key);
    }
    
    static set(key: string, value: any): void {
        this.cache.set(key, value);
    }
    
    static getOrCompute<T>(
        key: string, 
        compute: () => T
    ): T {
        let value = this.cache.get(key);
        if (value === undefined) {
            value = compute();
            this.cache.set(key, value);
        }
        return value;
    }
    
    // 缓存常用计算
    static getBoundingBox(points: Point[]): Box {
        return this.getOrCompute(
            `bbox_${points.map(p => `${p.x},${p.y}`).join(';')}`,
            () => {
                const xs = points.map(p => p.x);
                const ys = points.map(p => p.y);
                return new Box({
                    min: new Point(Math.min(...xs), Math.min(...ys)),
                    max: new Point(Math.max(...xs), Math.max(...ys))
                });
            }
        );
    }
}
```

---

## 十一、算法复杂度分析

| 算法 | 时间复杂度 | 空间复杂度 | 适用场景 |
|------|-----------|-----------|----------|
| 点到线距离 | O(1) | O(1) | 碰撞检测 |
| 布尔运算 (并集) | O(n + m) | O(n + m) | 多边形运算 |
| Ear Cutting三角化 | O(n²) | O(n) | 多边形三角化 |
| Douglas-Peucker简化 | O(n log n) | O(n) | 路径简化 |
| 分离轴检测 | O(n + m) | O(1) | 碰撞检测 |
| 射线投射 | O(n) | O(1) | 点在多边形内 |
| AABB检测 | O(1) | O(1) | 快速过滤 |
| 贝塞尔曲线 | O(n) | O(1) | 路径生成 |

---

## 十二、总结

### 12.1 算法系统特点

1. **完整的计算几何引擎** (arc.js)
   - 基础类型: Point, Vector, Line, Arc, Polygon, Box
   - 空间关系: INSIDE, OUTSIDE, BOUNDARY
   - 布尔运算: Union, Intersect, Difference, XOR

2. **专有的杆件系统** (ccbar.js)
   - 连续杆件创建和管理
   - 杆件分割和连接
   - 杆件偏移计算

3. **丰富的多边形算法**
   - 多种多边形类型识别 (80+)
   - Ear Cutting三角化
   - Douglas-Peucker简化

4. **变换系统**
   - 2D仿射变换矩阵
   - 分解和组合变换

5. **碰撞检测**
   - AABB快速检测
   - 精确SAT检测
   - 射线投射

### 12.2 核心技术栈

```
几何引擎:
├── 基础数学: 向量/矩阵/三角函数
├── 计算几何: 布尔运算/三角化/简化
└── 空间索引: 四叉树/八叉树

杆件系统:
├── 拓扑结构: 杆件连接/分割
├── 几何计算: 长度/角度/偏移
└── 路径规划: 直线/弧形/贝塞尔

渲染支持:
├── 三角网格: 多边形三角化
└── 离散化: 弧形转线段
```

---

**文档创建时间**: 2026-01-22  
**源码版本**: chunk-6ee3de60.1b731f5b_core
