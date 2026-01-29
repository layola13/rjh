interface ResizableWidget {
  ratio: number;
  l: number;
  t: number;
  w: number;
  h: number;
  minH: number;
  updateUIByData(): void;
}

type ResizeHandle = 'e' | 'ne' | 'se' | 'w' | 'nw' | 'sw' | null;

function initResizableWidgets(this: ResizableWidget, ratio: number): void {
  this.ratio = ratio;

  let centerX: number;
  let centerY: number;
  let anchorLeft: number;
  let anchorRight: number;
  let anchorBottom: number;
  let leftHandle: ResizeHandle = null;
  let rightHandle: ResizeHandle = null;

  $('.snapshotresizable.top').resizable({
    handles: 's',
    minWidth: 1,
    minHeight: 1,
    maxWidth: $(window).width(),
    maxHeight: $(window).height(),
    resize: (event: JQuery.Event, ui: JQueryUI.ResizableUIParams) => {
      this.h = $(window).height() - $(event.target).height() - $('.snapshotresizable.bottom').height();
      
      if (this.ratio === -1) {
        this.t = $(event.target).height();
      } else {
        this.w = this.h * this.ratio;
        this.l = centerX - this.w / 2;
        this.t = centerY - this.h;
      }
      
      this.updateUIByData();
    },
    start: () => {
      centerX = this.l + this.w / 2;
      centerY = this.t + this.h;

      let maxHeight: number;
      if (this.ratio === -1) {
        maxHeight = $(window).height() - this.minH - $('.snapshotresizable.bottom').height();
      } else {
        const availableHeight = $(window).height() - $('.snapshotresizable.bottom').height() - $('.snapshotresizable.top').height() - this.minH;
        maxHeight = $('.snapshotresizable.top').height() + availableHeight / 2;
      }
      
      $('.snapshotresizable.top').resizable('option', 'maxHeight', maxHeight);
    },
    stop: () => {
      $('.snapshotresizable.top').resizable('option', 'maxHeight', undefined);
    }
  });

  $('.snapshotresizable.bottom').resizable({
    handles: 'n',
    minWidth: 1,
    minHeight: 1,
    maxWidth: $(window).width(),
    maxHeight: $(window).height(),
    resize: (event: JQuery.Event, ui: JQueryUI.ResizableUIParams) => {
      this.h = $(window).height() - this.t - $(event.target).height();
      
      if (this.ratio !== -1) {
        this.w = this.h * this.ratio;
        this.l = centerX - this.w / 2;
      }
      
      this.updateUIByData();
    },
    start: (event: JQuery.Event, ui: JQueryUI.ResizableUIParams) => {
      centerX = this.l + this.w / 2;
      centerY = this.t;
    },
    stop: (event: JQuery.Event, ui: JQueryUI.ResizableUIParams) => {}
  });

  $('.snapshotresizable.left').resizable({
    handles: 'e, ne, se',
    minWidth: 1,
    minHeight: 1,
    maxWidth: $(window).width(),
    maxHeight: $(window).height(),
    resize: (event: JQuery.Event, ui: JQueryUI.ResizableUIParams) => {
      switch (leftHandle) {
        case 'e':
          this.l = $(event.target).width();
          if (this.ratio === -1) {
            this.w = $(window).width() - this.l - $('.snapshotresizable.right').width();
          } else {
            this.w = $(window).width() - $('.snapshotresizable.right').width() - $(event.target).width();
            this.h = this.w / this.ratio;
            this.t = centerY - this.h / 2;
          }
          break;
        case 'ne':
          this.h = $(event.target).height();
          if (this.ratio === -1) {
            this.l = $(event.target).width();
            this.t = $(window).height() - this.h - $('.snapshotresizable.bottom').height();
            this.w = $(window).width() - this.l - $('.snapshotresizable.right').width();
          } else {
            this.w = this.ratio * this.h;
            this.l = anchorRight - this.w;
            this.t = anchorBottom - this.h;
          }
          break;
        case 'se':
          this.h = $(event.target).height();
          if (this.ratio === -1) {
            this.l = $(event.target).width();
            this.w = $(window).width() - $('.snapshotresizable.right').width() - this.l;
          } else {
            this.w = this.ratio * this.h;
            this.l = anchorLeft - this.w;
          }
          break;
      }
      this.updateUIByData();
    },
    start: (event: JQuery.Event, ui: JQueryUI.ResizableUIParams) => {
      anchorLeft = this.l + this.w;
      anchorRight = this.l + this.w;
      anchorBottom = this.t + this.h;
      centerX = this.l + this.w;
      centerY = this.t + this.h / 2;
    },
    create: (event: JQuery.Event, ui: JQueryUI.ResizableUIParams) => {
      $('.snapshotresizable.left .ui-resizable-se').bind('mousedown', () => {
        leftHandle = 'se';
      });
      $('.snapshotresizable.left .ui-resizable-se').bind('mouseup', () => {
        leftHandle = null;
      });
      $('.snapshotresizable.left .ui-resizable-ne').bind('mousedown', () => {
        leftHandle = 'ne';
      });
      $('.snapshotresizable.left .ui-resizable-ne').bind('mouseup', () => {
        leftHandle = null;
      });
      $('.snapshotresizable.left .ui-resizable-e').bind('mousedown', () => {
        leftHandle = 'e';
      });
      $('.snapshotresizable.left .ui-resizable-e').bind('mouseup', () => {
        leftHandle = null;
      });
    }
  });

  $('.snapshotresizable.right').resizable({
    minWidth: 1,
    minHeight: 1,
    maxWidth: $(window).width(),
    maxHeight: $(window).height(),
    handles: 'w, nw, sw',
    resize: (event: JQuery.Event, ui: JQueryUI.ResizableUIParams) => {
      switch (rightHandle) {
        case 'w':
          this.w = $(window).width() - this.l - $(event.target).width();
          if (this.ratio !== -1) {
            this.h = this.w / this.ratio;
            this.t = centerY - this.h / 2;
          }
          break;
        case 'nw':
          this.h = $(event.target).height();
          if (this.ratio === -1) {
            this.w = $(window).width() - $('.snapshotresizable.left').width() - $(event.target).width();
            this.t = $(window).height() - $('.snapshotresizable.bottom').height() - $(event.target).height();
          } else {
            this.w = this.ratio * this.h;
            this.t = anchorBottom - this.h;
          }
          break;
        case 'sw':
          this.h = $(event.target).height();
          if (this.ratio === -1) {
            this.w = $(window).width() - $('.snapshotresizable.left').width() - $(event.target).width();
          } else {
            this.w = this.ratio * this.h;
          }
          break;
      }
      this.updateUIByData();
    },
    start: (event: JQuery.Event, ui: JQueryUI.ResizableUIParams) => {
      anchorBottom = this.t + this.h;
      centerX = this.l;
      centerY = this.t + this.h / 2;
    },
    create: (event: JQuery.Event, ui: JQueryUI.ResizableUIParams) => {
      $('.snapshotresizable.right .ui-resizable-sw').bind('mousedown', () => {
        rightHandle = 'sw';
      });
      $('.snapshotresizable.right .ui-resizable-sw').bind('mouseup', () => {
        rightHandle = null;
      });
      $('.snapshotresizable.right .ui-resizable-nw').bind('mousedown', () => {
        rightHandle = 'nw';
      });
      $('.snapshotresizable.right .ui-resizable-nw').bind('mouseup', () => {
        rightHandle = null;
      });
      $('.snapshotresizable.right .ui-resizable-w').bind('mousedown', () => {
        rightHandle = 'w';
      });
      $('.snapshotresizable.right .ui-resizable-w').bind('mouseup', () => {
        rightHandle = null;
      });
    }
  });
}