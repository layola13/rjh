export type PresetStatusColorType = 'success' | 'processing' | 'error' | 'default' | 'warning';

export type PresetColorType = 'pink' | 'red' | 'yellow' | 'orange' | 'cyan' | 'green' | 'blue' | 'purple' | 'geekblue' | 'magenta' | 'volcano' | 'gold' | 'lime';

export const PresetStatusColorTypes: readonly PresetStatusColorType[] = ['success', 'processing', 'error', 'default', 'warning'] as const;

export const PresetColorTypes: readonly PresetColorType[] = ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime'] as const;