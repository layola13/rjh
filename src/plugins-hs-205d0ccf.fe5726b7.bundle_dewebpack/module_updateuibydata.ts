interface ResizableArea {
  t: number;
  l: number;
  w: number;
  h: number;
  _$(selector: string): JQuery;
}

interface UIUpdater {
  updateUIByData(left: number, top: number, width: number, height: number): void;
}

declare const a: { default: UIUpdater };

function updateUIByData(this: ResizableArea): void {
  const area = this;
  
  area.t = area.t < 0 ? 0 : area.t;
  area.l = area.l < 0 ? 0 : area.l;
  area.w = area.w < 0 ? 0 : area.w;
  area.h = area.h < 0 ? 0 : area.h;

  const windowWidth = $(window).width() ?? 0;
  const windowHeight = $(window).height() ?? 0;

  area._$(".snapshotresizable.left").css({
    top: area.t,
    left: 0,
    width: area.l,
    height: area.h
  });

  area._$(".snapshotresizable.right").css({
    top: area.t,
    left: area.l + area.w,
    width: windowWidth - area.l - area.w,
    height: area.h
  });

  area._$(".snapshotresizable.top .ui-resizable-s").css({
    left: area.l + area.w / 2
  });

  area._$(".snapshotresizable.bottom .ui-resizable-n").css({
    left: area.l + area.w / 2
  });

  area._$(".snapshotresizable.top").css({
    top: 0,
    left: 0,
    width: windowWidth,
    height: area.t
  });

  area._$(".snapshotresizable.bottom").css({
    top: area.t + area.h,
    left: 0,
    width: windowWidth,
    height: windowHeight - area.t - area.h
  });

  const BORDER_WIDTH = 2;
  const BORDER_COLOR = "#1c79bc";

  area._$(".decorateline.tborder").css({
    width: area.w,
    height: BORDER_WIDTH,
    left: area.l,
    top: area.t
  });

  area._$(".decorateline.bborder").css({
    width: area.w,
    height: BORDER_WIDTH,
    left: area.l,
    top: area.t + area.h
  });

  area._$(".decorateline.h1").css({
    width: area.w,
    borderTop: `solid 1px ${BORDER_COLOR}`,
    left: area.l,
    top: area.t + area.h / 4
  });

  area._$(".decorateline.h2").css({
    width: area.w,
    borderTop: `solid 1px ${BORDER_COLOR}`,
    left: area.l,
    top: area.t + (area.h * 3) / 4
  });

  area._$(".decorateline.v1").css({
    borderLeft: `solid 1px ${BORDER_COLOR}`,
    height: area.h,
    left: area.l + area.w / 4,
    top: area.t
  });

  area._$(".decorateline.v2").css({
    borderLeft: `solid 1px ${BORDER_COLOR}`,
    height: area.h,
    left: area.l + (area.w * 3) / 4,
    top: area.t
  });

  a.default.updateUIByData(area.l, area.t, area.w, area.h);
}