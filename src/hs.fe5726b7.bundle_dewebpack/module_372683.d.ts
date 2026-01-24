/**
 * Window command type definitions for HSW plugin system
 * @module WindowCommands
 */

/**
 * Window command identifiers for the HSW plugin system.
 * These command strings are used to invoke specific window manipulation operations.
 */
export interface WindowCommands {
  /**
   * Command to toggle the visibility or state of a window sill
   */
  ToggleWindowSill: "hsw.plugin.window.cmd.CmdToggleWindowSill";
  
  /**
   * Command to change the window sill type or configuration
   */
  ChangeWindowSill: "hsw.plugin.window.cmd.CmdChangeWindowSill";
  
  /**
   * Command to modify the window indent/inset distance
   */
  ChangeWindowIndent: "hsw.plugin.window.cmd.CmdChangeWindowIndent";
  
  /**
   * Command to change which side the window sill is positioned on
   */
  ChangeWindowSillSide: "hsw.plugin.window.cmd.CmdChangeWindowSillSide";
  
  /**
   * Command to adjust the extension/protrusion length of the window sill
   */
  ChangeWindowSillExtend: "hsw.plugin.window.cmd.CmdChangeWindowSillExtend";
  
  /**
   * Command to change the side parameter for window pocket configuration
   */
  ChangeParameterPocketSide: "hsw.plugin.window.cmd.CmdChangeParameterPocketSide";
}

/**
 * Readonly frozen object containing all available window command identifiers.
 * Use these constants when invoking window-related commands in the HSW plugin system.
 */
declare const windowCommands: Readonly<WindowCommands>;

export default windowCommands;