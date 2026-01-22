# core-hs.fe5726b7.bundle 完整架构图和工作流程图

> **模块概述**: core-hs.fe5726b7.bundle (1.4MB) - 宿舍家平台的核心几何建模引擎

---

## 一、完整模块架构图

```mermaid
graph TB
    subgraph "core-hs 核心建模引擎 (1.4MB)"
        
        subgraph "几何基础层 Geometry Foundation"
            GF1[Point2D/Point3D<br/>点几何]
            GF2[Curve2D/Arc2D<br/>曲线几何]
            GF3[Polygon2D/Circle2D<br/>多边形几何]
            GF4[AffineTransform<br/>仿射变换]
            GF5[Line2D/LineSegment<br/>线段几何]
            GF6[Rectangle2D<br/>矩形几何]
        end
        
        subgraph "建模对象层 Building Objects"
            BO1[Wall 墙体]
            BO2[Door/Window<br/>门窗]
            BO3[Ceiling/Floor<br/>天花板/地板]
            BO4[Beam 梁]
            BO5[Column 柱]
            BO6[Curtain 窗帘]
            BO7[Roof 屋顶]
            BO8[Stair 楼梯]
            BO9[Railing 栏杆]
            BO10[Slab 楼板]
        end
        
        subgraph "参数化建模层 Parametric Modeling"
            PM1[ParametricModel<br/>参数化模型基类]
            PM2[CustomizedPMModel<br/>自定义参数化模型]
            PM3[ParametricOpening<br/>参数化开洞]
            PM4[PMConstraint<br/>参数化约束]
            PM5[PMProperty<br/>参数化属性]
            PM6[PMRelation<br/>参数化关系]
        end
        
        subgraph "约束系统层 Constraint System"
            CS1[Constraint<br/>约束基类]
            CS2[PositionConstraint<br/>位置约束]
            CS3[DimensionConstraint<br/>尺寸约束]
            CS4[AngleConstraint<br/>角度约束]
            CS5[ConstraintFactory<br/>约束工厂]
            CS6[ConstraintSolver<br/>约束求解器]
            CS7[RelationConstraint<br/>关系约束]
        end
        
        subgraph "材质系统层 Material System"
            MS1[Material 材质]
            MS2[MaterialUtil<br/>材质工具]
            MS3[PaintService<br/>涂料服务]
            MS4[Texture 纹理]
            MS5[MaterialLibrary<br/>材质库]
            MS6[MaterialMapping<br/>材质映射]
        end
        
        subgraph "灯光系统层 Lighting System"
            LS1[Light 灯光基类]
            LS2[PointLight<br/>点光源]
            LS3[SpotLight<br/>聚光灯]
            LS4[AttenuatedSpotLight<br/>衰减聚光灯]
            LS5[DirectionalLight<br/>平行光]
            LS6[AmbientLight<br/>环境光]
        end
        
        subgraph "场景管理层 Scene Management"
            SM1[Scene 场景]
            SM2[DocumentManager<br/>文档管理器]
            SM3[TxnStateFactory<br/>事务状态工厂]
            SM4[Cache 缓存]
            SM5[SceneGraph<br/>场景图]
            SM6[LayerManager<br/>图层管理器]
        end
        
        subgraph "数据处理层 Data Processing"
            DP1[Serializer<br/>序列化器]
            DP2[Deserializer<br/>反序列化器]
            DP3[DataValidator<br/>数据验证器]
            DP4[DataConverter<br/>数据转换器]
            DP5[VersionControl<br/>版本控制]
        end
        
        subgraph "渲染支持层 Rendering Support"
            RS1[Mesh 网格]
            RS2[Geometry 几何体]
            RS3[BufferGeometry<br/>缓冲几何体]
            RS4[MeshBuilder<br/>网格构建器]
            RS5[UVMapper<br/>UV映射器]
        end
        
        subgraph "工具层 Utilities"
            UT1[MathUtil 数学工具]
            UT2[GeometryUtil<br/>几何工具]
            UT3[TransformUtil<br/>变换工具]
            UT4[CollisionDetection<br/>碰撞检测]
            UT5[BoundingBox<br/>包围盒]
        end
    end
    
    %% 层级依赖关系
    GF1 --> BO1
    GF2 --> BO1
    GF3 --> BO3
    GF4 --> BO1
    
    BO1 --> PM1
    BO2 --> PM3
    BO3 --> PM1
    
    PM1 --> CS1
    PM2 --> CS5
    PM4 --> CS6
    
    CS1 --> MS1
    CS5 --> SM1
    
    MS1 --> RS1
    MS3 --> RS4
    
    LS1 --> SM1
    LS2 --> SM5
    
    SM1 --> DP1
    SM2 --> DP5
    
    DP1 --> UT1
    RS1 --> UT2
    
    style GF1 fill:#e1f5ff
    style BO1 fill:#fff3e0
    style PM1 fill:#f3e5f5
    style CS1 fill:#e8f5e9
    style MS1 fill:#fff9c4
    style LS1 fill:#ffe0b2
    style SM1 fill:#f1f8e9
    style DP1 fill:#fce4ec
    style RS1 fill:#e0f2f1
    style UT1 fill:#f5f5f5
```

