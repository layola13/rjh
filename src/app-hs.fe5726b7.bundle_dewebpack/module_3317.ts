export default function insertStyleElement(selector: string, styleElement: HTMLElement): void {
  const targetCache: Record<string, HTMLElement | null> = {};

  const getStyleTarget = (selector: string): HTMLElement | null => {
    if (targetCache[selector] === undefined) {
      let element = document.querySelector(selector);

      if (window.HTMLIFrameElement && element instanceof window.HTMLIFrameElement) {
        try {
          element = element.contentDocument?.head ?? null;
        } catch (error) {
          element = null;
        }
      }

      targetCache[selector] = element as HTMLElement | null;
    }

    return targetCache[selector];
  };

  const target = getStyleTarget(selector);

  if (!target) {
    throw new Error(
      "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
    );
  }

  target.appendChild(styleElement);
}