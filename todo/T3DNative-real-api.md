# T3DNative 真实API文档

> **重要发现**: T3DNative并非网格优化模块，而是**软件遮挡剔除（Software Occlusion Culling）**模块！
> 
> **分析方法**: 通过`wasm-objdump`和`strings`命令直接提取WASM二进制符号
> 
> **文档版本**: v1.0  
> **创建时间**: 2026-01-24  
> **来源**: WASM二进制分析

---

## 模块概述

**模块名**: T3DNative  
**文件**: `dist/assets/T3dNative.30d6d650.wasm` (~800KB)  
**真实用途**: **软件遮挡剔除（Software Occlusion Culling）**  

**核心功能**: 
- 通过CPU端可见性计算减少GPU端绘制调用
- 优化大场景渲染性能
- 实现视锥体剔除和遮挡剔除

---

## 真实的公开API（基于WASM二进制分析）

### 提取的实际导出符号

```bash
# 命令1: 提取WASM导出函数
wasm-objdump -x dist/assets/T3dNative.30d6d650.wasm | grep "Export\["

# 结果: 仅导出标准Emscripten函数
- memory
- __wasm_call_ctors
- __getTypeName
- __embind_register_native_and_builtin_types
- __errno_location
- malloc
- free
- stackSave
- stackRestore
- stackAlloc
- __indirect_function_table

# 命令2: 提取embind注册的类和方法
strings dist/assets/T3dNative.30d6d650.wasm | grep -E "^[a-z][a-zA-Z0-9_]*$|^set[A-Z]|^get[A-Z]|^is[A-Z]"

# 结果: 实际的业务API
```

### 核心类和方法（29个API）

