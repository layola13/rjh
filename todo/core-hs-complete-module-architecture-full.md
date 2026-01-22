
# core-hs.fe5726b7.bundle 完整模块架构图 (1.4MB)

> **文档说明**: 本文档提供core-hs核心建模引擎的完整架构分析，包含所有层次、模块、类关系和数据流。

---

## 📊 一、完整系统架构图

```mermaid
graph TB
    subgraph "核心建模引擎 Core-HS Engine (1.4MB)"
        
        subgraph "几何基础层 Geometry Foundation Layer"
            GF_Point[Point2D/Point3D<br/>点几何<br/>坐标运算]
            GF_Curve[Curve2D/Arc2D/Circle2D<br/>曲线几何<br/>参数化曲线]
            GF_Polygon[Polygon2D/Rectangle2D<br/>多边形几何<br/>布尔运算]
            GF_Line[Line2D/LineSegment<br/>线段几何<br/>求交运算]
            GF_Transform[AffineTransform<br/>仿射变换<br/>平移/旋转/缩放]
            GF_3D[Point3D/Vector3D<br/>3D几何<br/>空间运算]
        end
        
        subgraph "建模对象层 Building Objects Layer"
            BO_Wall[Wall 墙体<br/>wall.js<br/>厚度/高度/材质]
            BO_Opening[Opening 开洞基类<br/>opening.js<br/>宽度/高度/偏移]
            BO_Door[Door 门<br/>door.js<br/>开启角度/铰链]
            BO_Window[Window 窗<br/>window.js<br/>窗台高度/类型]
            BO_Slab[Slab 楼板<br/>slab.js<br/>厚度/高度/轮廓]
            BO_Ceiling[Ceiling 天花板<br/>ceiling.js<br/>吊顶类型]
            BO_Floor[Floor 地板<br/>floor.js<br/>地面标高]
            BO_Column[Column 柱<br/>column.js<br/>截面/高度]
            BO_Beam[Beam 梁<br/>beam.js<br/>截面/跨度]
            BO_Stair[Stair 楼梯<br/>stair.js<br/>踏步/坡度]
            BO_Railing[Railing 栏杆<br/>railing.js<br/>高度/样式]
            BO_Roof[Roof 屋顶<br/>roof.js<br/>坡度/类型]
            BO_Curtain[Curtain 窗帘<br/>curtain.js<br/>悬挂方式]
        end
        
        subgraph "参数化建模层 Parametric Modeling Layer"
            PM_Base[ParametricModel<br/>parametricmodel.js<br/>参数化模型基类]
            PM_Custom[CustomizedPMModel<br/>customizedpmmodel.js<br/>自定义PM模型]
            PM_Opening[ParametricOpening<br/>parametricopening.js<br/>参数化开洞]
            PM_Window[ParametricWindow<br/>parametricwindow.js<br/>参数化窗]
            PM_Constraint[PMConstraint<br/>参数化约束系统]
            PM_Property[PMProperty<br/>参数化属性管理]
            PM_Relation[PMRelation<br/>参数化关系链]
        end
        
        subgraph "约束系统层 Constraint System Layer"
            CS_Base[Constraint 基类<br/>constraint.js<br/>约束求解器]
            CS_Position[PositionConstraint<br/>positionconstraint.js<br/>位置约束]
            CS_Dimension[DimensionConstraint<br/>尺寸约束]
            CS_Parallel[ParallelConstraint<br/>平行约束]
            CS_Perpendicular[PerpendicularConstraint<br/>垂直约束]
            CS_Coincident[CoincidentConstraint<br/>重合约束]
            CS_Factory[ConstraintFactory<br/>constraintfactory.js<br/>约束工厂]
        end
        
        subgraph "材质系统层 Material System Layer"
            MAT_Base[Material 材质基类<br/>material.js<br/>颜色/纹理/反射]
            MAT_Util[MaterialUtil<br/>materialutil.js<br/>材质工具]
            MAT_Library[MaterialLibrary<br/>材质库管理]
            MAT_Paint[PaintService<br/>paintservice.js<br/>涂料服务]
            MAT_Mix[MixPaint<br/>mixpaint.js<br/>混合涂装]
            MAT_Texture[TextureManager<br/>纹理管理器]
        end
        
        subgraph "灯光系统层 Lighting System Layer"
            LIGHT_Base[Light 灯光基类<br/>light.js<br/>颜色/强度/阴影]
            LIGHT_Point[PointLight<br/>pointlight.js<br/>点光源]
            LIGHT_Spot[SpotLight<br/>spotlight.js<br/>聚光灯]
            LIGHT_Directional[DirectionalLight<br/>平行光]
            LIGHT_Area[AreaLight<br/>区域光]
            LIGHT_Attenuated[AttenuatedSpotLight<br/>attenuatedspotlight.js<br/>衰减聚光灯]
        end
        
        subgraph "场景管理层 Scene Management Layer"
            SCENE_Scene[Scene 场景<br/>scene.js<br/>对象容器]
            SCENE_Layer[Layer 图层<br/>layer.js<br/>图层管理]
            SCENE_Doc[DocumentManager<br/>documentmanager.js<br/>文档管理器]
            SCENE_Txn[TxnStateFactory<br/>txnstatefactory.js<br/>事务工厂]
            SCENE_Cache[CacheManager<br/>缓存管理器]
        end
        
        subgraph "草图系统层 Sketch System Layer"
            SKETCH_2D[Sketch2D<br/>2D草图系统]
            SKETCH_Builder[Sketch2DBuilder<br/>sketch2dbuilder.js<br/>草图构建器]
            SKETCH_Util[Sketch2DUtil<br/>sketch2dutil.js<br/>草图工具]
            SKETCH_Face[Face2D<br/>2D面]
            SKETCH_Loop[Loop2D<br/>2D环]
            SKETCH_Curve[Curve2D<br/>2D曲线]
        end
        
        subgraph "几何内核层 Geometry Kernel Layer"
            KERNEL_WebCAD[WebCADDocument<br/>CAD文档]
            KERNEL_Boolean[BooleanOperation<br/>布尔运算]
            KERNEL_Extrude[ExtrudeBody<br/>拉伸实体]
            KERNEL_Revolve[RevolveBody<br/>旋转实体]
            KERNEL_Sweep[SweepBody<br/>扫掠实体]
            KERNEL_Mesh[MeshDefinition<br/>网格定义]
        end
        
        subgraph "渲染层 Rendering Layer"
            RENDER_Graphics[GraphicsData<br/>图形数据]
            RENDER_Mesh[MeshBuilder<br/>网格构建器]
            RENDER_Shader[ShaderManager<br/>着色器管理]
            RENDER_UV[UVMapper<br/>UV映射器]
        end
    end
    
    %% 层次依赖关系
    GF_Point --> BO_Wall
    GF_Curve --> BO_Wall
    GF_Polygon --> BO_Slab
    GF_Transform --> BO_Wall
    
    BO_Wall --> PM_Base
    BO_Opening --> PM_Opening
    BO_Door --> PM_Opening
    BO_Window --> PM_Window
    
    PM_Base --> CS_Base
    CS_Base --> CS_Position
    CS_Base --> CS_Dimension
    
    MAT_Base --> BO_Wall
    MAT_Paint --> BO_Slab
    
    LIGHT_Base --> SCENE_Scene
    SCENE_Scene --> SCENE_Doc
    
    SKETCH_2D --> KERNEL_WebCAD
    KERNEL_WebCAD --> KERNEL_Extrude
    KERNEL_Extrude --> RENDER_Graphics
    
    RENDER_Graphics --> RENDER_Mesh
```

---

## 🏗️ 二、核心建模对象完整类图