---

## 二、核心工作流程图

### 2.1 建模工作流程

```mermaid
flowchart TD
    Start([用户发起建模操作]) --> Input[输入建模参数]
    
    Input --> ValidateInput{参数验证}
    ValidateInput -->|无效| ErrorHandle[错误处理]
    ValidateInput -->|有效| CreateObject[创建建模对象]
    
    CreateObject --> CheckType{对象类型}
    
    CheckType -->|墙体| WallFlow[墙体建模流程]
    CheckType -->|门窗| OpeningFlow[开洞建模流程]
    CheckType -->|家具| FurnitureFlow[家具建模流程]
    CheckType -->|装饰| DecorationFlow[装饰建模流程]
    
    subgraph "墙体建模流程"
        WallFlow --> W1[创建Wall对象]
        W1 --> W2[设置几何参数<br/>起点/终点/高度/厚度]
        W2 --> W3[应用约束<br/>位置/尺寸/角度]
        W3 --> W4[生成几何体<br/>Polygon2D转3D]
        W4 --> W5[应用材质<br/>内外墙材质]
        W5 --> WallComplete[墙体对象完成]
    end
    
    subgraph "开洞建模流程"
        OpeningFlow --> O1[选择宿主墙体]
        O1 --> O2[创建Opening对象<br/>Door/Window]
        O2 --> O3[设置开洞参数<br/>宽度/高度/离地高度]
        O3 --> O4[计算开洞位置<br/>相对墙体坐标]
        O4 --> O5[应用参数化约束<br/>ParametricOpening]
        O5 --> O6[生成开洞几何<br/>Boolean运算]
        O6 --> O7[添加门窗构件<br/>框/扇/五金]
        O7 --> OpeningComplete[开洞对象完成]
    end
    
    subgraph "家具建模流程"
        FurnitureFlow --> F1[加载参数化模型<br/>PMModel]
        F1 --> F2[设置模型实例参数]
        F2 --> F3[应用位置约束<br/>墙面/地面吸附]
        F3 --> F4[尺寸自适应<br/>根据空间调整]
        F4 --> F5[材质映射<br/>纹理/颜色]
        F5 --> FurnitureComplete[家具对象完成]
    end
    
    subgraph "装饰建模流程"
        DecorationFlow --> D1[选择装饰类型<br/>踢脚线/顶角线/灯槽]
        D1 --> D2[提取轮廓线<br/>从墙体/天花板]
        D2 --> D3[生成装饰路径<br/>Curve2D]
        D3 --> D4[拉伸成3D形状<br/>Extrusion]
        D4 --> D5[应用装饰材质]
        D5 --> DecorationComplete[装饰对象完成]
    end
    
    WallComplete --> AddToScene[添加到场景]
    OpeningComplete --> AddToScene
    FurnitureComplete --> AddToScene
    DecorationComplete --> AddToScene
    
    AddToScene --> UpdateSceneGraph[更新场景图<br/>SceneGraph]
    UpdateSceneGraph --> BuildMesh[构建渲染网格<br/>MeshBuilder]
    BuildMesh --> ApplyMaterial[应用材质和纹理]
    ApplyMaterial --> AddLighting[添加灯光]
    AddLighting --> CacheUpdate[更新缓存<br/>Cache]
    
    CacheUpdate --> CreateTransaction[创建事务<br/>TxnStateFactory]
    CreateTransaction --> SaveState[保存状态<br/>DocumentManager]
    SaveState --> NotifyPlugins[通知插件层]
    NotifyPlugins --> RenderUpdate[触发渲染更新]
    
    RenderUpdate --> End([建模完成])
    ErrorHandle --> End

    style Start fill:#4caf50,color:#fff
    style End fill:#2196f3,color:#fff
    style WallFlow fill:#fff3e0
    style OpeningFlow fill:#e1f5ff
    style FurnitureFlow fill:#f3e5f5
    style DecorationFlow fill:#fff9c4
    style AddToScene fill:#ffebee
    style SaveState fill:#e8f5e9
```

### 2.2 约束求解流程

