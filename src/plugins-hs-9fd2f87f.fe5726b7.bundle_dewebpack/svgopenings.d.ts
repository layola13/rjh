import { SvgBase, SvgMinimapContext } from './SvgBase';
import { SvgResourceManager } from './SvgResourceManager';
import { Util } from './Util';

/**
 * SVG开口元素渲染器
 * 负责渲染楼层平面图中的所有开口（门、窗、洞口等）
 */
export class SvgOpenings extends SvgBase {
  /** 开口渲染实例集合 */
  private _openings: SvgOpening[];
  
  /** SVG容器节点 */
  private _node: any;

  /**
   * 构造函数
   * @param app - 应用实例
   * @param context - SVG渲染上下文
   */
  constructor(app: any, context: any) {
    super(app, context);
    this._openings = [];
    this._node = context.layers().openings;
  }

  /**
   * 构建所有开口的SVG元素
   * 遍历活动图层的所有开口，创建并构建有效的开口实例
   */
  public build(): void {
    const activeOpenings = this._app.floorplan.scene.activeLayer.openings;
    
    Object.values(activeOpenings).forEach((opening: any) => {
      if (this.isItemValid(opening) && !this._isOpeningHidden(opening)) {
        const svgOpening = this._createOpening(opening);
        if (svgOpening) {
          svgOpening.build();
          this._openings.push(svgOpening);
        }
      }
    });

    if (this._openings.length > 0) {
      SvgResourceManager.get().buildOpeinings(this._ctx);
    }
  }

  /**
   * 绘制所有开口
   * 调用每个开口实例的draw方法
   */
  public draw(): void {
    this._openings.forEach((opening) => {
      opening.draw();
    });
  }

  /**
   * 导出移动端格式
   * 重新构建并使用移动端绘制方法
   */
  public exportM(): void {
    this.build();
    this._openings.forEach((opening) => {
      opening.drawM();
    });
  }

  /**
   * 创建开口实例
   * @param entity - 开口模型实体
   * @returns 开口渲染实例，若实体类型不匹配则返回undefined
   */
  private _createOpening(entity: any): SvgOpening | undefined {
    if (!entity.instanceOf(HSConstants.ModelClass.NgOpening)) {
      return undefined;
    }

    let openingType = 'opening';
    if (entity.instanceOf(HSConstants.ModelClass.NgWindow)) {
      openingType = 'window';
    } else if (entity.instanceOf(HSConstants.ModelClass.NgHole)) {
      openingType = 'hole';
    } else if (entity.instanceOf(HSConstants.ModelClass.NgDoor)) {
      openingType = 'door';
    }

    const groupNode = this._node.group().id(`${openingType}_${entity.ID}`);
    return new SvgOpening(this._app, this._ctx, entity, groupNode);
  }

  /**
   * 检查开口是否应该被隐藏
   * @param entity - 开口实体
   * @returns 如果开口应该被隐藏则返回true
   */
  private _isOpeningHidden(entity: any): boolean {
    const pageSetting = this._ctx.pageSetting();

    // 检查门是否可见
    if (!pageSetting.door.visible && entity instanceof HSCore.Model.Door) {
      return true;
    }

    // 检查窗是否可见
    if (!pageSetting.window.visible && HSApp.Util.Opening.isWindow(entity)) {
      return true;
    }

    return false;
  }
}

/**
 * 单个开口的SVG渲染器
 * 负责渲染单个开口（门、窗、洞口）的背景、基础和摆动部分
 */
class SvgOpening extends SvgBase {
  /** 开口模型实体 */
  private _entity: any;
  
  /** SVG容器节点 */
  private _node: any;
  
  /** 背景图层 */
  private _background: any;
  
  /** 基础图层 */
  private _base: any;
  
  /** 摆动图层（用于门的开合动画） */
  private _swing: any;
  
  /** 绘制元素集合 */
  private _paints: any[];

