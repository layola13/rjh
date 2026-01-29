function createLinearDimensionGizmo(
  param1: unknown,
  param2: unknown,
  param3: unknown
): unknown {
  return this.context.hscanvas.gizmoManager.createGizmoByName(
    "LinearDimension",
    param1,
    param2,
    param3
  );
}