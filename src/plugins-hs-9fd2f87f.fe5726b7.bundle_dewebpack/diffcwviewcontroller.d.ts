/**
 * DiffCWViewController - 控制器用于管理差异化隐蔽工程(Concealed Work)的视图对象
 * 负责在2D和3D画布上创建、显示和销毁差异化隐蔽工程相关的显示对象和Gizmo
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { DiffCWDisplay2D } from './DiffCWDisplay2D';
import { DiffCWDisplay3D } from './DiffCWDisplay3D';
import { DiffCW } from './DiffCW';
import { CWEntityGizmo2D } from './CWEntityGizmo2D';
import { CWEntityGizmo3D } from './CWEntityGizmo3D';

/**
 * 2D源样式配置
 */
interface Source2DStyle {
  /** 描边颜色 */
  strokeColor: string;
  /** 填充颜色 */
  fillColor: string;
}

/**
 * 2D目标样式配置
 */
interface Dest2DStyle {
  /** 描边颜色 */
  strokeColor: string;
  /** 填充颜色 */
  fillColor: string;
  /** 填充不透明度 */
  fillOpacity: number;
}

/**
 * 3D源样式配置
 */
interface Source3DStyle {
  /** 描边颜色（十六进制字符串） */
  strokeColor: string;
  /** 填充颜色（十六进制字符串） */
  fillColor: string;
}

/**
 * 3D目标样式配置
 */
interface Dest3DStyle {
  /** 描边颜色（十六进制字符串） */
  strokeColor: string;
  /** 填充颜色（十六进制字符串） */
  fillColor: string;
  /** 填充不透明度 */
  fillOpacity: number;
}

/**
 * 差异路由信息
 */
interface DiffRoute {
  /** 源实体ID */
  srcId: string;
  /** 目标实体ID */
  destId: string;
}

/**
 * 图层接口
 */
interface Layer {
  /** 图层ID */
  id: string;
  /**
   * 根据类型获取子元素
   * @param type 元素类型
   */
  getChildrenByType(type: typeof DiffCW): DiffCW[];
}

/**
 * 画布接口
 */
interface Canvas {
  /** 渲染上下文 */
  context: unknown;
  /** 显示图层 */
  displayLayers: {
    temp: unknown;
    gizmo: unknown;
  };
  /** Gizmo管理器 */
  gizmoManager: {
    addGizmo(gizmo: unknown): void;
    removeGizmo(gizmo: unknown): void;
  };
  /**
   * 根据ID获取显示对象
   * @param id 对象ID
   */
  getDisplayObjectByID(id: string): DisplayObject | null;
  /**
   * 移除显示对象
   * @param obj 显示对象
   */
  removeDisplayObject(obj: DisplayObject): void;
}

/**
 * 显示对象接口
 */
interface DisplayObject {
  /** 实体引用 */
  entity: Entity;
  /** 子对象分组 */
  groups: {
    concealedwork: DisplayGroup;
  };
  /**
   * 添加子对象
   * @param child 子显示对象
   */
  addChild(child: DisplayObject): void;
  /**
   * 移除子对象
   * @param child 子显示对象
   */
  removeChild(child: DisplayObject): void;
  /**
   * 更新可见状态
   * @param visible 是否可见
   */
  updateVisibleStatus(visible: boolean): void;
}

/**
 * 显示分组接口
 */
interface DisplayGroup {
  /**
   * 移除子对象
   * @param child 子显示对象
   */
  removeChild(child: DisplayObject): void;
}

/**
 * 实体接口
 */
interface Entity {
  /** 实体ID */
  id: string;
  /** 差异路由列表 */
  diffRoutes: DiffRoute[];
}

/**
 * 差异工具接口
 */
interface DiffTool {
  /**
   * 获取隐蔽工程原始内容
   * @param id 实体ID
   * @param layer 图层
   */
  _getCWOriginContent(id: string, layer: Layer): Entity;
}

/**
 * Gizmo接口
 */
interface Gizmo {
  /** 显示Gizmo */
  show(): void;
  /** 隐藏Gizmo */
  hide(): void;
  /** 清理Gizmo */
  onCleanup(): void;
}

/** 2D源样式常量 */
const SOURCE_2D_STYLE: Source2DStyle = {
  strokeColor: '#5FE6D7',
  fillColor: '#d8f9f5'
};

/** 2D目标样式常量 */
const DEST_2D_STYLE: Dest2DStyle = {
  strokeColor: '#FFA023',
  fillColor: '#FFE823',
  fillOpacity: 0.3
};

