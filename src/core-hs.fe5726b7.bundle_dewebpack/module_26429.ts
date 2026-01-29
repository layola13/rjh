import { Constraint } from './constraint';

interface EquationVariable {
  id: string;
  localId: string;
  value: number;
}

interface EquationVariablesData {
  equation: string;
  isAssignmentExpression: boolean;
}

interface ConstraintData {
  localId: string;
  type: string;
  equation: string;
  equationVariables: EquationVariablesData;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface ParsedExpression {
  body: Array<{
    expression: {
      type: string;
    };
  }>;
}

interface Token {
  type: string;
  value: string;
}

interface ASTNode {
  type: string;
  callee?: {
    [key: string]: {
      type: string;
      name?: string;
    };
  };
  [key: string]: unknown;
}

declare const HSConstants: {
  ModelClass: {
    EquationConstraint: string;
  };
};

declare const log: {
  logger: (className: string) => Logger;
};

declare const Esprima: {
  parse: (equation: string) => ParsedExpression;
  tokenize: (equation: string) => Token[];
};

interface Logger {
  error: (message: string | Error) => void;
}

export class EquationConstraint extends Constraint {
  public equation: string;
  public isAssignmentExpression: boolean;
  protected logger: Logger;
  protected inputs: Record<string, EquationVariable>;
  protected outputs: Record<string, EquationVariable>;

  constructor(id: string = "") {
    super(id);
    this.Class = HSConstants.ModelClass.EquationConstraint;
    this.logger = log.logger(HSConstants.ModelClass.EquationConstraint);
    this.equation = "";
    this.isAssignmentExpression = false;
  }

  public init(data: ConstraintData, variables: Record<string, EquationVariable>): void {
    super.init(data, variables);
    this.localId = data.localId;
    this.type = data.type;
    this.equation = data.equation;
    this.refresh(variables);
  }

  public refresh(variables: Record<string, EquationVariable>): void {
    let parsedExpression: ParsedExpression | undefined;
    let tokens: Token[] | undefined;

    try {
      parsedExpression = Esprima.parse(this.equation);
      tokens = Esprima.tokenize(this.equation);
    } catch (error) {
      if (error instanceof Error) {
        this.logerror(error);
      }
    }

    if (!parsedExpression || !tokens) {
      return;
    }

    const identifierNames: string[] = [];
    this.isAssignmentExpression = false;

    if (parsedExpression.body.length !== 1) {
      return;
    }

    this.isAssignmentExpression = parsedExpression.body[0].expression.type === "AssignmentExpression";

    if (!this.isAssignmentExpression) {
      return;
    }

    const functionNames: string[] = [];

    const extractFunctionNames = (node: ASTNode | unknown, names: string[]): void => {
      if (typeof node !== 'object' || node === null) {
        return;
      }

      for (const key in node as ASTNode) {
        const value = (node as ASTNode)[key];

        if (typeof value === 'object' && value !== null && 'type' in value) {
          const typedValue = value as ASTNode;

          if (typedValue.type === "CallExpression" && typedValue.callee) {
            for (const calleeKey in typedValue.callee) {
              const calleeNode = typedValue.callee[calleeKey];
              if (calleeNode.type === "Identifier" && calleeNode.name) {
                names.push(calleeNode.name);
              }
            }
          } else {
            extractFunctionNames(typedValue, names);
          }
        }
      }
    };

    extractFunctionNames(parsedExpression, functionNames);

    tokens.forEach((token: Token) => {
      if (token.type === "Identifier" && !functionNames.includes(token.value)) {
        identifierNames.push(token.value);
      }
    });

    let isValid = true;

    identifierNames.forEach((name: string) => {
      if (variables[name] === undefined) {
        isValid = false;
        this.logerror("Invalid equation in constraint: " + this.equation);
      }
    });

    if (isValid) {
      if (identifierNames.length > 0) {
        this.outputs[variables[identifierNames[0]].id] = variables[identifierNames[0]];
        identifierNames.splice(0, 1);
      }

      identifierNames.forEach((name: string) => {
        this.inputs[variables[name].id] = variables[name];
      });
    }
  }

  public compute(): void {
    super.compute();

    if (!this.isAssignmentExpression) {
      return;
    }

    let declares = "";
    Object.values(this.inputs).forEach((variable: EquationVariable) => {
      declares += `let ${variable.localId} = ${variable.value};`;
    });

    let outputVariable = "";
    if (Object.values(this.outputs).length > 0) {
      outputVariable = Object.values(this.outputs)[0].localId;
    }

    const executableCode = `${declares}let ${this.equation};${outputVariable};`;
    const result = eval(executableCode);

    Object.values(this.outputs).forEach((variable: EquationVariable) => {
      variable.value = result;
    });
  }

  public dump(options: DumpOptions = {}): unknown[] {
    const dumpedData = super.dump(options);
    dumpedData[0].equationVariables = {
      equation: this.equation,
      isAssignmentExpression: this.isAssignmentExpression
    };
    return dumpedData;
  }

  public load(data: ConstraintData, options: LoadOptions = {}): void {
    super.load(data, options);
    this.equation = data.equationVariables.equation;
    this.isAssignmentExpression = data.equationVariables.isAssignmentExpression;
  }

  protected logerror(message: string | Error): void {
    this.logger.error(message);
  }

  public verify(): boolean {
    return super.verify() && !!this.equation;
  }

  public verifyBeforeDump(): boolean {
    return super.verifyBeforeDump() && !!this.equation;
  }
}

Constraint.registerClass("HSCore.Constraint.EquationConstraint", EquationConstraint);
Constraint.registerClass("hsw.core.constraint.EquationConstraint", EquationConstraint);