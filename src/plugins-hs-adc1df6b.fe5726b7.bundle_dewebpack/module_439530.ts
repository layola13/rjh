export * from './styles.module.css';

const styles = await import('./styles.module.css');

export default styles?.locals ?? undefined;