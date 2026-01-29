import { filter } from './module_9414';
import { transform } from './module_7544';

export function filterConnectedComponents(graph: Graph): string[][] {
  return filter(transform(graph), (component: string[]) => {
    return component.length > 1 || (component.length === 1 && graph.hasEdge(component[0], component[0]));
  });
}

interface Graph {
  hasEdge(source: string, target: string): boolean;
}