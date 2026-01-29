class CameraDragCommand extends HSApp.Cmd.Command {
  camera: any;
  saved: {
    x?: number;
    y?: number;
    target_x?: number;
    target_y?: number;
    near?: number;
  };
  signalDragEnd: HSCore.Util.Signal;

  constructor(camera: any) {
    super();
    this.camera = camera;
    this.saved = {};
    this.signalDragEnd = new HSCore.Util.Signal(this);
  }

  moveTo(x: number, y: number): void {
    this.camera.target_x = x;
    this.camera.target_y = y;
  }

  onExecute(): void {
    const cam = this.camera;
    const saved = this.saved;
    saved.x = cam.x;
    saved.y = cam.y;
    saved.target_x = cam.target_x;
    saved.target_y = cam.target_y;
    saved.near = cam.near;
  }

  onReceive(eventType: string, eventData: any): void {
    if (eventType === "dragmove" && eventData.offset && eventData.offset.length > 1) {
      const offset = eventData.offset;
      const offsetVector = new THREE.Vector2(offset[0], offset[1]);
      const saved = this.saved;
      const directionVector = new THREE.Vector2(
        saved.target_x! - saved.x!,
        saved.target_y! - saved.y!
      ).normalize();
      const dotProduct = offsetVector.dot(directionVector);
      const newNear = saved.near! + dotProduct;

      if (newNear > 0.001 && newNear < HSConstants.Constants.FIRSTPERSON_CAMERA_NEAR_MAX) {
        this.camera.near = newNear;
      }
    } else if (eventType === "dragend") {
      this.signalDragEnd.dispatch(this.camera);
      this.mgr.complete();
    } else {
      super.onReceive(eventType, eventData);
    }
  }

  canUndoRedo(): boolean {
    return false;
  }
}

export default CameraDragCommand;