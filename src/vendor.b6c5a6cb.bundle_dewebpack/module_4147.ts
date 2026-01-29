interface AffixOptions {
  offset?: number | { top?: number; bottom?: number };
  target?: Window | string | HTMLElement;
}

interface AffixData {
  offset?: number | { top?: number | (() => number); bottom?: number | (() => number) };
  offsetBottom?: number;
  offsetTop?: number;
  spy?: string;
}

type AffixState = "top" | "bottom" | false;

interface JQuery {
  affix(options?: AffixOptions | string): JQuery;
  offset(): { top: number; left: number };
  offset(coordinates: { top?: number; left?: number }): JQuery;
  data(key: string): any;
  data(key: string, value: any): JQuery;
  is(selector: string): boolean;
  height(): number;
  scrollTop(): number;
  on(events: string, handler: (event: any) => void): JQuery;
  off(events: string): JQuery;
  removeClass(className: string): JQuery;
  addClass(className: string): JQuery;
  trigger(eventType: string | Event): JQuery;
  each(callback: (index: number, element: HTMLElement) => void): JQuery;
  css(propertyName: string, value: string): JQuery;
  extend(...objects: any[]): any;
  proxy(fn: Function, context: any): Function;
  Event(type: string): Event & { isDefaultPrevented(): boolean };
}

interface Event {
  isDefaultPrevented(): boolean;
}

declare const jQuery: ((selector: any) => JQuery) & {
  fn: { affix: any };
  extend(...objects: any[]): any;
  proxy(fn: Function, context: any): Function;
  Event(type: string): Event;
};

class Affix {
  static readonly VERSION = "3.3.7";
  static readonly RESET = "affix affix-top affix-bottom";
  static readonly DEFAULTS: AffixOptions = {
    offset: 0,
    target: window
  };

  private options: AffixOptions;
  private $target: JQuery;
  private $element: JQuery;
  private affixed: AffixState | null;
  private unpin: number | null;
  private pinnedOffset: number | null;

  constructor(element: HTMLElement, options?: AffixOptions) {
    this.options = jQuery.extend({}, Affix.DEFAULTS, options);
    this.$target = jQuery(this.options.target)
      .on("scroll.bs.affix.data-api", jQuery.proxy(this.checkPosition, this))
      .on("click.bs.affix.data-api", jQuery.proxy(this.checkPositionWithEventLoop, this));
    this.$element = jQuery(element);
    this.affixed = null;
    this.unpin = null;
    this.pinnedOffset = null;
    this.checkPosition();
  }

  getState(
    scrollHeight: number,
    elementHeight: number,
    offsetTop: number | null,
    offsetBottom: number | null
  ): AffixState {
    const scrollTop = this.$target.scrollTop();
    const elementOffset = this.$element.offset();
    const targetHeight = this.$target.height();

    if (offsetTop !== null && this.affixed === "top") {
      return scrollTop < offsetTop && "top";
    }

    if (this.affixed === "bottom") {
      if (offsetTop !== null) {
        return !(scrollTop + this.unpin! <= elementOffset.top) && "bottom";
      }
      return !(scrollTop + targetHeight <= scrollHeight - offsetBottom!) && "bottom";
    }

    const initializing = this.affixed === null;
    const elementOffsetTop = initializing ? scrollTop : elementOffset.top;

    if (offsetTop !== null && scrollTop <= offsetTop) {
      return "top";
    }

    if (
      offsetBottom !== null &&
      elementOffsetTop + (initializing ? targetHeight : elementHeight) >= scrollHeight - offsetBottom
    ) {
      return "bottom";
    }

    return false;
  }

  getPinnedOffset(): number {
    if (this.pinnedOffset) {
      return this.pinnedOffset;
    }

    this.$element.removeClass(Affix.RESET).addClass("affix");
    const scrollTop = this.$target.scrollTop();
    const elementOffset = this.$element.offset();
    this.pinnedOffset = elementOffset.top - scrollTop;

    return this.pinnedOffset;
  }

  checkPositionWithEventLoop(): void {
    setTimeout(jQuery.proxy(this.checkPosition, this), 1);
  }

  checkPosition(): void {
    if (!this.$element.is(":visible")) {
      return;
    }

    const elementHeight = this.$element.height();
    let offset = this.options.offset!;
    let offsetTop: number | null = 0;
    let offsetBottom: number | null = 0;
    const scrollHeight = Math.max(
      jQuery(document).height(),
      jQuery(document.body).height()
    );

    if (typeof offset !== "object") {
      offsetBottom = offsetTop = offset;
    } else {
      const offsetObj = offset as { top?: number | (() => number); bottom?: number | (() => number) };
      offsetTop = offsetObj.top ?? 0;
      offsetBottom = offsetObj.bottom ?? 0;
    }

    if (typeof offsetTop === "function") {
      offsetTop = (offset as any).top(this.$element);
    }

    if (typeof offsetBottom === "function") {
      offsetBottom = (offset as any).bottom(this.$element);
    }

    const affixState = this.getState(scrollHeight, elementHeight, offsetTop, offsetBottom);

    if (this.affixed !== affixState) {
      if (this.unpin !== null) {
        this.$element.css("top", "");
      }

      const affixType = "affix" + (affixState ? "-" + affixState : "");
      const event = jQuery.Event(affixType + ".bs.affix");

      this.$element.trigger(event);

      if (event.isDefaultPrevented()) {
        return;
      }

      this.affixed = affixState;
      this.unpin = affixState === "bottom" ? this.getPinnedOffset() : null;

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace("affix", "affixed") + ".bs.affix");
    }

    if (affixState === "bottom") {
      this.$element.offset({
        top: scrollHeight - elementHeight - offsetBottom!
      });
    }
  }
}

function affixPlugin(this: JQuery, config?: AffixOptions | string): JQuery {
  return this.each(function (this: HTMLElement) {
    const $element = jQuery(this);
    let data = $element.data("bs.affix") as Affix | undefined;
    const options = typeof config === "object" ? config : undefined;

    if (!data) {
      data = new Affix(this, options);
      $element.data("bs.affix", data);
    }

    if (typeof config === "string") {
      (data as any)[config]();
    }
  });
}

const oldAffix = jQuery.fn.affix;

jQuery.fn.affix = affixPlugin;
(jQuery.fn.affix as any).Constructor = Affix;
(jQuery.fn.affix as any).noConflict = function (): typeof affixPlugin {
  jQuery.fn.affix = oldAffix;
  return affixPlugin;
};

jQuery(window).on("load", function () {
  jQuery('[data-spy="affix"]').each(function (this: HTMLElement) {
    const $element = jQuery(this);
    const data = $element.data() as AffixData;

    data.offset = data.offset ?? {};

    if (data.offsetBottom !== null && data.offsetBottom !== undefined) {
      (data.offset as any).bottom = data.offsetBottom;
    }

    if (data.offsetTop !== null && data.offsetTop !== undefined) {
      (data.offset as any).top = data.offsetTop;
    }

    affixPlugin.call($element, data);
  });
});