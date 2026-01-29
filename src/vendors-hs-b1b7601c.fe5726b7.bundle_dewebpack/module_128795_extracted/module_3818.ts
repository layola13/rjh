import { getNative } from './getNative';

export const nativePromise = getNative(globalThis, 'Promise');