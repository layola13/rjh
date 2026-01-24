/**
 * Parametric stair transaction type definitions
 * Contains constant identifiers for parametric stair operations
 */

/**
 * Transaction types for parametric stair operations
 */
interface ParametricStairTransactions {
  /**
   * Transaction identifier for changing parametric stair properties
   * @remarks Used when modifying existing parametric stair attributes
   */
  readonly ChangeParametricStairProperty: "hsw.transaction.parametricstair.changeparametricstairproperty";
  
  /**
   * Transaction identifier for replacing a parametric stair
   * @remarks Used when completely replacing an existing parametric stair with a new one
   */
  readonly ReplaceParametricStair: "hsw.transaction.parametricstair.replaceparametricstair";
}

/**
 * Frozen object containing parametric stair transaction type constants
 */
declare const ParametricStairTransactions: ParametricStairTransactions;

export default ParametricStairTransactions;