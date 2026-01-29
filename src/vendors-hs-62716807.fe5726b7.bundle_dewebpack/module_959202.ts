import { warn } from './logger';

interface WindowWithXHR extends Window {
  __oXMLHttpRequest_?: typeof XMLHttpRequest;
}

const globalWindow: WindowWithXHR | Record<string, never> =
  typeof window === 'object' ? window : {};

const XHRConstructor: typeof XMLHttpRequest | undefined =
  globalWindow.__oXMLHttpRequest_ || globalWindow.XMLHttpRequest;

const SafeXMLHttpRequest: typeof XMLHttpRequest | undefined =
  typeof XHRConstructor === 'function' ? XHRConstructor : undefined;

export function sendLog(data: unknown, url: string): void {
  try {
    if (!SafeXMLHttpRequest) {
      return;
    }

    const xhr = new SafeXMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.send(JSON.stringify(data));
  } catch (error) {
    warn(`[retcode] Failed to log, exception is :\n${error}`);
  }
}