```mermaid
classDiagram
    class GeometryBase {
        <<abstract>>
        +id: string
        +type: string
        +transform(): Matrix4
        +getBounds(): BoundingBox
        +clone(): GeometryBase
        +serialize(): Object
    }
    
    class Point2D {
        +x: number
        +y: number
        +distanceTo(other): number
        +equals(other): boolean
        +add(vector): Point2D
        +subtract(other): Vector2D
        +rotate(angle, center): Point2D
        +scale(factor): Point2D
    }
    
    class Point3D {
        +x: number
        +y: number
        +z: number
        +distanceTo(other): number
        +crossProduct(other): Vector3D
        +dotProduct(other): number
        +normalize(): Point3D
        +projectToPlane(plane): Point2D
    }
    
    class Curve2D {
        <<abstract>>
        +startPoint: Point2D
        +endPoint: Point2D
        +length: number
        +getPointAt(t): Point2D
        +getTangentAt(t): Vector2D
        +split(t): Curve2D[]
        +offset(distance): Curve2D
        +reverse(): Curve2D
    }
    
    class Arc2D {
        +center: Point2D
        +radius: number
        +startAngle: number
        +endAngle: number
        +clockwise: boolean
        +getBulge(): number
        +toPolyline(segments): Point2D[]
    }
    
    class Line2D {
        +start: Point2D
        +end: Point2D
        +direction: Vector2D
        +intersect(other): Point2D | null
        +containsPoint(point): boolean
        +distanceToPoint(point): number
        +perpendicular(point): Line2D
    }
    
    class Polygon2D {
        +vertices: Point2D[]
        +holes: Polygon2D[]
        +isClosed: boolean
        +area: number
        +perimeter: number
        +centroid: Point2D
        +contains(point): boolean
        +intersect(other): Polygon2D[]
        +union(other): Polygon2D
        +difference(other): Polygon2D
        +offset(distance): Polygon2D
    }
    
    class BuildingObject {
        <<abstract>>
        +id: string
        +name: string
        +type: string
        +layer: Layer
        +material: Material
        +constraints: Constraint[]
        +properties: Map~string,any~
        +children: BuildingObject[]
        +parent: BuildingObject
        +transform: Matrix4
        +visible: boolean
        +locked: boolean
        +getMesh(): Mesh
        +getBounds(): BoundingBox
        +addChild(child): void
        +removeChild(id): void
        +applyConstraints(): void
        +serialize(): Object
    }
    
    class Wall {
        +startPoint: Point3D
        +endPoint: Point3D
        +height: number
        +thickness: number
        +baseHeight: number
        +topHeight: number
        +openings: Opening[]
        +baseProfile: Polygon2D
        +direction: Vector3D
        +length: number
        +innerMaterial: Material
        +outerMaterial: Material
        +addOpening(opening): void
        +removeOpening(id): void
        +split(point): Wall[]
        +getGeometry(): Geometry3D
        +getFaces(): Face[]
        +updateProfile(): void
    }
    
    class Opening {
        <<abstract>>
        +hostWall: Wall
        +width: number
        +height: number
        +offset: number
        +heightFromFloor: number
        +sillHeight: number
        +depth: number
        +swing: number
        +getLocalPosition(): Point2D
        +getGlobalPosition(): Point3D
        +updatePosition(offset): void
        +getCutProfile(): Polygon2D
    }
    
    class Door {
        +openingAngle: number
        +doorType: string
        +handleSide: string
        +isOpened: boolean
        +frameThickness: number
        +leafThickness: number
        +canOpen(): boolean
        +open(angle): void
        +close(): void
        +getDoorOffset(): number
        +updateOpenStatus(angle): void
    }
    
    class Window {
        +windowType: string
        +sillHeight: number
        +glazingType: string
        +frameWidth: number
        +mullions: number
        +transoms: number
        +hasShutters: boolean
        +getGlazingArea(): number
        +getDivisions(): Rectangle2D[]
    }
    
    class Slab {
        +height: number
        +thickness: number
        +baseProfile: Polygon2D
        +topFaces: Face[]
        +bottomFaces: Face[]
        +sideFaces: Face[]
        +openings: Opening[]
        +center: Point2D
        +getBaseProfile(): Polygon2D
        +setThickness(value): void
        +getFaces(type): Face[]
        +getFaceType(face): string
        +forEachFace(callback): void
    }
    
    class Ceiling {
        +ceilingType: string
        +height: number
        +thickness: number
        +dropHeight: number
        +profile: Polygon2D
        +hasCove: boolean
        +coveRadius: number
        +getLightingZones(): Zone[]
    }
    
    class Floor {
        +floorType: string
        +elevation: number
        +thickness: number
        +profile: Polygon2D
        +hasUnderfloorHeating: boolean
        +slope: number
        +drainPoints: Point2D[]
    }
    
    class Column {
        +columnType: string
        +width: number
        +depth: number
        +height: number
        +baseHeight: number
        +topHeight: number
        +crossSection: Polygon2D
        +angle: number
        +getCrossSection(height): Polygon2D
        +getVolume(): number
    }
    
    class Beam {
        +beamType: string
        +width: number
        +height: number
        +length: number
        +startPoint: Point3D
        +endPoint: Point3D
        +crossSection: Polygon2D
        +angle: number
        +getCenterline(): Line3D
        +getVolume(): number
    }
    
    class ParametricModel {
        +parameters: Map~string,any~
        +constraints: PMConstraint[]
        +relations: PMRelation[]
        +webCADDocument: WebCADDocument
        +parentWebCADDoc: WebCADDocument
        +evaluate(): void
        +updateParameter(key, value): void
        +addConstraint(constraint): void
        +removeConstraint(id): void
        +compute(): void
        +toGraphicsData(): GraphicsData
        +toGraphicsDataAsync(): Promise~GraphicsData~
    }
    
    class CustomizedPMModel {
        +childNodes: Map~string,BaseObject~
        +createViewModel(entity): void
        +onInit(): void
        +onChildAdded(event): void
        +onChildRemoved(event): void
        +onCleanup(): void
    }
    
    class ParametricOpening {
        +metadata: Object
        +objInfo: Object
        +extension: Object
        +getModelState(): State
        +updateFromState(state): void
    }
    
    class ParametricWindow {
        +windowParameters: Object
        +frameParameters: Object
        +glazingParameters: Object
        +mullionPattern: string
        +rebuildGeometry(): void
    }
    
    class Constraint {
        <<abstract>>
        +id: string
        +priority: number
        +isActive: boolean
        +objects: BuildingObject[]
        +tolerance: number
        +evaluate(): boolean
        +solve(): boolean
        +isStatic(): boolean
        +getError(): number
    }
    
    class PositionConstraint {
        +targetPosition: Point3D
        +snapTo: string
        +offsetX: number
        +offsetY: number
        +offsetZ: number
        +computePosition(): Point3D
    }
    
    class DimensionConstraint {
        

+minValue: number
        +maxValue: number
        +dimension: string
        +currentValue: number
        +applyDimension(): void
    }
    
    class ParallelConstraint {
        +object1: BuildingObject
        +object2: BuildingObject
        +direction: Vector3D
        +checkParallel(): boolean
    }
    
    class Material {
        +id: string
        +name: string
        +color: Color
        +texture: Texture
        +normalMap: Texture
        +roughness: number
        +metalness: number
        +opacity: number
        +emissive: Color
        +applyTo(mesh): void
        +clone(): Material
    }
    
    class Light {
        <<abstract>>
        +color: Color
        +intensity: number
        +castShadow: boolean
        +shadowBias: number
        +position: Point3D
        +target: Point3D
        +computeLighting(point): Color
    }
    
    class Scene {
        +objects: BuildingObject[]
        +lights: Light[]
        +camera: Camera
        +layers: Layer[]
        +activeLayer: Layer
        +addObject(object): void
        +removeObject(id): void
        +query(selector): BuildingObject[]
        +raycast(ray): Intersection[]
    }
    
    class DocumentManager {
        +currentDocument: Document
        +history: Transaction[]
        +undoStack: Transaction[]
        +redoStack: Transaction[]
        +save(): Promise~void~
        +load(path): Promise~Document~
        +undo(): void
        +redo(): void
        +createTransaction(name): Transaction
    }
    
    %% 继承关系
    GeometryBase <|-- Point2D
    GeometryBase <|-- Point3D
    GeometryBase <|-- Curve2D
    GeometryBase <|-- Polygon2D
    
    Curve2D <|-- Arc2D
    Curve2D <|-- Line2D
    
    BuildingObject <|-- Wall
    BuildingObject <|-- Opening
    BuildingObject <|-- Slab
    BuildingObject <|-- Column
    BuildingObject <|-- Beam
    
    Opening <|-- Door
    Opening <|-- Window
    
    Slab <|-- Ceiling
    Slab <|-- Floor
    
    BuildingObject <|-- ParametricModel
    ParametricModel <|-- CustomizedPMModel
    ParametricModel <|-- ParametricOpening
    ParametricOpening <|-- ParametricWindow
    
    Constraint <|-- PositionConstraint
    Constraint <|-- DimensionConstraint
    Constraint <|-- ParallelConstraint
    
    Light <|-- PointLight
    Light <|-- SpotLight
    
    %% 组合关系
    Wall "1" *-- "*" Opening : contains
    Slab "1" *-- "*" Opening : contains
    BuildingObject "1" *-- "*" Constraint : has
    Scene "1" *-- "*" BuildingObject : contains
    Scene "1" *-- "*" Light : contains
    Scene "1" *-- "*" Layer : organizes
    
    %% 关联关系
    Wall --> Point3D : uses
    Wall --> Polygon2D : creates
    Opening --> Wall : references
    ParametricModel --> Constraint : uses
    BuildingObject --> Material : has
    DocumentManager --> Scene : manages
    
    %% 依赖关系
    Wall ..> Curve2D : creates
    ParametricModel ..> WebCADDocument : generates
```

---

## 🔄 三、完整建模工作流程图