/** 3D源样式常量 */
const SOURCE_3D_STYLE: Source3DStyle = {
  strokeColor: '0x5fe6d7',
  fillColor: '0xd8f9f5'
};

/** 3D目标样式常量 */
const DEST_3D_STYLE: Dest3DStyle = {
  strokeColor: '0xffa023',
  fillColor: '0xffe823',
  fillOpacity: 0.3
};

/**
 * 差异化隐蔽工程视图控制器
 * 管理差异化隐蔽工程在2D和3D视图中的显示和交互
 */
export class DiffCWViewController {
  /** 应用程序实例 */
  private readonly _app: HSApp.App;
  
  /** 差异工具实例 */
  private _diffTool?: DiffTool;
  
  /** 2D画布实例 */
  private readonly _canvas2d: Canvas;
  
  /** 3D画布实例 */
  private readonly _canvas3d: Canvas;
  
  /** 2D Gizmo列表 */
  private _gizmos2d: Gizmo[];
  
  /** 3D Gizmo列表 */
  private _gizmos3d: Gizmo[];
  
  /** 信号钩子，用于事件监听管理 */
  public signalHook: HSCore.Util.SignalHook;

  constructor() {
    this._app = HSApp.App.getApp();
    this._canvas2d = this._app.getActive2DView();
    this._canvas3d = this._app.getActive3DView();
    this.signalHook = new HSCore.Util.SignalHook(this);
    this._gizmos2d = [];
    this._gizmos3d = [];
    this._diffTool = undefined;
  }

  /**
   * 初始化控制器
   * @param diffTool 差异工具实例
   * @param layer 可选的特定图层，如果不提供则处理所有图层
   */
  public init(diffTool: DiffTool, layer?: Layer): void {
    this._diffTool = diffTool;
    
    if (layer) {
      this.createViewObject(layer);
    } else {
      const activeLayer = this._app.floorplan.scene.activeLayer;
      this.createViewObject(activeLayer);
      
      this._app.floorplan.scene.forEachLayer((currentLayer: Layer) => {
        if (currentLayer !== activeLayer) {
          this.createViewObject(currentLayer);
        }
      });
    }
  }

  /**
   * 清理控制器资源
   */
  public cleanUp(): void {
    this.destroy();
    this.signalHook?.unlistenAll();
  }

  /**
   * 为指定图层创建视图对象
   * @param layer 目标图层
   */
  public createViewObject(layer: Layer): void {
    const diffCWChildren = layer.getChildrenByType(DiffCW);
    
    if (diffCWChildren.length === 0) {
      return;
    }

    const layerDisplay2D = this._canvas2d.getDisplayObjectByID(layer.id);
    const layerDisplay3D = this._canvas3d.getDisplayObjectByID(layer.id);

    diffCWChildren.forEach((diffCWEntity: DiffCW) => {
      this.createCWEntityGizmo(diffCWEntity, layer);

      // 创建2D显示对象
      let display2D = this._canvas2d.getDisplayObjectByID(diffCWEntity.id);
      if (!display2D) {
        display2D = new DiffCWDisplay2D(
          this._canvas2d.context,
          layerDisplay2D,
          layerDisplay2D.groups.concealedwork,
          diffCWEntity
        );
        display2D.init();
      }
      layerDisplay2D.addChild(display2D);

      // 创建3D显示对象
      let display3D = this._canvas3d.getDisplayObjectByID(diffCWEntity.id);
      if (!display3D) {
        display3D = new DiffCWDisplay3D(
          this._canvas3d.context,
          layerDisplay3D,
          layerDisplay3D.groups.concealedwork,
          diffCWEntity
        );
        display3D.init();
      }
      layerDisplay3D.addChild(display3D);
    });
  }

