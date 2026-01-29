function extendNorthWest(t: number, n: number, i: number): unknown {
    return e.extend(
        this._change.n.apply(this, arguments),
        this._change.w.apply(this, [t, n, i])
    );
}