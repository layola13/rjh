interface StateUpdateParams {
  tag: string;
  substitution: unknown;
}

function updateState(params: StateUpdateParams, target: any, index: number): void {
  target[index].setState(params.tag, params.substitution);
}