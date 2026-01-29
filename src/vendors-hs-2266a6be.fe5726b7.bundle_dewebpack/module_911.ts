export interface ActionTypeCollector {
  (action: unknown): unknown;
  collecterName: string;
}

function actionTypeCollector(action: unknown): unknown {
  return action;
}

actionTypeCollector.collecterName = "actionType";

export default actionTypeCollector;