interface TagSubstitution {
  tag: string;
  substitution: unknown;
}

interface StateManager {
  setState(tag: string, substitution: unknown): void;
}

function setTagState(
  data: TagSubstitution,
  stateManagers: StateManager[],
  index: number
): void {
  stateManagers[index].setState(data.tag, data.substitution);
}