```mermaid
flowchart TD
    Start([用户修改对象参数]) --> CollectConstraints[收集相关约束<br/>Constraint Collection]
    
    CollectConstraints --> AnalyzeType{约束类型分析}
    
    AnalyzeType -->|位置约束| PosConstraint[PositionConstraint<br/>墙面吸附/对齐]
    AnalyzeType -->|尺寸约束| DimConstraint[DimensionConstraint<br/>最小/最大尺寸]
    AnalyzeType -->|角度约束| AngleConstraint[AngleConstraint<br/>垂直/平行/角度]
    AnalyzeType -->|关系约束| RelConstraint[RelationConstraint<br/>相对位置/间距]
    
    PosConstraint --> BuildGraph[构建约束图<br/>Constraint Graph]
    DimConstraint --> BuildGraph
    AngleConstraint --> BuildGraph
    RelConstraint --> BuildGraph
    
    BuildGraph --> CheckCycles{检测循环依赖}
    CheckCycles -->|有循环| BreakCycles[打破循环<br/>优先级排序]
    CheckCycles -->|无循环| SortConstraints[拓扑排序约束]
    
    BreakCycles --> SortConstraints
    
    SortConstraints --> IterativeSolve[迭代求解<br/>ConstraintSolver]
    
    IterativeSolve --> CheckConvergence{检查收敛性}
    CheckConvergence -->|未收敛| AdjustParams[调整求解参数<br/>松弛因子/步长]
    CheckConvergence -->|收敛| ValidateSolution[验证解的有效性]
    
    AdjustParams --> IterationCount{迭代次数检查}
    IterationCount -->|未超限| IterativeSolve
    IterationCount -->|超限| SolveFailed[求解失败]
    
    ValidateSolution --> CheckValid{解有效性}
    CheckValid -->|无效| HandleConflict[处理约束冲突]
    CheckValid -->|有效| ApplySolution[应用求解结果]
    
    HandleConflict --> RelaxConstraints[放松约束优先级]
    RelaxConstraints --> IterativeSolve
    
    ApplySolution --> UpdateGeometry[更新几何体<br/>Geometry Update]
    UpdateGeometry --> PropagateChanges[传播变化<br/>影响对象更新]
    PropagateChanges --> RecalculateMesh[重新计算网格<br/>MeshBuilder]
    RecalculateMesh --> UpdateCache[更新缓存]
    UpdateCache --> TriggerRender[触发渲染]
    
    SolveFailed --> NotifyUser[通知用户<br/>约束冲突提示]
    NotifyUser --> End([结束])
    TriggerRender --> End

    style Start fill:#4caf50,color:#fff
    style End fill:#2196f3,color:#fff
    style IterativeSolve fill:#fff3e0
    style ValidateSolution fill:#e8f5e9
    style ApplySolution fill:#e1f5ff
    style SolveFailed fill:#ffebee
```

### 2.3 材质系统工作流程

```mermaid
flowchart TD
    Start([用户选择材质]) --> LoadMaterial[加载材质定义<br/>Material]
    
    LoadMaterial --> CheckCache{检查材质缓存}
    CheckCache -->|已缓存| GetCached[获取缓存材质]
    CheckCache -->|未缓存| LoadTextures[加载纹理资源<br/>Texture]
    
    LoadTextures --> ParseProperties[解析材质属性<br/>颜色/反射/粗糙度]
    ParseProperties --> CreateMaterial[创建材质对象<br/>MaterialLibrary]
    CreateMaterial --> CacheMaterial[缓存材质]
    CacheMaterial --> GetCached
    
    GetCached --> SelectObjects[选择目标对象]
    SelectObjects --> CheckObjectType{对象类型}
    
    CheckObjectType -->|墙体| WallMapping[墙体材质映射]
    CheckObjectType -->|地板| FloorMapping[地板材质映射]
    CheckObjectType -->|家具| FurnitureMapping[家具材质映射]
    CheckObjectType -->|装饰| DecorationMapping[装饰材质映射]
    
    subgraph "墙体材质映射"
        WallMapping --> 
WM1[提取墙面UV坐标]
        WM1 --> WM2[计算纹理缩放<br/>真实尺寸映射]
        WM2 --> WM3[应用内外墙材质<br/>双面材质]
        WM3 --> WM4[处理开洞区域<br/>纹理裁剪]
        WM4 --> WallMapped[墙体材质完成]
    end
    
    subgraph "地板材质映射"
        FloorMapping --> FM1[提取地板平面]
        FM1 --> FM2[计算UV坐标<br/>平铺模式]
        FM2 --> FM3[应用地板材质<br/>木地板/瓷砖]
        FM3 --> FM4[生成法线贴图<br/>凹凸效果]
        FM4 --> FloorMapped[地板材质完成]
    end
    
    subgraph "家具材质映射"
        FurnitureMapping --> FuM1[解析模型材质槽<br/>多材质支持]
        FuM1 --> FuM2[映射材质到部件<br/>桌面/腿/抽屉]
        FuM2 --> FuM3[应用PBR材质<br/>物理渲染]
        FuM3 --> FuM4[调整材质参数<br/>金属度/粗糙度]
        FuM4 --> FurnitureMapped[家具材质完成]
    end
    
    subgraph "装饰材质映射"
        DecorationMapping --> DM1[识别装饰类型<br/>踢脚线/顶角线]
        DM1 --> DM2[沿路径UV展开]
        DM2 --> DM3[应用装饰材质<br/>石膏/木材]
        DM3 --> DecorationMapped[装饰材质完成]
    end
    
    WallMapped --> ApplyToMesh[应用到网格<br/>MaterialMapping]
    FloorMapped --> ApplyToMesh
    FurnitureMapped --> ApplyToMesh
    DecorationMapped --> ApplyToMesh
    
    ApplyToMesh --> UpdateShader[更新着色器<br/>Shader Update]
    UpdateShader --> CalculateLighting[计算光照<br/>Lighting]
    CalculateLighting --> RenderPreview[渲染预览]
    RenderPreview --> UserConfirm{用户确认}
    
    UserConfirm -->|修改| AdjustMaterial[调整材质参数<br/>MaterialUtil]
    UserConfirm -->|确认| SaveMaterial[保存材质配置<br/>DocumentManager]
    
    AdjustMaterial --> RenderPreview
    SaveMaterial --> CreateTransaction[创建事务]
    CreateTransaction --> End([完成])

    style Start fill:#4caf50,color:#fff
    style End fill:#2196f3,color:#fff
    style WallMapping fill:#fff3e0
    style FloorMapping fill:#e1f5ff
    style FurnitureMapping fill:#f3e5f5
    style DecorationMapping fill:#fff9c4
    style SaveMaterial fill:#e8f5e9
```

