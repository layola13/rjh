/**
 * 可调整大小的窗口小部件初始化模块
 * 用于初始化快照区域的可调整大小行为，支持上、下、左、右四个方向的调整
 * @module initResizableWidgets
 */

/**
 * 调整大小事件处理器接口
 */
interface ResizeEvent {
  /** 原始jQuery事件对象 */
  type: string;
  target: HTMLElement;
}

/**
 * jQuery UI可调整大小组件的UI对象接口
 */
interface ResizableUI {
  /** 当前元素的jQuery对象 */
  element: JQuery;
  /** 辅助元素 */
  helper: JQuery;
  /** 原始位置 */
  originalPosition: { top: number; left: number };
  /** 原始尺寸 */
  originalSize: { width: number; height: number };
  /** 当前位置 */
  position: { top: number; left: number };
  /** 当前尺寸 */
  size: { width: number; height: number };
}

/**
 * jQuery UI可调整大小配置选项接口
 */
interface ResizableOptions {
  /** 可调整大小的手柄位置 (n, e, s, w, ne, se, sw, nw) */
  handles?: string;
  /** 最小宽度 */
  minWidth?: number;
  /** 最小高度 */
  minHeight?: number;
  /** 最大宽度 */
  maxWidth?: number;
  /** 最大高度 */
  maxHeight?: number;
  /** 调整大小时的回调函数 */
  resize?: (event: ResizeEvent, ui: ResizableUI) => void;
  /** 开始调整大小时的回调函数 */
  start?: (event: ResizeEvent, ui: ResizableUI) => void;
  /** 停止调整大小时的回调函数 */
  stop?: (event: ResizeEvent, ui: ResizableUI) => void;
  /** 创建可调整大小组件时的回调函数 */
  create?: (event: ResizeEvent, ui: ResizableUI) => void;
}

/**
 * 可调整大小的手柄类型
 */
type ResizeHandle = 'e' | 'ne' | 'se' | 'w' | 'nw' | 'sw' | null;

/**
 * 可调整大小窗口小部件的上下文接口
 */
interface ResizableWidgetsContext {
  /** 宽高比，-1表示不固定比例 */
  ratio: number;
  /** 左边距 */
  l: number;
  /** 顶边距 */
  t: number;
  /** 宽度 */
  w: number;
  /** 高度 */
  h: number;
  /** 最小高度 */
  minH: number;
  /** 根据数据更新UI的方法 */
  updateUIByData(): void;
}

/**
 * 初始化可调整大小的窗口小部件
 * @param this - 包含窗口小部件状态和更新方法的上下文对象
 * @param aspectRatio - 宽高比，-1表示不固定宽高比
 */
declare function initResizableWidgets(
  this: ResizableWidgetsContext,
  aspectRatio: number
): void;

/**
 * 初始化可调整大小的窗口小部件（函数实现）
 * 
 * 功能说明：
 * - 初始化上、下、左、右四个可调整大小的区域
 * - 支持固定宽高比或自由调整
 * - 自动计算并限制调整范围，防止溢出窗口
 * - 使用jQuery UI的resizable组件
 * 
 * @param this - 上下文对象，包含位置、尺寸和更新方法
 * @param aspectRatio - 宽高比（-1表示不固定比例）
 */