```mermaid
flowchart TD
    Start([用户开始建模]) --> SelectMode{选择建模模式}
    
    SelectMode -->|墙体建模| WallFlow[墙体建模流程]
    SelectMode -->|开洞建模| OpeningFlow[门窗开洞流程]
    SelectMode -->|家具放置| FurnitureFlow[家具放置流程]
    SelectMode -->|装饰建模| DecorationFlow[装饰建模流程]
    SelectMode -->|参数化| ParametricFlow[参数化建模流程]
    
    subgraph "墙体建模流程 Wall Modeling"
        WallFlow --> W1[绘制墙体路径<br/>Curve2D]
        W1 --> W2[设置墙体参数<br/>厚度/高度]
        W2 --> W3[生成墙体轮廓<br/>Polygon2D]
        W3 --> W4[创建Wall对象<br/>wall.js]
        W4 --> W5[应用材质<br/>内外墙材质]
        W5 --> W6[生成3D几何体<br/>Extrusion]
        W6 --> W7[添加约束<br/>平行/垂直/尺寸]
        W7 --> WallComplete[墙体对象完成]
    end
    
    subgraph "门窗开洞流程 Opening Modeling"
        OpeningFlow --> O1[选择宿主墙体<br/>Wall]
        O1 --> O2[选择开洞类型<br/>Door/Window]
        O2 --> O3[设置开洞参数<br/>宽度/高度/偏移]
        O3 --> O4{开洞类型判断}
        O4 -->|门| O5[创建Door对象<br/>door.js]
        O4 -->|窗| O6[创建Window对象<br/>window.js]
        O5 --> O7[计算切割轮廓<br/>getCutProfile]
        O6 --> O7
        O7 --> O8[更新墙体几何<br/>布尔差集]
        O8 --> O9[生成门窗框架<br/>ParametricModel]
        O9 --> O10[应用开洞材质]
        O10 --> OpeningComplete[开洞对象完成]
    end
    
    subgraph "家具放置流程 Furniture Placement"
        FurnitureFlow --> F1[选择家具模型<br/>ParametricModel]
        F1 --> F2[设置模型实例参数]
        F2 --> F3[应用位置约束<br/>墙面/地面吸附]
        F3 --> F4[尺寸自适应<br/>根据空间调整]
        F4 --> F5[材质映射<br/>纹理/颜色]
        F5 --> FurnitureComplete[家具对象完成]
    end
    
    subgraph "装饰建模流程 Decoration Modeling"
        DecorationFlow --> D1[选择装饰类型<br/>踢脚线/顶角线/灯槽]
        D1 --> D2[提取轮廓线<br/>从墙体/天花板]
        D2 --> D3[生成装饰路径<br/>Curve2D]
        D3 --> D4[拉伸成3D形状<br/>Extrusion]
        D4 --> D5[应用装饰材质]
        D5 --> DecorationComplete[装饰对象完成]
    end
    
    subgraph "参数化建模流程 Parametric Modeling"
        ParametricFlow --> P1[创建参数化模型<br/>ParametricModel]
        P1 --> P2[定义参数集<br/>parameters Map]
        P2 --> P3[添加约束<br/>PMConstraint]
        P3 --> P4[建立参数关系<br/>PMRelation]
        P4 --> P5[编写计算逻辑<br/>compute]
        P5 --> P6[绑定WebCAD文档<br/>webCADDocument]
        P6 --> P7[求解约束系统<br/>solve]
        P7 --> P8[生成图形数据<br/>toGraphicsData]
        P8 --> ParametricComplete[参数化对象完成]
    end
    
    WallComplete --> AddToScene[添加到场景<br/>Scene.addObject]
    OpeningComplete --> AddToScene
    FurnitureComplete --> AddToScene
    DecorationComplete --> AddToScene
    ParametricComplete --> AddToScene
    
    AddToScene --> UpdateSceneGraph[更新场景图<br/>SceneGraph]
    UpdateSceneGraph --> BuildMesh[构建渲染网格<br/>MeshBuilder]
    BuildMesh --> ApplyMaterial[应用材质和纹理<br/>MaterialMapping]
    ApplyMaterial --> AddLighting[添加灯光<br/>Light System]
    AddLighting --> CacheUpdate[更新缓存<br/>Cache]
    
    CacheUpdate --> CreateTransaction[创建事务<br/>TxnStateFactory]
    CreateTransaction --> SaveState[保存状态<br/>DocumentManager]
    SaveState --> NotifyPlugins[通知插件层<br/>Event System]
    NotifyPlugins --> RenderUpdate[触发渲染更新<br/>Render Engine]
    
    RenderUpdate --> ValidationCheck{验证检查}
    ValidationCheck -->|通过| End([建模完成])
    ValidationCheck -->|失败| ErrorHandle[错误处理]
    ErrorHandle --> Undo[撤销操作<br/>Undo/Redo]
    Undo --> RenderUpdate
    
    style Start fill:#4caf50,color:#fff
    style End fill:#2196f3,color:#fff
    style WallFlow fill:#fff3e0
    style OpeningFlow fill:#e1f5ff
    style FurnitureFlow fill:#f3e5f5
    style DecorationFlow fill:#fff9c4
    style ParametricFlow fill:#e8f5e9
    style AddToScene fill:#ffebee
    style SaveState fill:#e0f2f1
```

---

## 📐 四、墙体建模详细流程

### 4.1 Wall类核心属性

**源码文件**: `dist/core-hs.fe5726b7.bundle_dewebpack/wall.js`

```typescript
class Wall extends BuildingObject {
    // 基础几何属性
    startPoint: Point3D;           // 起点
    endPoint: Point3D;             // 终点
    height: number;                // 高度
    thickness: number;             // 厚度
    baseHeight: number;            // 基础高度
    topHeight: number;             // 顶部高度
    
    // 轮廓和方向
    baseProfile: Polygon2D;        // 基础轮廓
    direction: Vector3D;           // 方向向量
    length: number;                // 长度
    
    // 材质
    innerMaterial: Material;       // 内墙材质
    outerMaterial: Material;       // 外墙材质
    
    // 开洞
    openings: Opening[];           // 门窗开洞数组
    
    // 核心方法
    addOpening(opening: Opening): void;
    removeOpening(id: string): void;
    split(point: Point3D): Wall[];
    getGeometry(): Geometry3D;
    getFaces(): Face[];
    updateProfile(): void;
}
```

### 4.2 墙体生成几何算法

```
输入: startPoint, endPoint, height, thickness
  │
  ▼
步骤1: 计算墙体方向向量
  direction = normalize(endPoint - startPoint)
  length = distance(startPoint, endPoint)
  │
  ▼
步骤2: 计算墙体垂直向量
  perpendicular = rotate90(direction)
  offset = perpendicular * (thickness / 2)
  │
  ▼
步骤3: 生成基础轮廓 (Polygon2D)
  vertices = [
    startPoint + offset,
    endPoint + offset,
    endPoint - offset,
    startPoint - offset
  ]
  baseProfile = new Polygon2D(vertices)
  │
  ▼
步骤4: 处理开洞 (如果有)
  for each opening in openings:
    cutProfile = opening.getCutProfile()
    baseProfile = baseProfile.difference(cutProfile)
  │
  ▼
步骤5: 拉伸成3D几何体
  geometry3D = Extrude(baseProfile, height)
  │
  ▼
步骤6: 生成面列表 (Face[])
  faces = [
    topFace,
    bottomFace,
    innerFace,
    outerFace,
    leftEndFace,
    rightEndFace
  ]
  │
  ▼
输出: Wall对象 with Geometry3D
```

---

## 🚪 五、开洞系统详细架构

### 5.1 Opening类继承层次

```mermaid
classDiagram
    class Opening {
        <<abstract>>
        +hostWall: Wall
        +width: number
        +height: number
        +offset: number
        +heightFromFloor: number
        +sillHeight: number
        +depth: number
        +swing: number
        +getLocalPosition(): Point2D
        +getGlobalPosition(): Point3D
        +updatePosition(offset): void
        +getCutProfile(): Polygon2D
    }
    
    class Door {
        +openingAngle: number
        +doorType: string
        +handleSide: string
        +isOpened: boolean
        +frameThickness: number
        +leafThickness: number
        +anchor: Point3D
        +anchorAxis: Vector3D
        +angle: number
        +canOpen(): boolean
        +open(angle): void
        +close(): void
        +getDoorOffset(): number
        +updateOpenStatus(angle): void
        +_getAxisInfo(): Object
    }
    
    class Window {
        +windowType: string
        +sillHeight: number
        +glazingType: string
        +frameWidth: number
        +mullions: number
        +transoms: number
        +hasShutters: boolean
        +shutterType: string
        +getGlazingArea(): number
        +getDivisions(): Rectangle2D[]
        +updateDivisions(): void
    }
    
    class ParametricOpening {
        +metadata: Object
        +objInfo: Object
        +extension: Object
        +parameters: Map
        +getModelState(): State
        +updateFromState(state): void
        +rebuildGeometry(): void
    }
    
    class ParametricWindow {
        +windowParameters: Object
        +frameParameters: Object
        +glazingParameters: Object
        +mullionPattern: string
        +rebuildGeometry(): void
        +updateMullions(): void
    }
    
    Opening <|-- Door
    Opening <|-- Window
    Opening <|-- ParametricOpening
    ParametricOpening <|-- ParametricWindow
```

### 5.2 Door开启算法详解

**源码文件**: `dist/core-hs.fe5726b7.bundle_dewebpack/door.js` (行43-119)

```javascript
// 核心算法: updateOpenStatus()
updateOpenStatus(angle) {
    // 步骤1: 获取铰链轴信息
    const axisInfo = this._getAxisInfo();
    if (!axisInfo || axisInfo.length < 1) return;
    
    // 步骤2: 设置开启角度
    this.__angle = isValidNumber(angle) ? angle : 

(this.isOpened ? 90 : 0);
    
    // 步骤3: 获取铰链轴方向
    const axis = axisInfo[0];
    const direction = axis.directory;
    this.__anchorAxis = [direction.x, direction.y, direction.z];
    
    // 步骤4: 计算铰链锚点位置
    const point = axis.point;
    const anchorPoint = {
        x: 0.01 * point.x,  // 单位转换: cm -> m
        y: 0.01 * point.y,
        z: 0.01 * point.z
    };
    
    // 步骤5: 计算门体偏移量
    const doorOffset = this.getDoorOffset();
    
    // 步骤6: 根据swing类型确定锚点
    switch (this.swing) {
        case 1:  // 右外开
            this.__anchor = [anchorPoint.x, -anchorPoint.y + doorOffset, anchorPoint.z];
            break;
        case 2:  // 左外开
            this.__anchor = [-anchorPoint.x, -anchorPoint.y + doorOffset, anchorPoint.z];
            break;
        case 3:  // 左内开
            this.__anchor = [-anchorPoint.x, anchorPoint.y + doorOffset, anchorPoint.z];
            break;
        default: // case 0: 右内开
            this.__anchor = [anchorPoint.x, anchorPoint.y + doorOffset, anchorPoint.z];
    }
}

// 门体偏移计算
getDoorOffset() {
    if (this.metadata && this.metadata.hasPocket) return 0;
    
    const doorThickness = HSConstants.Constants.DEFAULT_DOOR_BODY_THICKNESS;
    const wall = this.getHost();
    const wallWidth = (wall instanceof Wall) ? wall.width : 0;
    const offset = wallWidth > 0 
        ? 0.5 * (wallWidth - doorThickness) - HSConstants.Constants.DOOR_SHIFT_OFFSET 
        : 0;
    
    return [0, 3].includes(this.swing) ? -offset : offset;
}
```

