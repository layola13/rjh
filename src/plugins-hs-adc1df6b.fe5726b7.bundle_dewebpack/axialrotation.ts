export interface AxialRotationData {
  label?: string;
  valueData: unknown;
  labelData: unknown;
  className?: string;
  disabled?: boolean;
  onValueChangeStart?: () => void;
  onValueChanged?: (value: unknown) => void;
  onValueChangeEnd?: () => void;
  [key: string]: unknown;
}

export interface AxialRotationProps {
  data: AxialRotationData;
  id: string;
}

export function AxialRotation({ data, id }: AxialRotationProps): JSX.Element {
  const {
    label,
    valueData,
    labelData,
    className = '',
    disabled = false,
    onValueChangeStart,
    onValueChanged,
    onValueChangeEnd,
    ...restProps
  } = data;

  const containerClassName = `property-bar-axialrotation ${className}${disabled ? ' disabled' : ''}`;

  return (
    <div id={id} className={containerClassName}>
      {label && (
        <SmartText className="property-bar-label axial-rotation-label">
          {label}
        </SmartText>
      )}
      <AxialRotation
        data={valueData}
        label={labelData}
        className={className}
        onStart={onValueChangeStart}
        onChange={onValueChanged}
        onEnd={onValueChangeEnd}
        {...restProps}
      />
    </div>
  );
}

interface SmartTextProps {
  className: string;
  children: React.ReactNode;
}

declare const SmartText: React.FC<SmartTextProps>;

interface InnerAxialRotationProps {
  data: unknown;
  label: unknown;
  className?: string;
  onStart?: () => void;
  onChange?: (value: unknown) => void;
  onEnd?: () => void;
  [key: string]: unknown;
}

declare const AxialRotation: React.FC<InnerAxialRotationProps>;