import { serialize, noop } from './module_595956';

interface RequestOptions {
  z: number;
  [key: string]: unknown;
}

type RequestInput = string | RequestOptions;

const globalContext = typeof window === 'object' ? window : {};
const originalFetch = (globalContext as any).__oFetch_ || (globalContext as any).fetch;
const fetchFunction = typeof originalFetch === 'function' ? originalFetch : undefined;

export function sendRequest(input: RequestInput, baseUrl: string): Promise<void> | void {
  let requestId = -1;
  let serializedData: string;

  if (typeof input === 'object') {
    requestId = input.z;
    serializedData = serialize(input);
  } else {
    serializedData = input;
  }

  const fullUrl = baseUrl + serializedData;

  if (fetchFunction) {
    return fetchFunction(fullUrl, {
      method: 'HEAD',
      mode: 'no-cors'
    }).catch(noop);
  }

  if (globalContext.document && globalContext.document.createElement) {
    const imageHolderKey = `__request_hold_${requestId}`;
    const imageElement = new Image();
    (globalContext as any)[imageHolderKey] = imageElement;

    imageElement.onload = imageElement.onerror = function (): void {
      (globalContext as any)[imageHolderKey] = undefined;
    };

    imageElement.src = fullUrl;
  }
}

export default sendRequest;