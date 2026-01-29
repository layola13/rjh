interface StateUpdateParams {
  tag: string;
  substitution: unknown;
}

function updateModuleState(
  params: StateUpdateParams,
  modules: Array<{ setState: (tag: string, substitution: unknown) => void }>,
  moduleIndex: number
): void {
  modules[moduleIndex].setState(params.tag, params.substitution);
}