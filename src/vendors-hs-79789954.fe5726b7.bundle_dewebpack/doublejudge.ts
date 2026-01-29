import { Line2d, Vector2, MathAlg, Tolerance } from './math-alg';
import { EnGroupReasonType } from './group-reason-type';
import { TypeConfigs, SofaConfigs, CurtainConfigs, getEntityTypesByConfigs } from './type-configs';

interface JudgeRuleConfig {
  score: number;
  checkValid?: boolean;
}

interface JudgeConfig {
  onTheFloor?: JudgeRuleConfig;
  onTheWall?: JudgeRuleConfig;
  adaptation?: JudgeRuleConfig;
}

interface EntityContent {
  z?: number;
  outline: Array<{ x: number; y: number } | undefined>;
}

interface Entity {
  id: string;
  content: EntityContent;
}

interface JudgeResult {
  type: EnGroupReasonType;
  score: number;
  ids: string[];
  valid: boolean;
}

type Curve2d = unknown;

const DEFAULT_CONFIG: JudgeConfig = {
  onTheFloor: undefined,
  onTheWall: undefined
};

abstract class Judge {
  protected _config: JudgeConfig;

  constructor(config: JudgeConfig) {
    this._config = {
      ...DEFAULT_CONFIG,
      ...config
    };
  }

  protected getScore(rule: JudgeRuleConfig, condition: boolean): number {
    return condition ? rule.score : -rule.score;
  }

  protected getValid(score: number, rule?: JudgeRuleConfig): boolean {
    return !rule?.checkValid || score >= 0;
  }

  abstract execute(entityA: Entity, entityBOrCurves: Entity | Curve2d[]): JudgeResult[];
}

class SingleJudge extends Judge {
  execute(entity: Entity, curves: Curve2d[]): JudgeResult[] {
    const results: JudgeResult[] = [];

    if (this._config.onTheFloor) {
      const isOnFloor = entity.content?.z === 0;
      const score = this.getScore(this._config.onTheFloor, isOnFloor);
      const valid = this.getValid(score, this._config.onTheFloor);
      
      results.push({
        type: EnGroupReasonType.OnTheFloor,
        score,
        ids: [entity.id],
        valid
      });
    }

    if (this._config.onTheWall) {
      let isOnWall = false;
      const point1 = entity.content.outline[2];
      const point2 = entity.content.outline[3];

      if (point1 && point2) {
        const line = new Line2d(
          new Vector2(point1.x, point1.y),
          new Vector2(point2.x, point2.y)
        );
        isOnWall = (curves as Curve2d[]).some(curve =>
          MathAlg.CalculateOverlap.curve2ds(curve, line, new Tolerance(0.001))[0]
        );
      }

      const score = this.getScore(this._config.onTheWall, isOnWall);
      const valid = this.getValid(score, this._config.onTheWall);

      results.push({
        type: EnGroupReasonType.OnTheWall,
        score,
        ids: [entity.id],
        valid
      });
    }

    return results;
  }
}

class DoubleJudge extends Judge {
  execute(entityA: Entity, entityB: Entity): JudgeResult[] {
    const results: JudgeResult[] = [];

    const score = this._config.adaptation ? this.getScore(this._config.adaptation, true) : 0;
    const valid = this.getValid(score, this._config.adaptation);

    results.push({
      type: EnGroupReasonType.Adaptation,
      score,
      ids: [entityA.id, entityB.id],
      valid
    });

    return results;
  }
}

interface TypeConfigMapping {
  types: string[][];
  config: JudgeConfig;
}

const configs: TypeConfigMapping[] = [
  {
    types: [TypeConfigs.bed],
    config: {
      onTheFloor: {
        score: 1,
        checkValid: true
      },
      onTheWall: {
        score: 1
      }
    }
  },
  {
    types: [getEntityTypesByConfigs(SofaConfigs)],
    config: {
      onTheFloor: {
        score: 1,
        checkValid: true
      },
      onTheWall: {
        score: 1
      }
    }
  },
  {
    types: [
      [...TypeConfigs.table, ...TypeConfigs.secondaryTable]
    ],
    config: {
      onTheFloor: {
        score: 1,
        checkValid: true
      }
    }
  },
  {
    types: [TypeConfigs.rug],
    config: {
      onTheFloor: {
        score: 1,
        checkValid: true
      }
    }
  },
  {
    types: [getEntityTypesByConfigs(CurtainConfigs)],
    config: {
      onTheWall: {
        score: 1,
        checkValid: true
      }
    }
  },
  {
    types: [getEntityTypesByConfigs(SofaConfigs), TypeConfigs.rug],
    config: {
      adaptation: {
        score: 1
      }
    }
  },
  {
    types: [
      [...TypeConfigs.table, ...TypeConfigs.secondaryTable],
      TypeConfigs.chair
    ],
    config: {
      adaptation: {
        score: 1
      }
    }
  }
];

const defaultJudge = new SingleJudge({});

function getJudgeClass(types: unknown[]): typeof DoubleJudge | typeof SingleJudge {
  if (types.length === 2) {
    return DoubleJudge;
  }
  return SingleJudge;
}

export { Judge, SingleJudge, DoubleJudge, configs, defaultJudge, getJudgeClass };