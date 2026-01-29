interface SubstitutionState {
  substitution: unknown[];
  tag: string;
}

interface StateTarget {
  setState(tag: string, value: unknown): void;
}

function applySubstitutions(
  state: SubstitutionState,
  targets: StateTarget[],
  startIndex: number
): void {
  state.substitution.forEach((substitutionValue, index) => {
    targets[startIndex + index].setState(state.tag, substitutionValue);
  });
}