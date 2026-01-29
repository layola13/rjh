interface JQuery {
  on(events: string, selector: string, handler: (event?: JQueryEventObject) => void): JQuery;
  attr(attributeName: string): string | undefined;
  closest(selector: string): JQuery;
  detach(): JQuery;
  trigger(eventType: string | JQueryEventObject): JQuery;
  remove(): JQuery;
  removeClass(className: string): JQuery;
  hasClass(className: string): boolean;
  one(events: string, handler: () => void): JQuery;
  each(func: (index: number, element: Element) => void): JQuery;
  data(key: string): any;
  data(key: string, value: any): JQuery;
}

interface JQueryEventObject {
  preventDefault(): void;
  isDefaultPrevented(): boolean;
}

interface JQueryStatic {
  (selector: string | Element | Document): JQuery;
  Event(name: string): JQueryEventObject;
  support: {
    transition: boolean;
  };
  fn: {
    alert?: AlertPlugin;
    emulateTransitionEnd?: (duration: number) => JQuery;
  };
}

interface AlertPlugin {
  (option?: string): JQuery;
  Constructor: typeof Alert;
  noConflict: () => AlertPlugin;
}

declare const jQuery: JQueryStatic;

const ALERT_DISMISS_SELECTOR = '[data-dismiss="alert"]';
const TRANSITION_DURATION = 150;
const VERSION = "3.3.7";

class Alert {
  static readonly VERSION: string = VERSION;
  static readonly TRANSITION_DURATION: number = TRANSITION_DURATION;

  constructor(element: Element) {
    jQuery(element).on("click", ALERT_DISMISS_SELECTOR, this.close);
  }

  close(event?: JQueryEventObject): void {
    const $trigger = jQuery(this);
    let selector = $trigger.attr("data-target");

    if (!selector) {
      selector = $trigger.attr("href");
      selector = selector?.replace(/.*(?=#[^\s]*$)/, "");
    }

    const $alert = jQuery(selector === "#" ? [] : selector ?? "");

    if (event) {
      event.preventDefault();
    }

    const $target = $alert.length ? $alert : $trigger.closest(".alert");
    const closeEvent = jQuery.Event("close.bs.alert");
    
    $target.trigger(closeEvent);

    if (closeEvent.isDefaultPrevented()) {
      return;
    }

    $target.removeClass("in");

    const removeElement = (): void => {
      $target.detach().trigger("closed.bs.alert").remove();
    };

    if (jQuery.support.transition && $target.hasClass("fade")) {
      $target
        .one("bsTransitionEnd", removeElement)
        .emulateTransitionEnd?.(TRANSITION_DURATION);
    } else {
      removeElement();
    }
  }
}

const originalAlertPlugin = jQuery.fn.alert;

const alertPlugin: AlertPlugin = function(this: JQuery, option?: string): JQuery {
  return this.each(function(this: Element): void {
    const $element = jQuery(this);
    let data = $element.data("bs.alert") as Alert | undefined;

    if (!data) {
      data = new Alert(this);
      $element.data("bs.alert", data);
    }

    if (typeof option === "string") {
      (data as any)[option].call($element);
    }
  });
} as AlertPlugin;

alertPlugin.Constructor = Alert;
alertPlugin.noConflict = function(): AlertPlugin {
  jQuery.fn.alert = originalAlertPlugin;
  return alertPlugin;
};

jQuery.fn.alert = alertPlugin;

jQuery(document).on("click.bs.alert.data-api", ALERT_DISMISS_SELECTOR, Alert.prototype.close);