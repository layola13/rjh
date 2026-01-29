interface TrackProps {
  className?: string;
  included: boolean;
  vertical: boolean;
  style?: React.CSSProperties;
  length: number;
  offset: number;
  reverse: boolean;
}

const Track: React.FC<TrackProps> = ({
  className,
  included,
  vertical,
  style,
  length,
  offset,
  reverse
}) => {
  let adjustedLength = length;
  let adjustedOffset = offset;
  let isReversed = reverse;

  if (length < 0) {
    isReversed = !isReversed;
    adjustedLength = Math.abs(length);
    adjustedOffset = 100 - offset;
  }

  const positionStyle: React.CSSProperties = vertical
    ? {
        [isReversed ? "top" : "bottom"]: `${adjustedOffset}%`,
        [isReversed ? "bottom" : "top"]: "auto",
        height: `${adjustedLength}%`
      }
    : {
        [isReversed ? "right" : "left"]: `${adjustedOffset}%`,
        [isReversed ? "left" : "right"]: "auto",
        width: `${adjustedLength}%`
      };

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...positionStyle
  };

  return included ? (
    <div className={className} style={combinedStyle} />
  ) : null;
};

export default Track;