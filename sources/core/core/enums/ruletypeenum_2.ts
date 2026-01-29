export enum RuleTypeEnum {
  Unknown = "unknown",
  HeadLightRule = "head light rule",
  SingleSeatLightRule = "single seat rule",
  MultipleSeatLightRule = "multiple seat rule",
  CornerSofaLightRule = "corner sofa rule",
  BedLightRule = "bed rule",
  TableLightRule = "table rule",
  BathroomCabinetRule = "bath cabinet rule",
  CabinetRule = "cabinet rule",
  DecorativePictureRule = "decorate picture rule",
  TVCabinetRule = "TV rule",
  ToiletLightRule = "toilet rule",
  WindowLightRule = "window rule",
  DownLightRule = "down light rule"
}

interface LightingRule {
  priority(): number;
}

export class LightingRuleManager {
  private readonly _rules: Map<string, LightingRule>;

  constructor(config?: unknown) {
    this._rules = new Map();
    this._init(config);
  }

  /**
   * Get all registered lighting rules sorted by priority
   */
  getRules(): LightingRule[] {
    const rules = Array.from(this._rules.values());
    rules.sort((ruleA, ruleB) => ruleA.priority() - ruleB.priority());
    return rules;
  }

  /**
   * Get a specific rule by type
   */
  getRule(ruleType: string): LightingRule | undefined {
    return this._rules.get(ruleType);
  }

  private _init(config?: unknown): void {
    this._register(RuleTypeEnum.SingleSeatLightRule, new SingleSeatLightRule(RuleConfig.singleSeat, RuleTypeEnum.SingleSeatLightRule));
    this._register(RuleTypeEnum.CornerSofaLightRule, new CornerSofaLightRule(RuleConfig.cornerSofa, RuleTypeEnum.CornerSofaLightRule, 9));
    this._register(RuleTypeEnum.MultipleSeatLightRule, new MultipleSeatLightRule(RuleConfig.multipleSeat, RuleTypeEnum.MultipleSeatLightRule, 12));
    this._register(RuleTypeEnum.TableLightRule, new TableLightRule(RuleConfig.diningTable, RuleTypeEnum.TableLightRule));
    this._register(RuleTypeEnum.BedLightRule, new BedLightRule(RuleConfig.bed, RuleTypeEnum.BedLightRule));
    this._register(RuleTypeEnum.BathroomCabinetRule, new BathroomCabinetRule(RuleConfig.bathroomCabinet, RuleTypeEnum.BathroomCabinetRule, 8));
    this._register(RuleTypeEnum.CabinetRule, new CabinetRule(RuleConfig.cabinet, RuleTypeEnum.CabinetRule, 8));
    this._register(RuleTypeEnum.TVCabinetRule, new TVCabinetRule(RuleConfig.tvCabinet, RuleTypeEnum.TVCabinetRule, 9));
    this._register(RuleTypeEnum.DecorativePictureRule, new DecorativePictureRule(RuleConfig.decorativePicture, RuleTypeEnum.DecorativePictureRule, 8));
    this._register(RuleTypeEnum.ToiletLightRule, new ToiletLightRule(RuleConfig.toilet, RuleTypeEnum.ToiletLightRule));
    this._register(RuleTypeEnum.DownLightRule, new DownLightRule(RuleConfig.downLight, RuleTypeEnum.DownLightRule));
  }

  private _register(ruleType: string, rule: LightingRule): void {
    this._rules.set(ruleType, rule);
  }
}