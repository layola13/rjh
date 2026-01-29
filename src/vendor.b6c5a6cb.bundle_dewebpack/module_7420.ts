interface PopoverOptions {
  placement?: string;
  trigger?: string;
  content?: string | ((this: Element) => string);
  template?: string;
  html?: boolean;
}

interface TooltipConstructor {
  DEFAULTS: Record<string, unknown>;
  prototype: {
    init(type: string, element: Element, options: PopoverOptions): void;
    tip(): JQuery;
    getTitle(): string;
    $arrow?: JQuery;
    $element: JQuery;
    options: PopoverOptions;
  };
}

interface JQuery {
  data(key: string): Popover | undefined;
  data(key: string, value: Popover): JQuery;
  attr(name: string): string | undefined;
  find(selector: string): JQuery;
  html(): string;
  html(content: string): JQuery;
  text(content: string): JQuery;
  append(content: string | JQuery): JQuery;
  children(): JQuery;
  detach(): JQuery;
  end(): JQuery;
  removeClass(classNames: string): JQuery;
  hide(): JQuery;
  each(callback: (this: Element, index: number, element: Element) => void): JQuery;
  tooltip?: {
    Constructor: TooltipConstructor;
  };
  popover?: PopoverPlugin;
}

interface JQueryStatic {
  (selector: string | Element): JQuery;
  fn: {
    tooltip?: {
      Constructor: TooltipConstructor;
    };
    popover?: PopoverPlugin;
  };
  extend<T, U>(target: T, source: U): T & U;
  extend<T, U, V>(target: T, source1: U, source2: V): T & U & V;
}

interface PopoverPlugin {
  (options?: PopoverOptions | string): JQuery;
  Constructor: typeof Popover;
  noConflict(): PopoverPlugin;
}

declare const jQuery: JQueryStatic;

class Popover {
  static readonly VERSION = "3.3.7";
  
  static readonly DEFAULTS: PopoverOptions = {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  };

  $element!: JQuery;
  options!: PopoverOptions;
  $arrow?: JQuery;

  constructor(element: Element, options: PopoverOptions) {
    this.init("popover", element, options);
  }

  init!: (type: string, element: Element, options: PopoverOptions) => void;
  tip!: () => JQuery;
  getTitle!: () => string;

  getDefaults(): PopoverOptions {
    return Popover.DEFAULTS;
  }

  setContent(): void {
    const tip = this.tip();
    const title = this.getTitle();
    const content = this.getContent();

    tip.find(".popover-title")[this.options.html ? "html" : "text"](title);
    
    const contentElement = tip.find(".popover-content").children().detach().end();
    if (this.options.html) {
      contentElement[typeof content === "string" ? "html" : "append"](content);
    } else {
      contentElement.text(content as string);
    }

    tip.removeClass("fade top bottom left right in");

    if (!tip.find(".popover-title").html()) {
      tip.find(".popover-title").hide();
    }
  }

  hasContent(): boolean {
    return !!(this.getTitle() || this.getContent());
  }

  getContent(): string {
    const element = this.$element;
    const options = this.options;

    return element.attr("data-content") || 
           (typeof options.content === "function" 
             ? options.content.call(element[0]) 
             : options.content) || 
           "";
  }

  arrow(): JQuery {
    return this.$arrow = this.$arrow || this.tip().find(".arrow");
  }
}

if (!jQuery.fn.tooltip) {
  throw new Error("Popover requires tooltip.js");
}

const tooltipConstructor = jQuery.fn.tooltip.Constructor;
Popover.DEFAULTS = jQuery.extend({}, tooltipConstructor.DEFAULTS, Popover.DEFAULTS);
Object.setPrototypeOf(Popover.prototype, tooltipConstructor.prototype);
Popover.prototype.constructor = Popover;

const originalPopover = jQuery.fn.popover;

const popoverPlugin: PopoverPlugin = function(this: JQuery, options?: PopoverOptions | string): JQuery {
  return this.each(function(this: Element): void {
    const $element = jQuery(this);
    let popover = $element.data("bs.popover");
    const config = typeof options === "object" ? options : undefined;

    if (!popover && typeof options === "string" && /destroy|hide/.test(options)) {
      return;
    }

    if (!popover) {
      popover = new Popover(this, config!);
      $element.data("bs.popover", popover);
    }

    if (typeof options === "string") {
      (popover as any)[options]();
    }
  });
};

popoverPlugin.Constructor = Popover;
popoverPlugin.noConflict = function(): PopoverPlugin {
  jQuery.fn.popover = originalPopover;
  return popoverPlugin;
};

jQuery.fn.popover = popoverPlugin;

export default Popover;