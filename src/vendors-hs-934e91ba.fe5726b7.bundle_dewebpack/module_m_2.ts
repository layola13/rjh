interface PatchOperation {
  op: string;
  path: unknown[];
  value: unknown;
}

function createPatchOperations(
  currentValue: unknown,
  previousValue: unknown,
  mutations: PatchOperation[],
  replacements: PatchOperation[],
  undefinedMarker: unknown
): void {
  mutations.push({
    op: "replace",
    path: [],
    value: previousValue === undefinedMarker ? undefined : previousValue
  });

  replacements.push({
    op: "replace",
    path: [],
    value: currentValue
  });
}