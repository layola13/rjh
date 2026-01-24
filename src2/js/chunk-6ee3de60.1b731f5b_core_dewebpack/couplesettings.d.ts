/**
 * Couple 对象的配置管理器
 * 提供对 Couple 实例属性的类型安全访问和修改
 */
export interface Couple {
  /** 宽度尺寸标注对象 */
  dimForWidth: {
    /** 是否隐藏 */
    hidden: boolean;
    /** 更新多边形 */
    updatePoly(): void;
    /** 绘制到视图 */
    draw(view: View): void;
  };
  /** 轮廓尺寸大小 */
  profileSize: number;
  /** 是否可拖拽 */
  draggable: boolean;
  /** 螺丝数量 */
  screwTimes: number;
  /** 附加属性 */
  attrs: unknown;
  /** 调整尺寸 */
  resize(size: number): void;
  /** 绘制到视图 */
  draw(view: View): void;
}

/**
 * 视图对象接口
 */
export interface View {
  /** 状态管理器（用于撤销/重做） */
  mometoManager: {
    /** 创建检查点 */
    checkPoint(): void;
  };
  /** 刷新视图 */
  refresh(): void;
}

/**
 * Couple 设置管理类
 * 封装对 Couple 实例的配置操作，并自动管理视图更新和状态检查点
 */
export class CoupleSettings {
  private readonly couple: Couple;
  private readonly view: View;

  /**
   * 创建 CoupleSettings 实例
   * @param couple - 要管理的 Couple 对象
   * @param view - 关联的视图对象
   */
  constructor(couple: Couple, view: View) {
    this.couple = couple;
    this.view = view;
  }

  /**
   * 获取或设置尺寸标注的显示/隐藏状态
   * 设置时会自动更新多边形、重绘并创建检查点
   */
  get sizeDimHidden(): boolean {
    return this.couple.dimForWidth.hidden;
  }

  set sizeDimHidden(value: boolean) {
    if (this.couple.dimForWidth.hidden !== value) {
      this.couple.dimForWidth.hidden = value;
      this.couple.dimForWidth.updatePoly();
      this.couple.dimForWidth.draw(this.view);
      this.view.refresh();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * 获取或设置轮廓尺寸大小
   * 设置时会验证值的有效性（必须 >= 1）并创建检查点
   */
  get size(): number {
    return this.couple.profileSize;
  }

  set size(value: number) {
    if (value && !isNaN(value) && value >= 1 && this.size !== value) {
      this.couple.resize(value);
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * 获取或设置是否可拖拽
   * 设置时会自动重绘并刷新视图
   */
  get draggable(): boolean {
    return this.couple.draggable;
  }

  set draggable(value: boolean) {
    if (this.draggable !== value) {
      this.couple.draggable = value;
      this.couple.draw(this.view);
      this.view.refresh();
    }
  }

  /**
   * 获取或设置螺丝数量
   * 设置时会自动创建检查点
   */
  get screwTimes(): number {
    return this.couple.screwTimes;
  }

  set screwTimes(value: number) {
    if (this.screwTimes !== value) {
      this.couple.screwTimes = value;
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * 获取或设置附加属性
   * 设置时会自动创建检查点
   */
  get attrs(): unknown {
    return this.couple.attrs;
  }

  set attrs(value: unknown) {
    if (this.attrs !== value) {
      this.couple.attrs = value;
      this.view.mometoManager.checkPoint();
    }
  }
}