---

## 三、数据流图

```mermaid
flowchart LR
    subgraph "输入层 Input Layer"
        I1[用户交互<br/>User Input]
        I2[文件导入<br/>File Import]
        I3[参数配置<br/>Parameters]
    end
    
    subgraph "应用层 Application Layer"
        A1[app-hs.bundle<br/>主应用]
        A2[hs.bundle<br/>平台核心]
    end
    
    subgraph "core-hs 核心引擎"
        subgraph "几何处理 Geometry"
            G1[几何基础<br/>Points/Curves]
            G2[建模对象<br/>Wall/Door/Window]
            G3[参数化模型<br/>Parametric]
        end
        
        subgraph "约束系统 Constraints"
            C1[约束定义<br/>Constraint]
            C2[约束求解<br/>Solver]
        end
        
        subgraph "渲染准备 Rendering"
            R1[网格构建<br/>Mesh]
            R2[材质系统<br/>Material]
            R3[灯光系统<br/>Lighting]
        end
        
        subgraph "数据管理 Data"
            D1[场景管理<br/>Scene]
            D2[文档管理<br/>Document]
            D3[缓存系统<br/>Cache]
        end
    end
    
    subgraph "插件层 Plugin Layer"
        P1[DIY工具<br/>plugins-9fd2f87f]
        P2[操作工具<br/>plugins-5c263204]
        P3[AI功能<br/>plugins-1625f76b]
    end
    
    subgraph "渲染层 Rendering Layer"
        Render1[Three.js<br/>WebGL渲染]
        Render2[2D Canvas<br/>SVG导出]
    end
    
    subgraph "输出层 Output Layer"
        O1[3D视图<br/>3D View]
        O2[2D平面图<br/>Floor Plan]
        O3[文件导出<br/>Export]
    end
    
    %% 数据流向
    I1 --> A1
    I2 --> A1
    I3 --> A1
    
    A1 --> G1
    A2 --> C1
    
    G1 --> G2
    G2 --> G3
    G3 --> C1
    
    C1 --> C2
    C2 --> G2
    
    G3 --> R1
    R1 --> R2
    R2 --> R3
    
    R3 --> D1
    D1 --> D2
    D2 --> D3
    
    D3 --> P1
    D3 --> P2
    D3 --> P3
    
    P1 --> Render2
    P2 --> Render1
    P3 --> Render1
    
    Render1 --> O1
    Render2 --> O2
    D2 --> O3
    
    style I1 fill:#4caf50,color:#fff
    style A1 fill:#2196f3,color:#fff
    style G1 fill:#ff9800,color:#fff
    style C1 fill:#9c27b0,color:#fff
    style R1 fill:#f44336,color:#fff
    style D1 fill:#009688,color:#fff
    style P1 fill:#3f51b5,color:#fff
    style Render1 fill:#e91e63,color:#fff
    style O1 fill:#4caf50,color:#fff
```

---

## 四、模块依赖关系详细图

