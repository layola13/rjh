interface SubstitutionData {
  tag: string;
  substitution: unknown[];
}

interface StateTarget {
  setState(tag: string, value: unknown): void;
}

function applySubstitutions(
  data: SubstitutionData,
  targets: StateTarget[],
  offset: number
): void {
  data.substitution.forEach((value: unknown, index: number) => {
    targets[offset + index].setState(data.tag, value);
  });
}