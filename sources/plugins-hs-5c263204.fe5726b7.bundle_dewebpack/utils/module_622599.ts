export function handleQueryDomProcess(
  selector: string,
  delay?: number
): Promise<Element | null> {
  let startTimestamp = 0;

  return new Promise<Element | null>((resolve, reject) => {
    const checkElement = (currentTimestamp: number): void => {
      if (!startTimestamp) {
        startTimestamp = currentTimestamp;
      }

      if (selector) {
        const element = document.querySelector(selector);
        const elapsedTime = currentTimestamp - startTimestamp;
        const TIMEOUT_MS = 10000;

        if (elapsedTime >= TIMEOUT_MS) {
          resolve(element);
        } else {
          const rect = element?.getBoundingClientRect();

          if (element && rect?.width) {
            const timeoutId = setTimeout(() => {
              resolve(element);
              clearTimeout(timeoutId);
            }, delay || 0);
          } else {
            window.requestIdleCallback(checkElement);
          }
        }
      }
    };

    window.requestIdleCallback(checkElement);
  });
}