```mermaid
graph TD
    subgraph "External Dependencies 外部依赖"
        EXT1[vendor.bundle<br/>基础工具]
        EXT2[vendors-hs-62716807<br/>3D几何库]
        EXT3[vendors-hs-79789954<br/>约束系统库]
        EXT4[vendors-hs-934e91ba<br/>剪裁工具]
    end
    
    subgraph "core-hs Internal Modules 内部模块"
        subgraph "Layer 1: 基础层"
            L1M1[Geometry<br/>几何基础]
            L1M2[Math<br/>数学工具]
            L1M3[Transform<br/>变换工具]
        end
        
        subgraph "Layer 2: 对象层"
            L2M1[BuildingObject<br/>建筑对象基类]
            L2M2[Wall/Door/Window<br/>墙体门窗]
            L2M3[Ceiling/Floor<br/>顶地板]
            L2M4[Beam/Column<br/>梁柱]
        end
        
        subgraph "Layer 3: 参数化层"
            L3M1[ParametricModel<br/>参数化模型]
            L3M2[PMConstraint<br/>参数约束]
            L3M3[PMProperty<br/>参数属性]
        end
        
        subgraph "Layer 4: 约束层"
            L4M1[ConstraintBase<br/>约束基类]
            L4M2[ConstraintSolver<br/>约束求解]
            L4M3[ConstraintFactory<br/>约束工厂]
        end
        
        subgraph "Layer 5: 渲染层"
            L5M1[Mesh<br/>网格]
            L5M2[Material<br/>材质]
            L5M3[Lighting<br/>灯光]
        end
        
        subgraph "Layer 6: 管理层"
            L6M1[Scene<br/>场景]
            L6M2[Document<br/>文档]
            L6M3[Cache<br/>缓存]
        end
    end
    
    subgraph "Plugin Consumers 插件消费者"
        PC1[plugins-hs-9fd2f87f<br/>DIY工具]
        PC2[plugins-hs-adc1df6b<br/>装饰建模]
        PC3[plugins-hs-5c263204<br/>操作工具]
    end
    
    %% 外部依赖
    EXT1 --> L1M2
    EXT2 --> L1M1
    EXT3 --> L4M2
    EXT4 --> L1M1
    
    %% 内部依赖 - Layer 1 to Layer 2
    L1M1 --> L2M1
    L1M2 --> L2M1
    L1M3 --> L2M1
    
    L2M1 --> L2M2
    L2M1 --> L2M3
    L2M1 --> L2M4
    
    %% Layer 2 to Layer 3
    L2M2 --> L3M1
    L2M3 --> L3M1
    L2M4 --> L3M1
    
    L3M1 --> L3M2
    L3M1 --> L3M3
    
    %% Layer 3 to Layer 4
    L3M2 --> L4M1
    L3M3 --> L4M1
    
    L4M1 --> L4M2
    L4M1 --> L4M3
    
    %% Layer 4 to Layer 5
    L4M2 --> L5M1
    L3M1 --> L5M1
    
    L5M1 --> L5M2
    L5M2 --> L5M3
    
    %% Layer 5 to Layer 6
    L5M1 --> L6M1
    L5M2 --> L6M1
    L5M3 --> L6M1
    
    L6M1 --> L6M2
    L6M2 --> L6M3
    
    %% 插件消费
    L6M1 --> PC1
    L6M2 --> PC1
    L6M3 --> PC1
    
    L6M1 --> PC2
    L6M2 --> PC2
    
    L6M1 --> PC3
    L6M3 --> PC3
    
    style EXT1 fill:#e3f2fd
    style L1M1 fill:#fff3e0
    style L2M1 fill:#f3e5f5
    style L3M1 fill:#e8f5e9
    style L4M1 fill:#fff9c4
    style L5M1 fill:#fce4ec
    style L6M1 fill:#f1f8e9
    style PC1 fill:#e0f2f1
```

---

## 五、核心算法流程

### 5.1 墙体建模算法

```mermaid
flowchart TD
    Start([输入墙体参数]) --> Parse[解析参数<br/>起点/终点/高度/厚度]
    
    Parse --> CreateLine[创建中心线<br/>LineSegment2D]
    CreateLine --> CalcOffset[计算偏移量<br/>厚度/2]
    CalcOffset --> GenParallel[生成平行线<br/>两侧边界]
    
    GenParallel --> CreatePolygon[创建底面多边形<br/>Polygon2D]
    CreatePolygon --> CheckIntersect{检查相交墙体}
    
    CheckIntersect -->|有相交| HandleIntersect[处理墙体相交<br/>T型/L型/十字]
    CheckIntersect -->|无相交| Extrude[拉伸成3D<br/>Extrusion]
    
    HandleIntersect --> CalcJoint[计算接缝<br/>Miter/Bevel]
    CalcJoint --> AdjustGeometry[调整几何体<br/>布尔运算]
    AdjustGeometry --> Extrude
    
    Extrude --> CreateMesh[创建网格<br/>顶点/面]
    CreateMesh --> CalcNormals[计算法线<br/>Normals]
    CalcNormals --> GenUV[生成UV坐标<br/>纹理映射]
    
    GenUV --> ApplyConstraints[应用约束<br/>平行/垂直]
    ApplyConstraints --> AddToScene[添加到场景]
    
    AddToScene --> End([完成])
    
    style Start fill:#4caf50,color:#fff
    style End fill:#2196f3,color:#fff
    style HandleIntersect fill:#fff3e0
    style CreateMesh fill:#e1f5ff
```

### 5.2 约束求解算法

