import n from './module_785';

export default function isAcyclic(graph: unknown): boolean {
  try {
    n(graph);
  } catch (error) {
    if (error instanceof n.CycleException) {
      return false;
    }
    throw error;
  }
  return true;
}