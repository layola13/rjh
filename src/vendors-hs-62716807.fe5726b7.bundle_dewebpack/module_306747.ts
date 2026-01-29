export { resetWarned } from './warning';

export default function warning(valid: boolean, component: string, message: string): void {
  if (!valid) {
    console.warn(`[antd: ${component}] ${message}`);
  }
}