export const COLLECT_PRODUCTS_SUCCEEDED = "COLLECT_PRODUCTS_SUCCEEDED";
export const SHOW = "SHOW";
export const HIDE = "HIDE";
export const START_ANIMATION = "START_ANIMATION";
export const END_ANIMATION = "END_ANIMATION";
export const CREATING_CAMERA = "CREATING";
export const CREATE_CAMERA = "CREATE_CAMERA";
export const DELETE_CAMERA = "DELETE_CAMERA";
export const RENAME_CAMERA = "RENAME_CAMERA";
export const SELECT_CAMERA = "SELECT_CAMERA";
export const RESET_STATE = "RESET_STATE";
export const CALL_PLUGIN = "CALL_PLUGIN";
export const CHANGE_START_INDEX = "CHANGE_START_INDEX";
export const RESIZE_PAGE_LENGTH = "RESIZE_PAGE_LENGTH";
export const SETREADONLY = "SET_READONLY";

const actionTypes = {
    COLLECT_PRODUCTS_SUCCEEDED,
    SHOW,
    HIDE,
    START_ANIMATION,
    END_ANIMATION,
    CREATING_CAMERA,
    CREATE_CAMERA,
    DELETE_CAMERA,
    RENAME_CAMERA,
    SELECT_CAMERA,
    RESET_STATE,
    CALL_PLUGIN,
    CHANGE_START_INDEX,
    RESIZE_PAGE_LENGTH,
    SETREADONLY
} as const;

export type ActionType = typeof actionTypes[keyof typeof actionTypes];

export default actionTypes;