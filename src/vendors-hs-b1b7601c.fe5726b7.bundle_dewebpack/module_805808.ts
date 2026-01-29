interface ImmediateHandle {
  id: number;
  callback: (...args: unknown[]) => void;
}

interface ImmediateDelegate {
  setImmediate?: (...args: unknown[]) => ImmediateHandle | number;
  clearImmediate?: (handle: ImmediateHandle | number) => void;
}

interface ImmediateProvider {
  setImmediate: (...args: unknown[]) => ImmediateHandle | number;
  clearImmediate: (handle: ImmediateHandle | number) => void;
  delegate?: ImmediateDelegate;
}

import { Immediate } from './Immediate';

const nativeSetImmediate = Immediate.setImmediate;
const nativeClearImmediate = Immediate.clearImmediate;

export const immediateProvider: ImmediateProvider = {
  setImmediate(...args: unknown[]): ImmediateHandle | number {
    const delegate = immediateProvider.delegate;
    const setImmediateFn = delegate?.setImmediate ?? nativeSetImmediate;
    return setImmediateFn(...args);
  },

  clearImmediate(handle: ImmediateHandle | number): void {
    const delegate = immediateProvider.delegate;
    const clearImmediateFn = delegate?.clearImmediate ?? nativeClearImmediate;
    clearImmediateFn(handle);
  },

  delegate: undefined
};