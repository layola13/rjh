interface ModuleInput {
  y: number;
}

function moduleV(e: number[], t: ModuleInput): [string, number] {
  t.y = e[0];
  return ["V", e[0]];
}

export { moduleV, type ModuleInput };