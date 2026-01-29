interface CheckboardProps {
  white?: string;
  grey?: string;
  size?: number;
  renderers?: {
    canvas?: CanvasRenderingContext2D;
  };
  borderRadius?: string;
  boxShadow?: string;
}

interface StyleSheet {
  grid: React.CSSProperties;
}

const DEFAULT_SIZE = 8;
const DEFAULT_WHITE_COLOR = "transparent";
const DEFAULT_GREY_COLOR = "rgba(0, 0, 0, .08)";

export const Checkboard: React.FC<CheckboardProps> & {
  defaultProps: Partial<CheckboardProps>;
} = (props) => {
  const {
    white = DEFAULT_WHITE_COLOR,
    grey = DEFAULT_GREY_COLOR,
    size = DEFAULT_SIZE,
    renderers = {},
    borderRadius,
    boxShadow,
  } = props;

  const styles: StyleSheet = {
    grid: {
      borderRadius,
      boxShadow,
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: `url(${getCheckboardPattern(white, grey, size, renderers.canvas)}) center left`,
    },
  };

  return <div style={styles.grid} />;
};

Checkboard.defaultProps = {
  size: DEFAULT_SIZE,
  white: DEFAULT_WHITE_COLOR,
  grey: DEFAULT_GREY_COLOR,
  renderers: {},
};

function getCheckboardPattern(
  white: string,
  grey: string,
  size: number,
  canvas?: CanvasRenderingContext2D
): string {
  // Implementation depends on the actual 'o.get' function
  // Placeholder return for type safety
  return "";
}

export default Checkboard;