interface ScrollbarInstance {
  event: {
    bind: (element: HTMLElement, eventName: string, handler: (event: MouseEvent) => void) => void;
  };
  scrollbarY: HTMLElement;
  scrollbarYRail: HTMLElement;
  scrollbarYTop: number;
  scrollbarX: HTMLElement;
  scrollbarXRail: HTMLElement;
  scrollbarXLeft: number;
  element: HTMLElement;
  containerHeight: number;
  containerWidth: number;
}

function updateScrollbar(instance: ScrollbarInstance): void {
  // Implementation of the update function
  // This would contain the logic from the original 'g' function
}

function initializeClickRail(instance: ScrollbarInstance): void {
  instance.event.bind(instance.scrollbarY, "mousedown", (event: MouseEvent): void => {
    event.stopPropagation();
  });

  instance.event.bind(instance.scrollbarYRail, "mousedown", (event: MouseEvent): void => {
    const clickPosition = event.pageY - window.pageYOffset - instance.scrollbarYRail.getBoundingClientRect().top;
    const scrollDirection = clickPosition > instance.scrollbarYTop ? 1 : -1;
    
    instance.element.scrollTop += scrollDirection * instance.containerHeight;
    updateScrollbar(instance);
    event.stopPropagation();
  });

  instance.event.bind(instance.scrollbarX, "mousedown", (event: MouseEvent): void => {
    event.stopPropagation();
  });

  instance.event.bind(instance.scrollbarXRail, "mousedown", (event: MouseEvent): void => {
    const clickPosition = event.pageX - window.pageXOffset - instance.scrollbarXRail.getBoundingClientRect().left;
    const scrollDirection = clickPosition > instance.scrollbarXLeft ? 1 : -1;
    
    instance.element.scrollLeft += scrollDirection * instance.containerWidth;
    updateScrollbar(instance);
    event.stopPropagation();
  });
}