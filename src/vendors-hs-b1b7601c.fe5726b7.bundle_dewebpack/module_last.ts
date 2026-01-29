function last<T>(this: { get: (index: number) => T; node: { childNodes: ArrayLike<unknown> } }): T {
    return this.get(this.node.childNodes.length - 1);
}