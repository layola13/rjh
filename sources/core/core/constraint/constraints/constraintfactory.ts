import { PositionConstraint } from './PositionConstraint';
import { EquationConstraint } from '../kernel/EquationConstraint';

interface ConstraintConfig {
  equation?: unknown;
  [key: string]: unknown;
}

interface ConstraintContext {
  [key: string]: unknown;
}

interface IConstraint {
  init(config: ConstraintConfig, context: ConstraintContext): void;
}

/**
 * Factory for creating constraint instances based on configuration.
 * Implements singleton pattern.
 */
export class ConstraintFactory {
  private static _instance: ConstraintFactory;

  /**
   * Gets the singleton instance of ConstraintFactory.
   */
  static instance(): ConstraintFactory {
    if (!ConstraintFactory._instance) {
      ConstraintFactory._instance = new ConstraintFactory();
    }
    return ConstraintFactory._instance;
  }

  /**
   * Creates a constraint based on the provided configuration.
   * Returns EquationConstraint if config contains equation property,
   * otherwise returns PositionConstraint.
   */
  createConstraint(config: ConstraintConfig, context: ConstraintContext): IConstraint {
    if (config.equation) {
      const constraint = new EquationConstraint();
      constraint.init(config, context);
      return constraint;
    }

    const constraint = new PositionConstraint();
    constraint.init(config, context);
    return constraint;
  }
}