**开启动画矩阵变换**:
```
门旋转矩阵 = 
  平移到铰链点(-anchor) × 
  绕Z轴旋转(angle) × 
  平移回原位(+anchor)

Matrix4.compose(
  translation: anchor,
  rotation: Quaternion.fromAxisAngle(anchorAxis, angle),
  scale: [1, 1, 1]
)
```

---

## 🏢 六、楼板系统详细架构

### 6.1 Slab类核心结构

**源码文件**: `dist/core-hs.fe5726b7.bundle_dewebpack/slab.js` (行83-300)

```typescript
class Slab extends Entity {
    // 核心属性
    __height: number;              // 楼板标高
    __thickness: number;           // 楼板厚度 (默认200mm)
    __baseProfile: Polygon2D;      // 基础轮廓
    
    // 信号系统
    signalOpeningAdded: Signal;    // 开洞添加信号
    signalOpeningRemoved: Signal;  // 开洞移除信号
    
    // 面分类
    topFaces: Face[];              // 顶面列表
    bottomFaces: Face[];           // 底面列表
    sideFaces: Face[];             // 侧面列表
    auxFaces: Face[];              // 辅助面列表
    
    // 静态工厂方法
    static create(profile: Polygon2D, height: number, thickness: number): Slab {
        const slab = new Slab();
        slab.__height = height;
        slab.__thickness = thickness;
        slab.__baseProfile = profile;
        slab.addChild(profile);
        return slab;
    }
    
    // 核心方法
    getBaseProfile(): Polygon2D;
    setThickness(value: number): void;
    getFaces(type: SlabFaceType): Face[];
    getFaceType(face: Face): SlabFaceType;
    forEachFace(callback: Function): void;
    getBaseLayer(): Layer;
    getUnderLayer(): Layer;
}

// 面类型枚举
enum SlabFaceType {
    top = "top",        // 顶面
    bottom = "bottom",  // 底面
    side = "side"       // 侧面
}
```

### 6.2 楼板厚度变更算法

**源码**: `slab.js` (行145-157)

```javascript
_onThicknessChanged(oldValue, newValue) {
    const halfThickness = newValue / 2;
    
    // 遍历所有面
    this.forEachFace(face => {
        // 遍历面的所有顶点
        face.forEachVertex(vertex => {
            // 调整顶面顶点
            if (vertex.z > 0) {
                vertex.z = halfThickness;
            }
            // 调整底面顶点
            else if (vertex.z < 0) {
                vertex.z = -halfThickness;
            }
        });
    });
    
    // 标记几何和位置脏数据
    this.dirtyGeometry();
    this.dirtyPosition();
}
```

### 6.3 楼板面分类算法

**源码**: `slab.js` (行210-248)

```javascript
_getFacesObj(isAux) {
    const facesObj = {
        top: {},
        bottom: {},
        side: {}
    };
    
    // 获取基础图层和下层图层
    const baseLayer = this.getBaseLayer();
    const underLayer = this.getUnderLayer();
    const layers = [];
    
    if (baseLayer) {
        layers.push({
            isBottom: false,
            faceObjs: baseLayer.slabBuilder.faceObjs
        });
    }
    
    if (underLayer) {
        layers.push({
            isBottom: true,
            faceObjs: underLayer.slabBuilder.faceObjs
        });
    }
    
    // 遍历图层和面对象
    for (const { isBottom, faceObjs } of layers) {
        for (const faceObj of faceObjs) {
            const linkInfo = faceObj.obj.linkSlabInfo;
            const isBottomFace = linkInfo?.type === SlabFaceType.bottom;
            
            // 过滤条件:
            // 1. 辅助面标志匹配
            // 2. 有楼板链接信息
            // 3. 楼板ID匹配
            // 4. 面方向匹配
            if (faceObj.obj.isAux === isAux &&
                linkInfo &&
                linkInfo.id === this.id &&
                (baseLayer === activeDocument.scene.outdoorLayer ||
                 (isBottom ? isBottomFace : !isBottomFace))) {
                
                const face = this.doc.getEntityById(faceObj.id);
                if (face instanceof Face) {
                    facesObj[linkInfo.type][faceObj.id] = face;
                }
            }
        }
    }
    
    return facesObj;
}
```

---

## 🎨 七、材质系统完整架构

### 7.1 材质系统工作流程

```mermaid
flowchart TD
    Start([用户选择材质]) --> LoadMaterial[加载材质定义<br/>Material]
    
    LoadMaterial --> CheckCache{检查材质缓存<br/>MaterialLibrary}
    CheckCache -->|已缓存| GetCached[获取缓存材质]
    CheckCache -->|未缓存| LoadTextures[加载纹理资源<br/>Texture]
    
    LoadTextures --> ParseProperties[解析材质属性<br/>颜色/反射/粗糙度]
    ParseProperties --> CreateMaterial[创建材质对象<br/>new Material]
    CreateMaterial --> CacheMaterial[缓存到MaterialLibrary]
    CacheMaterial --> GetCached
    
    GetCached --> SelectObjects[选择目标对象<br/>BuildingObject[]]
    SelectObjects --> CheckObjectType{对象类型判断}
    
    CheckObjectType -->|墙体| WallMapping[墙体材质映射]
    CheckObjectType -->|地板| FloorMapping[地板材质映射]
    CheckObjectType -->|家具| FurnitureMapping[家具材质映射]
    CheckObjectType -->|装饰| DecorationMapping[装饰材质映射]
    
    subgraph "墙体材质映射 Wall Material Mapping"
        WallMapping --> WM1[提取墙面UV坐标<br/>getFaces]
        WM1 --> WM2[计算纹理缩放<br/>真实尺寸映射]
        WM2 --> WM3[应用内外墙材质<br/>双面材质]
        WM3 --> WM4[处理开洞区域<br/>纹理裁剪]
        WM4 --> WallMapped[墙体材质完成]
    end
    
    subgraph "地板材质映射 Floor Material Mapping"
        FloorMapping --> FM1[提取地板平面<br/>Slab.topFaces]
        FM1 --> FM2[计算UV坐标<br/>平铺模式]
        FM2 --> FM3[应用地板材质<br/>木地板/瓷砖]
        FM3 --> FM4[生成法线贴图<br/>凹凸效果]
        FM4 --> FloorMapped[地板材质完成]
    end
    
    subgraph "家具材质映射 Furniture Material Mapping"
        FurnitureMapping --> FuM1[解析模型材质槽<br/>多材质支持]
        FuM1 --> FuM2[映射材质到部件<br/>桌面/腿/抽屉]
        FuM2 --> FuM3[应用PBR材质<br/>物理渲染]
        FuM3 --> FuM4[调整材质参数<br/>金属度/粗糙度]
        FuM4 --> FurnitureMapped[家具材质完成]
    end
    
    subgraph "装饰材质映射 Decoration Material Mapping"
        DecorationMapping --> DM1[识别装饰类型<br/>踢脚线/顶角线]
        DM1 --> DM2[沿路径UV展开<br/>ExtrudeUV]
        DM2 --> DM3[应用装饰材质<br/>石膏/木材]
        DM3 --> DecorationMapped[装饰材质完成]
    end
    
    WallMapped --> ApplyToMesh[应用到网格<br/>MaterialMapping]
    FloorMapped --> ApplyToMesh
    FurnitureMapped --> ApplyToMesh
    DecorationMapped --> ApplyToMesh
    
    ApplyToMesh --> UpdateShader[更新着色器<br/>Shader Update]
    UpdateShader --> CalculateLighting[计算光照<br/>Lighting System]
    CalculateLighting --> RenderPreview[渲染预览<br/>Render Engine]
    RenderPreview --> UserConfirm{用户确认}
    
    UserConfirm -->|修改| AdjustMaterial[调整材质参数<br/>MaterialUtil]
    UserConfirm -->|确认| SaveMaterial[保存材质配置<br/>DocumentManager]
    
    AdjustMaterial --> RenderPreview
    SaveMaterial --> CreateTransaction[创建事务<br/>Transaction]
    CreateTransaction --> End([完成])
    
    style Start fill:#4caf50,color:#fff
    style End fill:#2196f3,color:#fff
    style WallMapping fill:#fff3e0
    style FloorMapping fill:#e1f5ff
    style FurnitureMapping fill:#f3e5f5
    style DecorationMapping fill:#fff9c4
    style SaveMaterial fill:#e8f5e9
```

### 7.2 Material类详细结构

```typescript
class Material {
    // 基础属性
    id: string;                    // 材质ID
    name: string;                  // 材质名称
    type: string;                  // 材质类型
    
    // 颜色属性
    color: Color;                  // 基础颜色 (RGB)
    emissive: Color;               // 自发光颜色
    specular: Color;               // 镜面反射颜色
    
    // 物理属性 (PBR)
    roughness: number;             // 粗糙度 (0-1)
    metalness: number;             // 金属度 (0-1)
    opacity: number;               // 不透明度 (0-1)
    reflectivity: number;          // 反射率 (0-1)
    
    // 纹理贴图
    texture: Texture;              // 基础纹理 (Albedo/Diffuse)
    normalMap: Texture;            // 法线贴图
    roughnessMap: Texture;         // 粗糙度贴图
    metalnessMap: Texture;         // 金属度贴图
    aoMap: Texture;                // 环境光遮蔽贴图
    emissiveMap: Texture;          // 自发光贴图
    displacementMap: Texture;      // 置换贴图
    
    // UV映射
    uvScale: Vector2;              // UV缩放
    uvOffset: Vector2;             // UV偏移
    uvRotation: number;            // UV旋转角度
    
    // 核心方法
    applyTo(mesh: Mesh): void;     // 应用材质到网格
    clone(): Material;             // 克隆材质
    serialize(): Object;           // 序列化
    deserialize(data: Object): void; // 反序列化
    updateUniforms(): void;        // 更新着色器Uniform
}
```