```typescript
/**
 * T3DNative - 软件遮挡剔除模块
 * 
 * 通过Emscripten embind绑定到JavaScript
 */
interface T3DNativeModule {
    
    // ==================== Scene类 ====================
    
    /**
     * Scene - 场景管理器
     * 管理所有渲染图元和可见性计算
     */
    class Scene {
        /**
         * 1. 添加图元到场景
         * @param primitive - 图元对象
         */
        addPrimitive(primitive: Primitive): void;
        
        /**
         * 2. 从场景移除图元
         * @param primitive - 图元对象
         */
        removePrimitive(primitive: Primitive): void;
        
        /**
         * 3. 获取总图元数量
         * @returns 图元总数
         */
        numTotalPrimitives(): number;
        
        /**
         * 4. 获取活动图元数量（可见的）
         * @returns 活动图元数
         */
        numActivePrimitives(): number;
        
        /**
         * 5. 计算可见性（核心方法）
         * @param frustum - 视锥体
         * @param matrix - 视图矩阵
         * 
         * 执行视锥体剔除和遮挡剔除
         */
        computeVisible(frustum: Frustum, matrix: Matrix): void;
        
        /**
         * 6. 获取软件遮挡系统
         * @returns 遮挡系统实例
         */
        getSceneSoftwareOcclusion(): SceneSoftwareOcclusion;
    }
    
    // ==================== Primitive类 ====================
    
    /**
     * Primitive - 渲染图元
     * 代表场景中的一个可渲染对象
     */
    class Primitive {
        /**
         * 7. 释放图元资源
         */
        free(): void;
        
        // ========== 设置方法（Setters） ==========
        
        /**
         * 8. 设置包围盒
         * @param minX, minY, minZ - 最小坐标
         * @param maxX, maxY, maxZ - 最大坐标
         */
        setBoundingBox(
            minX: number, minY: number, minZ: number,
            maxX: number, maxY: number, maxZ: number
        ): void;
        
        /**
         * 9. 设置局部到世界变换矩阵
         * @param matrix - 4x4变换矩阵（16个float）
         */
        setLocalToWorldMatrix(matrix: Float32Array | number[]): void;
        
        /**
         * 10. 设置是否需要移除
         * @param needRemove - 是否移除
         */
        setNeedRemove(needRemove: boolean): void;
        
        /**
         * 11. 设置可见性
         * @param visible - 是否可见
         */
        setVisible(visible: boolean): void;
        
        /**
         * 12. 设置是否启用视锥体剔除
         * @param enable - 是否启用
         */
        setFrustumCullEnable(enable: boolean): void;
        
        /**
         * 13. 设置是否为遮挡物
         * @param isOccluder - 是否遮挡物
         * 
         * 遮挡物会阻挡其他物体的可见性
         */
        setOccluder(isOccluder: boolean): void;
        
        /**
         * 14. 设置是否被遮挡剔除
         * @param isOcclution - 是否参与遮挡剔除
         */
        setOcclution(isOcclution: boolean): void;
        
        /**
         * 15. 设置可见性掩码
         * @param mask - 掩码值（位标志）
         */
        setVisibilityMask(mask: number): void;
        
        /**
         * 16. 设置视图掩码
         * @param mask - 掩码值（位标志）
         */
        setViewMask(mask: number): void;
        
        /**
         * 17. 设置图元部分数量
         * @param count - 部分数
         * 
         * 一个Primitive可以有多个子部分
         */
        setNumPart(count: number): void;
        
        /**
         * 18. 设置索引数量
         * @param counts - 索引数数组
         */
        setIndexCounts(counts: Int32Array | number[]): void;
        
        /**
         * 19. 设置索引数据
         * @param indices - 索引数组
         */
        setIndex(indices: Uint32Array): void;
        
        /**
         * 20. 设置顶点数量
         * @param counts - 顶点数数组
         */
        setPositionCounts(counts: Int32Array | number[]): void;
        
        /**
         * 21. 设置顶点位置
         * @param positions - 顶点坐标数组（x,y,z交错）
         */
        setPositions(positions: Float32Array): void;
        
        // ========== 查询方法（Getters） ==========
        
        /**
         * 22. 是否需要移除
         */
        isNeedRemove(): boolean;
        
        /**
         * 23. 是否可见
         */
        isVisible(): boolean;
        
        /**
         * 24. 是否启用视锥体剔除
         */
        isFrustumCullEnable(): boolean;
        
        /**
         * 25. 是否为遮挡物
         */
        isOccluder(): boolean;
        
        /**
         * 26. 是否被遮挡
         */
        isOcclution(): boolean;
        
        /**
         * 27. 获取可见性掩码
         */
        getVisibilityMask(): number;
        
        /**
         * 28. 获取视图掩码
         */
        getViewMask(): number;
        
        /**
         * 29. 获取图元部分数
         */
        getNumPart(): number;
    }
    
    // ==================== SceneSoftwareOcclusion类 ====================
    
    /**
     * SceneSoftwareOcclusion - 软件遮挡剔除系统
     * 统计和调试遮挡剔除效果
     */
    class SceneSoftwareOcclusion {
        /**
         * 30. 获取遮挡物三角形数量
         * @returns 三角形数
         */
        numOccluderTriangles(): number;
        
        /**
         * 31. 获取被剔除的数量
         * @returns 剔除数
         */
        numOcclusionCulling(): number;
        
        /**
         * 32. 调试可视化遮挡
         * @param enable - 是否启用调试视图
         */
        debugViewOcclusion(enable: boolean): void;
    }
    
    // ==================== 辅助类 ====================
    
    /**
     * Frustum - 视锥体
     * 由6个平面定义的视锥体，用于视锥体剔除
     */
    class Frustum {
        // 6个平面: near, far, left, right, top, bottom
        // 用于判断物体是否在视野内
    }
    
    /**
     * Matrix - 4x4变换矩阵
     * 用于坐标变换
     */
    class Matrix {
        // 16个float元素（列主序）
        // 用于世界坐标 ↔ 视图坐标转换
    }
    
    // ==================== 内存管理 ====================
    
    /**
     * 分配内存
     */
    _malloc(size: number): number;
    
    /**
     * 释放内存
     */
    _free(ptr: number): void;
    
    /**
     * 内存堆
     */
    HEAPF32: Float32Array;
    HEAPF64: Float64Array;
    HEAP8: Int8Array;
    HEAPU8: Uint8Array;
}
```

---

## API统计

