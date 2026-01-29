import { Constraint } from './constraint';

/**
 * 表示方程约束的接口，用于描述输入输出变量
 */
interface EquationVariable {
  /** 变量的唯一标识符 */
  id: string;
  /** 变量的本地标识符 */
  localId: string;
  /** 变量的当前值 */
  value: number | string | unknown;
}

/**
 * 方程约束初始化数据接口
 */
interface EquationConstraintInitData {
  /** 本地标识符 */
  localId: string;
  /** 约束类型 */
  type: string;
  /** 方程表达式字符串 */
  equation: string;
}

/**
 * 方程约束序列化数据接口
 */
interface EquationConstraintDumpData {
  /** 方程相关变量 */
  equationVariables: {
    /** 方程表达式 */
    equation: string;
    /** 是否为赋值表达式 */
    isAssignmentExpression: boolean;
  };
}

/**
 * 变量映射表类型，key为变量id，value为变量对象
 */
type VariableMap = Record<string, EquationVariable>;

/**
 * 方程约束类
 * 
 * 用于处理基于方程的约束关系，支持解析JavaScript表达式，
 * 自动识别输入输出变量，并执行方程计算。
 * 
 * @extends Constraint
 * 
 * @example
 * ```typescript
 * const variables: VariableMap = {
 *   'width': { id: 'width', localId: 'w', value: 100 },
 *   'height': { id: 'height', localId: 'h', value: 50 },
 *   'area': { id: 'area', localId: 'a', value: 0 }
 * };
 * 
 * const constraint = new EquationConstraint({
 *   localId: 'eq1',
 *   type: 'equation',
 *   equation: 'a = w * h'
 * });
 * 
 * constraint.solve(variables); // area.value = 5000
 * ```
 */
declare class EquationConstraint extends Constraint {
  constructor(data: EquationConstraintInitData);
  
  solve(variables: VariableMap): void;
  dump(): EquationConstraintDumpData;
}

export { EquationVariable, EquationConstraintInitData, EquationConstraintDumpData, VariableMap, EquationConstraint };