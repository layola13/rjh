const styleTargetCache: Record<string, HTMLElement | null> = {};

export default function insertStyleElement(
  selector: string,
  styleElement: HTMLElement
): void {
  const targetElement = getStyleTarget(selector);
  
  if (!targetElement) {
    throw new Error(
      "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
    );
  }
  
  targetElement.appendChild(styleElement);
}

function getStyleTarget(selector: string): HTMLElement | null {
  if (styleTargetCache[selector] === undefined) {
    const element = document.querySelector(selector);
    
    if (window.HTMLIFrameElement && element instanceof window.HTMLIFrameElement) {
      try {
        styleTargetCache[selector] = element.contentDocument?.head ?? null;
      } catch (error) {
        styleTargetCache[selector] = null;
      }
    } else {
      styleTargetCache[selector] = element as HTMLElement | null;
    }
  }
  
  return styleTargetCache[selector];
}