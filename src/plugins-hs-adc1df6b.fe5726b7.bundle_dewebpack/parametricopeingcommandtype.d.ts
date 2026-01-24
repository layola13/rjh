/**
 * Module: ParametricopeingCommandType
 * Original ID: 992586
 * 
 * Defines command types for parametric opening operations in the HSW plugin system.
 */

/**
 * Enum representing command types for parametric opening operations.
 * 
 * @remarks
 * This enum contains command identifiers used by the HSW plugin framework
 * to handle parametric opening hole editing operations.
 */
export enum ParametricopeningCommandType {
  /**
   * Command for editing parametric opening holes.
   * 
   * @remarks
   * Used to trigger the parametric opening hole editor in the HSW plugin.
   */
  CmdEditParametricopeningHole = "hsw.plugin.parametricOpening.CmdEditParametricopeningHole"
}