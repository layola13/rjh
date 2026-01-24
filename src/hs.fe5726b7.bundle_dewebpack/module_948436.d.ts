/**
 * Camera command constants for HSW plugin system.
 * These commands are used to control camera behavior in the 3D scene.
 * @module CameraCommands
 */

/**
 * Available camera control commands.
 * All command strings follow the pattern: hsw.plugin.camera.Cmd[CommandName]
 */
export interface CameraCommands {
  /**
   * Command to automatically move the camera along a predefined path or to a target.
   */
  readonly AutoMoveCamera: "hsw.plugin.camera.CmdAutoMoveCamera";
  
  /**
   * Command to change the camera's near and far clipping planes.
   */
  readonly ChangeCameraClip: "hsw.plugin.camera.CmdChangeCameraClip";
  
  /**
   * Command to change the camera's field of view (FOV).
   */
  readonly ChangeCameraFov: "hsw.plugin.camera.CmdChangeCameraFov";
  
  /**
   * Command to move the camera to a new position (2D or basic movement).
   */
  readonly MoveCamera: "hsw.plugin.camera.CmdMoveCamera";
  
  /**
   * Command to move the camera in 3D space (perspective camera).
   */
  readonly MoveCamera3D: "hsw.plugin.camera.CmdMoveCamera3D";
  
  /**
   * Command to move an orthographic camera in 3D space.
   */
  readonly MoveOrthCamera3D: "hsw.plugin.camera.CmdMoveOrthCamera3D";
  
  /**
   * Command to move the camera's look-at target point.
   */
  readonly MoveCameraTarget: "hsw.plugin.camera.CmdMoveCameraTarget";
  
  /**
   * Command to animate or adjust the camera's clipping planes.
   */
  readonly MoveCameraClip: "hsw.plugin.camera.CmdMoveCameraClip";
  
  /**
   * Command to reset the camera to its default position and settings.
   */
  readonly ResetCamera: "hsw.plugin.camera.CmdResetCamera";
}

/**
 * Frozen object containing all camera command constants.
 * Use these constants when dispatching camera control commands.
 * 
 * @example
 *