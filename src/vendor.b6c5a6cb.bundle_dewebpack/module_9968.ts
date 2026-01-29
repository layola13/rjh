interface CollapseOptions {
  toggle?: boolean;
  parent?: string | Element;
}

interface JQuery {
  collapse(options?: CollapseOptions | string): JQuery;
}

interface JQueryStatic {
  fn: {
    collapse: {
      (options?: CollapseOptions | string): JQuery;
      Constructor: typeof Collapse;
      noConflict(): JQuery;
    };
  };
}

class Collapse {
  static readonly VERSION = "3.3.7";
  static readonly TRANSITION_DURATION = 350;
  static readonly DEFAULTS: CollapseOptions = {
    toggle: true
  };

  private $element: JQuery;
  private options: CollapseOptions;
  private $trigger: JQuery;
  private transitioning: number | null;
  private $parent?: JQuery;

  constructor(element: Element, options?: CollapseOptions) {
    this.$element = jQuery(element);
    this.options = jQuery.extend({}, Collapse.DEFAULTS, options);
    this.$trigger = jQuery(
      `[data-toggle="collapse"][href="#${element.id}"], [data-toggle="collapse"][data-target="#${element.id}"]`
    );
    this.transitioning = null;

    if (this.options.parent) {
      this.$parent = this.getParent();
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger);
    }

    if (this.options.toggle) {
      this.toggle();
    }
  }

  dimension(): string {
    return this.$element.hasClass("width") ? "width" : "height";
  }

  show(): void {
    if (this.transitioning || this.$element.hasClass("in")) {
      return;
    }

    let startEvent: JQueryEventObject;
    const $actives =
      this.$parent &&
      this.$parent.children(".panel").children(".in, .collapsing");

    if ($actives && $actives.length) {
      const activesData = $actives.data("bs.collapse") as Collapse | undefined;
      if (activesData?.transitioning) {
        return;
      }
    }

    const showEvent = jQuery.Event("show.bs.collapse");
    this.$element.trigger(showEvent);

    if (showEvent.isDefaultPrevented()) {
      return;
    }

    if ($actives && $actives.length) {
      collapsePlugin.call($actives, "hide");
      const activesData = $actives.data("bs.collapse");
      if (!activesData) {
        $actives.data("bs.collapse", null);
      }
    }

    const dimension = this.dimension();
    this.$element
      .removeClass("collapse")
      .addClass("collapsing")
      [dimension](0)
      .attr("aria-expanded", true);

    this.$trigger.removeClass("collapsed").attr("aria-expanded", true);

    this.transitioning = 1;

    const complete = (): void => {
      this.$element
        .removeClass("collapsing")
        .addClass("collapse in")
        [dimension]("");
      this.transitioning = 0;
      this.$element.trigger("shown.bs.collapse");
    };

    if (!(jQuery as any).support.transition) {
      return complete.call(this);
    }

    const scrollSize = jQuery.camelCase(["scroll", dimension].join("-"));
    this.$element
      .one("bsTransitionEnd", jQuery.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
      [dimension]((this.$element[0] as any)[scrollSize]);
  }

  hide(): void {
    if (this.transitioning || !this.$element.hasClass("in")) {
      return;
    }

    const hideEvent = jQuery.Event("hide.bs.collapse");
    this.$element.trigger(hideEvent);

    if (hideEvent.isDefaultPrevented()) {
      return;
    }

    const dimension = this.dimension();
    this.$element[dimension](this.$element[dimension]() as number)[0].offsetHeight;

    this.$element
      .addClass("collapsing")
      .removeClass("collapse in")
      .attr("aria-expanded", false);

    this.$trigger.addClass("collapsed").attr("aria-expanded", false);

    this.transitioning = 1;

    const complete = (): void => {
      this.transitioning = 0;
      this.$element
        .removeClass("collapsing")
        .addClass("collapse")
        .trigger("hidden.bs.collapse");
    };

    if (!(jQuery as any).support.transition) {
      return complete.call(this);
    }

    this.$element[dimension](0)
      .one("bsTransitionEnd", jQuery.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION);
  }

  toggle(): void {
    this[this.$element.hasClass("in") ? "hide" : "show"]();
  }

  getParent(): JQuery {
    return jQuery(this.options.parent!)
      .find(
        `[data-toggle="collapse"][data-parent="${this.options.parent}"]`
      )
      .each(
        jQuery.proxy((index: number, element: Element) => {
          const $element = jQuery(element);
          this.addAriaAndCollapsedClass(
            getTargetFromTrigger($element),
            $element
          );
        }, this)
      )
      .end();
  }

  addAriaAndCollapsedClass($element: JQuery, $trigger: JQuery): void {
    const isOpen = $element.hasClass("in");
    $element.attr("aria-expanded", isOpen);
    $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen);
  }
}

function getTargetFromTrigger($trigger: JQuery): JQuery {
  let href: string | undefined;
  const target =
    $trigger.attr("data-target") ||
    ((href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""));
  return jQuery(target!);
}

function collapsePlugin(
  this: JQuery,
  option?: CollapseOptions | string
): JQuery {
  return this.each(function (this: Element) {
    const $this = jQuery(this);
    let data = $this.data("bs.collapse") as Collapse | undefined;
    const options = jQuery.extend(
      {},
      Collapse.DEFAULTS,
      $this.data(),
      typeof option === "object" ? option : {}
    );

    if (
      !data &&
      options.toggle &&
      typeof option === "string" &&
      /show|hide/.test(option)
    ) {
      options.toggle = false;
    }

    if (!data) {
      data = new Collapse(this, options);
      $this.data("bs.collapse", data);
    }

    if (typeof option === "string") {
      (data as any)[option]();
    }
  });
}

const oldCollapseFn = jQuery.fn.collapse;

jQuery.fn.collapse = collapsePlugin;
jQuery.fn.collapse.Constructor = Collapse;
jQuery.fn.collapse.noConflict = function (): typeof collapsePlugin {
  jQuery.fn.collapse = oldCollapseFn;
  return collapsePlugin;
};

jQuery(document).on(
  "click.bs.collapse.data-api",
  '[data-toggle="collapse"]',
  function (this: Element, event: JQueryEventObject): void {
    const $trigger = jQuery(this);

    if (!$trigger.attr("data-target")) {
      event.preventDefault();
    }

    const $target = getTargetFromTrigger($trigger);
    const data = $target.data("bs.collapse") as Collapse | undefined;
    const option = data ? "toggle" : $trigger.data();

    collapsePlugin.call($target, option);
  }
);