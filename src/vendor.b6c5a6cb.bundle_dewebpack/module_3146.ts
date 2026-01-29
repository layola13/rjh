interface ScrollSpyOptions {
  offset?: number;
  target?: string;
}

interface JQueryScrollSpyElement extends JQuery {
  scrollspy(options?: ScrollSpyOptions | string): JQueryScrollSpyElement;
}

class ScrollSpy {
  static readonly VERSION: string = "3.3.7";
  static readonly DEFAULTS: ScrollSpyOptions = {
    offset: 10
  };

  private $body: JQuery;
  private $scrollElement: JQuery;
  private options: ScrollSpyOptions;
  private selector: string;
  private offsets: number[];
  private targets: string[];
  private activeTarget: string | null;
  private scrollHeight: number;

  constructor(element: HTMLElement, options?: ScrollSpyOptions) {
    this.$body = $(document.body);
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector = (this.options.target || "") + " .nav li > a";
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.scrollHeight = 0;
    this.$scrollElement.on("scroll.bs.scrollspy", $.proxy(this.process, this));
    this.refresh();
    this.process();
  }

  getScrollHeight(): number {
    return (
      this.$scrollElement[0].scrollHeight ||
      Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    );
  }

  refresh(): void {
    const isWindow = $.isWindow(this.$scrollElement[0]);
    const offsetMethod: "offset" | "position" = isWindow ? "offset" : "position";
    const scrollTop = isWindow ? 0 : this.$scrollElement.scrollTop() as number;

    this.offsets = [];
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();

    this.$body
      .find(this.selector)
      .map(function (this: HTMLElement): [number, string][] | null {
        const $element = $(this);
        const target = $element.data("target") || $element.attr("href");
        const $target = /^#./.test(target) && $(target);
        return $target && $target.length && $target.is(":visible")
          ? [[($target[offsetMethod]() as JQuery.Coordinates).top + scrollTop, target]]
          : null;
      })
      .sort((a: [number, string], b: [number, string]) => a[0] - b[0])
      .each((index: number, item: [number, string]) => {
        this.offsets.push(item[0]);
        this.targets.push(item[1]);
      });
  }

  process(): void {
    const scrollTop = (this.$scrollElement.scrollTop() as number) + this.options.offset!;
    const scrollHeight = this.getScrollHeight();
    const maxScroll = this.options.offset! + scrollHeight - (this.$scrollElement.height() as number);
    const offsets = this.offsets;
    const targets = this.targets;
    const activeTarget = this.activeTarget;

    if (this.scrollHeight !== scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      const target = targets[targets.length - 1];
      if (activeTarget !== target) {
        this.activate(target);
      }
      return;
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null;
      this.clear();
      return;
    }

    for (let i = offsets.length; i--;) {
      const isActiveTarget =
        activeTarget !== targets[i] &&
        scrollTop >= offsets[i] &&
        (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]);

      if (isActiveTarget) {
        this.activate(targets[i]);
      }
    }
  }

  activate(target: string): void {
    this.activeTarget = target;
    this.clear();

    const selector =
      `${this.selector}[data-target="${target}"], ${this.selector}[href="${target}"]`;
    let $active = $(selector).parents("li").addClass("active");

    if ($active.parent(".dropdown-menu").length) {
      $active = $active.closest("li.dropdown").addClass("active");
    }

    $active.trigger("activate.bs.scrollspy");
  }

  clear(): void {
    $(this.selector)
      .parentsUntil(this.options.target, ".active")
      .removeClass("active");
  }
}

function scrollSpyPlugin(this: JQuery, option?: ScrollSpyOptions | string): JQuery {
  return this.each(function (this: HTMLElement) {
    const $element = $(this);
    let data = $element.data("bs.scrollspy") as ScrollSpy | undefined;
    const options = typeof option === "object" && option;

    if (!data) {
      data = new ScrollSpy(this, options);
      $element.data("bs.scrollspy", data);
    }

    if (typeof option === "string") {
      (data as any)[option]();
    }
  });
}

const oldScrollSpy = $.fn.scrollspy;

$.fn.scrollspy = scrollSpyPlugin;
($.fn.scrollspy as any).Constructor = ScrollSpy;
($.fn.scrollspy as any).noConflict = function (): typeof scrollSpyPlugin {
  $.fn.scrollspy = oldScrollSpy;
  return scrollSpyPlugin;
};

$(window).on("load.bs.scrollspy.data-api", () => {
  $('[data-spy="scroll"]').each(function (this: HTMLElement) {
    const $element = $(this);
    scrollSpyPlugin.call($element, $element.data());
  });
});