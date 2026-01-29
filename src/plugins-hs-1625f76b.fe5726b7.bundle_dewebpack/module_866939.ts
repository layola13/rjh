import React from 'react';

interface PropertyBarTextProps {
  label: string;
}

const PropertyBarText: React.FC<PropertyBarTextProps> = ({ label }) => {
  return (
    <div className="property-bar-text">
      {label}
    </div>
  );
};

export default function createPropertyBarText(label: string): React.ReactElement {
  return <PropertyBarText label={label} />;
}