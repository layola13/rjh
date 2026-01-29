export class CycleException extends Error {
  constructor() {
    super('Graph contains a cycle');
    this.name = 'CycleException';
  }
}

interface Graph<T = string> {
  sinks(): T[];
  predecessors(node: T): T[];
  nodeCount(): number;
}

interface VisitedMap<T> {
  [key: string]: boolean;
}

export function topologicalSort<T = string>(graph: Graph<T>): T[] {
  const visited: VisitedMap<T> = {};
  const currentPath: VisitedMap<T> = {};
  const result: T[] = [];

  const visit = (node: T): void => {
    const nodeKey = String(node);

    if (currentPath[nodeKey]) {
      throw new CycleException();
    }

    if (visited[nodeKey]) {
      return;
    }

    currentPath[nodeKey] = true;
    visited[nodeKey] = true;

    const predecessors = graph.predecessors(node);
    for (const predecessor of predecessors) {
      visit(predecessor);
    }

    delete currentPath[nodeKey];
    result.push(node);
  };

  const sinks = graph.sinks();
  for (const sink of sinks) {
    visit(sink);
  }

  if (Object.keys(visited).length !== graph.nodeCount()) {
    throw new CycleException();
  }

  return result;
}

export default topologicalSort;