  /**
   * 为隐蔽工程实体创建Gizmo（视觉辅助工具）
   * @param entity 隐蔽工程实体
   * @param layer 所属图层
   */
  public createCWEntityGizmo(entity: DiffCW, layer: Layer): void {
    const { diffRoutes } = entity;
    
    if (!diffRoutes.length) {
      return;
    }

    diffRoutes.forEach((route: DiffRoute) => {
      const { srcId, destId } = route;

      // 创建源实体的Gizmo
      const sourceEntity = this._diffTool!._getCWOriginContent(srcId, layer);
      
      const sourceGizmo2D = new CWEntityGizmo2D(
        this._canvas2d.context,
        this._canvas2d.displayLayers.temp,
        { entity: sourceEntity },
        SOURCE_2D_STYLE
      );
      this._gizmos2d.push(sourceGizmo2D);
      this._canvas2d.gizmoManager.addGizmo(sourceGizmo2D);

      const sourceGizmo3D = new CWEntityGizmo3D(
        this._canvas3d.context,
        this._canvas3d.displayLayers.gizmo,
        sourceEntity,
        SOURCE_3D_STYLE,
        true
      );
      this._gizmos3d.push(sourceGizmo3D);
      this._canvas3d.gizmoManager.addGizmo(sourceGizmo3D);

      // 创建目标实体的Gizmo
      const destDisplayObject = this._canvas2d.getDisplayObjectByID(destId);
      const destEntity = destDisplayObject!.entity;

      const destGizmo2D = new CWEntityGizmo2D(
        this._canvas2d.context,
        this._canvas2d.displayLayers.temp,
        { entity: destEntity },
        DEST_2D_STYLE
      );
      this._gizmos2d.push(destGizmo2D);
      this._canvas2d.gizmoManager.addGizmo(destGizmo2D);

      const destGizmo3D = new CWEntityGizmo3D(
        this._canvas3d.context,
        this._canvas3d.displayLayers.gizmo,
        destEntity,
        DEST_3D_STYLE
      );
      this._gizmos3d.push(destGizmo3D);
      this._canvas3d.gizmoManager.addGizmo(destGizmo3D);
    });
  }

  /**
   * 设置指定图层中差异化隐蔽工程的可见性
   * @param layer 目标图层
   * @param visible 是否可见
   */
  public setVisibility(layer: Layer, visible: boolean): void {
    const diffCWChildren = layer.getChildrenByType(DiffCW);
    
    if (diffCWChildren.length === 0) {
      return;
    }

    const updateVisibility = (displayObject: DisplayObject): void => {
      displayObject.updateVisibleStatus(visible);
    };

    diffCWChildren.forEach((diffCWEntity: DiffCW) => {
      const display2D = this._canvas2d.getDisplayObjectByID(diffCWEntity.id);
      if (display2D) {
        updateVisibility(display2D);
      }

      const display3D = this._canvas3d.getDisplayObjectByID(diffCWEntity.id);
      if (display3D) {
        updateVisibility(display3D);
      }
    });

    // 更新Gizmo可见性
    this._gizmos2d.forEach((gizmo: Gizmo) => {
      visible ? gizmo.show() : gizmo.hide();
    });

    this._gizmos3d.forEach((gizmo: Gizmo) => {
      visible ? gizmo.show() : gizmo.hide();
    });
  }

  /**
   * 销毁所有图层的视图对象
   */
  public destroy(): void {
    this._app.floorplan.scene.forEachLayer((layer: Layer) => {
      this.destroyViewObject(layer);
    });
  }

  /**
   * 销毁指定图层的视图对象
   * @param layer 目标图层
   */
  public destroyViewObject(layer: Layer): void {
    const diffCWChildren = layer.getChildrenByType(DiffCW);
    
    if (diffCWChildren.length === 0) {
      return;
    }

    const layerDisplay2D = this._canvas2d.getDisplayObjectByID(layer.id);
    const layerDisplay3D = this._canvas3d.getDisplayObjectByID(layer.id);

    diffCWChildren.forEach((diffCWEntity: DiffCW) => {
      // 移除2D显示对象
      const display2D = this._canvas2d.getDisplayObjectByID(diffCWEntity.id);
      if (display2D) {
        layerDisplay2D!.removeChild(display2D);
        this._canvas2d.removeDisplayObject(display2D);
        layerDisplay2D!.groups.concealedwork.removeChild(display2D);
      }

      // 移除3D显示对象
      const display3D = this._canvas3d.getDisplayObjectByID(diffCWEntity.id);
      if (display3D) {
        layerDisplay3D!.removeChild(display3D);
        this._canvas3d.removeDisplayObject(display3D);
        layerDisplay3D!.groups.concealedwork.removeChild(display3D);
      }

      // 清理2D Gizmo
      this._gizmos2d.forEach((gizmo: Gizmo) => {
        gizmo.onCleanup();
        this._canvas2d.gizmoManager.removeGizmo(gizmo);
      });

      // 清理3D Gizmo
      this._gizmos3d.forEach((gizmo: Gizmo) => {
        gizmo.onCleanup();
        this._canvas3d.gizmoManager.removeGizmo(gizmo);
      });
    });
  }
}