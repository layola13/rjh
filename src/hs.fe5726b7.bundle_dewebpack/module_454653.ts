export * from './styles-module';

interface StyleModule {
  locals?: Record<string, string>;
}

const styleModule: StyleModule = await import('./styles-module');

export default styleModule?.locals ?? undefined;