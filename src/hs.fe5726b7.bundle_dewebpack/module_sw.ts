function mergeChanges(t: unknown, n: unknown, i: unknown): unknown {
    return e.extend(
        this._change.s.apply(this, arguments),
        this._change.w.apply(this, [t, n, i])
    );
}