import n from './module_7102';
import s from './module_9414';

export default function(graph: any, nodeTransform: any, edgeTransform: any): Record<string, any> {
  return s.transform(graph.nodes(), (accumulator: Record<string, any>, nodeId: string) => {
    accumulator[nodeId] = n(graph, nodeId, nodeTransform, edgeTransform);
  }, {});
}