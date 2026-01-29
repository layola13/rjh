export { resetWarned } from './warning';

import warning from './warning';

export default function antdWarning(valid: boolean, component: string, message: string): void {
  warning(valid, `[antd: ${component}] ${message}`);
}