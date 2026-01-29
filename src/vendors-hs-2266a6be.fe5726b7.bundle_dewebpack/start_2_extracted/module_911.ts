export interface ActionType {
  collecterName?: string;
}

function actionTypeIdentity<T>(value: T): T {
  return value;
}

actionTypeIdentity.collecterName = "actionType";

export default actionTypeIdentity;