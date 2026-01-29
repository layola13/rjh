import { PresetColorTypes } from './109961';

export function isPresetColor(color: string): boolean {
  return PresetColorTypes.indexOf(color) !== -1;
}