interface ResizableConfig {
  minW: number;
  minH: number;
  w: number;
  h: number;
  t: number;
  l: number;
  ratio?: number;
}

type ResizeHandle = 'e' | 'ne' | 'se' | 'w' | 'nw' | 'sw' | null;

interface WindowResizeEventData {
  target: Window | HTMLElement;
}

interface WindowResizeEvent {
  data: WindowResizeEventData;
}

interface ResizeEventUI {
  position?: { top: number; left: number };
  size?: { width: number; height: number };
  element?: JQuery;
}

const CONSTANTS = {
  MIN_WIDTH: 120,
  MIN_HEIGHT: 120,
  CROP_WINDOW_SCALE: 0.7,
  BOTTOM_OFFSET: 82,
} as const;

const advancedSnapshotManager: ResizableConfig & {
  windowResizeHandler(event: WindowResizeEvent): void;
  initResizableWidgets(aspectRatio: number): void;
  destroyResizableWidgets(): void;
  show(aspectRatio: number): void;
  hide(): void;
  init(config: unknown): void;
  _$(selector?: string): JQuery;
  updateUIByData(): void;
  setRatio(aspectRatio: number): void;
  getCroppingWindow(aspectRatio: number): [number, number, number, number];
} = {
  minW: CONSTANTS.MIN_WIDTH,
  minH: CONSTANTS.MIN_HEIGHT,
  w: 0,
  h: 0,
  t: 0,
  l: 0,
  ratio: undefined,

  windowResizeHandler(event: WindowResizeEvent): void {
    const target = event.data.target;
    
    if ($.isWindow(target)) {
      const windowWidth = $(target).width() ?? 0;
      const windowHeight = $(target).height() ?? 0;

      if (this.w + this.l >= windowWidth) {
        if (this.w + this.l >= windowWidth && this.w < windowWidth) {
          this.l = windowWidth - this.w;
        } else if (this.w >= windowWidth) {
          this.l = 0;
          this.w = windowWidth;
          if (this.ratio !== undefined && this.ratio !== -1) {
            this.h = this.w / this.ratio;
          }
        }
      }

      if (this.h + this.t >= windowHeight) {
        if (this.h + this.t >= windowHeight && this.h < windowHeight) {
          this.t = windowHeight - this.h;
        } else if (this.h >= windowHeight) {
          this.t = 0;
          this.h = windowHeight;
          if (this.ratio !== undefined && this.ratio !== -1) {
            this.w = this.h * this.ratio;
          }
        }
      }
    }

    this.updateUIByData();
  },

  initResizableWidgets(aspectRatio: number): void {
    this.ratio = aspectRatio;
    
    let centerX: number;
    let centerY: number;
    let leftHandle: ResizeHandle = null;
    let rightHandle: ResizeHandle = null;

    $(".snapshotresizable.top").resizable({
      handles: "s",
      minWidth: 1,
      minHeight: 1,
      maxWidth: $(window).width(),
      maxHeight: $(window).height(),
      resize: (event: Event, ui: ResizeEventUI): void => {
        const topHeight = $(event.target).height() ?? 0;
        const bottomHeight = $(".snapshotresizable.bottom").height() ?? 0;
        const windowHeight = $(window).height() ?? 0;

        this.h = windowHeight - topHeight - bottomHeight;

        if (this.ratio === -1) {
          this.t = topHeight;
        } else {
          this.w = this.h * this.ratio;
          this.l = centerX - this.w / 2;
          this.t = centerY - this.h;
        }

        this.updateUIByData();
      },
      start: (): void => {
        centerX = this.l + this.w / 2;
        centerY = this.t + this.h;

        let maxHeight: number;
        if (this.ratio === -1) {
          const bottomHeight = $(".snapshotresizable.bottom").height() ?? 0;
          maxHeight = $(window).height()! - this.minH - bottomHeight;
        } else {
          const windowHeight = $(window).height() ?? 0;
          const bottomHeight = $(".snapshotresizable.bottom").height() ?? 0;
          const topHeight = $(".snapshotresizable.top").height() ?? 0;
          const availableSpace = windowHeight - bottomHeight - topHeight - this.minH;
          maxHeight = topHeight + availableSpace / 2;
        }

        $(".snapshotresizable.top").resizable("option", "maxHeight", maxHeight);
      },
      stop: (): void => {
        $(".snapshotresizable.top").resizable("option", "maxHeight", undefined);
      }
    });

    $(".snapshotresizable.bottom").resizable({
      handles: "n",
      minWidth: 1,
      minHeight: 1,
      maxWidth: $(window).width(),
      maxHeight: $(window).height(),
      resize: (event: Event, ui: ResizeEventUI): void => {
        const bottomHeight = $(event.target).height() ?? 0;
        this.h = $(window).height()! - this.t - bottomHeight;

        if (this.ratio !== -1) {
          this.w = this.h * this.ratio;
          this.l = centerX - this.w / 2;
        }

        this.updateUIByData();
      },
      start: (event: Event, ui: ResizeEventUI): void => {
        centerX = this.l + this.w / 2;
        centerY = this.t;
      },
      stop: (event: Event, ui: ResizeEventUI): void => {}
    });

    $(".snapshotresizable.left").resizable({
      handles: "e, ne, se",
      minWidth: 1,
      minHeight: 1,
      maxWidth: $(window).width(),
      maxHeight: $(window).height(),
      resize: (event: Event, ui: ResizeEventUI): void => {
        const leftWidth = $(event.target).width() ?? 0;
        const leftHeight = $(event.target).height() ?? 0;
        const rightWidth = $(".snapshotresizable.right").width() ?? 0;
        const windowWidth = $(window).width() ?? 0;
        const windowHeight = $(window).height() ?? 0;
        const bottomHeight = $(".snapshotresizable.bottom").height() ?? 0;

        switch (leftHandle) {
          case "e":
            this.l = leftWidth;
            if (this.ratio === -1) {
              this.w = windowWidth - this.l - rightWidth;
            } else {
              this.w = windowWidth - rightWidth - leftWidth;
              this.h = this.w / this.ratio;
              this.t = centerY - this.h / 2;
            }
            break;

          case "ne":
            this.h = leftHeight;
            if (this.ratio === -1) {
              this.l = leftWidth;
              this.t = windowHeight - this.h - bottomHeight;
              this.w = windowWidth - this.l - rightWidth;
            } else {
              this.w = this.ratio * this.h;
              this.l = (centerX ?? 0) - this.w;
              this.t = (centerY ?? 0) - this.h;
            }
            break;

          case "se":
            this.h = leftHeight;
            if (this.ratio === -1) {
              this.l = leftWidth;
              this.w = windowWidth - rightWidth - this.l;
            } else {
              this.w = this.ratio * this.h;
              this.l = (centerX ?? 0) - this.w;
            }
            break;
        }

        this.updateUIByData();
      },
      start: (event: Event, ui: ResizeEventUI): void => {
        centerX = this.l + this.w;
        centerY = this.t + this.h / 2;
      },
      create: (event: Event, ui: ResizeEventUI): void => {
        $(".snapshotresizable.left .ui-resizable-se").bind("mousedown", () => {
          leftHandle = "se";
        });
        $(".snapshotresizable.left .ui-resizable-se").bind("mouseup", () => {
          leftHandle = null;
        });
        $(".snapshotresizable.left .ui-resizable-ne").bind("mousedown", () => {
          leftHandle = "ne";
        });
        $(".snapshotresizable.left .ui-resizable-ne").bind("mouseup", () => {
          leftHandle = null;
        });
        $(".snapshotresizable.left .ui-resizable-e").bind("mousedown", () => {
          leftHandle = "e";
        });
        $(".snapshotresizable.left .ui-resizable-e").bind("mouseup", () => {
          leftHandle = null;
        });
      }
    });

    $(".snapshotresizable.right").resizable({
      minWidth: 1,
      minHeight: 1,
      maxWidth: $(window).width(),
      maxHeight: $(window).height(),
      handles: "w, nw, sw",
      resize: (event: Event, ui: ResizeEventUI): void => {
        const rightWidth = $(event.target).width() ?? 0;
        const rightHeight = $(event.target).height() ?? 0;
        const leftWidth = $(".snapshotresizable.left").width() ?? 0;
        const windowWidth = $(window).width() ?? 0;
        const windowHeight = $(window).height() ?? 0;
        const bottomHeight = $(".snapshotresizable.bottom").height() ?? 0;

        switch (rightHandle) {
          case "w":
            this.w = windowWidth - this.l - rightWidth;
            if (this.ratio !== -1) {
              this.h = this.w / this.ratio;
              this.t = centerY - this.h / 2;
            }
            break;

          case "nw":
            this.h = rightHeight;
            if (this.ratio === -1) {
              this.w = windowWidth - leftWidth - rightWidth;
              this.t = windowHeight - bottomHeight - rightHeight;
            } else {
              this.w = this.ratio * this.h;
              this.t = (centerY ?? 0) - this.h;
            }
            break;

          case "sw":
            this.h = rightHeight;
            if (this.ratio === -1) {
              this.w = windowWidth - leftWidth - rightWidth;
            } else {
              this.w = this.ratio * this.h;
            }
            break;
        }

        this.updateUIByData();
      },
      start: (event: Event, ui: ResizeEventUI): void => {
        centerX = this.l;
        centerY = this.t + this.h / 2;
      },
      create: (event: Event, ui: ResizeEventUI): void => {
        $(".snapshotresizable.right .ui-resizable-sw").bind("mousedown", () => {
          rightHandle = "sw";
        });
        $(".snapshotresizable.right .ui-resizable-sw").bind("mouseup", () => {
          rightHandle = null;
        });
        $(".snapshotresizable.right .ui-resizable-nw").bind("mousedown", () => {
          rightHandle = "nw";
        });
        $(".snapshotresizable.right .ui-resizable-nw").bind("mouseup", () => {
          rightHandle = null;
        });
        $(".snapshotresizable.right .ui-resizable-w").bind("mousedown", () => {
          rightHandle = "w";
        });
        $(".snapshotresizable.right .ui-resizable-w").bind("mouseup", () => {
          rightHandle = null;
        });
      }
    });
  },

  destroyResizableWidgets(): void {
    $(".snapshotresizable.top").resizable("destroy");
    $(".snapshotresizable.bottom").resizable("destroy");
    $(".snapshotresizable.left").resizable("destroy");
    $(".snapshotresizable.right").resizable("destroy");
  },

  show(aspectRatio: number): void {
    this.initResizableWidgets(aspectRatio);
    this._$(".snapshotresizable").show();
    this._$(".decorateline").show();
    this.setRatio(aspectRatio);
    
    if (typeof site !== 'undefined' && site.signalWindowResizeEnd) {
      site.signalWindowResizeEnd.listen(this.windowResizeHandler, this);
    }
  },

  hide(): void {
    this.destroyResizableWidgets();
    this._$(".snapshotresizable").hide();
    this._$(".decorateline").hide();
    
    if (typeof site !== 'undefined' && site.signalWindowResizeEnd) {
      site.signalWindowResizeEnd.unlisten(this.windowResizeHandler, this);
    }
  },

  init(config: unknown): void {
    const resourcePath = ".advancedSnapshotHolder";
    
    if (typeof getXMLResource !== 'undefined') {
      getXMLResource(resourcePath, (resource: { html: () => string }) => {
        this._$().append(resource.html());
      }, resourcePath);
    }
  },

  _$(selector?: string): JQuery {
    const editor = $("#editor");
    return selector ? editor.find(selector) : editor;
  },

  updateUIByData(): void {
    this.t = Math.max(0, this.t);
    this.l = Math.max(0, this.l);
    this.w = Math.max(0, this.w);
    this.h = Math.max(0, this.h);

    const windowWidth = $(window).width() ?? 0;
    const windowHeight = $(window).height() ?? 0;

    this._$(".snapshotresizable.left").css({
      top: this.t,
      left: 0,
      width: this.l,
      height: this.h
    });

    this._$(".snapshotresizable.right").css({
      top: this.t,
      left: this.l + this.w,
      width: windowWidth - this.l - this.w,
      height: this.h
    });

    this._$(".snapshotresizable.top .ui-resizable-s").css({
      left: this.l + this.w / 2
    });

    this._$(".snapshotresizable.bottom .ui-resizable-n").css({
      left: this.l + this.w / 2
    });

    this._$(".snapshotresizable.top").css({
      top: 0,
      left: 0,
      width: windowWidth,
      height: this.t
    });

    this._$(".snapshotresizable.bottom").css({
      top: this.t + this.h,
      left: 0,
      width: windowWidth,
      height: windowHeight - this.t - this.h
    });

    this._$(".decorateline.tborder").css({
      width: this.w,
      height: 2,
      left: this.l,
      top: this.t
    });

    this._$(".decorateline.bborder").css({
      width: this.w,
      height: 2,
      left: this.l,
      top: this.t + this.h
    });

    this._$(".decorateline.h1").css({
      width: this.w,
      borderTop: "solid 1px #1c79bc",
      left: this.l,
      top: this.t + this.h / 4
    });

    this._$(".decorateline.h2").css({
      width: this.w,
      borderTop: "solid 1px #1c79bc",
      left: this.l,
      top: this.t + (this.h / 4) * 3
    });

    this._$(".decorateline.v1").css({
      borderLeft: "solid 1px #1c79bc",
      height: this.h,
      left: this.l + this.w / 4,
      top: this.t
    });

    this._$(".decorateline.v2").css({
      borderLeft: "solid 1px #1c79bc",
      height: this.h,
      left: this.l + (this.w / 4) * 3,
      top: this.t
    });
  },

  setRatio(aspectRatio: number): void {
    let effectiveRatio: number;

    if (aspectRatio === -1) {
      this.ratio = aspectRatio;
      const windowWidth = $(window).width() ?? 0;
      const windowHeight = $(window).height() ?? 0;
      effectiveRatio = windowWidth / windowHeight;
    } else if (aspectRatio === 1.5) {
      const windowWidth = $(window).width() ?? 0;
      const windowHeight = $(window).height() ?? 0;
      this.ratio = effectiveRatio = windowWidth / windowHeight;
    } else {
      this.ratio = aspectRatio;
      effectiveRatio = this.ratio;
    }

    const [width, height, left, top] = this.getCroppingWindow(effectiveRatio);
    this.w = width;
    this.h = height;
    this.l = left;
    this.t = top;

    this.updateUIByData();
  },

  getCroppingWindow(aspectRatio: number): [number, number, number, number] {
    const windowWidth = $(window).width() ?? 0;
    const windowHeight = $(window).height() ?? 0;
    const availableHeight = windowHeight - CONSTANTS.BOTTOM_OFFSET;
    
    const height = CONSTANTS.CROP_WINDOW_SCALE * availableHeight;
    const width = height * aspectRatio;
    const left = windowWidth / 2 - width / 2;
    const top = availableHeight / 2 - height / 2;

    return [width, height, left, top];
  }
};

export default advancedSnapshotManager;