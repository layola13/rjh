interface LinearDimension {
  updateState(state: GizmoInputState, focus: boolean): void;
}

enum GizmoInputState {
  focus = 'focus'
}

class ModuleValue {
  private activeDimIndex: number = 0;
  private readonly linearDimensions: LinearDimension[];

  constructor(linearDimensions: LinearDimension[]) {
    this.linearDimensions = linearDimensions;
  }

  public updateActiveDimension(focus: boolean): void {
    this.activeDimIndex = (this.activeDimIndex + 1) % 2;
    this.linearDimensions[this.activeDimIndex].updateState(GizmoInputState.focus, focus);
  }
}

export { ModuleValue, GizmoInputState, LinearDimension };