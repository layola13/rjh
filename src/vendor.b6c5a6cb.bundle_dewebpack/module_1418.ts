const DROPDOWN_TOGGLE_SELECTOR = '[data-toggle="dropdown"]';

interface DropdownEventData {
  relatedTarget: HTMLElement;
}

interface JQuery {
  dropdown(option?: string): JQuery;
}

class Dropdown {
  static readonly VERSION = "3.3.7";

  constructor(element: HTMLElement) {
    $(element).on("click.bs.dropdown", this.toggle);
  }

  toggle(event: JQuery.Event): boolean {
    const $trigger = $(event.currentTarget as HTMLElement);
    
    if ($trigger.is(".disabled, :disabled")) {
      return false;
    }

    const $parent = getParent($trigger);
    const isOpen = $parent.hasClass("open");

    clearMenus();

    if (!isOpen) {
      if ("ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length) {
        $(document.createElement("div"))
          .addClass("dropdown-backdrop")
          .insertAfter($trigger)
          .on("click", clearMenus);
      }

      const eventData: DropdownEventData = {
        relatedTarget: event.currentTarget as HTMLElement
      };

      const showEvent = $.Event("show.bs.dropdown", eventData);
      $parent.trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return false;
      }

      $trigger
        .trigger("focus")
        .attr("aria-expanded", "true");

      $parent
        .toggleClass("open")
        .trigger($.Event("shown.bs.dropdown", eventData));
    }

    return false;
  }

  keydown(event: JQuery.KeyboardEvent): void {
    const KEY_UP = 38;
    const KEY_DOWN = 40;
    const KEY_ESC = 27;
    const KEY_SPACE = 32;

    if (!/(38|40|27|32)/.test(String(event.which)) || /input|textarea/i.test((event.target as HTMLElement).tagName)) {
      return;
    }

    const $trigger = $(event.currentTarget as HTMLElement);

    event.preventDefault();
    event.stopPropagation();

    if ($trigger.is(".disabled, :disabled")) {
      return;
    }

    const $parent = getParent($trigger);
    const isOpen = $parent.hasClass("open");

    if ((!isOpen && event.which !== KEY_ESC) || (isOpen && event.which === KEY_ESC)) {
      if (event.which === KEY_ESC) {
        $parent.find(DROPDOWN_TOGGLE_SELECTOR).trigger("focus");
      }
      $trigger.trigger("click");
      return;
    }

    const $items = $parent.find(".dropdown-menu li:not(.disabled):visible a");

    if (!$items.length) {
      return;
    }

    let index = $items.index(event.target as HTMLElement);

    if (event.which === KEY_UP && index > 0) {
      index--;
    }

    if (event.which === KEY_DOWN && index < $items.length - 1) {
      index++;
    }

    if (index < 0) {
      index = 0;
    }

    $items.eq(index).trigger("focus");
  }
}

function getParent($trigger: JQuery): JQuery {
  let selector = $trigger.attr("data-target");

  if (!selector) {
    selector = $trigger.attr("href");
    selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, "");
  }

  const $parent = selector ? $(selector) : null;

  return $parent && $parent.length ? $parent : $trigger.parent();
}

function clearMenus(event?: JQuery.Event): void {
  if (event && event.which === 3) {
    return;
  }

  $(".dropdown-backdrop").remove();

  $(DROPDOWN_TOGGLE_SELECTOR).each(function() {
    const $trigger = $(this);
    const $parent = getParent($trigger);
    const eventData: DropdownEventData = {
      relatedTarget: this
    };

    if (!$parent.hasClass("open")) {
      return;
    }

    if (event && event.type === "click" && /input|textarea/i.test((event.target as HTMLElement).tagName) && $.contains($parent[0], event.target as HTMLElement)) {
      return;
    }

    const hideEvent = $.Event("hide.bs.dropdown", eventData);
    $parent.trigger(hideEvent);

    if (hideEvent.isDefaultPrevented()) {
      return;
    }

    $trigger.attr("aria-expanded", "false");
    $parent
      .removeClass("open")
      .trigger($.Event("hidden.bs.dropdown", eventData));
  });
}

const originalDropdown = $.fn.dropdown;

$.fn.dropdown = function(option?: string): JQuery {
  return this.each(function() {
    const $element = $(this);
    let data = $element.data("bs.dropdown") as Dropdown | undefined;

    if (!data) {
      data = new Dropdown(this);
      $element.data("bs.dropdown", data);
    }

    if (typeof option === "string") {
      (data as any)[option].call($element);
    }
  });
};

$.fn.dropdown.Constructor = Dropdown;

$.fn.dropdown.noConflict = function(): typeof $.fn.dropdown {
  $.fn.dropdown = originalDropdown;
  return $.fn.dropdown;
};

$(document)
  .on("click.bs.dropdown.data-api", clearMenus)
  .on("click.bs.dropdown.data-api", ".dropdown form", (event: JQuery.Event) => {
    event.stopPropagation();
  })
  .on("click.bs.dropdown.data-api", DROPDOWN_TOGGLE_SELECTOR, Dropdown.prototype.toggle)
  .on("keydown.bs.dropdown.data-api", DROPDOWN_TOGGLE_SELECTOR, Dropdown.prototype.keydown)
  .on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown);