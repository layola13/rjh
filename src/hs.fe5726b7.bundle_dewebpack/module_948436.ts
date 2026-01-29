/**
 * Camera command type definitions
 */
interface CameraCommands {
  readonly AutoMoveCamera: string;
  readonly ChangeCameraClip: string;
  readonly ChangeCameraFov: string;
  readonly MoveCamera: string;
  readonly MoveCamera3D: string;
  readonly MoveOrthCamera3D: string;
  readonly MoveCameraTarget: string;
  readonly MoveCameraClip: string;
  readonly ResetCamera: string;
}

const cameraCommands: Readonly<CameraCommands> = Object.freeze({
  AutoMoveCamera: "hsw.plugin.camera.CmdAutoMoveCamera",
  ChangeCameraClip: "hsw.plugin.camera.CmdChangeCameraClip",
  ChangeCameraFov: "hsw.plugin.camera.CmdChangeCameraFov",
  MoveCamera: "hsw.plugin.camera.CmdMoveCamera",
  MoveCamera3D: "hsw.plugin.camera.CmdMoveCamera3D",
  MoveOrthCamera3D: "hsw.plugin.camera.CmdMoveOrthCamera3D",
  MoveCameraTarget: "hsw.plugin.camera.CmdMoveCameraTarget",
  MoveCameraClip: "hsw.plugin.camera.CmdMoveCameraClip",
  ResetCamera: "hsw.plugin.camera.CmdResetCamera"
});

export default cameraCommands;