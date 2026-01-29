import { normalizeTwoToneColors } from './utils';
import IconConfig from './IconConfig';

export function getTwoToneColor(): string | [string, string] {
  const colors = IconConfig.getTwoToneColors();
  
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  
  return [colors.primaryColor, colors.secondaryColor];
}

export function setTwoToneColor(color: string | [string, string]): void {
  const [primaryColor, secondaryColor] = normalizeTwoToneColors(color);
  
  IconConfig.setTwoToneColors({
    primaryColor,
    secondaryColor
  });
}