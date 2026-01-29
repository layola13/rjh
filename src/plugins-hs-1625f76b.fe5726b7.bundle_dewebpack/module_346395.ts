export * from './980286';

const styleModule = await import('./980286');
export default styleModule?.locals ?? undefined;