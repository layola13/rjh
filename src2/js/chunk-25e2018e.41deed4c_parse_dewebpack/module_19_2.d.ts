import { ResultBasedCompile, MatchTarget } from './module_8';
import { ErrorTag } from './module_2';

/**
 * 设计规则编译器
 * 用于编译和验证设计规则，检查是否满足特定条件
 */
export class CompileDesignRules extends ResultBasedCompile {
  /** ICC工具栏实例 */
  private readonly iccBar: unknown;
  
  /** 编译器实例 */
  private readonly compiler: unknown;
  
  /** 规格价格映射表 */
  private readonly specPriceMap: Map<unknown, unknown>;

  /**
   * 构造函数
   * @param iccBar - ICC工具栏实例
   * @param compiler - 编译器实例
   */
  constructor(iccBar: unknown, compiler: unknown) {
    super(compiler);
    this.iccBar = iccBar;
    this.compiler = compiler;
    this.specPriceMap = new Map();
  }

  /**
   * 编译设计规则
   * @param rules - 设计规则数组
   * @param context - 编译上下文
   * @throws {ErrorTag} 当规则验证失败时抛出错误
   */
  compile(rules: DesignRule[], context: unknown): void {
    let shouldAbort = false;
    const errorMessages: string[] = [];

    rules.forEach(rule => {
      // 获取计算目标，如果没有找到则使用OpenCell作为默认目标
      let calcTargets = this.fetchCalcTargets(rule.type, context);
      if (calcTargets.length === 0) {
        calcTargets = this.fetchCalcTargets(MatchTarget.OpenCell, context);
      }

      // 遍历所有计算目标
      for (const target of calcTargets) {
        this.pushDrawingInfos(target);
        this.pushVariablesForTarget(target);

        // 解析条件，如果条件满足则记录错误信息
        if (this.compiler.parseCondition(rule.condition)) {
          errorMessages.push(rule.message);
          shouldAbort = shouldAbort || rule.abort === 1;
          break;
        }
      }
    });

    // 如果有错误信息，抛出错误
    if (errorMessages.length > 0) {
      throw ErrorTag.messages(errorMessages, shouldAbort);
    }
  }

  /**
   * 为目标推送变量
   * @param target - 计算目标对象
   */
  protected pushVariablesForTarget(target: CalcTarget): void {
    super.pushVariablesForTarget(target);
    this.compiler.pushTmpKey('扇高', target.height);
    this.compiler.pushTmpKey('扇宽', target.width);
  }
}

/**
 * 设计规则接口
 */
interface DesignRule {
  /** 规则类型 */
  type: unknown;
  
  /** 规则条件表达式 */
  condition: string;
  
  /** 错误提示信息 */
  message: string;
  
  /** 是否中止编译（1表示中止，0表示继续） */
  abort: 0 | 1;
}

/**
 * 计算目标接口
 */
interface CalcTarget {
  /** 目标高度（扇高） */
  height: number;
  
  /** 目标宽度（扇宽） */
  width: number;
}