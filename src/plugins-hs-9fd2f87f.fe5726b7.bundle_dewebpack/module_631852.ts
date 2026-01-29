export default function mergeStatesAndConstraints(
  e: unknown,
  t: MergeConfig | null | undefined
): void {
  if (!t || !t.json) return;
  
  if (!Array.isArray(t.states) || !Array.isArray(t.json.states)) return;
  
  t.json.states = t.json.states.concat(t.states);
  delete t.newstates;
  
  if (!Array.isArray(t.constraints) || !Array.isArray(t.json.constraints)) return;
  
  t.json.constraints = t.json.constraints.concat(t.constraints);
  delete t.constraints;
}

interface MergeConfig {
  json: {
    states: unknown[];
    constraints: unknown[];
  };
  states: unknown[];
  constraints: unknown[];
  newstates?: unknown[];
}