interface JQueryExtension {
  capture(element: JQuery, eventType: string, handler: EventListener): void;
  unbindcapture(element: JQuery, eventType: string, handler: EventListener): void;
}

declare global {
  interface JQuery {
    capture(eventType: string, handler: EventListener): void;
    unbindcapture(eventType: string, handler: EventListener): void;
  }
}

(function(jquery: JQueryExtension & typeof jQuery): void {
  jquery.capture = function(
    element: JQuery,
    eventType: string,
    handler: EventListener
  ): void {
    const nativeElement = element[0];
    
    if (nativeElement.addEventListener) {
      nativeElement.removeEventListener(eventType, handler, true);
      nativeElement.addEventListener(eventType, handler, true);
    } else {
      (nativeElement as any).detachEvent(eventType, handler);
      (nativeElement as any).attachEvent(eventType, handler);
    }
  };

  jquery.unbindcapture = function(
    element: JQuery,
    eventType: string,
    handler: EventListener
  ): void {
    const nativeElement = element[0];
    
    if (nativeElement.addEventListener) {
      nativeElement.removeEventListener(eventType, handler, true);
    } else {
      (nativeElement as any).detachEvent(eventType, handler);
    }
  };
})(jQuery);