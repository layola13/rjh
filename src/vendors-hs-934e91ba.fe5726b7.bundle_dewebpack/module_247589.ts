import detectCycle from './module_471677';

export default function isAcyclic<T>(graph: T): boolean {
  try {
    detectCycle(graph);
  } catch (error) {
    if (error instanceof detectCycle.CycleException) {
      return false;
    }
    throw error;
  }
  return true;
}