function getSignalHook<T>(this: { _signalHook: T }): T {
    return this._signalHook;
}