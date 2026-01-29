export * from './module_304261';

const styleModule = await import('./module_304261');

export default styleModule?.locals ?? undefined;