```mermaid
flowchart TD
    Start([接收约束变更]) --> CollectAffected[收集受影响对象]
    
    CollectAffected --> BuildGraph[构建依赖图<br/>Dependency Graph]
    BuildGraph --> TopologicalSort[拓扑排序<br/>解决顺序]
    
    TopologicalSort --> InitSolver[初始化求解器<br/>ConstraintSolver]
    InitSolver --> SetupEquations[建立方程组<br/>Ax=b]
    
    SetupEquations --> ChooseMethod{选择求解方法}
    
    ChooseMethod -->|线性约束| GaussElimination[高斯消元法]
    ChooseMethod -->|非线性约束| NewtonMethod[牛顿迭代法]
    ChooseMethod -->|混合约束| HybridMethod[混合求解]
    
    GaussElimination --> Solve1[求解线性系统]
    NewtonMethod --> Solve2[迭代求解<br/>Jacobian矩阵]
    HybridMethod --> Solve3[分步求解]
    
    Solve1 --> CheckConvergence{收敛检查}
    Solve2 --> CheckConvergence
    Solve3 --> CheckConvergence
    
    CheckConvergence -->|未收敛| UpdateParams[更新参数<br/>步长/松弛因子]
    CheckConvergence -->|收敛| ValidateResult[验证结果<br/>物理有效性]
    
    UpdateParams --> IterCount{迭代次数}
    IterCount -->|<最大次数| Solve2
    IterCount -->|≥最大次数| Failed[求解失败]
    
    ValidateResult --> CheckValid{结果有效}
    CheckValid -->|无效| RelaxConstraints[放松约束]
    CheckValid -->|有效| ApplyResult[应用结果]
    
    RelaxConstraints --> SetupEquations
    
    ApplyResult --> UpdateGeometry[更新几何体]
    UpdateGeometry --> PropagateChanges[传播变更<br/>相关对象]
    PropagateChanges --> NotifyObservers[通知观察者<br/>Observer Pattern]
    
    NotifyObservers --> End([完成])
    Failed --> End
    
    style Start fill:#4caf50,color:#fff
    style End fill:#2196f3,color:#fff
    style NewtonMethod fill:#fff3e0
    style ValidateResult 
fill:#e8f5e9
    style Failed fill:#ffebee
```

---

## 六、核心类关系图

```mermaid
classDiagram
    class GeometryBase {
        <<abstract>>
        +transform(matrix)
        +getBounds()
        +clone()
        +serialize()
    }
    
    class Point2D {
        +x: number
        +y: number
        +distanceTo(point)
        +add(vector)
        +subtract(vector)
    }
    
    class Point3D {
        +x: number
        +y: number
        +z: number
        +distanceTo(point)
        +cross(vector)
        +dot(vector)
    }
    
    class Curve2D {
        +startPoint: Point2D
        +endPoint: Point2D
        +getLength()
        +getPointAt(t)
        +getTangentAt(t)
    }
    
    class Polygon2D {
        +vertices: Point2D[]
        +isClosed: boolean
        +getArea()
        +contains(point)
        +offset(distance)
    }
    
    class BuildingObject {
        <<abstract>>
        +id: string
        +type: string
        +properties: Map
        +constraints: Constraint[]
        +getMesh()
        +applyConstraints()
    }
    
    class Wall {
        +startPoint: Point3D
        +endPoint: Point3D
        +height: number
        +thickness: number
        +openings: Opening[]
        +addOpening(opening)
        +removeOpening(id)
        +getGeometry()
    }
    
    class Opening {
        <<abstract>>
        +hostWall: Wall
        +width: number
        +height: number
        +offset: number
        +heightFromFloor: number
    }
    
    class Door {
        +openingAngle: number
        +doorType: string
        +handleSide: string
    }
    
    class Window {
        +windowType: string
        +sillHeight: number
        +glazingType: string
    }
    
    class ParametricModel {
        +parameters: Map~string,any~
        +constraints: PMConstraint[]
        +relations: PMRelation[]
        +evaluate()
        +updateParameter(key, value)
    }
    
    class Constraint {
        <<abstract>>
        +priority: number
        +isActive: boolean
        +objects: BuildingObject[]
        +evaluate()
        +solve()
    }
    
    class PositionConstraint {
        +targetPosition: Point3D
        +tolerance: number
        +snapTo: string
    }
    
    class DimensionConstraint {
        +minValue: number
        +maxValue: number
        +dimension: string
    }
    
    class Material {
        +id: string
        +name: string
        +color: Color
        +texture: Texture
        +roughness: number
        +metalness: number
        +applyTo(mesh)
    }
    
    class Scene {
        +objects: BuildingObject[]
        +lights: Light[]
        +camera: Camera
        +addObject(object)
        +removeObject(id)
        +query(selector)
    }
    
    class DocumentManager {
        +currentDocument: Document
        +history: Transaction[]
        +save()
        +load()
        +undo()
        +redo()
    }
    
    %% 继承关系
    GeometryBase <|-- Point2D
    GeometryBase <|-- Point3D
    GeometryBase <|-- Curve2D
    GeometryBase <|-- Polygon2D
    
    BuildingObject <|-- Wall
    BuildingObject <|-- Opening
    Opening <|-- Door
    Opening <|-- Window
    
    Constraint <|-- PositionConstraint
    Constraint <|-- DimensionConstraint
    
    %% 组合关系
    Wall "1" *-- "*" Opening : contains
    BuildingObject "1" *-- "*" Constraint : has
    Scene "1" *-- "*" BuildingObject : contains
    Scene "1" *-- "*" Light : contains
    
    %% 关联关系
    Wall --> Point3D : uses
    Wall --> Polygon2D : creates
    Opening --> Wall : references
    ParametricModel --> Constraint : uses
    BuildingObject --> Material : has
    DocumentManager --> Scene : manages
    
    %% 依赖关系
    Wall ..> Curve2D : creates
    ParametricModel ..> BuildingObject : generates
```

