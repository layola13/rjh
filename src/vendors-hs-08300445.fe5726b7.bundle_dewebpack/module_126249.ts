interface Point {
  pageX?: number;
  pageY?: number;
  clientX?: number;
  clientY?: number;
}

interface ResizeInfo {
  width: number;
  height: number;
}

type ResizeCallback = (info: ResizeInfo) => void;

type DisconnectFunction = () => void;

/**
 * Checks if two points are equal based on their coordinates
 */
export function isSamePoint(point1: Point | null | undefined, point2: Point | null | undefined): boolean {
  if (point1 === point2) return true;
  if (!point1 || !point2) return false;
  
  if ("pageX" in point2 && "pageY" in point2) {
    return point1.pageX === point2.pageX && point1.pageY === point2.pageY;
  }
  
  if ("clientX" in point2 && "clientY" in point2) {
    return point1.clientX === point2.clientX && point1.clientY === point2.clientY;
  }
  
  return false;
}

/**
 * Monitors element resize and triggers callback when dimensions change
 */
export function monitorResize(element: Element | null, callback: ResizeCallback): DisconnectFunction {
  let previousWidth: number | null = null;
  let previousHeight: number | null = null;
  
  const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    const target = entries[0].target;
    
    if (document.documentElement.contains(target)) {
      const rect = target.getBoundingClientRect();
      const currentWidth = Math.floor(rect.width);
      const currentHeight = Math.floor(rect.height);
      
      if (previousWidth !== currentWidth || previousHeight !== currentHeight) {
        Promise.resolve().then(() => {
          callback({
            width: currentWidth,
            height: currentHeight
          });
        });
        
        previousWidth = currentWidth;
        previousHeight = currentHeight;
      }
    }
  });
  
  if (element) {
    observer.observe(element);
  }
  
  return () => {
    observer.disconnect();
  };
}

/**
 * Restores focus to an element if it's not currently active and is contained within a container
 */
export function restoreFocus(element: HTMLElement, container: Element): void {
  if (element !== document.activeElement && container.contains(element) && typeof element.focus === "function") {
    element.focus();
  }
}