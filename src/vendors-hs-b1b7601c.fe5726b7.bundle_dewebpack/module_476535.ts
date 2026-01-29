interface StyleTargetCache {
  [selector: string]: HTMLElement | null;
}

const styleTargetCache: StyleTargetCache = {};

function getStyleTarget(selector: string): HTMLElement | null {
  if (styleTargetCache[selector] === undefined) {
    let element: HTMLElement | null = document.querySelector(selector);
    
    if (window.HTMLIFrameElement && element instanceof window.HTMLIFrameElement) {
      try {
        element = element.contentDocument?.head ?? null;
      } catch (error) {
        element = null;
      }
    }
    
    styleTargetCache[selector] = element;
  }
  
  return styleTargetCache[selector];
}

export default function insertStyleElement(
  selector: string,
  styleElement: HTMLElement
): void {
  const target = getStyleTarget(selector);
  
  if (!target) {
    throw new Error(
      "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
    );
  }
  
  target.appendChild(styleElement);
}