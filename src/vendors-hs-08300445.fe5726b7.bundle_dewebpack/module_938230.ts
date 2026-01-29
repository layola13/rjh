export default function scheduleCallback(callback: () => void): void {
  if (typeof MessageChannel === "undefined") {
    scheduleCallbackFallback(callback);
  } else {
    const channel = new MessageChannel();
    channel.port1.onmessage = (): void => {
      callback();
    };
    channel.port2.postMessage(undefined);
  }
}

import scheduleCallbackFallback from "./scheduleCallbackFallback";