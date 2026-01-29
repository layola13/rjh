import { Constraint } from './Constraint';

interface ComputeChainItem {
  method: ComputeMethod;
  states: State[];
}

interface StateReference {
  states?: string[];
}

interface ComputeInput {
  method: ComputeMethod;
  states?: string[];
}

interface InitData {
  localId: string;
  type: string;
  inputs: ComputeInput[];
  output: string | string[];
}

interface State {
  id: string;
  value: number;
}

interface StateMap {
  [key: string]: State;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  states?: StateMap;
  [key: string]: unknown;
}

interface SerializedComputeChain {
  method: ComputeMethod;
  states: string[];
}

type ComputeMethod =
  | 'add'
  | 'sub'
  | 'mul'
  | 'div'
  | 'result_add'
  | 'result_sub'
  | 'result_mul'
  | 'result_div'
  | 'nonnegative';

declare const HSConstants: {
  ModelClass: {
    PositionConstraint: string;
  };
};

export class PositionConstraint extends Constraint {
  public localId?: string;
  public type?: string;
  public computeChain: ComputeChainItem[];
  public inputs: Record<string, State> = {};
  public outputs: Record<string, State> = {};

  constructor(name: string = '') {
    super(name);
    this.Class = HSConstants.ModelClass.PositionConstraint;
    this.computeChain = [];
  }

  init(data: InitData, stateMap: StateMap): void {
    super.init(data, stateMap);
    
    this.localId = data.localId;
    this.type = data.type;

    data.inputs.forEach((input) => {
      const states = (input.states || []).map((stateId) => {
        const state = stateMap[stateId];
        this.inputs[state.id] = state;
        return state;
      });

      this.computeChain.push({
        method: input.method,
        states: states
      });
    });

    if (Array.isArray(data.output)) {
      data.output.forEach((outputId) => {
        const state = stateMap[outputId];
        this.outputs[state.id] = state;
      });
    } else {
      const state = stateMap[data.output];
      this.outputs[state.id] = state;
    }
  }

  compute(): void {
    super.compute();
    
    let result = 0;

    this.computeChain.forEach((chainItem) => {
      const values = chainItem.states.map((state) => state.value);

      switch (chainItem.method) {
        case 'add':
          result += values.reduce((acc, val) => acc + val);
          break;
        case 'sub':
          result -= values.reduce((acc, val) => acc + val);
          break;
        case 'mul':
          result += values.reduce((acc, val) => acc * val);
          break;
        case 'div':
          result += values.reduce((acc, val) => acc / val);
          break;
        case 'result_add':
          result += values.reduce((val) => val);
          break;
        case 'result_sub':
          result -= values.reduce((val) => val);
          break;
        case 'result_mul':
          result *= values.reduce((val) => val);
          break;
        case 'result_div':
          result /= values.reduce((val) => val);
          break;
        case 'nonnegative':
          result = values.map((val) => (val < 0 ? 0 : val))[0];
          break;
      }
    });

    Object.values(this.outputs).forEach((output) => {
      output.value = result;
    });
  }

  dump(options: DumpOptions = {}): unknown[] {
    const baseData = super.dump(options);
    const serializedChain: SerializedComputeChain[] = [];

    this.computeChain.forEach((chainItem) => {
      serializedChain.push({
        method: chainItem.method,
        states: chainItem.states.map((state) => state.id)
      });
    });

    baseData[0].computeChain = serializedChain;
    return baseData;
  }

  load(data: { computeChain: SerializedComputeChain[] }, options: LoadOptions = {}): void {
    super.load(data, options);
    
    this.computeChain = [];

    data.computeChain.forEach((chainData) => {
      const states = chainData.states.map((stateId) => options.states?.[stateId]);

      this.computeChain.push({
        method: chainData.method,
        states: states as State[]
      });
    });
  }

  verify(): boolean {
    return super.verify() && !!this.computeChain;
  }

  verifyBeforeDump(): boolean {
    return super.verifyBeforeDump() && !!this.computeChain;
  }
}

Constraint.registerClass('HSCore.Constraint.PositionConstraint', PositionConstraint);
Constraint.registerClass('hsw.core.constraint.PositionConstraint', PositionConstraint);