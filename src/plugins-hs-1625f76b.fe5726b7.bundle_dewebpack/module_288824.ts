import React from 'react';

interface LabelInputDisabledProps {
  label: string;
  value: string;
}

const LabelInputDisabled: React.FC<LabelInputDisabledProps> = ({ label, value }) => {
  return (
    <div className="property-string-disabled">
      <span className="property-string-disabled-label">{label}</span>
      <input
        className="property-string-disabled-input"
        type="text"
        value={value}
        disabled={true}
      />
    </div>
  );
};

export const getLabelInputDisabledCom = ({ label, value }: LabelInputDisabledProps): React.ReactElement => {
  return <LabelInputDisabled label={label} value={value} />;
};