import { Loader } from './Loader';
import { defaultJudge, SingleJudge, DoubleJudge, configs, getJudgeClass, JudgeBase } from './Judge';
import { EntityType, EntityTypeChecker } from './EntityType';
import { GroupUtil } from './GroupUtil';

interface CoInfo {
  id: string;
  tag: string;
  seekId: string;
  categories: string[];
  contentType: {
    getTypeString(): string;
  };
  co: ComponentObject;
}

interface ComponentObject {
  id: string;
  tag: string;
  seekId: string;
  categories: string[];
  contentType: {
    getTypeString(): string;
  };
}

interface Candidate {
  co: ComponentObject;
  linkedCoInfos: CoInfo[];
}

interface CandidateGroup {
  mainCandidates: Candidate[];
  noMainCandidates: Candidate[];
}

interface CandidateWithType {
  type: EntityType;
  candidate: Candidate;
}

interface JudgeResult {
  valid: boolean;
  score: number;
  reason?: string;
}

interface JudgeConfig {
  types: EntityType[][];
  judge: JudgeBase;
}

interface ElementInfo {
  id: string;
  tag: string;
  seekId: string;
  categories: string[];
  contentType: string;
  ignoreBox: boolean;
}

interface MarkResult {
  valid: boolean;
  score: number;
  reasons: JudgeResult[];
  type: EntityType;
  mainEleInfo: ElementInfo;
  relatedEleInfos: ElementInfo[];
}

interface WorldRawPath2dDump {
  outer: Array<{ curve: unknown }>;
}

interface GroupMarkerOptions {
  worldRawPath2dDump: WorldRawPath2dDump;
}

interface Line2d {
  isLine2d(): boolean;
}

interface ValidationResult {
  valid: boolean;
  score: number;
  reasons: JudgeResult[];
}

function createSortedKey(ids: string[]): string {
  return ids.sort().join('_');
}

export class GroupMarker {
  private static _judges: JudgeConfig[] = [];
  private wallLines: Line2d[];
  private _calculatedRecordSet: Set<string>;

  constructor(options: GroupMarkerOptions) {
    this.wallLines = [];
    this._calculatedRecordSet = new Set<string>();
    
    this.wallLines = options.worldRawPath2dDump.outer
      .map(item => Loader.load(item.curve))
      .filter((curve): curve is Line2d => curve?.isLine2d() ?? false);
  }

  private static _checkJudges(): void {
    const checkedPairs: string[] = [];
    
    for (let i = 0; i < this._judges.length; i++) {
      const judgeA = this._judges[i];
      
      for (let j = 0; j < this._judges.length; j++) {
        const pairKey = createSortedKey([i.toString(), j.toString()]);
        
        if (i === j || checkedPairs.includes(pairKey)) {
          continue;
        }
        
        checkedPairs.push(pairKey);
        const judgeB = this._judges[j];
        
        if (this._isSameTypes(judgeA.types, judgeB.types)) {
          console.warn('打组打分配置有重复项', judgeA, judgeB);
        }
      }
    }
  }

  static registerJudge(types: EntityType[][], judge: JudgeBase): void {
    GroupMarker._judges.push({ types, judge });
    this._checkJudges();
  }

  private static _isSameTypes(typesA: EntityType[][], typesB: EntityType[][]): boolean {
    const hasOverlap = (groupA: EntityType[], groupB: EntityType[]): boolean =>
      groupA.some(typeA => groupB.some(typeB => typeA.isSame(typeB)));

    if (typesA.length === typesB.length) {
      if (typesA.length === 1) {
        return hasOverlap(typesA[0], typesB[0]);
      }
      
      if (typesA.length === 2) {
        return (
          (hasOverlap(typesA[0], typesB[0]) && hasOverlap(typesA[1], typesB[1])) ||
          (hasOverlap(typesA[0], typesB[1]) && hasOverlap(typesA[1], typesB[0]))
        );
      }
    }
    
    return false;
  }

  static getJudgesByType(types: EntityType[][]): JudgeBase[] {
    const matchedJudges = this._judges.filter(judge =>
      this._isSameTypes(judge.types, types)
    );
    
    return matchedJudges.length > 0
      ? matchedJudges.map(judge => judge.judge)
      : [defaultJudge];
  }

