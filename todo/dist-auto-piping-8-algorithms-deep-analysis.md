
# dist/ 暗装水电风暖 8大自动管道算法深度分析

> **基于 dist/core-hs.fe5726b7.bundle 真实源码的算法剖析**  
> 文档版本: v1.0 | 分析日期: 2026-01-24 | 来源: 反编译源码  
> 核心模块: [`tubemeshtypeenum.js`](dist/core-hs.fe5726b7.bundle_dewebpack/tubemeshtypeenum.js), [`concealedwork.js`](dist/core-hs.fe5726b7.bundle_dewebpack/concealedwork.js)

---

## 📋 目录

1. [系统总览](#1-系统总览)
2. [算法1: 自动强电算法](#2-算法1-自动强电算法)
3. [算法2: 自动弱电算法](#3-算法2-自动弱电算法)
4. [算法3: 自动空调管道算法](#4-算法3-自动空调管道算法)
5. [算法4: 自动插座算法](#5-算法4-自动插座算法)
6. [算法5: 新风管道算法](#6-算法5-新风管道算法)
7. [算法6: 自动过路管算法](#7-算法6-自动过路管算法)
8. [算法7: 自动给水算法](#8-算法7-自动给水算法)
9. [算法8: 自动排水算法](#9-算法8-自动排水算法)
10. [核心共享算法](#10-核心共享算法)
11. [技术总结](#11-技术总结)

---

## 1. 系统总览

### 1.1 8大自动管道系统架构

```
暗装工程系统 (ConcealedWork)
├── 1. 自动强电系统 (StrongElec)     ⚡ 配电箱 → 插座/开关
├── 2. 自动弱电系统 (WeakElec)       🔌 弱电箱 → 网络/电视端口
├── 3. 自动空调管道 (Refrigerant)    ❄️ 室外机 → 室内机 (dist5实现)
├── 4. 自动插座系统 (Socket)         🔋 智能插座布局
├── 5. 新风管道 (VentilationFresh)   🌪️ 新风机 → 风口 (dist5实现)
├── 6. 自动过路管 (Bridge/Lintel)    🌉 碰撞避让系统
├── 7. 自动给水系统 (ColdWater)      💧 水表 → 用水点
└── 8. 自动排水系统 (DrainWater)     🚰 地漏 → 主管道 (dist5实现)
```

### 1.2 dist vs dist5 实现对比

| 系统 | dist实现 | dist5实现 | 说明 |
|------|---------|----------|------|
| 强电 | ✅ 完整 | ✅ 增强 | dist基础版，dist5专业版 |
| 弱电 | ✅ 完整 | ✅ 增强 | 同上 |
| 空调 | ❌ 无 | ✅ 完整 | dist5新增制冷剂+冷凝水系统 |
| 插座 | ✅ 组件 | ✅ 组件 | 作为强弱电端点 |
| 新风 | ❌ 无 | ✅ 完整 | dist5专业MEP功能 |
| 过路管 | ✅ 基础 | ✅ 完整 | dist弧线避让，dist5 Bridge+Lintel |
| 给水 | ✅ 完整 | ✅ 增强 | 冷水+热水双系统 |
| 排水 | ❌ 无 | ✅ 完整 | dist5新增 |

### 1.3 核心数据结构

**源码位置**: [`concealedwork_io.js:38-82`](dist/core-hs.fe5726b7.bundle_dewebpack/concealedwork_io.js:38)

```typescript
// 暗装工程主类
class ConcealedWork extends ConcealedWorkCompEntity {
    // 管线树数组（强电、弱电、冷水、热水各一棵树）
    tubeTrees: ConcealedWorkTubeTree[]
    
    // 按类型获取管线树
    getStrongElecTubeTrees(): ConcealedWorkTubeTree[]  // 强电树
    getWeakElecTubeTrees(): ConcealedWorkTubeTree[]    // 弱电树
    getHotWaterTubeTrees(): ConcealedWorkTubeTree[]    // 热水树
    getColdWaterTubeTrees(): ConcealedWorkTubeTree[]   // 冷水树
}

// 管线树类
class ConcealedWorkTubeTree extends ConcealedWorkTree {
    tubes: ConcealedWorkTube[]        // 管段数组
    nodes: ConcealedWorkNode[]        // 节点数组
    diameter: number                  // 管径
    comp: TreeComp                    // 组件类型（强电/弱电/冷水/热水）
}

// 管段类
class ConcealedWorkTube {
    route: (Line3d | Arc3d)[]        // 路径（直线或弧线）
    diameter: number                  // 管径
    nodes: ConcealedWorkNode[]        // 起终点节点
    tree: ConcealedWorkTubeTree       // 所属管线树
}

// 节点类
class ConcealedWorkNode {
    position: Vector3                 // 3D坐标
    parentNode: ConcealedWorkNode     // 父节点
    childNodes: ConcealedWorkNode[]   // 子节点
}
```

### 1.4 核心算法引擎

**源码位置**: [`tubemeshtypeenum.js:40-51`](dist/core-hs.fe5726b7.bundle_dewebpack/tubemeshtypeenum.js:40)

```javascript
class TubeMeshCreator {
    // 单例模式
    static instance = new TubeMeshCreator()
    
    // 物理常量
    static elecPathR = 0.1              // 电线弯曲半径 100mm
    static waterPathR = 0.03            // 水管弯头长度 30mm
    static waterTubeThickness = 0.005   // 水管壁厚 5mm
    static precision = 1e-6             // 计算精度 10^-6
    
    // 核心算法
    calculateCrossArc(tube)             // 交叉避让算法
    createTube(route, diameter)         // 管道网格生成
    getBoundBox(data, meshType)         // 包围盒计算
    getTransform(data, meshType)        // 变换矩阵计算
}
```

---

## 2. 算法1: 自动强电算法

### 2.1 算法概述

**功能**: 从配电箱自动生成到所有强电插座、开关、照明设备的电线管路

**核心类**: [`StrongElecComp`](dist/core-hs.fe5726b7.bundle_dewebpack/strongeleccomp.js)

**管道类型**: 弧形避让（Arc3d）

**颜色标识**: 🟠 #FF9045 橙红色

### 2.2 强电组件定义

**源码位置**: [`strongeleccomp.js:17-38`](dist/core-hs.fe5726b7.bundle_dewebpack/strongeleccomp.js:17)

```javascript
class StrongElecComp extends TreeComp {
    // 组件类型
    static Type = TreeCompEnum.StrongElec  // "StrongElec"
    
    get type() {
        return StrongElecComp.Type
    }
    
    dump() {
        return { tp: ComponentTypeDump.StrongElec }  // "sel"
    }
    
    static load(data, referObject) {
        const comp = new StrongElecComp()
        comp._referObject = referObject
        return comp
    }
}
```

### 2.3 强电管道生成算法（13步）

#### 步骤1: 初始化管线树

**源码位置**: [`concealedwork.js:19-24`](dist/core-hs.fe5726b7.bundle_dewebpack/concealedwork.js:19)

```javascript
onInit() {
    // 遍历所有强电管线树
    this.entity.tubeTrees.forEach((tubeTree => {
        this.createViewModel(tubeTree)  // 创建视图模型
    }))
}
```

#### 步骤2: 判断管段类型

**源码位置**: [`concealedworktube.js:194-212`](dist/core-hs.fe5726b7.bundle_dewebpack/concealedworktube.js:194)

```javascript
getTubeMeshType() {
    // 直管段判断（2个节点）
    if (this.entity.nodes.length === 2) 
        return TubeMeshTypeEnum.straight
    
    const dirs = this.getDirsWithWeight()
    if (this.entity.tree) {
        const nodePos = this.entity.startNode?.worldPos || new Vector3
        
        if (dirs.length !== 2) 
            return TubeMeshTypeEnum.other
        
        // 计算两个方向向量
        const dir1 = dirs[0].subtracted(nodePos)
        const dir2 = dirs[1].subtracted(nodePos)
        
        // 点积判断是否垂直（90度）
        if (MathUtil.isNearlyEqual(dir1.dot(dir2), 0)) {
            // 强电组件 → 返回电气弯头类型
            if (this.entity.tree.getComponent(Model.CWStrongElecComp.Type))
                return TubeMeshTypeEnum.elecVertical  // 弧形弯头
        }
    }
    
    return TubeMeshTypeEnum.other
}
```

**数学原理**:
```
点积公式: dir1·dir2 = |dir1| × |dir2| × cos(θ)
当 θ = 90° 时，cos(90°) = 0
因此 dir1·dir2 ≈ 0 表示垂直
```

#### 步骤3: 电气弧形弯头生成

**源码位置**: [`tubemeshtypeenum.js:85-104`](dist/core-hs.fe5726b7.bundle_dewebpack/tubemeshtypeenum.js:85)

```javascript
case TubeMeshTypeEnum.elecVertical: {
    let pathR = arcRadius || elecPathR  // 默认100mm
    pathR = Math.round(pathR / precision) * precision  // 精度修正
    
    // 检查缓存
    const cached = this._defaultElecCorner.find(c => 
        MathUtil.isNearlyEqual(pathR, c.pathR) && 
        MathUtil.isNearlyEqual(diameter, c.tubeDiameter)
    )
    let mesh 

= cached?.mesh
    
    if (!mesh) {
        // 生成90度圆弧
        const arc = Arc3d.makeArcByStartEndPoints(
            new Vector3(pathR, pathR, 0),  // 起点
            pathR,                          // 半径
            Vector3.Z(1),                   // 法向量（向上）
            Vector3.X(pathR),               // 终点X方向
            Vector3.Y(pathR),               // 圆心Y方向
            false                           // 不逆时针
        )
        
        // 创建管道网格
        mesh = this.createTube([arc], diameter)
        
        // 缓存结果
        if (mesh) {
            this._defaultElecCorner.push({
                pathR: pathR,
                tubeDiameter: diameter,
                mesh: mesh
            })
        }
    }
    
    return mesh
}
```

**几何特性**:
```
起点 (R, R, 0) ──╮
               R=100mm
               ╰── 终点 (R, 0, 0)
圆心 (0, R, 0)
```

#### 步骤4-13: 交叉避让算法详解

**源码位置**: [`tubemeshtypeenum.js:357-425`](dist/core-hs.fe5726b7.bundle_dewebpack/tubemeshtypeenum.js:357)

```javascript
calculateCrossArc(tube) {
    const result = []
    
    // 步骤4: 计算安全间隙
    const clearance = 1.2 * tube.diameter  // Line 361
    
    // 步骤5: 类型检查 - 仅处理直线段
    if (tube.route[0].getType() !== EN_GEO_ELEMENT_TYPE.EN_LINE_3D)
        return [tube.route[0]]  // Line 362
    
    const line = tube.route[0]
    
    // 步骤6: 长度检查
    if (line.getLength() < 2 * clearance)
        return [line]  // 太短无法避让 Line 364
    
    // 步骤7: 定义安全段（排除两端）
    const safeOffset = line.getDirection().multiplied(clearance)
    const safeLine = new Line3d(
        line.getStartPt().added(safeOffset),      // 起点保护区
        line.getEndPt().subtracted(safeOffset)    // 终点保护区
    )  // Line 365-366
    
    // 步骤8: 获取场景中所有管线
    const layer = HSCore.Doc.getDocManager().activeDocument.scene.activeLayer
    const crossings = []
    
    // 步骤9: 遍历所有其他管道检测交叉
    layer.concealedWork?.tubeTrees.forEach(tree => {
        tree.tubes.forEach(otherTube => {
            // 跳过自身（ID较小的管道）
            if (Number(tube.id) <= Number(otherTube.id)) return  // Line 373
            
            // 仅处理直线段
            if (!otherTube.route.length || 
                otherTube.route[0].getType() !== EN_GEO_ELEMENT_TYPE.EN_LINE_3D)
                return  // Line 374
            
            const otherLine = otherTube.route[0]
            
            // 跳过平行管线
            if (otherLine.isParallelTo(line)) return  // Line 376
            
            // 计算交点
            const intersections = MathAlg.CalculateIntersect.curve3ds(
                safeLine, 
                otherLine
            )  // Line 377
            
            if (intersections.length > 0) {
                crossings.push({
                    pt: intersections[0].point,    // 交点坐标
                    dir: otherLine.getDirection()  // 管道方向
                })  // Line 378-382
            }
        })
    })
    
    // 步骤10: 无交叉点，返回原路径
    if (crossings.length < 1) return [line]  // Line 384
    
    // 步骤11: 按路径参数排序交叉点
    crossings.sort((a, b) => 
        line.getParamAt(a.pt) - line.getParamAt(b.pt)
    )  // Line 385
    
    // 步骤12: 分组邻近交点（距离阈值: 9 × clearance²）
    let direction = line.getDirection().multiplied(clearance)  // Line 386-387
    
    let firstCross = crossings[0]
    let lastCross = crossings[0]
    const arcGroups = []
    
    for (let i = 1; i < crossings.length; i++) {
        const cross = crossings[i]
        
        // 检查距离（阈值: 9 × clearance²）
        if (cross.pt.sqDistanceTo(lastCross.pt) > clearance * clearance * 9) {
            // 距离太远，生成弧线并开始新组
            const arc = generateArc(firstCross, lastCross)
            if (arc) arcGroups.push(arc)
            
            firstCross = cross
            lastCross = cross
        } else {
            // 合并到当前组
            lastCross = cross
        }
    }  // Line 401-413
    
    // 处理最后一组
    const finalArc = generateArc(firstCross, lastCross)
    if (finalArc) arcGroups.push(finalArc)  // Line 415-416
    
    // 步骤13: 生成三点弧线函数
    const generateArc = (start, end) => {
        const offset = direction.cross(start.dir)
        if (offset.z > 0) offset.z = -offset.z  // 向下避让
        
        const p1 = start.pt.subtracted(direction)      // 起点
        const p3 = end.pt.added(direction)             // 终点
        const p2 = p1.midTo(p3).add(offset)            // 中间控制点
        
        return Arc3d.makeArcByThreePoints(p1, p2, p3)
    }  // Line 388-397
    
    // 构建完整路径：直线-弧线-直线-弧线-...
    if (arcGroups.length > 0) {
        let currentPt = line.getStartPt()
        
        for (let i = 0; i < arcGroups.length; i++) {
            result.push(new Line3d(currentPt, arcGroups[i].getStartPt()))
            result.push(arcGroups[i])
            currentPt = arcGroups[i].getEndPt()
        }
        
        result.push(new Line3d(currentPt, line.getEndPt()))
    } else {
        result.push(line)
    }
    
    return result  // Line 418-424
}
```

### 2.4 强电材质应用

**源码位置**: [`concealedworktube.js:173-182`](dist/core-hs.fe5726b7.bundle_dewebpack/concealedworktube.js:173)

```javascript
getTubeMaterial() {
    let color = strongElec  // 默认强电颜色
    const tree = this.entity.tree
    
    if (tree) {
        if (tree.getComponent(HSCore.Model.CWStrongElecComp.Type))
            color = strongElec  // #FF9045 橙红色
        // ... 其他类型判断
    }
    
    return { color: color }
}
```

**颜色定义**: 
```javascript
strongElec = 16735045  // 十进制
// 转换为16进制: 0xFF9045 橙红色
```

### 2.5 强电算法流程图

```
配电箱 (起点)
    ↓
获取所有强电插座/开关节点
    ↓
构建管线树 (TubeTree)
    ↓
遍历每个管段 (Tube)
    ↓
判断类型: 直管 or 弯头？
    ├─ 直管 (2节点)
    │   ↓
    │   检测与其他管道交叉
    │   ↓
    │   calculateCrossArc() - 13步避让算法
    │   ↓
    │   生成避让弧线 (Arc3d, R=100mm)
    │   ↓
    │   组合路径 [Line, Arc, Line, Arc, ...]
    │
    └─ 弯头 (3+节点)
        ↓
        判断是否垂直（点积≈0）
        ↓
        生成90°电气弯头 (Arc3d, R=100mm)
    ↓
应用橙红色材质 (#FF9045)
    ↓
扫掠生成3D圆柱网格
    ↓
渲染到场景
```

### 2.6 强电技术参数

| 参数 | 值 | 说明 | 国标依据 |
|------|---|------|---------|
| 弯曲半径 | 100mm | 电线最小弯曲半径 | GB 50303-2015 §3.2.1 |
| 管径范围 | 16-32mm | PVC线管规格 | JGJ 16-2008 |
| 安全间隙 | 管径×1.2 | 避让安全距离 | 工程经验值 |
| 颜色编码 | #FF9045 | 橙红色（高压警示） | 系统标准 |
| 避让方式 | 弧形 | Arc3d平滑弯曲 | - |
| 分组阈值 | 9×clearance² | 交点合并距离 | 算法优化 |

---

## 3. 算法2: 自动弱电算法

### 3.1 算法概述

**功能**: 从弱电箱自动生成到网络、电视、音频等弱电端口的线路

**核心类**: 