  /**
   * 构造函数
   * @param app - 应用实例
   * @param context - SVG渲染上下文
   * @param entity - 开口模型实体
   * @param node - SVG容器节点
   */
  constructor(app: any, context: any, entity: any, node: any) {
    super(app, context);
    this._entity = entity;
    this._node = node;
    this._background = node.group();
    this._base = node.group().id('base');
    this._swing = node.group().id('swing');
    this._paints = [];
  }

  /**
   * 构建开口元素（预留方法）
   */
  public build(): void {
    // 构建逻辑预留
  }

  /**
   * 绘制开口（桌面端）
   * 渲染开口的背景、基础和摆动部分，处理透明背景和遮罩
   */
  public draw(): void {
    if (!this._entity || !this._node) {
      return;
    }

    // 绘制所有paint元素
    this._paints.forEach((paint) => {
      paint.draw();
    });

    const topView = this._entity.topView;
    const isTransparentBackground = this._ctx.pageSetting().backgroundColor === 'transparent';

    // 处理透明背景下的遮罩路径
    if (isTransparentBackground) {
      const bottomProfilePath = Util.loop2SVG(
        this._entity.bottomProfile,
        this.unitScale()
      );
      const pathElement = this._node
        .path(bottomProfilePath)
        .id(`opening_path_${this._entity.id}`)
        .fill('black');

      this._ctx.getWallsMask().add(pathElement);

      if (!topView) {
        return;
      }
    }

    // 确定SVG资源键
    let svgKey = topView;
    if (!topView || this._ctx._withPaint) {
      svgKey = 'HSCore.Model.Hole';
    }

    // 查找SVG资源
    let svgResource = SvgResourceManager.get().lookupSvg(svgKey);
    if (!svgResource) {
      let resourceName = svgKey.split('/').pop();
      if (resourceName === 'bay_window' && isTransparentBackground) {
        resourceName = 'bay_window_transparent';
      }
      svgResource = SvgResourceManager.get().lookupSvgByName(resourceName);
      if (!svgResource) {
        return;
      }
    }

    // 应用SVG内容
    const backgroundSvg = svgResource.background ?? '';
    const baseSvg = svgResource.base ?? '';
    const swingSvg = svgResource.swing ?? '';

    this._background.svg(backgroundSvg);
    this._base.svg(baseSvg);
    this._swing.svg(swingSvg);

    // 应用变换
    const unitScale = this.unitScale();
    const swingScale = HSCore.Model.Opening.SWING_SCALE_TABLE[this._entity.swing];

    this._node.move(this._entity.x * unitScale, -this._entity.y * unitScale);
    this._node.transform({
      rotation: this._entity.rotation,
      cx: 0,
      cy: 0
    });
    this._node.transform({
      scaleX: swingScale.x,
      scaleY: swingScale.y,
      cx: 0,
      cy: 0
    });

    // 计算尺寸
    let wallWidth = this._app.floorplan.globalWallWidth;
    if (HSCore.Util.Content.isWallNiche(this._entity)) {
      wallWidth = this._entity.YSize;
    } else {
      const host = this._entity.getHost();
      if (host?.instanceOf(HSConstants.ModelClass.NgWall)) {
        wallWidth = host.width;
      } else {
        wallWidth = this._entity.YSize;
      }
    }

    const widthScale = (this._entity.XSize * unitScale) / 100;
    const heightScale = (wallWidth * unitScale) / 20;
    const swingOffsetY = 10 * (heightScale - widthScale);

    this._swing.move(0, swingOffsetY);

    this._background.transform({
      scaleX: widthScale,
      scaleY: heightScale,
      cx: 0,
      cy: 0
    });

    this._base.transform({
      scaleX: widthScale,
      scaleY: heightScale,
      cx: 0,
      cy: 0
    });

    this._swing.transform({
      scaleX: widthScale,
      scaleY: widthScale,
      cx: 0,
      cy: 0
    });
  }