---

## 七、性能优化策略

```mermaid
mindmap
    root((core-hs<br/>性能优化))
        几何计算优化
            空间索引
                Octree八叉树
                KD-Tree
                BVH层次包围盒
            LOD细节层次
                远距离简化
                动态切换
                流式加载
            几何批处理
                合并网格
                实例化渲染
                减少Draw Call
        约束求解优化
            增量求解
                仅计算变更部分
                缓存中间结果
                差异更新
            并行计算
                Web Worker
                GPU计算
                SIMD指令
            求解器选择
                线性约束快速求解
                非线性约束迭代
                混合策略
        内存管理
            对象池
                几何对象复用
                减少GC压力
                预分配内存
            弱引用
                大对象缓存
                自动清理
                内存监控
            数据压缩
                顶点数据压缩
                索引优化
                纹理压缩
        缓存策略
            多级缓存
                内存缓存
                IndexedDB
                Service Worker
            缓存失效
                基于版本
                依赖追踪
                LRU策略
            预加载
                常用资源
                智能预测
                后台加载
        渲染优化
            视锥裁剪
                场景剪裁
                遮挡剔除
                距离裁剪
            纹理优化
                Mipmap
                纹理图集
                压缩格式
            着色器优化
                统一变量批处理
                精度优化
                分支减少
```

---

## 八、核心API接口

### 8.1 几何API

```typescript
// 点 Point
interface IPoint2D {
    x: number;
    y: number;
    distanceTo(other: IPoint2D): number;
    add(vector: IVector2D): IPoint2D;
    clone(): IPoint2D;
}

interface IPoint3D extends IPoint2D {
    z: number;
    cross(other: IPoint3D): IPoint3D;
    dot(other: IPoint3D): number;
}

// 曲线 Curve
interface ICurve2D {
    startPoint: IPoint2D;
    endPoint: IPoint2D;
    getLength(): number;
    getPointAt(t: number): IPoint2D;
    getTangentAt(t: number): IVector2D;
    offset(distance: number): ICurve2D;
}

// 多边形 Polygon
interface IPolygon2D {
    vertices: IPoint2D[];
    isClosed: boolean;
    getArea(): number;
    getPerimeter(): number;
    contains(point: IPoint2D): boolean;
    offset(distance: number): IPolygon2D;
    boolean(other: IPolygon2D, operation: BooleanOp): IPolygon2D;
}
```

### 8.2 建模对象API

```typescript
// 建筑对象基类
interface IBuildingObject {
    id: string;
    type: string;
    properties: Map<string, any>;
    constraints: IConstraint[];
    
    getMesh(): IMesh;
    getBounds(): IBoundingBox;
    applyConstraints(): void;
    serialize(): string;
}

// 墙体 Wall
interface IWall extends IBuildingObject {
    startPoint: IPoint3D;
    endPoint: IPoint3D;
    height: number;
    thickness: number;
    openings: IOpening[];
    
    addOpening(opening: IOpening): void;
    removeOpening(id: string): void;
    getGeometry(): IGeometry3D;
    split(point: IPoint3D): IWall[];
}

// 开洞 Opening
interface IOpening extends IBuildingObject {
    hostWall: IWall;
    width: number;
    height: number;
    offset: number;
    heightFromFloor: number;
    
    getLocalPosition(): IPoint2D;
    updatePosition(offset: number): void;
}
```

### 8.3 参数化建模API

```typescript
// 参数化模型
interface IParametricModel {
    parameters: Map<string, IParameter>;
    constraints: IPMConstraint[];
    relations: IPMRelation[];
    
    evaluate(): void;
    updateParameter(key: string, value: any): void;
    addConstraint(constraint: IPMConstraint): void;
    createInstance(params: Record<string, any>): IBuildingObject;
}

// 参数定义
interface IParameter {
    name: string;
    type: ParameterType;
    value: any;
    min?: number;
    max?: number;
    options?: any[];
    expression?: string;
}

// 参数化约束
interface IPMConstraint {
    type: ConstraintType;
    parameters: string[];
    expression: string;
    evaluate(): boolean;
}
```

### 8.4 约束系统API

```typescript
// 约束基类
interface IConstraint {
    id: string;
    type: ConstraintType;
    priority: number;
    isActive: boolean;
    objects: IBuildingObject[];
    
    evaluate(): number;
    solve(): boolean;
    getError(): number;
}

// 约束求解器
interface IConstraintSolver {
    constraints: IConstraint[];
    
    addConstraint(constraint: IConstraint): void;
    removeConstraint(id: string): void;
    solve(): SolveResult;
    reset(): void;
}

// 求解结果
interface SolveResult {
    success: boolean;
    iterations: number;
    error: number;
    conflictingConstraints?: string[];
}
```

### 8.5 材质系统API

