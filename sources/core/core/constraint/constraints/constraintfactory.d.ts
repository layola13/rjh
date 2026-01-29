/**
 * Factory for creating constraint instances.
 * Implements singleton pattern to ensure only one factory exists.
 */
export class ConstraintFactory {
  private static _instance: ConstraintFactory | null = null;

  /**
   * Gets the singleton instance of ConstraintFactory.
   * Creates the instance if it doesn't exist.
   * @returns The singleton ConstraintFactory instance
   */
  static instance(): ConstraintFactory {
    if (!ConstraintFactory._instance) {
      ConstraintFactory._instance = new ConstraintFactory();
    }
    return ConstraintFactory._instance;
  }

  /**
   * Creates a constraint based on the provided configuration.
   * Returns an EquationConstraint if the config has an equation property,
   * otherwise returns a PositionConstraint.
   * @param config - Configuration object for the constraint
   * @param target - Target object to apply the constraint to
   * @returns The created and initialized constraint instance
   */
  createConstraint(
    config: ConstraintConfig,
    target: unknown
  ): EquationConstraint | PositionConstraint {
    if (config.equation) {
      const constraint = new EquationConstraint();
      constraint.init(config, target);
      return constraint;
    }

    const constraint = new PositionConstraint();
    constraint.init(config, target);
    return constraint;
  }
}

/**
 * Configuration interface for constraint creation.
 */
interface ConstraintConfig {
  /** Optional equation property that determines constraint type */
  equation?: unknown;
  [key: string]: unknown;
}

/**
 * Represents an equation-based constraint.
 */
declare class EquationConstraint {
  /**
   * Initializes the constraint with configuration and target.
   * @param config - Configuration object
   * @param target - Target object
   */
  init(config: ConstraintConfig, target: unknown): void;
}

/**
 * Represents a position-based constraint.
 */
declare class PositionConstraint {
  /**
   * Initializes the constraint with configuration and target.
   * @param config - Configuration object
   * @param target - Target object
   */
  init(config: ConstraintConfig, target: unknown): void;
}