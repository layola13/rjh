interface JQuery {
  data(key: string): any;
  data(key: string, value: any): JQuery;
  closest(selector: string): JQuery;
  parent(selector?: string): JQuery;
  hasClass(className: string): boolean;
  addClass(className: string): JQuery;
  removeClass(className: string): JQuery;
  find(selector: string): JQuery;
  attr(attributeName: string): string | undefined;
  attr(attributeName: string, value: string | boolean): JQuery;
  trigger(event: string | Event): JQuery;
  each(callback: (this: Element) => void): JQuery;
  one(event: string, handler: () => void): JQuery;
  emulateTransitionEnd(duration: number): JQuery;
  on(event: string, selector: string, handler: (event: Event) => void): JQuery;
  length: number;
  [index: number]: Element;
}

interface JQueryStatic {
  (selector: string | Element | Document): JQuery;
  Event(type: string, properties?: Record<string, any>): Event;
  support: {
    transition: boolean;
  };
  fn: Record<string, any>;
}

declare const jQuery: JQueryStatic;

interface Event {
  type: string;
  relatedTarget?: Element;
  isDefaultPrevented(): boolean;
  preventDefault(): void;
}

class Tab {
  static readonly VERSION = "3.3.7";
  static readonly TRANSITION_DURATION = 150;

  private element: JQuery;

  constructor(element: Element) {
    this.element = jQuery(element);
  }

  /**
   * Shows the tab element and activates the associated content
   */
  show(): void {
    const element = this.element;
    const container = element.closest("ul:not(.dropdown-menu)");
    let target = element.data("target") as string | undefined;

    if (!target) {
      const href = element.attr("href");
      target = href?.replace(/.*(?=#[^\s]*$)/, "");
    }

    if (element.parent("li").hasClass("active")) {
      return;
    }

    const previousActive = container.find(".active:last a");
    const hideEvent = jQuery.Event("hide.bs.tab", {
      relatedTarget: element[0]
    });
    const showEvent = jQuery.Event("show.bs.tab", {
      relatedTarget: previousActive[0]
    });

    previousActive.trigger(hideEvent);
    element.trigger(showEvent);

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
      return;
    }

    const targetElement = jQuery(target!);
    
    this.activate(element.closest("li"), container);
    this.activate(targetElement, targetElement.parent(), () => {
      previousActive.trigger({
        type: "hidden.bs.tab",
        relatedTarget: element[0]
      });
      element.trigger({
        type: "shown.bs.tab",
        relatedTarget: previousActive[0]
      });
    });
  }

  /**
   * Activates an element and optionally triggers a callback after transition
   */
  private activate(element: JQuery, container: JQuery, callback?: () => void): void {
    const activeElement = container.find("> .active");
    const hasTransition = 
      callback && 
      jQuery.support.transition && 
      ((activeElement.length && activeElement.hasClass("fade")) || !!container.find("> .fade").length);

    const complete = (): void => {
      activeElement
        .removeClass("active")
        .find("> .dropdown-menu > .active")
        .removeClass("active")
        .end()
        .find('[data-toggle="tab"]')
        .attr("aria-expanded", false);

      element
        .addClass("active")
        .find('[data-toggle="tab"]')
        .attr("aria-expanded", true);

      if (hasTransition) {
        void element[0].offsetWidth;
        element.addClass("in");
      } else {
        element.removeClass("fade");
      }

      if (element.parent(".dropdown-menu").length) {
        element
          .closest("li.dropdown")
          .addClass("active")
          .end()
          .find('[data-toggle="tab"]')
          .attr("aria-expanded", true);
      }

      if (callback) {
        callback();
      }
    };

    if (activeElement.length && hasTransition) {
      activeElement
        .one("bsTransitionEnd", complete)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION);
    } else {
      complete();
    }

    activeElement.removeClass("in");
  }
}

function tabPlugin(this: JQuery, option?: string): JQuery {
  return this.each(function (this: Element) {
    const $element = jQuery(this);
    let data = $element.data("bs.tab") as Tab | undefined;

    if (!data) {
      data = new Tab(this);
      $element.data("bs.tab", data);
    }

    if (typeof option === "string") {
      (data as any)[option]();
    }
  });
}

const originalTabPlugin = jQuery.fn.tab;

jQuery.fn.tab = tabPlugin;
jQuery.fn.tab.Constructor = Tab;
jQuery.fn.tab.noConflict = function (): typeof tabPlugin {
  jQuery.fn.tab = originalTabPlugin;
  return tabPlugin;
};

const clickHandler = function (this: Element, event: Event): void {
  event.preventDefault();
  tabPlugin.call(jQuery(this), "show");
};

jQuery(document)
  .on("click.bs.tab.data-api", '[data-toggle="tab"]', clickHandler)
  .on("click.bs.tab.data-api", '[data-toggle="pill"]', clickHandler);