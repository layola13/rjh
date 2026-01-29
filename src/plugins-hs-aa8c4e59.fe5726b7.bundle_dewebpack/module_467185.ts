interface PluginContext {
  app: {
    cmdManager: {
      register(commands: Array<[string, any]>): void;
    };
  };
}

class CameraPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "camera",
      description: "Process camera change commands.",
      dependencies: []
    });
  }

  onActive(context: PluginContext): void {
    context.app.cmdManager.register([
      [HSFPConstants.CommandType.AutoMoveCamera, AutoMoveCameraCommand],
      [HSFPConstants.CommandType.ChangeCameraClip, ChangeCameraClipCommand],
      [HSFPConstants.CommandType.ChangeCameraFov, ChangeCameraFovCommand],
      [HSFPConstants.CommandType.MoveCamera, MoveCameraCommand],
      [HSFPConstants.CommandType.MoveCamera3D, MoveCamera3DCommand],
      [HSFPConstants.CommandType.MoveOrthCamera3D, CmdMoveOrthCamera3D],
      [HSFPConstants.CommandType.MoveCameraClip, MoveCameraClipCommand],
      [HSFPConstants.CommandType.MoveCameraTarget, MoveCameraTargetCommand],
      [HSFPConstants.CommandType.ResetCamera, ResetCameraCommand]
    ]);
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }
}

HSApp.Plugin.registerPlugin("hsw.plugin.Camera.Plugin", CameraPlugin);