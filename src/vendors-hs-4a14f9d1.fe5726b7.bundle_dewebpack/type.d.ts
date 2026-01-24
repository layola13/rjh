/**
 * 表达式操作符类型定义
 */
export enum ExpressionOperatorType {
  PUSH = 0,
  PUSH_UNDEFINED = 1,
  PUSH_NULL = 2,
  PUSH_FAILED = 3,
  PUSH_EMPTY_ARRAY = 4,
  PUSH_CURR_POS = 5,
  POP = 6,
  POP_CURR_POS = 7,
  POP_N = 8,
  NIP = 9,
  APPEND = 10,
  WRAP = 11,
  TEXT = 12,
  IF = 13,
  IF_ERROR = 14,
  IF_NOT_ERROR = 15,
  WHILE_NOT_ERROR = 16,
  MATCH_ANY = 17,
  MATCH_STRING = 18,
  MATCH_STRING_IC = 19,
  MATCH_REGEXP = 20,
  ACCEPT_N = 21,
  ACCEPT_STRING = 22,
  FAIL = 23,
  LOAD_SAVED_POS = 24,
  UPDATE_SAVED_POS = 25,
  CALL = 26,
  RULE = 27,
  SILENT_FAILS_ON = 28,
  SILENT_FAILS_OFF = 29
}

/**
 * 数据类型枚举
 */
export enum DataType {
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  STRING = "STRING",
  UUID = "UUID",
  MATERIAL = "MATERIAL",
  PROFILE = "PROFILE",
  ANY = "ANY"
}

/**
 * 变量值类型枚举
 */
export enum EN_VARIABLE_VALUE_TYPE {
  FLOAT = "FLOAT",
  INTEGER = "INTEGER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  MATERIIAL = "MATERIIAL",
  PROFILE = "PROFILE"
}

/**
 * 变量类型枚举
 */
export enum EN_VARIABLE_TYPE {
  SYSTEM_VARIABLE = "SYSTEM_VARIABLE",
  CUSTOM_VARIABLE = "CUSTOM_VAIABLE",
  MIDDLE_VARIABLE = "MIDDLE_VARIABLE",
  MESURE_VARIABLE = "MESURE_VARIABLE"
}

/**
 * 变量限制类型枚举
 */
export enum EN_VARIABLE_LIMIT_TYPE {
  NONE = "NONE",
  INTERVAL = "INTERVAL",
  OPTIONS = "OPTIONS",
  INCREMENT = "INCREMENT",
  FIXED = "FIXED",
  EXPRESSION = "EXPRESSION"
}

/**
 * 操作符定义接口
 */
export interface IOperator<TOperand = unknown, TReturn = unknown> {
  operator: string;
  operandTypes: DataType[];
  returnType: DataType;
  compute: (...args: TOperand[]) => TReturn;
  toJS: (...args: string[]) => string;
}

/**
 * 函数定义接口
 */
export interface IFunctionDefinition {
  name: string;
  returnType: DataType;
  argTypes: DataType[] | ((index: number) => DataType);
  argsNum?: number | ((count: number) => boolean);
  compute: (...args: unknown[]) => unknown;
  toJS: (...args: string[]) => string;
}

/**
 * 验证结果接口
 */
export interface IValidateResult {
  isValid: boolean;
  value?: unknown;
  errorMsg?: string;
}

/**
 * 变量参数接口
 */
export interface IVariableParams {
  variableType: EN_VARIABLE_TYPE;
  name: string;
  valueType: EN_VARIABLE_VALUE_TYPE;
  expression: string;
  limitType?: EN_VARIABLE_LIMIT_TYPE;
  defaultLimitType?: EN_VARIABLE_LIMIT_TYPE;
  friendlyName?: string;
  expressionName?: string;
  step?: number;
  options?: number[];
  description?: string;
  unit?: string;
}

/**
 * 变量编辑参数接口
 */
export interface IVariableEditParams extends Partial<IVariableParams> {
  name: string;
  minValue?: string;
  maxValue?: string;
  v0?: string;
}

/**
 * AST节点基础接口
 */
export interface IASTNode {
  type: string;
  location?: ILocation;
}

/**
 * 位置信息接口
 */
export interface ILocation {
  start: { offset: number; line: number; column: number };
  end: { offset: number; line: number; column: number };
}

/**
 * 字面量节点
 */
export interface ILiteralNode extends IASTNode {
  type: "Literal";
  value: unknown;
}

/**
 * 标识符节点
 */
export interface IIdentifierNode extends IASTNode {
  type: "Identifier";
  name: string;
}

/**
 * 二元表达式节点
 */
export interface IBinaryExpressionNode extends IASTNode {
  type: "BinaryExpression" | "LogicalExpression";
  operator: string;
  left: IASTNode;
  right: IASTNode;
}

/**
 * 条件表达式节点
 */
export interface IConditionalExpressionNode extends IASTNode {
  type: "ConditionalExpression";
  test: IASTNode;
  consequent: IASTNode;
  alternate: IASTNode;
}

/**
 * 一元表达式节点
 */
export interface IUnaryExpressionNode extends IASTNode {
  type: "UnaryExpression";
  operator: string;
  argument: IASTNode;
  prefix: boolean;
}

/**
 * 函数调用节点
 */
export interface ICallExpressionNode extends IASTNode {
  type: "CallExpression";
  callee: IIdentifierNode;
  arguments: IASTNode[];
}

/**
 * 数据库属性表达式类
 */
