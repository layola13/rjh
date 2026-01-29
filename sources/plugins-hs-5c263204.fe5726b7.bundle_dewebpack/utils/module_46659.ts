export * from './257825';

const styleModule = await import('./257825');
export default styleModule.default?.locals ?? undefined;