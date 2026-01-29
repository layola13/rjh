function createGizmoByName(
  name: string,
  position: unknown,
  rotation: unknown,
  scale: unknown
): unknown {
  return this.context.hscanvas.gizmoManager.createGizmoByName(
    name,
    position,
    rotation,
    scale
  );
}