  /**
   * 绘制开口（移动端）
   * 针对移动端优化的渲染方法，使用简化的SVG资源
   */
  public drawM(): void {
    if (!this._entity || !this._node) {
      return;
    }

    const entity = this._entity;
    const pageSetting = this._ctx.pageSetting();
    const unitPerPixel = this._ctx.getUnitPerPixel();
    const wallsMask = this._ctx.getWallsMask();

    let svgResource: any;
    let lineWidth: number | undefined;
    let lineColor: string | undefined;

    // 根据开口类型选择资源
    if (entity.instanceOf('HSCore.Model.Window')) {
      svgResource = SvgResourceManager.OpeningMobileSvgs.window;
      lineWidth = pageSetting.window.lineWidth;
      lineColor = pageSetting.window.lineColor;
    } else if (entity.instanceOf('HSCore.Model.Hole')) {
      svgResource = SvgResourceManager.OpeningMobileSvgs.hole;
    } else if (entity.instanceOf('HSCore.Model.Door')) {
      if (SvgOpening.isEntryDoor(entity)) {
        svgResource = SvgResourceManager.OpeningMobileSvgs.entry;
        lineWidth = pageSetting.entry.lineWidth;
        lineColor = pageSetting.entry.lineColor;
      } else {
        svgResource = SvgResourceManager.OpeningMobileSvgs.door;
        lineWidth = pageSetting.door.lineWidth;
        lineColor = pageSetting.door.lineColor;
      }
    }

    if (!svgResource) {
      return;
    }

    const resourceHeight = svgResource.height;
    const resourceWidth = svgResource.width;
    const unitScale = this.unitScale();
    const swingScale = HSCore.Model.Opening.SWING_SCALE_TABLE[this._entity.swing];

    // 应用基本变换
    this._node.move(this._entity.x * unitScale, -this._entity.y * unitScale);
    this._node.transform({
      rotation: this._entity.rotation,
      cx: 0,
      cy: 0
    });
    this._node.transform({
      scaleX: swingScale.x,
      scaleY: swingScale.y,
      cx: 0,
      cy: 0
    });

    // 计算墙体宽度
    let wallModelWidth = this._ctx.getWallModelWidth() / unitScale;
    const host = this._entity.getHost();
    if (host?.instanceOf(HSConstants.ModelClass.NgWall)) {
      wallModelWidth = this._ctx.getWallModelWidth(host) / unitScale;
    }

    const widthScale = (this._entity.XSize * unitScale) / resourceWidth;
    const heightScale = (wallModelWidth * unitScale) / resourceHeight;

    this._base.transform({
      scaleX: widthScale,
      scaleY: heightScale,
      cx: 0,
      cy: 0
    });

    this._swing.transform({
      scaleX: widthScale,
      scaleY: widthScale,
      cx: 0,
      cy: 0
    });

    // 调整线宽并应用SVG
    const adjustedLineWidth = lineWidth ? lineWidth * unitPerPixel : undefined;
    const baseSvg = svgResource.base ? svgResource.base(lineColor, adjustedLineWidth! / heightScale) : '';
    const swingSvg = svgResource.swing ? svgResource.swing(lineColor, adjustedLineWidth! / widthScale) : '';

    this._base.svg(baseSvg);
    this._swing.svg(swingSvg);

    // 应用背景和遮罩
    const backgroundSvg = svgResource.background ? svgResource.background('black') : '';
    this._background.svg(backgroundSvg);
    this._background.move(this._entity.x * unitScale, -this._entity.y * unitScale);
    this._background.transform({
      rotation: this._entity.rotation,
      cx: 0,
      cy: 0
    });
    this._background.transform({
      scaleX: widthScale,
      scaleY: 1.5 * heightScale,
      cx: 0,
      cy: 0
    });

    wallsMask.add(this._background);
  }

  /**
   * 判断是否为入口门
   * @param entity - 门实体
   * @returns 如果是外墙上的门则返回true
   */
  public static isEntryDoor(entity: any): boolean {
    const host = entity.getHost();
    if (!host || !host.instanceOf(HSConstants.ModelClass.NgWall)) {
      return false;
    }
    return !SvgMinimapContext.isInnerWall(host);
  }
}