### 7.3 UV映射算法

```javascript
// 墙体UV映射算法
function mapWallUV(wall, material) {
    const faces = wall.getFaces();
    const realWidth = 

material.uvScale.x;  // 纹理真实宽度
    
    for each face in faces:
        vertices = face.getVertices();
        uvCoords = [];
        
        for each vertex in vertices:
            // 计算局部坐标
            localX = distanceAlongWall(wall.startPoint, vertex);
            localY = vertex.z - wall.baseHeight;
            
            // 真实尺寸映射
            u = localX / realWidth;
            v = localY / realHeight;
            
            uvCoords.push([u, v]);
        
        face.setUVCoords(uvCoords);
}
```

---

## 💡 八、灯光系统完整架构

### 8.1 灯光类型层次结构

**Light基类** → 所有灯光的抽象基类
- **PointLight (点光源)**: 从单点向四周发射光线，模拟灯泡效果
- **SpotLight (聚光灯)**: 锥形光束，可调节角度和衰减，模拟射灯
- **DirectionalLight (平行光)**: 模拟太阳光，光线平行投射
- **AreaLight (区域光)**: 面光源，柔和照明，模拟灯箱/窗户光
- **AttenuatedSpotLight (衰减聚光灯)**: 带距离衰减的聚光灯

### 8.2 灯光属性详解

**基础属性**:
- `color`: 光线颜色 (RGB)
- `intensity`: 光强度 (流明值)
- `castShadow`: 是否投射阴影
- `shadowBias`: 阴影偏移，防止阴影痤疮
- `shadowMapSize`: 阴影贴图分辨率

**位置和方向**:
- `position`: 灯光位置 (Point3D)
- `target`: 目标点 (聚光灯/平行光)
- `direction`: 光线方向向量

**衰减属性** (点光源/聚光灯):
- `distance`: 有效照明距离
- `decay`: 衰减指数 (物理正确值为2)
- `attenuation`: 衰减曲线 (constant + linear*d + quadratic*d²)

**聚光灯特有**:
- `angle`: 光锥角度 (弧度)
- `penumbra`: 半影区域大小 (0-1)
- `spotExponent`: 聚光指数，控制边缘过渡

### 8.3 光照计算模型

**Phong光照模型** (经典三分量):
```
最终颜色 = 环境光 + 漫反射 + 镜面反射

环境光 = Ka × Ia
漫反射 = Kd × Id × max(N·L, 0)
镜面反射 = Ks × Is × max(R·V, 0)^shininess
```

**PBR光照模型** (物理基础渲染):
```
基于微表面理论和能量守恒
- BRDF: 双向反射分布函数
- 菲涅尔项: 反射率随角度变化
- 几何项: 微表面遮蔽和阴影
- 粗糙度: 控制高光分布
```

### 8.4 阴影生成流程

1. **阴影贴图生成阶段**:
   - 从光源视角渲染场景
   - 记录深度信息到阴影贴图
   - 贴图分辨率: 512×512 至 4096×4096

2. **阴影采样阶段**:
   - 将片元坐标转换到光源空间
   - 采样阴影贴图获取存储深度
   - 比较当前深度与存储深度
   - 深度大于存储值 → 在阴影中

3. **阴影软化技术**:
   - PCF (Percentage Closer Filtering): 多点采样平均
   - VSM (Variance Shadow Maps): 方差阴影贴图
   - CSM (Cascaded Shadow Maps): 级联阴影，远近分辨率优化

---

## 🎯 九、参数化建模系统详解

### 9.1 ParametricModel核心机制

**参数化模型工作原理**:
1. **参数定义**: 通过Map存储所有可调参数 (宽度、高度、材质等)
2. **约束系统**: PMConstraint定义参数间的关系和限制
3. **关系链**: PMRelation建立参数间的数学依赖
4. **求解器**: 约束求解引擎自动计算满足所有约束的参数值
5. **几何重建**: 参数变化时自动触发几何体重新生成

### 9.2 WebCAD文档集成

**WebCADDocument** 是参数化模型的几何内核:
- 管理CAD级别的几何操作
- 支持草图约束求解
- 执行拉伸、旋转、扫掠等特征操作
- 布尔运算 (并集、差集、交集)
- 生成最终的网格数据 (MeshDefinition)

**工作流程**:
```
用户修改参数 
  → updateParameter(key, value)
  → compute() 触发约束求解
  → 参数传递到 webCADDocument
  → rebuildGeometry() 重建几何
  → toGraphicsData() 生成渲染数据
  → 场景更新
```

### 9.3 约束类型详解

**PositionConstraint (位置约束)**:
- 固定对象到特定坐标点
- 吸附到墙面、地面、天花板
- 偏移量控制 (offsetX, offsetY, offsetZ)
- 支持相对定位和绝对定位

**DimensionConstraint (尺寸约束)**:
- 限制尺寸范围 (minValue, maxValue)
- 固定尺寸比例 (宽高比、黄金分割)
- 驱动尺寸 (参数化控制)

**ParallelConstraint (平行约束)**:
- 确保两个对象保持平行
- 自动调整角度
- 应用于墙体对齐、家具排列

**PerpendicularConstraint (垂直约束)**:
- 确保两个对象保持垂直
- 90度角度锁定
- 应用于墙体转角、L型家具

**CoincidentConstraint (重合约束)**:
- 点与点重合
- 线与线重合
- 面与面贴合

### 9.4 约束求解算法

**迭代求解过程**:
1. 收集所有约束和参数
2. 构建约束方程组
3. 按优先级排序约束
4. 迭代求解:
   - 应用高优先级约束
   - 计算参数调整量
   - 检查是否满足所有约束
   - 未收敛则继续迭代
5. 达到收敛条件或最大迭代次数后结束

**收敛判据**:
- 所有约束误差 < tolerance (容差)
- 连续两次迭代参数变化 < epsilon (极小值)
- 最大迭代次数: 通常100-200次

---

## 🔧 十、草图系统详细架构

### 10.1 Sketch2D核心组件

**Sketch2D (2D草图系统)**:
- 提供2D绘图画布
- 支持点、线、弧、圆、多边形绘制
- 约束系统 (水平、垂直、相切、同心等)
- 尺寸标注功能

**核心元素**:
- **Face2D**: 2D封闭区域，由Loop2D组成
- **Loop2D**: 2D环，由首尾相连的Curve2D构成
- **Curve2D**: 2D曲线段 (直线、圆弧、样条)
- **Vertex2D**: 2D顶点

### 10.2 草图约束类型

**几何约束**:
- 水平/垂直: 线段方向锁定
- 平行/垂直: 线段间角度关系
- 相切: 曲线间平滑过渡
- 同心: 圆/弧共享圆心
- 对称: 关于轴线对称
- 等长/等半径: 尺寸相等

**尺寸约束**:
- 长度: 线段长度固定
- 角度: 角度值固定
- 半径/直径: 圆/弧尺寸固定
- 距离: 点到点/点到线距离

### 10.3 草图拉伸操作

**Extrusion (拉伸)**:
- 输入: Sketch2D (封闭轮廓)
- 参数: 拉伸距离、拉伸方向
- 输出: ExtrudeBody (3D实体)
- 支持: 单向拉伸、双向拉伸、拔模角

**Revolve (旋转)**:
- 输入: Sketch2D (旋转轮廓)
- 参数: 旋转轴、旋转角度
- 输出: RevolveBody (旋转体)
- 应用: 圆柱、圆锥、球体、瓶罐

**Sweep (扫掠)**:
- 输入: 截面轮廓 + 路径曲线
- 输出: SweepBody (扫掠体)
- 应用: 管道、踢脚线、顶角线、扶手

**Loft (放样)**:
- 输入: 多个截面轮廓
- 输出: LoftBody (放样体)
- 应用: 异形造型、曲面过渡

### 10.4 布尔运算

**Union (并集)**:
- 合并两个实体为一个
- 移除内部面
- 应用: 组合多个部件

**Difference (差集)**:
- 从第一个实体减去第二个
- 生成切口、孔洞
- 应用: 墙体开洞、凹槽加工

**Intersection (交集)**:
- 保留两个实体的重叠部分
- 应用: 提取公共区域

---

## 📦 十一、场景管理系统

### 11.1 Scene场景结构

**Scene (场景)** 是所有3D对象的容器:
- **objects**: 建筑对象列表 (墙体、门窗、家具等)
- **lights**: 灯光列表
- **camera**: 相机对象
- **layers**: 图层列表
- **activeLayer**: 当前活动图层

**场景树结构**:
```
Scene
├─ Layer "建筑结构"
│   ├─ Wall 1
│   │   ├─ Door 1
│   │   └─ Window 1
│   ├─ Wall 2
│   └─ Slab 1
├─ Layer "家具"
│   ├─ Cabinet 1
│   ├─ Table 1
│   └─ Chair 1
└─ Layer "装饰"
    ├─ Molding 1
    └─ Curtain 1
```

### 11.2 Layer图层系统