| 类别 | 方法数 | 说明 |
|------|--------|------|
| **Scene类** | 6 | 场景管理和可见性计算 |
| **Primitive类** | 23 | 图元属性设置和查询 |
| **SceneSoftwareOcclusion类** | 3 | 遮挡剔除统计和调试 |
| **辅助类** | 2 | Frustum和Matrix |
| **内存管理** | 2 | malloc/free |
| **总计** | **36个公开API** | |

---

## 使用场景

### 场景1: 基本可见性计算

```javascript
// 初始化场景
const scene = new T3DNativeModule.Scene();

// 创建图元
const primitive = new T3DNativeModule.Primitive();

// 设置包围盒
primitive.setBoundingBox(
    -10, -10, -10,  // min
     10,  10,  10   // max
);

// 设置变换矩阵
const matrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    100, 0, 0, 1  // 位置在(100, 0, 0)
];
primitive.setLocalToWorldMatrix(matrix);

// 启用剔除
primitive.setFrustumCullEnable(true);
primitive.setOcclution(true);

// 添加到场景
scene.addPrimitive(primitive);

// 计算可见性
const frustum = createFrustumFromCamera(camera);
const viewMatrix = camera.matrixWorldInverse.toArray();

scene.computeVisible(frustum, viewMatrix);

// 查询结果
console.log('总图元数:', scene.numTotalPrimitives());
console.log('可见图元数:', scene.numActivePrimitives());
console.log('该图元是否可见:', primitive.isVisible());
```

### 场景2: 遮挡物设置

```javascript
// 创建大型遮挡物（如建筑物）
const building = new T3DNativeModule.Primitive();
building.setBoundingBox(-50, -50, -50, 50, 50, 50);
building.setOccluder(true);  // 标记为遮挡物
building.setOcclution(false); // 自身不参与遮挡剔除

// 创建小物体（会被遮挡）
const furniture = new T3DNativeModule.Primitive();
furniture.setBoundingBox(-1, -1, -1, 1, 1, 1);
furniture.setOcclution(true);  // 参与遮挡剔除

scene.addPrimitive(building);
scene.addPrimitive(furniture);

// 计算可见性
scene.computeVisible(frustum, viewMatrix);

// 获取遮挡统计
const occlusion = scene.getSceneSoftwareOcclusion();
console.log('遮挡物三角形数:', occlusion.numOccluderTriangles());
console.log('被剔除的对象数:', occlusion.numOcclusionCulling());

// 调试可视化
occlusion.debugViewOcclusion(true);
```

### 场景3: 视图掩码过滤

```javascript
// 使用掩码实现分层渲染
const LAYER_DEFAULT = 0x0001;
const LAYER_TRANSPARENT = 0x0002;
const LAYER_UI = 0x0004;

// 场景对象
const wall = new T3DNativeModule.Primitive();
wall.setVisibilityMask(LAYER_DEFAULT);

const glass = new T3DNativeModule.Primitive();
glass.setVisibilityMask(LAYER_TRANSPARENT);

const uiElement = new T3DNativeModule.Primitive();
uiElement.setVisibilityMask(LAYER_UI);

scene.addPrimitive(wall);
scene.addPrimitive(glass);
scene.addPrimitive(uiElement);

// 设置相机视图掩码（只渲染默认层和透明层）
camera.setViewMask(LAYER_DEFAULT | LAYER_TRANSPARENT);

scene.computeVisible(frustum, viewMatrix);
// 结果: wall和glass可见，uiElement被过滤
```

---

## 性能优化原理

### 软件遮挡剔除工作流程

```
1. 视锥体剔除 (Frustum Culling)
   ↓
   通过6个平面快速剔除视野外的对象
   ↓
2. 遮挡剔除 (Occlusion Culling)
   ↓
   a. 识别遮挡物（大型建筑、墙体等）
   b. 光栅化遮挡物到深度缓冲
   c. 测试其他对象是否被遮挡
   ↓
3. 输出可见对象列表
   ↓
   只有可见对象提交给GPU渲染
```

### 性能提升效果

| 场景类型 | 无剔除 | 