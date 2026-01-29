interface TransitionSupport {
  end: string;
}

interface JQuerySupport {
  transition: TransitionSupport | false;
}

interface JQuery {
  emulateTransitionEnd(duration: number): this;
}

declare global {
  interface JQuery {
    support: JQuerySupport;
  }
}

function initializeBootstrapTransitions($: JQueryStatic): void {
  $.fn.emulateTransitionEnd = function(duration: number): JQuery {
    let transitionComplete = false;
    const element = this;

    $(this).one("bsTransitionEnd", (): void => {
      transitionComplete = true;
    });

    setTimeout((): void => {
      if (!transitionComplete) {
        $(element).trigger($.support.transition.end);
      }
    }, duration);

    return this;
  };

  $((): void => {
    $.support.transition = detectTransitionSupport();

    if ($.support.transition) {
      $.event.special.bsTransitionEnd = {
        bindType: $.support.transition.end,
        delegateType: $.support.transition.end,
        handle(event: JQuery.TriggeredEvent): any {
          if ($(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments);
          }
        }
      };
    }
  });
}

function detectTransitionSupport(): TransitionSupport | false {
  const element = document.createElement("bootstrap");
  const transitionEventMap: Record<string, string> = {
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd otransitionend",
    transition: "transitionend"
  };

  for (const transitionProperty in transitionEventMap) {
    if (element.style[transitionProperty as any] !== undefined) {
      return {
        end: transitionEventMap[transitionProperty]
      };
    }
  }

  return false;
}

initializeBootstrapTransitions(jQuery);