export declare class DBPropertyExpression {
  constructor(type: EN_VARIABLE_VALUE_TYPE, statement: string);
  dump(): { type: EN_VARIABLE_VALUE_TYPE; statement: string; value?: unknown };
  load(params?: Partial<{ type: EN_VARIABLE_VALUE_TYPE; statement: string }>): this;
  clone(): DBPropertyExpression;
  getIdentifiers(): string[];
  parseExpression(getter: (name: string) => unknown): boolean;
  getValueObj(): unknown;
  getValue(): unknown;
  toJS(): string;
  getStatement(): string;
  getType(): EN_VARIABLE_VALUE_TYPE;
  isLiteral(): boolean;
  setStatement(statement: string): boolean;
}

/**
 * 变量元素类
 */
export declare class VariableElement {
  init(params: IVariableParams): void;
  initMesure(gnodeKeys: unknown[]): void;
  edit(params: IVariableEditParams): void;
  isLiteral(): boolean;
  readonly variableType: EN_VARIABLE_TYPE;
  readonly expression: DBPropertyExpression;
  readonly friendlyName: string;
  readonly valueType: EN_VARIABLE_VALUE_TYPE;
  readonly limitType: EN_VARIABLE_LIMIT_TYPE;
  readonly defaultLimitType: EN_VARIABLE_LIMIT_TYPE;
  readonly expressionName: string;
  readonly minMaxValue: [number, number];
  clearV0(): void;
  readonly v0: number | undefined;
  readonly expressionStatement: string;
  readonly statementValue: unknown;
  readonly step: number;
  readonly options: number[];
  readonly description: string;
  readonly unit: string;
  update(): void;
  shouldShowInViewStatic(): boolean;
  getDependentSeekIds(): string[] | undefined;
}

/**
 * 从属表达式元素类
 */
export declare class SlaveExpressionElement {
  init(
    masterId: unknown,
    propertyName: string,
    valueType: EN_VARIABLE_VALUE_TYPE,
    statement: string,
    secondaryKey?: string
  ): this;
  shouldShowInViewStatic(): boolean;
  onLoad(): void;
  getMasterId(): unknown;
  registerMaster(masterId: unknown): void;
  getMaster(): unknown;
  getMasterPropertyName(): string;
  getPropertyNameSecondKey(): string;
  getExpression(): DBPropertyExpression;
  setExpression(
    valueType: EN_VARIABLE_VALUE_TYPE,
    statement: string,
    secondaryKey?: string
  ): void;
  registerCalculatorForMaster(): void;
  clearCalculatorForMaster(): void;
  clone(): SlaveExpressionElement;
  update(): void;
}

/**
 * 从属表达式元素工具类
 */
export declare class SlaveExpressionElementUtil {
  static updateExpression(
    doc: unknown,
    elementId: unknown,
    propertyName: string,
    valueType: EN_VARIABLE_VALUE_TYPE,
    statement: string,
    secondaryKey?: string
  ): void;
  static deleteExpression(element: SlaveExpressionElement): void;
  static getExpression(
    doc: unknown,
    elementId: unknown,
    propertyName: string,
    secondaryKey?: string
  ): DBPropertyExpression | undefined;
  static getExpressionElement(
    doc: unknown,
    elementId: unknown,
    propertyName: string,
    secondaryKey?: string
  ): SlaveExpressionElement | undefined;
  static validateExpressionByValueType(
    doc: unknown,
    valueType: EN_VARIABLE_VALUE_TYPE,
    statement: string
  ): IValidateResult;
  static validateExpressionByElementProperty(
    element: unknown,
    propertyName: string,
    statement: string,
    doc: unknown
  ): IValidateResult;
  static clearInvalidExpression(doc: unknown): void;
  static parseExpressionAndGetIdentifiers(statement: string): string[];
}

/**
 * 表达式计算器类
 */
export declare class ExpressionCalculator {
  constructor(config: { propertyName: string });
  getMesureVariableInputPropertyIds(): unknown[];
  getInputPropertyIds(): unknown[];
  getOutputProperty(): string;
  execute(): boolean;
  executeMesure(): boolean;
}

/**
 * 无效元素管理器类
 */
export declare class InvalidElementsManager {
  static getInstance(): InvalidElementsManager;
  update(doc: unknown, shouldUpdate?: boolean): void;
  isElementValid(element: unknown): boolean;
  hasInvalidElements(): boolean;
}

/**
 * 获取字面量变量
 */
export declare function getLiteralVariables(doc: unknown): Record<string, VariableElement>;

/**
 * 获取所有变量
 */
export declare function getAllVariables(doc: unknown): Record<string, VariableElement>;

/**
 * 根据名称获取变量元素
 */
export declare function getVariableElementByName(
  doc: unknown,
  name: string
): VariableElement | undefined;

/**
 * 获取受变量影响的元素
 */
export declare function getInfluencedEleByVaraibles(
  doc: unknown,
  variables: IVariableEditParams[]
): unknown[] | undefined;

/**
 * 更新最小最大值和初始值
 */
export declare function updateMinMaxV0(
  element: VariableElement,
  params: IVariableEditParams
): void;

/**
 * 创建变量命令
 */
export declare class CreateVariableCmd {
  execute(params: IVariableParams): Promise<void>;
}

/**
 * 编辑变量命令
 */
export declare class EditVariableCmd {
  execute(params: IVariableEditParams): Promise<void>;
}

/**
 * 将数据库属性转换为表达式命令
 */
export declare class MakeDBPropertyToExpressionCmd {
  clearSelection(): boolean;
  execute(params: {
    elementId?: unknown;
    propertyName: string;
    statement: string;
    variableValueType: EN_VARIABLE_VALUE_TYPE;
    propertyNameSecondKey?: string;
  }): Promise<void>;
}

/**
 * 撤销命令
 */
export declare class MyUndoCmd {
  executeSync(): void;
}

/**
 * 重做命令
 */
export declare class MyRedoCmd {
  executeSync(): void;
}