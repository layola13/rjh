export * from './module_127677';

const styleModule = await import('./module_127677');
export default styleModule?.locals ?? undefined;