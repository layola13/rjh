import { normalizeTwoToneColors } from './584401';
import TwoToneColorManager from './220589';

export function getTwoToneColor(): string | [string, string] {
  const colors = TwoToneColorManager.getTwoToneColors();
  
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  
  return [colors.primaryColor, colors.secondaryColor];
}

export function setTwoToneColor(color: string | [string, string]): void {
  const [primaryColor, secondaryColor] = normalizeTwoToneColors(color);
  
  TwoToneColorManager.setTwoToneColors({
    primaryColor,
    secondaryColor
  });
}