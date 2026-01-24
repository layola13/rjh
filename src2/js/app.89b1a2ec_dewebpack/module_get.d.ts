/**
 * Gets the current information step from the Vuex store state.
 * 
 * @returns The current info step value from the store
 * @remarks
 * This is a Vue component method that accesses the Vuex store.
 * Typically used in Vue 2 components with Options API.
 */
declare function getInfoStep(this: { $store: { state: { infoStep: unknown } } }): unknown;

export default getInfoStep;