```typescript
// 材质
interface IMaterial {
    id: string;
    name: string;
    color: IColor;
    texture?: ITexture;
    normalMap?: ITexture;
    roughness: number;
    metalness: number;
    
    applyTo(mesh: IMesh): void;
    clone(): IMaterial;
}

// 材质映射
interface IMaterialMapping {
    material: IMaterial;
    uvTransform?: IMatrix3;
    
    mapToObject(object: IBuildingObject): void;
    calculateUV(geometry: IGeometry): number[];
}

// 材质库
interface IMaterialLibrary {
    materials: Map<string, IMaterial>;
    
    add(material: IMaterial): void;
    get(id: string): IMaterial;
    search(query: string): IMaterial[];
    loadFromServer(url: string): Promise<void>;
}
```

### 8.6 场景管理API

```typescript
// 场景
interface IScene {
    objects: Map<string, IBuildingObject>;
    lights: ILight[];
    camera: ICamera;
    
    addObject(object: IBuildingObject): void;
    removeObject(id: string): void;
    getObject(id: string): IBuildingObject;
    query(selector: string): IBuildingObject[];
    raycast(ray: IRay): Intersection[];
}

// 文档管理器
interface IDocumentManager {
    currentDocument: IDocument;
    history: ITransaction[];
    
    save(): Promise<void>;
    load(id: string): Promise<IDocument>;
    undo(): boolean;
    redo(): boolean;
    createTransaction(description: string): ITransaction;
}

// 事务
interface ITransaction {
    id: string;
    description: string;
    timestamp: number;
    changes: IChange[];
    
    execute(): void;
    rollback(): void;
}
```

---

## 九、扩展点和插件接口

```mermaid
flowchart TB
    subgraph "core-hs 扩展架构"
        subgraph "核心引擎 Core Engine"
            Core[Core System<br/>核心系统]
            Registry[Plugin Registry<br/>插件注册表]
            EventBus[Event Bus<br/>事件总线]
        end
        
        subgraph "扩展点 Extension Points"
            EP1[BuildingObject<br/>Extension<br/>建模对象扩展]
            EP2[Constraint<br/>Extension<br/>约束扩展]
            EP3[Material<br/>Extension<br/>材质扩展]
            EP4[Tool<br/>Extension<br/>工具扩展]
            EP5[Exporter<br/>Extension<br/>导出器扩展]
        end
        
        subgraph "插件层 Plugin Layer"
            P1[DIY Plugin<br/>DIY插件]
            P2[Operation Plugin<br/>操作插件]
            P3[AI Plugin<br/>AI插件]
            P4[B2/B3 Plugin<br/>业务插件]
        end
    end
    
    Core --> Registry
    Registry --> EventBus
    
    EventBus --> EP1
    EventBus --> EP2
    EventBus --> EP3
    EventBus --> EP4
    EventBus --> EP5
    
    EP1 --> P1
    EP2 --> P1
    EP3 --> P2
    EP4 --> P2
    EP5 --> P3
    
    EP1 --> P4
    EP4 --> P4
    
    style Core fill:#4caf50,color:#fff
    style Registry fill:#2196f3,color:#fff
    style EP1 fill:#ff9800,color:#fff
    style P1 fill:#9c27b0,color:#fff
```

### 插件接口定义

```typescript
// 插件基类
interface IPlugin {
    name: string;
    version: string;
    dependencies: string[];
    
    initialize(context: IPluginContext): void;
    activate(): void;
    deactivate(): void;
    dispose(): void;
}

// 插件上下文
interface IPluginContext {
    scene: IScene;
    documentManager: IDocumentManager;
    eventBus: IEventBus;
    registry: IRegistry;
    
    registerBuildingObjectType(type: string, factory: IFactory): void;
    registerConstraintType(type: string, solver: ISolver): void;
    registerTool(tool: ITool): void;
    registerExporter(exporter: IExporter): void;
}

// 事件总线
interface IEventBus {
    on(event: string, handler: Function): void;
    off(event: string, handler: Function): void;
    emit(event: string, data: any): void;
}
```

---

## 十、总结

### 核心特性

1. **强大的几何引擎**: 完整的2D/3D几何基础库
2. **参数化建模**: 灵活的参数化系统支持复杂模型
3. **约束求解**: 高效的约束求解器保证模型一致性
4. **可扩展架构**: 清晰的扩展点支持插件开发
5. **材质系统**: 完整的PBR材质和纹理映射
6. **性能优化**: 多级缓存和LOD系统

### 技术亮点

- **模块化设计**: 500+模块清晰分层
- **依赖管理**: 严格的依赖层次避免循环依赖
- **事务系统**: 完整的undo/redo支持
- **插件架构**: 8个插件模块灵活扩展功能
- **数据持久化**: 完善的序列化和版本控制

### 应用场景

- 室内设计CAD系统
- BIM建筑信息建模
- 家装DIY工具
- 3D户型编辑器
- 参数化家具设计

---

**文档版本**: v1.0  
**最后更新**: 2026-01-22  
**维护者**: 