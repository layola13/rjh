interface PostMessageAPI {
  postMessage(message: string, targetOrigin: string, targetWindow?: Window): void;
  receiveMessage(callback: ((event: MessageEvent) => void) | null, originFilter?: string | ((origin: string) => boolean)): void;
}

let intervalTimer: number | null = null;
let previousHash: string | undefined;
let messageHandler: ((event: MessageEvent) => void) | undefined;
let messageCounter = 1;

const postMessageAPI: PostMessageAPI = {
  postMessage(message: string, targetOrigin: string, targetWindow: Window = parent): void {
    if (!targetOrigin) return;

    if (window.postMessage) {
      const origin = targetOrigin.replace(/([^:]+:\/\/[^\/]+).*/, "$1");
      targetWindow.postMessage(message, origin);
    } else {
      const baseUrl = targetOrigin.replace(/#.*$/, "");
      const timestamp = Date.now();
      targetWindow.location.href = `${baseUrl}#${timestamp}${messageCounter++}&${message}`;
    }
  },

  receiveMessage(callback: ((event: MessageEvent) => void) | null, originFilter?: string | ((origin: string) => boolean)): void {
    if (window.postMessage) {
      if (callback) {
        messageHandler = (event: MessageEvent): void => {
          if (typeof originFilter === "string" && event.origin !== originFilter) {
            return;
          }
          
          if (typeof originFilter === "function" && originFilter(event.origin) === false) {
            return;
          }
          
          callback(event);
        };
      }

      if (window.addEventListener) {
        window[callback ? "addEventListener" : "removeEventListener"]("message", messageHandler as EventListener, false);
      } else {
        (window as any)[callback ? "attachEvent" : "detachEvent"]("onmessage", messageHandler);
      }
    } else {
      if (intervalTimer) {
        clearInterval(intervalTimer);
        intervalTimer = null;
      }

      if (callback) {
        intervalTimer = window.setInterval((): void => {
          const currentHash = document.location.hash;
          const hashPattern = /^#?\d+&/;

          if (currentHash !== previousHash && hashPattern.test(currentHash)) {
            previousHash = currentHash;
            const data = currentHash.replace(hashPattern, "");
            callback({ data } as MessageEvent);
          }
        }, 100);
      }
    }
  }
};

export default postMessageAPI;