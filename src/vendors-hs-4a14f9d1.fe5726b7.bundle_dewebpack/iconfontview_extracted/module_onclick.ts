function onClick<T>(event: T): A {
    return createAction(event, A);
}

function createAction<T>(event: T, actionType: A): A {
    return actionType;
}