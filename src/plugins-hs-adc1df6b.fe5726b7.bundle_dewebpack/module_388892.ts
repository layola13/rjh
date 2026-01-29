export * from './690601';

const styleModule = await import('./690601');

export default styleModule?.locals ?? undefined;