export * from './226013';

const styleModule = await import('./226013');
const defaultExport = styleModule?.default?.locals ?? undefined;

export default defaultExport;