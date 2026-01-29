interface StateData {
  tag: string;
  substitution: unknown;
}

function setModuleState(
  data: StateData,
  targetArray: Array<{ setState: (tag: string, substitution: unknown) => void }>,
  index: number
): void {
  targetArray[index].setState(data.tag, data.substitution);
}