**Layer (图层)** 组织和管理对象:
- **名称**: 图层名称标识
- **可见性**: 显示/隐藏整个图层
- **锁定**: 防止编辑
- **颜色**: 图层颜色标识
- **透明度**: 图层整体透明度
- **打印**: 是否输出到打印/导出

**图层类型**:
- **StructureLayer**: 结构层 (墙体、梁柱)
- **ArchitectureLayer**: 建筑层 (门窗、楼梯)
- **FurnitureLayer**: 家具层
- **DecorationLayer**: 装饰层


- **AnnotationLayer**: 标注层 (尺寸、文字)
- **OutdoorLayer**: 室外层 (外墙、阳台)

### 11.3 DocumentManager文档管理

**DocumentManager** 管理整个文档生命周期:

**核心功能**:
- **保存/加载**: 序列化和反序列化整个场景
- **撤销/重做**: 基于事务的历史记录管理
- **版本控制**: 文档版本追踪
- **自动保存**: 定期保存防止数据丢失
- **导入/导出**: 支持多种文件格式 (JSON, DWG, IFC, OBJ等)

**事务系统** (TxnStateFactory):
- 每次用户操作创建一个事务 (Transaction)
- 事务包含: 操作类型、影响对象、前后状态
- 撤销: 恢复到事务前状态
- 重做: 重新应用事务
- 事务压缩: 合并连续小操作

### 11.4 缓存管理系统

**CacheManager** 优化性能:

**几何缓存**:
- 存储已计算的网格数据
- 避免重复计算相同几何体
- 基于参数哈希的缓存键

**材质缓存**:
- 纹理图片缓存
- 着色器程序缓存
- 材质实例复用

**查询缓存**:
- 空间查询结果缓存 (BVH树)
- 碰撞检测缓存
- 拓扑关系缓存

**缓存失效策略**:
- 对象修改时清除相关缓存
- LRU (最近最少使用) 淘汰策略
- 内存限制自动清理

---

## 🔍 十二、空间查询与碰撞检测

### 12.1 BVH (层次包围盒) 树

**BVH树结构**:
- 根节点: 包含整个场景的AABB包围盒
- 中间节点: 包含子树对象的包围盒
- 叶节点: 单个建筑对象

**构建算法**:
1. 计算所有对象的包围盒
2. 选择最长轴作为分割轴
3. 按中位数分割对象列表
4. 递归构建左右子树
5. 叶节点包含1-4个对象

**查询优化**:
- 射线求交: O(log n) 复杂度
- 范围查询: 快速剔除不相交分支
- 最近邻查询: 优先队列优化

### 12.2 碰撞检测系统

**粗检测阶段** (Broad Phase):
- 使用AABB包围盒快速判断
- 分离轴定理 (SAT) 初步筛选
- 空间哈希网格加速

**精检测阶段** (Narrow Phase):
- GJK算法检测凸体碰撞
- EPA算法计算穿透深度
- 三角形-三角形精确求交

**连续碰撞检测** (CCD):
- 检测快速移动物体的碰撞
- 时间步进细分
- 保守估计避免穿透

### 12.3 空间查询API

**查询类型**:
- `query(selector)`: 选择器查询 (类似CSS)
- `queryByBounds(aabb)`: 包围盒范围查询
- `queryByRay(ray)`: 射线求交查询
- `queryNearest(point, count)`: 最近邻查询
- `queryByType(type)`: 类型过滤查询

**选择器语法**:
```
"Wall"                  // 所有墙体
"Door, Window"          // 门或窗
".layer-furniture"      // 家具图层
"#object-123"           // ID查询
"Wall[height>3000]"     // 属性过滤
"Wall > Door"           // 父子关系
```

---

## 🎬 十三、渲染管道详解

### 13.1 渲染流程

**完整渲染管道**:

1. **几何阶段**:
   - 遍历场景树
   - 视锥体剔除 (Frustum Culling)
   - 遮挡剔除 (Occlusion Culling)
   - LOD (细节层次) 选择

2. **着色器准备**:
   - 加载顶点着色器
   - 加载片元着色器
   - 设置Uniform变量
   - 绑定纹理单元

3. **顶点处理**:
   - 模型变换 (Model Transform)
   - 视图变换 (View Transform)
   - 投影变换 (Projection Transform)
   - 裁剪空间变换

4. **光栅化**:
   - 三角形光栅化
   - 插值顶点属性
   - 深度测试
   - 模板测试

5. **片元着色**:
   - 纹理采样
   - 光照计算 (Phong/PBR)
   - 阴影计算
   - 环境光遮蔽

6. **后处理**:
   - 抗锯齿 (MSAA/FXAA/TAA)
   - 色调映射
   - 泛光 (Bloom)
   - 景深 (DOF)
   - 运动模糊

### 13.2 着色器系统

**ShaderManager** 管理所有着色器程序:

**预定义着色器**:
- **BasicShader**: 基础颜色着色器
- **PhongShader**: Phong光照模型
- **PBRShader**: 物理基础渲染
- **ShadowShader**: 阴影生成
- **DepthShader**: 深度渲染
- **OutlineShader**: 轮廓描边

**着色器热重载**:
- 监听着色器文件变化
- 自动重新编译
- 无需重启即可预览

**Uniform管理**:
- 自动收集着色器Uniform
- 批量更新Uniform值
- Uniform缓冲对象 (UBO) 优化

### 13.3 图形优化技术

**实例化渲染** (Instancing):
- 一次DrawCall渲染多个相同对象
- 适用场景: 重复家具、树木、瓷砖
- 性能提升: 10-100倍

**批处理** (Batching):
- 合并多个小网格为一个大网格
- 减少DrawCall数量
- 静态对象批处理、动态对象批处理

**纹理图集** (Texture Atlas):
- 多个小纹理合并为一张大纹理
- 减少纹理切换开销
- UV坐标重映射

**压缩纹理**:
- BC压缩 (DXT1/DXT5)
- ETC/ASTC压缩 (移动端)
- 减少显存占用和带宽

---

## 📊 十四、数据序列化与IO

### 14.1 序列化系统

**序列化格式**:
- **JSON**: 文本格式，易读易调试
- **Binary**: 二进制格式，体积小速度快
- **BSON**: 二进制JSON，兼顾可读性和性能

**序列化流程**:
1. **对象遍历**: 深度优先遍历场景树
2. **类型标记**: 记录对象类型信息
3. **属性导出**: 序列化所有属性值
4. **引用解析**: 处理对象间的引用关系
5. **压缩**: 可选的数据压缩 (gzip/lz4)

**反序列化流程**:
1. **解析数据**: 读取序列化数据
2. **类型还原**: 根据类型标记创建对象
3. **属性注入**: 恢复对象属性值
4. **引用重建**: 重建对象间的引用关系
5. **初始化**: 调用对象的init方法

### 14.2 IO类层次

**Entity_IO** (实体IO基类):
- `dump(entity)`: 导出实体数据
- `load(entity, data)`: 加载实体数据
- `migrateLoad(entity, data)`: 迁移加载 (版本兼容)

**专用IO类**:
- **Wall_IO**: 墙体序列化
- **Opening_IO**: 开洞序列化
- **Door_IO**: 门序列化
- **Slab_IO**: 楼板序列化
- **ParametricModel_IO**: 参数化模型序列化

### 14.3 版本兼容性

**版本迁移策略**:
- 每个对象包含版本号字段
- `migrateLoad()` 处理旧版本数据
- 字段映射表: 旧字段名 → 新字段名
- 默认值填充: 新增字段的默认值
- 弃用字段忽略: 不再使用的字段

**向后兼容**:
- 新版本软件可读取旧版本文件
- 自动升级数据格式
- 保留原始版本信息

**向前兼容** (有限支持):
- 新版本文件可能无法在旧版本中打开
- 提供降级导出功能
- 警告用户功能限制

---

## 🛠️ 十五、工具类与辅助系统

### 15.1 几何工具集

**MathAlg (数学算法库)**:
- **CalculateIntersect**: 求交算法集合
  - 线线求交
  - 线面求交
  - 曲线求交 (curve3ds)
  - AABB求交
- **CalculateDistance**: 距离计算
  - 点到点距离
  - 点到线距离
  - 点到面距离
- **CalculateAngle**: 角度计算
  - 向量夹角
  - 平面夹角
  - 旋转角度

**GeometryUtil (几何工具)**:
- `offset(polygon, distance)`: 多边形偏移
- `simplify(polyline, tolerance)`: 折线简化
- `smooth(curve, segments)`: 曲线平滑
- `tesselate(polygon)`: 多边形三角化
- `computeNormals(mesh)`: 计算法线
- `computeTangents(mesh)`: 计算切线

### 15.2 辅助工具

**Sketch2DUtil (草图工具)**:
- 草图元素创建辅助
- 约束快速添加
- 草图导入导出
- 草图镜像/阵列

**Sketch2DBuilder (草图构建器)**:
- 链式API构建草图
- 自动闭合开放轮廓
- 约束自动推断
- 错误检测和修复

**WallUtil (墙体工具)**:
- 墙体交点计算
- 墙角处理 (直角/斜角/圆角)
- 墙体分割合并
- 墙体对齐工具

**SlabUtil (楼板工具)**:
- 楼板轮廓生成
- 开洞处理
- 楼板高度调整
- 楼板分区管理

### 15.3 上下文管理

**Context (上下文对象)**:
- 存储当前工作环境信息
- 管理临时状态
- 提供环境相关的工具方法
- 事件监听和分发

**上下文信息**:
- `currentDocument`: 当前文档
- `activeScene`: 活动场景
- `activeLayer`: 活动图层
- `selection`: 当前选中对象
- `viewState`: 视图状态 (相机位置、缩放等)
- `editMode`: 编辑模式 (选择/绘制/编辑等)