declare function initResizableWidgets(
  this: ResizableWidgetsContext,
  aspectRatio: number
): void {
  // 存储中心点坐标
  let centerX: number;
  let centerY: number;

  const context = this;
  context.ratio = aspectRatio;

  // 存储左右边界和高度参考点
  let rightBoundary: number;
  let leftBoundary: number;
  let topReference: number;
  let bottomReference: number;

  // 当前激活的调整手柄（左侧区域）
  let activeLeftHandle: ResizeHandle = null;
  // 当前激活的调整手柄（右侧区域）
  let activeRightHandle: ResizeHandle = null;

  /**
   * 初始化顶部可调整区域
   * 只能通过南侧手柄（底部边缘）进行调整
   */
  $('.snapshotresizable.top').resizable({
    handles: 's',
    minWidth: 1,
    minHeight: 1,
    maxWidth: $(window).width(),
    maxHeight: $(window).height(),

    /**
     * 调整大小时的回调
     * 根据固定比例或自由模式计算新的尺寸和位置
     */
    resize: function (event: ResizeEvent, ui: ResizableUI): void {
      // 计算剩余高度
      context.h =
        $(window).height()! -
        $(this).height()! -
        $('.snapshotresizable.bottom').height()!;

      if (context.ratio === -1) {
        // 自由调整模式：只更新顶部位置
        context.t = $(this).height()!;
      } else {
        // 固定比例模式：同时调整宽度和位置
        context.w = context.h * context.ratio;
        context.l = centerX - context.w / 2;
        context.t = centerY - context.h;
      }

      context.updateUIByData();
    },

    /**
     * 开始调整时的回调
     * 计算并设置最大高度限制
     */
    start: function (): void {
      // 记录中心点
      centerX = context.l + context.w / 2;
      centerY = context.t + context.h;

      let maxHeight: number;

      if (context.ratio === -1) {
        // 自由模式：最大高度为窗口高度减去底部区域和最小高度
        maxHeight =
          $(window).height()! -
          context.minH -
          $('.snapshotresizable.bottom').height()!;
      } else {
        // 固定比例模式：计算可用空间并平分
        const availableSpace =
          $(window).height()! -
          $('.snapshotresizable.bottom').height()! -
          $('.snapshotresizable.top').height()! -
          context.minH;
        maxHeight = $('.snapshotresizable.top').height()! + availableSpace / 2;
      }

      $('.snapshotresizable.top').resizable('option', 'maxHeight', maxHeight);
    },

    /**
     * 停止调整时的回调
     * 清除最大高度限制
     */
    stop: function (): void {
      $('.snapshotresizable.top').resizable('option', 'maxHeight', undefined);
    },
  });

  /**
   * 初始化底部可调整区域
   * 只能通过北侧手柄（顶部边缘）进行调整
   */
  $('.snapshotresizable.bottom').resizable({
    handles: 'n',
    minWidth: 1,
    minHeight: 1,
    maxWidth: $(window).width(),
    maxHeight: $(window).height(),

    /**
     * 调整大小时的回调
     */
    resize: function (event: ResizeEvent, ui: ResizableUI): void {
      // 计算中间区域高度
      context.h = $(window).height()! - context.t - $(this).height()!;

      if (context.ratio !== -1) {
        // 固定比例模式：调整宽度和左边距
        context.w = context.h * context.ratio;
        context.l = centerX - context.w / 2;
      }

      context.updateUIByData();
    },

    /**
     * 开始调整时记录中心点
     */
    start: function (event: ResizeEvent, ui: ResizableUI): void {
      centerX = context.l + context.w / 2;
      centerY = context.t;
    },

    /**
     * 停止调整时的回调（空实现）
     */
    stop: function (event: ResizeEvent, ui: ResizableUI): void {},
  });

  /**
   * 初始化左侧可调整区域
   * 支持东侧(e)、东北(ne)、东南(se)三个手柄
   */
  $('.snapshotresizable.left').resizable({
    handles: 'e, ne, se',
    minWidth: 1,
    minHeight: 1,
    maxWidth: $(window).width(),
    maxHeight: $(window).height(),

    /**
     * 调整大小时的回调
     * 根据不同的手柄类型执行不同的调整逻辑
     */
    resize: function (event: ResizeEvent, ui: ResizableUI): void {
      switch (activeLeftHandle) {
        case 'e':
          // 东侧手柄：水平调整
          context.l = $(this).width()!;
          if (context.ratio === -1) {
            // 自由模式
            context.w =
              $(window).width()! -
              context.l -
              $('.snapshotresizable.right').width()!;
          } else {
            // 固定比例模式
            context.w =
              $(window).width()! -
              $('.snapshotresizable.right').width()! -
              $(this).width()!;
            context.h = context.w / context.ratio;
            context.t = centerY - context.h / 2;
          }
          break;

        case 'ne':
          // 东北手柄：右上角调整
          context.h = $(this).height()!;
          if (context.ratio === -1) {
            // 自由模式
            context.l = $(this).width()!;
            context.t =
              $(window).height()! -
              context.h -
              $('.snapshotresizable.bottom').height()!;
            context.w =
              $(window).width()! -
              context.l -
              $('.snapshotresizable.right').width()!;
          } else {
            // 固定比例模式
            context.w = context.ratio * context.h;
            context.l = leftBoundary - context.w;
            context.t = topReference - context.h;
          }
          break;

        case 'se':
          // 东南手柄：右下角调整
          context.h = $(this).height()!;
          if (context.ratio === -1) {
            // 自由模式
            context.l = $(this).width()!;
            context.w =
              $(window).width()! -
              $('.snapshotresizable.right').width()! -
              context.l;
          } else {
            // 固定比例模式
            context.w = context.ratio * context.h;
            context.l = rightBoundary - context.w;
          }
          break;
      }

      context.updateUIByData();
    },

    /**
     * 开始调整时记录参考点
     */
    start: function (event: ResizeEvent, ui: ResizableUI): void {
      rightBoundary = context.l + context.w;
      leftBoundary = context.l + context.w;
      topReference = context.t + context.h;
      centerX = context.l + context.w;
      centerY = context.t + context.h / 2;
    },

    /**
     * 创建时绑定手柄事件
     * 用于追踪当前激活的调整手柄
     */
    create: function (event: ResizeEvent, ui: ResizableUI): void {
      // 东南手柄
      $('.snapshotresizable.left .ui-resizable-se').bind('mousedown', function () {
        activeLeftHandle = 'se';
      });
      $('.snapshotresizable.left .ui-resizable-se').bind('mouseup', function () {
        activeLeftHandle = null;
      });

      // 东北手柄
      $('.snapshotresizable.left .ui-resizable-ne').bind('mousedown', function () {
        activeLeftHandle = 'ne';
      });
      $('.snapshotresizable.left .ui-resizable-ne').bind('mouseup', function () {
        activeLeftHandle = null;
      });

      // 东侧手柄
      $('.snapshotresizable.left .ui-resizable-e').bind('mousedown', function () {
        activeLeftHandle = 'e';
      });
      $('.snapshotresizable.left .ui-resizable-e').bind('mouseup', function () {
        activeLeftHandle = null;
      });
    },
  });

  /**
   * 初始化右侧可调整区域
   * 支持西侧(w)、西北(nw)、西南(sw)三个手柄
   */
  $('.snapshotresizable.right').resizable({
    minWidth: 1,
    minHeight: 1,
    maxWidth: $(window).width(),
    maxHeight: $(window).height(),
    handles: 'w, nw, sw',

    /**
     * 调整大小时的回调
     * 根据不同的手柄类型执行不同的调整逻辑
     */
    resize: function (event: ResizeEvent, ui: ResizableUI): void {
      switch (activeRightHandle) {
        case 'w':
          // 西侧手柄：水平调整
          context.w = $(window).width()! - context.l - $(this).width()!;
          if (context.ratio !== -1) {
            // 固定比例模式
            context.h = context.w / context.ratio;
            context.t = centerY - context.h / 2;
          }
          break;

        case 'nw':
          // 西北手柄：左上角调整
          context.h = $(this).height()!;
          if (context.ratio === -1) {
            // 自由模式
            context.w =
              $(window).width()! -
              $('.snapshotresizable.left').width()! -
              $(this).width()!;
            context.t =
              $(window).height()! -
              $('.snapshotresizable.bottom').height()! -
              $(this).height()!;
          } else {
            // 固定比例模式
            context.w = context.ratio * context.h;
            context.t = bottomReference - context.h;
          }
          break;

        case 'sw':
          // 西南手柄：左下角调整
          context.h = $(this).height()!;
          if (context.ratio === -1) {
            // 自由模式
            context.w =
              $(window).width()! -
              $('.snapshotresizable.left').width()! -
              $(this).width()!;
          } else {
            // 固定比例模式
            context.w = context.ratio * context.h;
          }
          break;
      }

      context.updateUIByData();
    },

    /**
     * 开始调整时记录参考点
     */
    start: function (event: ResizeEvent, ui: ResizableUI): void {
      bottomReference = context.t + context.h;
      centerX = context.l;
      centerY = context.t + context.h / 2;
    },

    /**
     * 创建时绑定手柄事件
     * 用于追踪当前激活的调整手柄
     */
    create: function (event: ResizeEvent, ui: ResizableUI): void {
      // 西南手柄
      $('.snapshotresizable.right .ui-resizable-sw').bind('mousedown', function () {
        activeRightHandle = 'sw';
      });
      $('.snapshotresizable.right .ui-resizable-sw').bind('mouseup', function () {
        activeRightHandle = null;
      });

      // 西北手柄
      $('.snapshotresizable.right .ui-resizable-nw').bind('mousedown', function () {
        activeRightHandle = 'nw';
      });
      $('.snapshotresizable.right .ui-resizable-nw').bind('mouseup', function () {
        activeRightHandle = null;
      });

      // 西侧手柄
      $('.snapshotresizable.right .ui-resizable-w').bind('mousedown', function () {
        activeRightHandle = 'w';
      });
      $('.snapshotresizable.right .ui-resizable-w').bind('mouseup', function () {
        activeRightHandle = null;
      });
    },
  });
}