  private _createEleInfo(co: ComponentObject, type?: EntityType): ElementInfo {
    return {
      id: co.id,
      tag: co.tag,
      seekId: co.seekId,
      categories: co.categories,
      contentType: co.contentType.getTypeString(),
      ignoreBox: GroupUtil.isIgnoreBoxCo(co, type)
    };
  }

  private _judgeSingle(co: ComponentObject): JudgeResult[] {
    if (this._calculatedRecordSet.has(co.id)) {
      return [];
    }

    const results: JudgeResult[] = [];
    const entityType = EntityType.createByCo(co);
    const judges = GroupMarker.getJudgesByType([[entityType]]).filter(
      (judge): judge is SingleJudge => judge instanceof SingleJudge
    );

    if (judges.length > 0) {
      judges.forEach(judge => {
        results.push(...judge.execute(co, this.wallLines));
      });
      this._calculatedRecordSet.add(co.id);
    }

    return results;
  }

  private _judgeDouble(coA: ComponentObject, coB: ComponentObject): JudgeResult[] {
    const pairKey = createSortedKey([coA.id, coB.id]);
    
    if (this._calculatedRecordSet.has(pairKey)) {
      return [];
    }

    const results: JudgeResult[] = [];
    const typeA = EntityType.createByCo(coA);
    const typeB = EntityType.createByCo(coB);
    const judges = GroupMarker.getJudgesByType([[typeA], [typeB]]).filter(
      (judge): judge is DoubleJudge => judge instanceof DoubleJudge
    );

    if (judges.length > 0) {
      judges.forEach(judge => {
        results.push(...judge.execute(coA, coB));
      });
      this._calculatedRecordSet.add(pairKey);
    }

    return results;
  }

  private _calcValidAndScore(candidateWithType: CandidateWithType): ValidationResult {
    const { candidate } = candidateWithType;
    const allJudgeResults: JudgeResult[] = [];
    const allComponents = [candidate, ...candidate.linkedCoInfos];

    for (let i = 0; i < allComponents.length; i++) {
      const componentA = allComponents[i];
      allJudgeResults.push(...this._judgeSingle(componentA.co));

      for (let j = 0; j < allComponents.length; j++) {
        if (i === j) {
          continue;
        }
        
        const componentB = allComponents[j];
        allJudgeResults.push(...this._judgeDouble(componentA.co, componentB.co));
      }
    }

    return {
      valid: !allJudgeResults.some(result => !result.valid),
      score: allJudgeResults.reduce((sum, result) => sum + result.score, 0),
      reasons: allJudgeResults
    };
  }

  private _mark(candidateWithType: CandidateWithType): MarkResult {
    const { valid, score, reasons } = this._calcValidAndScore(candidateWithType);

    return {
      valid,
      score,
      reasons,
      type: candidateWithType.type,
      mainEleInfo: this._createEleInfo(candidateWithType.candidate.co),
      relatedEleInfos: candidateWithType.candidate.linkedCoInfos.map(coInfo =>
        this._createEleInfo(coInfo.co, candidateWithType.type)
      )
    };
  }

  execute(candidateGroups: CandidateGroup[]): MarkResult[] {
    const mainCandidatesWithType: CandidateWithType[] = [];
    const noMainCandidatesWithType: CandidateWithType[] = [];

    const createCandidateWithType = (candidate: Candidate): CandidateWithType => ({
      type: EntityTypeChecker.inferringTypeByCo(candidate.co),
      candidate
    });

    candidateGroups.forEach(group => {
      mainCandidatesWithType.push(...group.mainCandidates.map(createCandidateWithType));
      noMainCandidatesWithType.push(...group.noMainCandidates.map(createCandidateWithType));
    });

    const allCandidates = [...mainCandidatesWithType, ...noMainCandidatesWithType];
    const marks = allCandidates.map(candidate => this._mark(candidate));

    console.log('marks', marks);
    return marks;
  }
}

// Initialize judges from configurations
configs.forEach(config => {
  const { types, config: judgeConfig } = config;
  const JudgeClass = getJudgeClass(types);
  GroupMarker.registerJudge(types, new JudgeClass(judgeConfig));
});