---

## 


🔗 十六、模块间依赖关系完整图

### 16.1 核心依赖关系

**几何基础层** → 所有其他层的基础
- Point2D/Point3D → Wall, Slab, Column 等所有建模对象
- Curve2D → Wall路径, 装饰线路径
- Polygon2D → Slab轮廓, 房间轮廓

**建模对象层** → 参数化建模层
- Wall → ParametricModel (参数化墙体)
- Opening → ParametricOpening (参数化开洞)
- Door/Window → ParametricWindow (参数化门窗)

**参数化建模层** → 约束系统层
- ParametricModel.constraints → Constraint[]
- 参数变化触发约束求解
- 约束满足后更新几何

**材质系统层** → 建模对象层
- BuildingObject.material → Material
- Face.material → Material (面级别材质)
- 材质影响渲染外观

**灯光系统层** → 场景管理层
- Light → Scene.lights[]
- 灯光计算影响所有对象

**场景管理层** → 所有对象层
- Scene包含所有BuildingObject
- Layer组织对象
- DocumentManager管理Scene生命周期

**草图系统层** → 参数化建模层
- Sketch2D → ParametricModel.webCADDocument
- 草图拉伸生成3D几何

**几何内核层** → 渲染层
- WebCADDocument → GraphicsData
- ExtrudeBody/RevolveBody → MeshDefinition
- 几何操作结果用于渲染

**渲染层** → 用户界面
- GraphicsData → GPU渲染
- 最终显示给用户

### 16.2 数据流向图

```
用户交互 (UI Event)
  ↓
命令系统 (Command Pattern)
  ↓
编辑操作 (Edit Operation)
  ↓
模型更新 (Model Update)
  ↓
事务记录 (Transaction Log)
  ↓
约束求解 (Constraint Solver)
  ↓
几何重建 (Geometry Rebuild)
  ↓
缓存更新 (Cache Update)
  ↓
场景图更新 (SceneGraph Update)
  ↓
渲染数据生成 (Graphics Data Generation)
  ↓
GPU渲染 (GPU Rendering)
  ↓
屏幕显示 (Display)
```

---

## 📈 十七、性能优化策略

### 17.1 几何优化

**网格简化**:
- LOD (Level of Detail) 多级细节
- 远处对象使用低多边形模型
- 动态LOD根据视距切换
- 典型配置: LOD0 (100%), LOD1 (50%), LOD2 (25%), LOD3 (10%)

**剔除技术**:
- **视锥体剔除**: 移除视野外的对象
- **遮挡剔除**: 移除被完全遮挡的对象
- **背面剔除**: 不渲染背向相机的面
- **小物体剔除**: 屏幕占用像素过少的对象

**空间分割**:
- **八叉树** (Octree): 3D空间递归分割
- **四叉树** (Quadtree): 2D空间分割 (平面图)
- **BSP树**: 二叉空间分割
- **网格划分**: 均匀网格快速查找

### 17.2 渲染优化

**批处理策略**:
- 静态批处理: 合并静态对象
- 动态批处理: 运行时合并相似对象
- GPU Instancing: 相同对象实例化
- DrawCall合并: 减少CPU-GPU通信

**纹理优化**:
- **Mipmap**: 多级渐远纹理
- **纹理压缩**: BC/ETC/ASTC
- **纹理流式加载**: 按需加载高分辨率
- **纹理图集**: 减少纹理切换

**着色器优化**:
- 分支预测优化
- 向量化运算
- Early-Z剔除
- Uniform缓冲对象

### 17.3 内存优化

**对象池** (Object Pooling):
- 预分配常用对象
- 复用已释放对象
- 减少GC压力
- 典型对象: Vector3D, Matrix4, Vertex

**内存布局优化**:
- 数据结构紧凑排列
- 缓存友好的访问模式
- SoA (Structure of Arrays) vs AoS (Array of Structures)

**延迟加载**:
- 按需加载资源
- 分帧加载大型场景
- 异步加载纹理和模型
- 优先加载可见内容

**垃圾回收优化**:
- 减少临时对象分配
- 复用临时变量
- 避免闭包捕获
- 手动内存管理关键路径

---

## 🔐 十八、错误处理与验证

### 18.1 几何验证

**拓扑验证**:
- 检查面的法线方向一致性
- 验证边界环的封闭性
- 检测自相交
- 验证流形性 (每条边恰好被两个面共享)

**尺寸验证**:
- 最小墙体厚度检查 (>= 10mm)
- 最大跨度限制检查
- 开洞尺寸合理性 (宽度/高度比例)
- 楼板厚度范围 (50mm - 500mm)

**位置验证**:
- 对象碰撞检测
- 空间重叠检查
- 最小间距验证
- 对齐精度检查

### 18.2 约束验证

**约束冲突检测**:
- 过约束检测 (约束过多导致无解)
- 欠约束检测 (自由度未完全限制)
- 循环依赖检测
- 约束优先级冲突

**约束求解失败处理**:
- 降级约束优先级
- 放宽容差条件
- 提示用户调整参数
- 回滚到上一个有效状态

### 18.3 错误恢复机制

**事务回滚**:
- 操作失败自动回滚
- 保持数据一致性
- 清理中间状态
- 恢复到最后有效状态

**自动修复**:
- 自动修复简单几何错误
- 合并重复顶点
- 删除退化三角形
- 反转错误法线

**用户提示**:
- 清晰的错误消息
- 建议的修复方案
- 高亮问题对象
- 引导用户操作

---

## 📚 十九、API接口总览

### 19.1 几何API

**Point API**:
```
Point2D/Point3D:
- distanceTo(other): 计算距离
- equals(other): 判断相等
- add(vector): 向量加法
- subtract(other): 向量减法
- rotate(angle, center): 旋转
- scale(factor): 缩放
- transform(matrix): 矩阵变换
```

**Curve API**:
```
Curve2D:
- getLength(): 获取长度
- getPointAt(t): 获取参数点 (t ∈ [0,1])
- getTangentAt(t): 获取切线方向
- split(t): 分割曲线
- offset(distance): 偏移曲线
- reverse(): 反向曲线
- intersect(other): 求交
```

**Polygon API**:
```
Polygon2D:
- getArea(): 计算面积
- getPerimeter(): 计算周长
- getCentroid(): 计算质心
- contains(point): 点是否在内部
- intersect(other): 多边形求交
- union(other): 多边形并集
- difference(other): 多边形差集
- offset(distance): 多边形偏移
- simplify(tolerance): 简化轮廓
```

### 19.2 建模对象API

**Wall API**:
```
Wall:
- addOpening(opening): 添加开洞
- removeOpening(id): 移除开洞
- split(point): 分割墙体
- getGeometry(): 获取3D几何
- getFaces(): 获取面列表
- updateProfile(): 更新轮廓
- setMaterial(inner, outer): 设置内外墙材质
- getLength(): 获取墙体长度
- getIntersectionWith(wall): 与其他墙体求交
```

**Opening API**:
```
Opening (Door/Window):
- getLocalPosition(): 获取局部位置
- getGlobalPosition(): 获取全局位置
- updatePosition(offset): 更新位置
- getCutProfile(): 获取切割轮廓
- getHost(): 获取宿主墙体
- canPlace(): 检查是否可放置
```

**Slab API**:
```
Slab:
- getBaseProfile(): 获取基础轮廓
- setThickness(value): 设置厚度
- getFaces(type): 获取指定类型的面
- getFaceType(face): 获取面类型
- forEachFace(callback): 遍历所有面
- addOpening(opening): 添加开洞
- getCenter(): 获取中心点
```

### 19.3 场景管理API

**Scene API**:
```
Scene:
- addObject(object): 添加对象
- removeObject(id): 移除对象
- getObjectById(id): 根据ID获取对象
- query(selector): 选择器查询
- queryByBounds(aabb): 包围盒查询
- queryByRay(ray): 射线查询
- forEach(callback): 遍历所有对象
- clear(): 清空场景
```

**DocumentManager API**:
```
DocumentManager:
- save(path): 保存文档
- load(path): 加载文档
- export(format, path): 导出文件
- import(format, path): 导入文件
- undo(): 撤销
- redo(): 重做
- createTransaction(name): 创建事务
- getHistory(): 获取历史记录
```

---

## 🎯 二十、应用场景与最佳实践

### 20.1 典型应用场景

**室内设计CAD系统**:
- 户型图绘制
- 墙体建模和编辑
- 门窗布局
- 家具摆放
- 材质选择和预览
- 施工图导出

**BIM建筑信息建模**:
- 建筑结构建模
- MEP (机电管线) 系统
- 构件参数化
- 碰撞检测
- 工程量统计
- IFC标准导出

**家装DIY工具**:
- 简化的2D/3D编辑
- 预制模板库
- 材质快速更换
- 实时渲染预览
- 移动端支持

**3D户型编辑器**:
- 快速户型生成
- 房间自动识别
- 面积自动计算
- 多方案对比
- VR漫游

**参数化家具设计**:
- 柜体参数化建模
- 尺寸自适应
- 材质批量替换
- 报价自动生成
- 生产图纸导出

### 20.2 最佳实践建议

**性能优化**:
1. 使用对象池减少GC压力
2. 合理设置LOD层级
3. 启用视锥体和遮挡剔除
4. 批处理相似对象
5. 纹理图集和压缩
6. 异步加载大型资源

**代码组织**:
1. 遵循单一职责原则
2. 使用工厂模式创建对象
3. 事件驱动架构解耦
4. 命令模式实现撤销/重做
5. 策略模式处理多态行为

**错误处理**:
1. 


使用try-catch捕获异常
2. 提供友好的错误消息
3. 记录详细的错误日志
4. 实现自动恢复机制
5. 提供手动修复工具

