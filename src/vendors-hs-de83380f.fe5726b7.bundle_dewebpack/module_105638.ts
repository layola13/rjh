import { getSecondaryColor, useInsertStyles, warning, isIconDefinition, generate } from './utils';

interface IconDefinition {
  name: string;
  icon: ((primaryColor: string, secondaryColor: string) => React.ReactNode) | React.ReactNode;
}

interface TwoToneColors {
  primaryColor: string;
  secondaryColor: string;
  calculated?: boolean;
}

interface IconReactProps extends React.SVGAttributes<SVGElement> {
  icon: IconDefinition;
  className?: string;
  onClick?: React.MouseEventHandler<SVGElement>;
  style?: React.CSSProperties;
  primaryColor?: string;
  secondaryColor?: string;
}

const twoToneColorPalette: TwoToneColors = {
  primaryColor: '#333',
  secondaryColor: '#E6E6E6',
  calculated: false
};

const IconReact: React.FC<IconReactProps> & {
  displayName: string;
  getTwoToneColors: () => TwoToneColors;
  setTwoToneColors: (colors: { primaryColor: string; secondaryColor?: string }) => void;
} = (props) => {
  const {
    icon,
    className,
    onClick,
    style,
    primaryColor,
    secondaryColor,
    ...restProps
  } = props;

  let colors = twoToneColorPalette;

  if (primaryColor) {
    colors = {
      primaryColor,
      secondaryColor: secondaryColor ?? getSecondaryColor(primaryColor)
    };
  }

  useInsertStyles();

  warning(
    isIconDefinition(icon),
    `icon should be icon definiton, but got ${icon}`
  );

  if (!isIconDefinition(icon)) {
    return null;
  }

  let iconDefinition = icon;

  if (iconDefinition && typeof iconDefinition.icon === 'function') {
    iconDefinition = {
      ...iconDefinition,
      icon: iconDefinition.icon(colors.primaryColor, colors.secondaryColor)
    };
  }

  return generate(
    iconDefinition.icon,
    `svg-${iconDefinition.name}`,
    {
      className,
      onClick,
      style,
      'data-icon': iconDefinition.name,
      width: '1em',
      height: '1em',
      fill: 'currentColor',
      'aria-hidden': 'true',
      ...restProps
    }
  );
};

IconReact.displayName = 'IconReact';

IconReact.getTwoToneColors = function(): TwoToneColors {
  return { ...twoToneColorPalette };
};

IconReact.setTwoToneColors = function(colors: { primaryColor: string; secondaryColor?: string }): void {
  const { primaryColor, secondaryColor } = colors;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor ?? getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
};

export default IconReact;