interface JQueryEvent {
  preventDefault: () => void;
  handleObj: {
    namespace?: string;
    origType: string;
    selector?: string;
    handler: EventHandler;
  };
  delegateTarget: Element;
}

type EventHandler = (event: Event) => void | boolean;

type EventMap = Record<string, EventHandler>;

function off(
  this: Element | Element[],
  eventType: string | JQueryEvent | EventMap,
  selector?: string | EventHandler,
  handler?: EventHandler
): Element | Element[] | void {
  let namespace: { namespace?: string; origType: string; selector?: string; handler: EventHandler } | undefined;
  let selectorOrHandler: string | undefined;

  // Handle event object with handleObj property
  if (
    eventType &&
    typeof eventType === 'object' &&
    'preventDefault' in eventType &&
    'handleObj' in eventType
  ) {
    namespace = (eventType as JQueryEvent).handleObj;
    const fullType = namespace.namespace
      ? `${namespace.origType}.${namespace.namespace}`
      : namespace.origType;

    jQuery((eventType as JQueryEvent).delegateTarget).off(
      fullType,
      namespace.selector,
      namespace.handler
    );
    return this;
  }

  // Handle event map object
  if (typeof eventType === 'object' && !('preventDefault' in eventType)) {
    const eventMap = eventType as EventMap;
    for (selectorOrHandler in eventMap) {
      this.off(selectorOrHandler, selector, eventMap[selectorOrHandler]);
    }
    return this;
  }

  // Normalize parameters
  if (selector !== false && typeof selector !== 'function') {
    handler = selector as EventHandler;
    selector = undefined;
  }

  const finalHandler = handler === false ? returnFalse : handler;

  return this.each(function (this: Element) {
    jQuery.event.remove(this, eventType as string, finalHandler, selector as string | undefined);
  });
}

function returnFalse(): boolean {
  return false;
}

// jQuery placeholder type
declare const jQuery: any;
const b = jQuery;