interface JQueryEvent {
  preventDefault: () => void;
  handleObj: EventHandleObject;
  delegateTarget: Element;
}

interface EventHandleObject {
  namespace: string;
  origType: string;
  selector: string;
  handler: EventHandler;
}

type EventHandler = (event: Event) => void | boolean;

type EventMap = Record<string, EventHandler>;

function off(
  eventOrMap: string | JQueryEvent | EventMap,
  selectorOrHandler?: string | EventHandler,
  handler?: EventHandler
): any {
  let handleObj: EventHandleObject;
  let eventName: string;

  // Handle jQuery event object with handleObj
  if (
    eventOrMap &&
    typeof eventOrMap === 'object' &&
    'preventDefault' in eventOrMap &&
    'handleObj' in eventOrMap
  ) {
    handleObj = eventOrMap.handleObj;
    const fullEventType = handleObj.namespace
      ? `${handleObj.origType}.${handleObj.namespace}`
      : handleObj.origType;

    jQuery(eventOrMap.delegateTarget).off(
      fullEventType,
      handleObj.selector,
      handleObj.handler
    );
    return this;
  }

  // Handle event map object
  if (typeof eventOrMap === 'object') {
    for (eventName in eventOrMap) {
      this.off(eventName, selectorOrHandler, (eventOrMap as EventMap)[eventName]);
    }
    return this;
  }

  // Normalize parameters
  if (selectorOrHandler === false || typeof selectorOrHandler === 'function') {
    handler = selectorOrHandler as EventHandler;
    selectorOrHandler = undefined;
  }

  if (handler === false) {
    handler = returnFalse;
  }

  return this.each(function (this: Element): void {
    jQuery.event.remove(
      this,
      eventOrMap as string,
      handler,
      selectorOrHandler as string | undefined
    );
  });
}

function returnFalse(): boolean {
  return false;
}

// jQuery placeholder (assuming global jQuery object exists)
declare const jQuery: any;
const b = jQuery;
const St = returnFalse;