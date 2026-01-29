import React from 'react';

interface Color {
  [key: string]: string;
}

interface SwatchesGroupProps {
  onClick: (color: string, event: React.MouseEvent) => void;
  onSwatchHover: (color: string, event: React.MouseEvent) => void;
  group: string[];
  active: string;
}

interface SwatchProps {
  color: string;
  active: boolean;
  first: boolean;
  last: boolean;
  onClick: (color: string, event: React.MouseEvent) => void;
  onSwatchHover: (color: string, event: React.MouseEvent) => void;
}

interface StyleObject {
  group: React.CSSProperties;
}

const useStyles = (): StyleObject => {
  return {
    group: {
      paddingBottom: '10px',
      width: '40px',
      float: 'left',
      marginRight: '10px'
    }
  };
};

const Swatch: React.FC<SwatchProps> = (props) => {
  return <div {...props} />;
};

export const SwatchesGroup: React.FC<SwatchesGroupProps> = ({
  onClick,
  onSwatchHover,
  group,
  active
}) => {
  const styles = useStyles();

  return (
    <div style={styles.group}>
      {group.map((color, index) => (
        <Swatch
          key={color}
          color={color}
          active={color.toLowerCase() === active}
          first={index === 0}
          last={index === group.length - 1}
          onClick={onClick}
          onSwatchHover={onSwatchHover}
        />
      ))}
    </div>
  );
};

export default SwatchesGroup;