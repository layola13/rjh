# Pattern瓷砖铺贴系统完整架构分析

> **文档版本**: v1.0  
> **创建时间**: 2026-01-22  
> **模块**: core-hs.fe5726b7.bundle (Module 98733)  
> **核心文件**: pattern.js, patterngrid_io.js, patternblock_io.js, mixgrid_io.js, paintsutil.js

---

## 目录

1. [系统概述](#系统概述)
2. [完整8层架构](#完整8层架构)
3. [核心模块详解](#核心模块详解)
4. [核心算法详解](#核心算法详解)
5. [数据流图](#数据流图)
6. [API接口文档](#api接口文档)
7. [使用示例](#使用示例)
8. [关键源码引用](#关键源码引用)

---

## 系统概述

Pattern瓷砖铺贴系统是一个复杂的瓷砖/地板材质铺设引擎，支持：

- **规则网格铺贴**: 按网格排列的标准铺贴模式
- **自由铺贴**: 不规则区域的自适应铺贴
- **混合铺贴**: 多种材质混合排列
- **缝隙处理**: 瓷砖间缝隙的材质和宽度控制
- **旋转和偏移**: 支持材质的旋转、偏移变换
- **实时重计算**: 几何变化时的动态更新

**设计模式**: 采用Grid-Block-Polygon三层结构 + IO序列化层 + 工具层的分层架构

---

## 完整8层架构

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: 导出接口层 (Export Layer)                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  文件: pattern.js (Module 98733)                            │
│  职责: 统一导出所有Pattern相关类和枚举                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  • Pattern: 主Pattern类                                     │
│  • PatternGrid: 网格管理器                                   │
│  • PatternBlock: 单个瓷砖块                                  │
│  • MixGrid: 混合网格                                         │
│  • PavingOption: 铺贴选项                                    │
│  • Polygon: 多边形基类                                       │
│  • Boundary: 边界类                                          │
│  • 其他30+导出类型                                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 2: 网格管理层 (Grid Management Layer)                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  文件: patterngrid_io.js (Module 43832)                     │
│  类: PatternGrid extends MixGrid                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心职责:                                                    │
│  • 管理瓷砖块集合 (_patternBlocks: PatternBlock[])          │
│  • 维护修改块列表 (blocks: PatternBlock[])                  │
│  • 网格铺贴选项 (_gridPavingOption)                         │
│  • 全局铺贴选项 (_fullPavingOption)                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心方法:                                                    │
│  • createPolygons(): 创建瓷砖多边形                          │
│  • addModifiedBlocks(blocks): 添加修改的块                  │
│  • recomputeTemplate(polygon): 重计算模板                    │
│  • recomputeFullPaving(): 重计算完整铺贴                     │
│  • updateBlockMaterialMap(): 更新材质映射                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  源码位置: patterngrid_io.js lines 57-306                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 3: 混合网格层 (Mix Grid Layer)                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  文件: mixgrid_io.js (Module 1288)                          │
│  类: MixGrid extends Grid                                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心职责:                                                    │
│  • 管理块集合 (__blocks: Block[])                            │
│  • 材质混合规则 (materials: MaterialInfo[])                 │
│  • 缝隙材质 (seamMaterial, seamColor, seamWidth)            │
│  • 瓷砖尺寸 (tileSizeX, tileSizeY)                           │
│  • 网格类型 (type: GridTypeEnum)                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心方法:                                                    │
│  • update(): 更新网格                                        │
│  • updateBlockMaterialMap(params): 更新块材质映射            │
│  • getChildMaterials(): 获取所有子材质                       │
│  • isMixType(): 判断是否混合类型                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  源码位置: mixgrid_io.js lines 91-271                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 4: 瓷砖块层 (Pattern Block Layer)                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  文件: patternblock_io.js (Module 3499)                     │
│  类: PatternBlock extends MixBlock                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心属性:                                                    │
│  • key: {x, y} - 网格坐标标识                                │
│  • localId: string - 本地唯一标识                            │
│  • material: MaterialData - 当前材质                         │
│  • originalMaterial: MaterialData - 原始材质                 │
│  • pavingOption: PavingOption - 铺贴选项                     │
│  • anchorPointIndex: number - 锚点索引                       │
│  • absoluteMass: any - 绝对质量属性                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心方法:                                                    │
│  • create(points, holes): 创建块                             │
│  • setMaterial(material, force): 设置材质                    │
│  • assignFrom(block): 从其他块复制属性                       │
│  • getOuterPoints(): 获取外部点                              │
│  • keyInString: 计算属性 "{localId}-{x}-{y}"                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  源码位置: patternblock_io.js lines 60-201                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 5: 铺贴选项层 (Paving Option Layer)                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  文件: pavingpointtypeenum.js (Module 46368)                │
│  类: PavingOption                                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心属性:                                                    │
│  • type: PavingPointTypeEnum                                │
│    - Default / DefaultNormal / UserDefined                  │
│  • point: {x, y} - 铺贴锚点                                  │
│  • rotation: number - 旋转角度(度)                           │
│  • sliderOffsetX/Y: number - 滑块偏移                        │
│  • defaultOffsetX/Y: number - 默认偏移                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心方法:                                                    │
│  • create(args): 静态工厂方法                                │
│  • clone(overrides): 克隆并覆盖属性                          │
│  • equals(other): 比较是否相等                               │
│  • dump(): 序列化为JSON                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  源码位置: pavingpointtypeenum.js lines 24-145              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 6: 算法处理层 (Algorithm Processing Layer)            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  文件: paintsutil.js (Module 62786)                         │
│  类: PaintsUtil (静态工具类)                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心算法:                                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  1. createPatternPolygons(polygon, useModified)              │
│     创建Pattern多边形的核心算法                              │
│     源码: paintsutil.js lines 1159-1202                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  2. createBlocksByPattern(pattern, polygons, option, grid)   │
│     根据Pattern创建PatternBlock集合                          │
│     源码: paintsutil.js lines 1229-1253                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  3. splitBrickSeam(block)                                    │
│     分离瓷砖和缝隙的算法                                     │
│     源码: paintsutil.js lines 707-866                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  4. recomputeFullPaving(grid)                                │
│     重新计算完整铺贴                                         │
│     源码: paintsutil.js lines 1864-1915                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 7: 多边形几何层 (Polygon Geometry Layer)              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  文件: polygon_io.js (Module 42052)                         │
│  类: Polygon extends Region                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心职责:                                                    │
│  • 管理外部循环 (outerLoop: Wire)                            │
│  • 管理内部循环 (innerLoops: Wire[])                         │
│  • 曲线管理 (curves: Curve[])                                │
│  • 孔洞管理 (holes: Point2d[][])                             │
│  • 原始点集 (originPoints: Point2d[])                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心方法:                                                    │
│  • createPolygon(points, holes): 静态创建                    │
│  • getDiscretePoints(): 获取离散点                           │
│  • isPointInside(point): 点包含测试                          │
│  • offset(dx, dy): 平移变换                                  │
│  • transform(matrix): 矩阵变换                               │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  源码位置: polygon_io.js lines 73-429                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 8: IO序列化层 (IO Serialization Layer)               │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  文件: *_io.js                                               │
│  类: PatternGrid_IO, PatternBlock_IO, MixGrid_IO 等         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心职责:                                                    │
│  • 序列化 dump(entity, callback, deep, 

context)             │
│  • 反序列化 load(entity, data, context)                     │
│  • 版本兼容处理                                              │
│  • 材质数据转换                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  核心方法:                                                    │
│  • instance(): 单例获取                                      │
│  • dump(): 导出为JSON                                        │
│  • load(): 从JSON加载                                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
└─────────────────────────────────────────────────────────────┘
```

---

## 核心模块详解

### 1. PatternGrid (网格管理器)

**继承关系**: `PatternGrid extends MixGrid extends Grid extends Entity`

**核心职责**:
- 管理整个铺贴网格
- 协调Pattern和Polygon的关系
- 处理块的增删改查

**关键字段**:
```typescript
class PatternGrid extends MixGrid {
    _fullPavingOption: PavingOption | null        // 全局铺贴选项
    _patternBlocks: PatternBlock[]                // 所有瓷砖块
    _gridPavingOption: {                          // 网格铺贴配置(已废弃)
        point: {x: number, y: number}
        sliderOffsetX: number
        sliderOffsetY: number
        rotation: number
    }
}
```

**核心方法解析**:

#### `createPolygons()` (lines 84-94)
```javascript
createPolygons() {
    const parent = this.parent;
    if (!parent.pattern) return;
    
    // 调用静态方法更新Pattern多边形
    const blocks = PatternGrid.updatePatternPolygon(parent, this);
    
    this.blocks = [];
    parent.grid.addModifiedBlocks(blocks);
    parent.dirty();
    
    // 通知MixPaint模式变化
    const mixpaint = parent.getMixpaint();
    mixpaint && mixpaint.onPatternChanged(parent.pattern);
}
```

#### `addModifiedBlocks(blocks)` (lines 95-105)
```javascript
addModifiedBlocks(blocks) {
    const newBlocks = [];
    for (let i = 0; i < blocks.length; ++i) {
        const block = blocks[i];
        const existing = this.getModifiedBlockByKey(block.keyInString);
        
        if (existing) {
            // 更新已存在的块
            existing.pavingOption = block.pavingOption;
            existing.material = block.material;
        } else {
            newBlocks.push(block);
        }
    }
    this.blocks = this.blocks.concat(newBlocks);
}
```

---

### 2. PatternBlock (瓷砖块)

**核心方法解析**:

#### `keyInString` (计算属性, lines 88-99)
```javascript
get keyInString() {
    let key = "";
    if (this.key && 
        this.key.x !== undefined && 
        this.key.y !== undefined) {
        key = `${this._localId}-${Number(this.key.x)}-${Number(this.key.y)}`;
    }
    return key;
}
```

#### `setMaterial(material, force)` (lines 146-149)
```javascript
setMaterial(material, force = false) {
    if (!material) return;
    if (this.material && material.equals(this.material)) return;
    
    // 首次设置或强制设置时，保存原始材质
    if (!this._originalMaterial || force) {
        this.originalMaterial = material;
    }
    
    this.material = material.clone();
    
    if (this.parent) {
        this.parent.addModifiedBlocks([this]);
        this.parent.dirtyBlocks(this);
    } else {
        this.dirtyMaterial();
    }
}
```

---

## 核心算法详解

### 算法1: createPatternPolygons

**位置**: [`paintsutil.js:1159-1202`](dist/core-hs.fe5726b7.bundle_dewebpack/paintsutil.js:1159)

**伪代码实现**:
```
FUNCTION createPatternPolygons(polygon, useModified = false)
    // 步骤1: 提取几何数据
    IF polygon instanceof Region AND NOT instanceof Polygon THEN
        polygons = polygon.geomPolygons
    ELSE
        outer = polygon.getInnerBoundaryPoints()
        holes = polygon.innerLoops.map(loop => loop.getDiscretePoints())
        polygons = [{outer: outer, holes: holes}]
        DiscretePolygon2d.verify(polygons)
    END IF
    
    // 步骤2: 获取配置
    pattern = polygon.pattern
    grid = polygon.grid
    pavingOption = polygon.pavingOption.getArgs()
    
    // 步骤3: 调整锚点(仅Polygon)
    IF polygon instanceof Polygon THEN
        boundaryWidth = polygon.getBoundaryWidth()
        pavingOption.point.x -= boundaryWidth
        pavingOption.point.y -= boundaryWidth
    END IF
    
    // 步骤4: 生成块
    RETURN createBlocksByPattern(pattern, polygons, pavingOption, grid, useModified)
END FUNCTION
```

---

### 算法2: splitBrickSeam (分离瓷砖和缝隙)

**位置**: [`paintsutil.js:707-866`](dist/core-hs.fe5726b7.bundle_dewebpack/paintsutil.js:707)

**核心思想**: 使用多边形偏移算法分离瓷砖主体和缝隙

**伪代码实现**:
```
FUNCTION splitBrickSeam(block)
    seamWidth = block.seamWidth
    halfSeamWidth = seamWidth / 2
    
    // 步骤1: 向内偏移生成瓷砖主体
    innerPolygons = offsetPolygons(block.path, -halfSeamWidth)
    
    IF innerPolygons.length > 1 THEN
        // 多个分离区域，需要递归处理
        FOR EACH innerPoly IN innerPolygons DO
            subBlock = createBlock(innerPoly)
            results.concat(splitBrickSeam(subBlock))
        END FOR
    ELSE IF innerPolygons.length == 1 THEN
        // 单个区域
        brickPath = innerPolygons[0]
        
        // 创建瓷砖数据
        brickData = {
            path: brickPath,
            material: block.originalMaterial,
            pavingOption: block.pavingOption,
            isBrick: true
        }
        
        // 步骤2: 生成缝隙数据
        seamData = []
        FOR i FROM 0 TO block.path.length-1 DO
            edge = [block.path[i], block.path[i+1]]
            closestInnerEdge = findClosestEdge(edge, brickPath)
            
            // 构建缝隙四边形
            seamQuad = [edge[0], edge[1], closestInnerEdge[1], closestInnerEdge[0]]
            
            seamData.push({
                path: seamQuad,
                material: block.seamMaterial,
                pavingOption: block.seamPavingOption,
                isSeam: true
            })
        END FOR
        
        RETURN {brickData: [brickData], seamData: seamData}
    ELSE
        // 偏移失败，返回原始块
        RETURN {brickData: [block], seamData: []}
    END IF
END FUNCTION
```

---

### 算法3: recomputeFullPaving (重新计算完整铺贴)

**位置**: [`paintsutil.js:1864-1915`](dist/core-hs.fe5726b7.bundle_dewebpack/paintsutil.js:1864)

**核心思想**: 根据fullPavingOption重新计算自由铺贴块

**伪代码实现**:
```
FUNCTION recomputeFullPaving(grid)
    IF NOT grid.fullPavingOption OR grid.freePatternBlocks.length == 0 THEN
        RETURN
    END IF
    
    // 步骤1: 获取铺贴区域
    parent = grid.parent
    boundaryPoints = parent.getInnerBoundaryPoints()
    holes = parent.getAllHoles()
    
    pavingArea = {
        path: boundaryPoints,
        pavingOption: grid.fullPavingOption,
        holes: holes
    }
    
    // 步骤2: 获取Pattern
    pattern = grid.freePatternBlocks[0].pattern
    
    // 步骤3: 创建新的自由铺贴块
    newBlocks = createFreePavingBlocksByPattern(pattern, pavingArea, grid)
    
    // 步骤4: 计算每个块的局部坐标
    FOR EACH block IN newBlocks DO
        block.rotationAngle = toRadians(pavingOption.rotation)
        
        // 计算块中心相对于铺贴点的偏移
        blockCenter = getMassCenter(block.points)
        offset = blockCenter - pavingOption.point
        
        // 应用旋转
        rotatedOffset = rotatePoint(offset, -block.rotationAngle)
        block.localPavingPoint = rotatedOffset
        
        block.free = true
    END FOR
    
    // 步骤5: 更新网格的自由铺贴块
    grid.freePatternBlocks = newBlocks
END FUNCTION
```

---

## 数据流图

### 完整铺贴数据流

```
用户操作触发
    │
    ↓
┌───────────────────────────────────────┐
│  1. 几何输入层                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  • Polygon (多边形)                   │
│  • Pattern (瓷砖模式)                 │
│  • PavingOption (铺贴选项)            │
└───────────────────────────────────────┘
    │
    ↓
┌───────────────────────────────────────┐
│  2. Pattern处理层                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  PatternUtil.createPolygons()         │
│  • 读取Pattern定义                    │
│  • 计算瓷砖排列                       │
│  • 生成子多边形                       │
└───────────────────────────────────────┘
    │
    ↓
┌───────────────────────────────────────┐
│  3. 多边形生成层                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  PaintsUtil.createPolygonsByPattern() │
│  • 应用铺贴选项                       │
│  • 分配材质                           │
│  • 处理旋转和偏移                     │
└───────────────────────────────────────┘
    │
    ↓
┌───────────────────────────────────────┐
│  4. Block创建层                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  PaintsUtil.createBlocksByPattern()   │
│  • 创建PatternBlock实例               │
│  • 设置key、localId                   │
│  • 关联材质和铺贴选项                 │
└───────────────────────────────────────┘
    │
    ↓
┌───────────────────────────────────────┐
│  5. 缝隙处理层                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  PaintsUtil.splitBrickSeam()          │
│  • 分离瓷砖主体                       │
│  • 生成缝隙几何                       │
│  • 应用缝隙材质                       │
└───────────────────────────────────────┘
    │
    ↓
┌───────────────────────────────────────┐
│  6. Grid管理层                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  PatternGrid.addModifiedBlocks()      │
│  • 添加到blocks数组                   │
│  • 更新材质映射                       │
│  • 标记为脏                           │
└───────────────────────────────────────┘
    │
    ↓
┌───────────────────────────────────────┐
│  7. 渲染输出层                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  • 生成渲染几何                       │
│  • 应用材质纹理                       │
│  • 输出到3D场景                       │
└───────────────────────────────────────┘
```

### 材质数据流

```
MaterialData (输入)
    │
    ↓
┌──────────────────────────┐
│  材质验证和处理           │
│  • seekId匹配            │
│  • textureURI加载        │
│  • 

tileSize处理           │
└──────────────────────────┘
    │
    ↓
┌──────────────────────────┐
│  PatternBlock关联        │
│  • 设置到block.material  │
│  • 克隆副本               │
└──────────────────────────┘
    │
    ↓
┌──────────────────────────┐
│  渲染系统                │
│  • 生成UV坐标            │
│  • 应用纹理贴图           │
└──────────────────────────┘
```

---

## API接口文档

### PatternGrid API

```typescript
class PatternGrid extends MixGrid {
    // 静态方法
    static create(): PatternGrid
    static migratePattern(polygon, migrate): PatternGrid
    static updatePatternPolygon(polygon, grid): PatternBlock[]
    
    // 实例方法
    createPolygons(): void
    addModifiedBlocks(blocks: PatternBlock[]): void
    removeModifiedBlock(block: PatternBlock): void
    getModifiedBlock(block: PatternBlock): PatternBlock | null
    getModifiedBlockByKey(keyString: string): PatternBlock | null
    clearModifiedBlocks(): void
    recomputeTemplate(polygon): PatternGrid
    recomputeFullPaving(): void
    update(): void
    
    // 属性访问器
    get fullPavingOption(): PavingOption | null
    set fullPavingOption(value: PavingOption | null)
    get patternBlocks(): PatternBlock[]
    set patternBlocks(value: PatternBlock[])
}
```

### PatternBlock API

```typescript
class PatternBlock extends MixBlock {
    // 静态方法
    static create(points: Point2d[], holes?: Point2d[][]): PatternBlock
    
    // 实例方法
    setMaterial(material: MaterialData, force?: boolean): void
    assignFrom(block: PatternBlock): void
    copyFrom(block: PatternBlock): void
    clone(): PatternBlock
    getOuterPoints(): Point2d[]
    getPattern(): Pattern | null
    getMaterial(): MaterialData
    
    // 属性
    get keyInString(): string  // 计算属性: "{localId}-{x}-{y}"
    key: {x: number, y: number}
    localId: string
    material: MaterialData
    originalMaterial: MaterialData
    pavingOption: PavingOption
    anchorPointIndex: number
    absoluteMass: any
}
```

### PavingOption API

```typescript
class PavingOption {
    // 静态方法
    static create(args?: PavingOptionArgs): PavingOption
    
    // 实例方法
    clone(overrides?: Partial<PavingOptionArgs>): PavingOption
    equals(other: PavingOptionArgs): boolean
    dump(): object
    getArgs(): PavingOptionArgs
    getPavingOptionForFGI(): object
    
    // 只读属性
    get type(): PavingPointTypeEnum
    get point(): {x: number, y: number}
    get rotation(): number
    get sliderOffsetX(): number
    get sliderOffsetY(): number
    get defaultOffsetX(): number
    get defaultOffsetY(): number
    
    // 静态常量
    static DefaultOption: PavingOption
}

interface PavingOptionArgs {
    type?: PavingPointTypeEnum
    point?: {x: number, y: number}
    rotation?: number
    sliderOffsetX?: number
    sliderOffsetY?: number
    defaultOffsetX?: number
    defaultOffsetY?: number
}
```

### PaintsUtil API (静态工具类)

```typescript
class PaintsUtil {
    // 核心铺贴算法
    static createPatternPolygons(
        polygon: Polygon | Region,
        useModified?: boolean
    ): PatternBlock[]
    
    static createBlocksByPattern(
        pattern: Pattern,
        polygons: GeomPolygon[],
        pavingOption: PavingOptionArgs,
        grid?: PatternGrid,
        useModified?: boolean
    ): PatternBlock[]
    
    static createPolygonsByPattern(
        pattern: Pattern,
        polygons: GeomPolygon[],
        pavingOption: PavingOptionArgs,
        modifiedBlocksMap?: Map<string, BlockInfo>,
        useModified?: boolean
    ): PolygonData[]
    
    // 缝隙处理
    static splitBrickSeam(block: BlockData): {
        brickData: BlockData[],
        seamData: BlockData[]
    }
    
    static getPatternBrickSeamData(
        pattern: Pattern,
        pavingOption: PavingOption
    ): SeamData[]
    
    // 自由铺贴
    static recomputeFullPaving(grid: PatternGrid): void
    static createFreePavingBlocksByPattern(
        pattern: Pattern,
        pavingArea: PavingArea,
        grid: PatternGrid
    ): FreePatternBlock[]
    
    // 辅助方法
    static getPaintBoundingSize(entity, surfaceType): BoundingSize
    static convertMassToLocal(pavingOption, point, context): Point2d
}
```

---

## 使用示例

### 示例1: 创建基本Pattern铺贴

```javascript
// 1. 创建Polygon
const points = [
    {x: 0, y: 0},
    {x: 1000, y: 0},
    {x: 1000, y: 1000},
    {x: 0, y: 1000}
];
const polygon = HSCore.Model.Polygon.createPolygon(points);

// 2. 设置Pattern
polygon.pattern = myPattern;  // 假设已有Pattern对象

// 3. 创建PatternGrid
const grid = HSCore.Model.PatternGrid.create();
polygon.grid = grid;

// 4. 设置铺贴选项
const pavingOption = HSCore.Model.PavingOption.create({
    point: {x: 0, y: 0},
    rotation: 0,
    sliderOffsetX: 0,
    sliderOffsetY: 0
});
polygon.pavingOption = pavingOption;

// 5. 生成瓷砖
grid.createPolygons();

// 6. 访问生成的块
const blocks = grid.blocks;
console.log(`生成了 ${blocks.length} 个瓷砖块`);
```

### 示例2: 修改单个瓷砖块的材质

```javascript
// 获取特定位置的块
const block = grid.getModifiedBlockByKey("brick-1-5-3");

if (block) {
    // 创建新材质
    const newMaterial = HSCore.Material.MaterialData.create({
        seekId: "new-material-id",
        textureURI: "path/to/texture.jpg",
        tileSize_x: 600,
        tileSize_y: 600
    });
    
    // 设置材质
    block.setMaterial(newMaterial);
    
    // 触发更新
    polygon.dirty();
}
```

### 示例3: 设置缝隙

```javascript
// 在MixGrid级别设置缝隙
grid.seamWidth = 2;  // 2mm缝隙
grid.seamColor = "#808080";  // 灰色

// 设置缝隙材质
const seamMaterial = HSCore.Material.MaterialData.create({
    color: 0x808080,
    colorMode: HSCore.Material.ColorModeEnum.color
});
grid.seamMaterial = seamMaterial;

// 重新生成以应用缝隙
grid.createPolygons();
```

### 示例4: 旋转铺贴

```javascript
// 创建旋转45度的铺贴选项
const rotatedOption = HSCore.Model.PavingOption.create({
    point: {x: 500, y: 500},  // 旋转中心
    rotation: 45,              // 45度
    sliderOffsetX: 0,
    sliderOffsetY: 0
});

polygon.pavingOption = rotatedOption;
grid.createPolygons();
```

### 示例5: 完整铺贴流程

```javascript
// 完整的铺贴工作流程
function setupPatternPaving(polygon, pattern, materialList) {
    // 步骤1: 初始化Grid
    const grid = HSCore.Model.PatternGrid.create();
    polygon.grid = grid;
    
    // 步骤2: 设置Pattern
    polygon.pattern = pattern;
    
    // 步骤3: 配置铺贴选项
    const pavingOption = HSCore.Model.PavingOption.create({
        type: "default",
        point: {x: 0, y: 0},
        rotation: 0
    });
    polygon.pavingOption = pavingOption;
    
    // 步骤4: 设置材质混合
    if (materialList && materialList.length > 0) {
        grid.materials = materialList.map((mat, index) => ({
            seekId: mat.seekId,
            polygons: [],
            percent: 1.0 / materialList.length,
            extSeekIds: []
        }));
    }
    
    // 步骤5: 设置瓷砖尺寸
    grid.tileSizeX = 600;
    grid.tileSizeY = 600;
    
    // 步骤6: 设置缝隙
    grid.seamWidth = 2;
    grid.seamColor = "#ffffff";
    
    // 步骤7: 生成铺贴
    grid.createPolygons();
    
    // 步骤8: 获取结果
    const blocks = grid.blocks;
    console.log(`生成了 ${blocks.length} 个瓷砖块`);
    
    return {
        grid: grid,
        blocks: blocks
    };
}

// 使用
const result = setupPatternPaving(myPolygon, myPattern, myMaterials);
```

---

## 关键源码引用

### 1. PatternGrid核心方法

**createPolygons()** - [`patterngrid_io.js:84-94`](dist/core-hs.fe5726b7.bundle_dewebpack/patterngrid_io.js:84)
```javascript
createPolygons() {
    const e = this.parent;
    if (!e.pattern) return;
    const t = u.updatePatternPolygon(e, this);
    this.blocks = [],
    e.grid.addModifiedBlocks(t),
    e.dirty();
    const o = e.getMixpaint();
    o && o.onPatternChanged(e.pattern)
}
```

**addModifiedBlocks()** - [`patterngrid_io.js:95-105`](dist/core-hs.fe5726b7.bundle_dewebpack/patterngrid_io.js:95)
```javascript
addModifiedBlocks(e) {
    const t = [];
    for (let o = 0; o < e.length; ++o) {
        const i = e[o],
        n = this.getModifiedBlockByKey(i.keyInString);
        n ? (n.pavingOption = i.pavingOption, n.material = i.material) : t.push(i)
    }
    this.blocks = this.blocks.concat(t)
}
```

### 2. PatternBlock关键方法

**setMaterial()** - [`patternblock_io.js:146-149`](dist/core-hs.fe5726b7.bundle_dewebpack/patternblock_io.js:146)
```javascript
setMaterial(e, t = !1) {
    e && (this.material && e.equals(this.material) || (
        this._originalMaterial && !t || (this.originalMaterial = e),
        this.material = e.clone(),
        this.parent ? (
            this.parent.addModifiedBlocks([this]),
            this.parent.dirtyBlocks(this)
        ) : this.dirtyMaterial()
    ))
}
```

### 3. PaintsUtil核心算法

**createPatternPolygons()** - [`paintsutil.js:1159-1202`](dist/core-hs.fe5726b7.bundle_dewebpack/paintsutil.js:1159)

**splitBrickSeam()** - [`paintsutil.js:707-866`](dist/core-hs.fe5726b7.bundle_dewebpack/paintsutil.js:707)

**recomputeFullPaving()** - [`paintsutil.js:1864-1915`](dist/core-hs.fe5726b7.bundle_dewebpack/paintsutil.js:1864)

---

## 总结

Pattern瓷砖铺贴系统是一个完整的8层架构系统，核心特点：

1. **分层清晰**: 从导出接口到IO序列化，每层职责明确
2. **算法完整**: 支持网格铺贴、自由铺贴、缝隙处理等多种模式
3. **扩展性强**: 通过MixGrid支持材质混合，通过PavingOption支持灵活配置
4. **性能优化**: 使用修改块缓存机制，避免重复计算
5. **数据完整**: 完整的序列化/反序列化支持，保证数据持久化

**核心工作流程总结**:
```
Polygon + Pattern + PavingOption
    ↓
PatternGrid.createPolygons()
    ↓
PaintsUtil.createPatternPolygons()
    ↓
PatternUtil.createPolygons() [外部调用]
    ↓
PaintsUtil.createBlocksByPattern()
    ↓
PatternBlock[] (瓷砖块数组)
    ↓
可选: splitBrickSeam() (分离缝隙)
    ↓
渲染输出
```

---

**文档完成时间**: 2026-01-22  
**分析深度**: 完整8层架构 + 核心算法 + API文档 + 使用示例  
**源码覆盖**: 5个核心模块，2000+行源码分析
