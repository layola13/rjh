function updateAndCommit(this: unknown): void {
  const core = (globalThis as any).HSCore;
  
  if (core?.Util?.Slab?.updateOutdoorLayerSlabs && this && (this as any).tempEdges) {
    core.Util.Slab.updateOutdoorLayerSlabs((this as any).tempEdges);
  }
  
  const eventHandler = (globalThis as any).f;
  if (typeof eventHandler === 'function') {
    const target = (globalThis as any).t;
    eventHandler(target, "onCommit", this, 3)([]);
  }
}