**数据管理**:
1. 定期自动保存
2. 版本控制和历史记录
3. 增量保存减少IO
4. 数据验证防止损坏
5. 备份策略

**用户体验**:
1. 操作反馈及时
2. 进度指示器
3. 快捷键支持
4. 智能吸附和对齐
5. 上下文菜单

---

## 📖 二十一、源码文件索引

### 21.1 核心几何文件

**点和向量**:
- `point2d.js` - 2D点几何
- `point3d.js` - 3D点几何  
- `vector2d.js` - 2D向量
- `vector3d.js` - 3D向量

**曲线**:
- `curve2d.js` - 2D曲线基类
- `arc2d.js` - 2D圆弧
- `circle2d.js` - 2D圆形
- `line2d.js` - 2D直线
- `line2d_io.js` - 直线IO
- `continuouscurve2d.js` - 连续曲线

**多边形**:
- `polygon2d.js` - 2D多边形
- `rectangle2d.js` - 2D矩形
- `polygonutil.js` - 多边形工具

**变换**:
- `affinetransform.js` - 仿射变换
- `matrix4.js` - 4×4矩阵
- `quaternion.js` - 四元数

### 21.2 建模对象文件

**墙体系统**:
- `wall.js` - 墙体主类
- `wallutil.js` - 墙体工具
- `wallbuilder.js` - 墙体构建器
- `wallmode.js` - 墙体模式

**开洞系统**:
- `opening.js` - 开洞基类
- `door.js` - 门
- `window.js` - 窗
- `parametricopening.js` - 参数化开洞
- `parametricwindow.js` - 参数化窗
- `hole.js` - 孔洞

**楼板系统**:
- `slab.js` - 楼板主类
- `slabutil.js` - 楼板工具
- `slabbuilder.js` - 楼板构建器
- `ceiling.js` - 天花板
- `floor.js` - 地板

**结构构件**:
- `column.js` - 柱
- `beam.js` - 梁
- `stair.js` - 楼梯
- `railing.js` - 栏杆
- `roof.js` - 屋顶

### 21.3 参数化建模文件

**参数化核心**:
- `parametricmodel.js` - 参数化模型基类
- `customizedpmmodel.js` - 自定义PM模型
- `customizedfeaturemodel.js` - 自定义特征模型
- `pmconstraint.js` - PM约束
- `pmproperty.js` - PM属性
- `pmrelation.js` - PM关系

**约束系统**:
- `constraint.js` - 约束基类
- `positionconstraint.js` - 位置约束
- `dimensionconstraint.js` - 尺寸约束
- `constraintfactory.js` - 约束工厂
- `constraintsolver.js` - 约束求解器

### 21.4 材质和渲染文件

**材质系统**:
- `material.js` - 材质主类
- `materialutil.js` - 材质工具
- `materiallibrary.js` - 材质库
- `paintservice.js` - 涂料服务
- `mixpaint.js` - 混合涂装
- `paintutil.js` - 涂装工具

**灯光系统**:
- `light.js` - 灯光基类
- `pointlight.js` - 点光源
- `spotlight.js` - 聚光灯
- `directionallight.js` - 平行光
- `attenuatedspotlight.js` - 衰减聚光灯

### 21.5 场景和IO文件

**场景管理**:
- `scene.js` - 场景主类
- `layer.js` - 图层
- `documentmanager.js` - 文档管理器
- `txnstatefactory.js` - 事务工厂
- `cachemanager.js` - 缓存管理器

**草图系统**:
- `sketch2d.js` - 2D草图
- `sketch2dutil.js` - 草图工具
- `sketch2dbuilder.js` - 草图构建器
- `decoratesketch2d.js` - 装饰草图

**几何内核**:
- `webcaddocument.js` - WebCAD文档
- `extrudebody.js` - 拉伸体
- `revolvebody.js` - 旋转体
- `sweepbody.js` - 扫掠体
- `meshdefinition.js` - 网格定义

---

## 🎓 二十二、技术要点总结

### 22.1 核心技术栈

**编程语言**: JavaScript/TypeScript
**几何内核**: WebCAD (自研CAD内核)
**渲染引擎**: WebGL 2.0
**约束求解**: 迭代求解算法
**空间索引**: BVH树 + 八叉树
**序列化**: JSON + Binary混合
**事件系统**: 观察者模式 + 信号槽

### 22.2 关键算法

**几何算法**:
- 多边形布尔运算 (Clipper库)
- 三角化 (Earcut算法)
- 曲线求交 (Newton迭代)
- 包围盒求交 (SAT分离轴)
- 射线求交 (Möller-Trumbore算法)

**优化算法**:
- 约束求解 (梯度下降/牛顿法)
- 网格简化 (QEM二次误差度量)
- 碰撞检测 (GJK算法)
- 路径规划 (A*算法)
- 空间查询 (BVH遍历)

**渲染算法**:
- Phong光照模型
- PBR物理渲染
- 阴影映射 (Shadow Mapping)
- 环境光遮蔽 (SSAO)
- 抗锯齿 (MSAA/FXAA)

### 22.3 设计模式应用

**创建型模式**:
- **工厂模式**: ConstraintFactory, ObjectFactory
- **单例模式**: DocumentManager, MaterialLibrary
- **原型模式**: clone()方法克隆对象
- **建造者模式**: Sketch2DBuilder, WallBuilder

**结构型模式**:
- **适配器模式**: IO类适配不同版本数据
- **组合模式**: 场景树结构 (Scene → Layer → Object)
- **装饰器模式**: 材质装饰几何对象
- **外观模式**: API封装复杂内部逻辑

**行为型模式**:
- **观察者模式**: 事件系统 (Signal/Event)
- **命令模式**: 操作历史 (Command + Transaction)
- **策略模式**: 不同类型的约束求解策略
- **状态模式**: 编辑模式切换
- **责任链模式**: 事件冒泡传递

### 22.4 性能特征

**内存占用**:
- 空场景: ~50MB
- 中等户型 (100㎡): ~200MB
- 大型项目 (500㎡): ~800MB
- 峰值可达: 2GB+

**渲染性能**:
- 简单场景: 60 FPS (1000 objects)
- 中等场景: 30-60 FPS (5000 objects)
- 复杂场景: 15-30 FPS (10000+ objects)
- GPU占用: 中低端显卡可流畅运行

**加载时间**:
- 小型项目 (<10MB): <1秒
- 中型项目 (10-50MB): 1-5秒
- 大型项目 (50-200MB): 5-20秒
- 超大项目 (>200MB): 20秒以上

---

## 🚀 二十三、未来扩展方向

### 23.1 功能扩展

**高级建模**:
- NURBS曲面建模
- 细分曲面 (Subdivision Surface)
- 程序化建模 (Procedural Modeling)
- 地形建模系统
- 景观设计工具

**渲染增强**:
- 实时光线追踪
- 全局光照 (GI)
- 体积光效果
- 高级材质 (次表面散射/各向异性)
- 动态天空系统

**AI辅助**:
- 智能户型生成
- 自动家具摆放
- 风格推荐系统
- 智能尺寸优化
- 施工错误检测

**协同功能**:
- 多人实时协作
- 版本控制系统
- 云端存储同步
- 评论和标注
- 权限管理

### 23.2 技术升级

**性能优化**:
- WebGPU迁移
- 多线程渲染 (Web Workers)
- WASM加速核心算法
- 流式加载优化
- 增量渲染

**跨平台**:
- 移动端适配 (iOS/Android)
- 桌面端应用 (Electron)
- VR/AR支持
- 云渲染服务
- 离线模式

**互操作性**:
- IFC标准完整支持
- Revit插件
- SketchUp导入导出
- AutoCAD DWG支持
- 3ds Max集成

---

## 📝 二十四、总结

### 24.1 系统优势

✅ **完整的几何内核**: 自研WebCAD提供强大的CAD级建模能力

✅ **参数化驱动**: 灵活的参数化系统支持快速设计迭代

✅ **约束求解**: 智能约束系统确保设计合理性

✅ **高性能渲染**: WebGL 2.0实现流畅的3D预览

✅ **丰富的API**: 清晰的接口便于二次开发

✅ **可扩展架构**: 模块化设计易于功能扩展

### 24.2 技术亮点

⭐ **BVH空间索引**: O(log n)复杂度的空间查询

⭐ **事务系统**: 完整的撤销/重做支持

⭐ **材质系统**: 支持PBR物理渲染

⭐ **草图约束**: CAD级别的2D草图编辑

⭐ **实例化渲染**: 大幅提升重复对象性能

⭐ **异步加载**: 流畅的大场景加载体验

### 24.3 应用价值

🏠 **室内设计**: 专业级户型图编辑和3D预览

🏗️ **BIM建模**: 建筑信息模型完整生命周期

🛋️ **家装DIY**: 降低设计门槛,普及装修设计

📐 **工程制图**: 精确的施工图纸生成

💰 **报价系统**: 自动化材料统计和成本计算



源码文件索引
- ✅ API接口总览
- ✅ 性能优化建议
- ✅ 最佳实践指南

**文档版本**: v1.0  
**创建日期**: 2026-01-22  
**模块大小**: 1.4MB  
**文件数量**: 500+ 模块  
**维护状态**: 活跃开发中

---

**相关文档**:
- [BOM报价系统架构](./bom-quotation-system-complete-architecture.md)
- [柜体定制系统架构](./cabinet-customization-complete-architecture.md)
- [水电暗装系统架构](./concealed-work-water-electricity-complete.md)
- [核心架构总览](./core-hs-complete-architecture.md)

---

**END OF DOCUMENT**
