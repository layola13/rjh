import PropTypes from 'prop-types';
import React from 'react';

interface SeparatorLineProps {
  isTopLevel?: boolean;
  visible?: boolean;
}

function SeparatorLine({ isTopLevel = false, visible = true }: SeparatorLineProps): React.ReactElement {
  const className = isTopLevel ? 'rightline' : 'bottomline';
  
  return React.createElement('li', {
    className,
    hidden: !visible
  });
}

SeparatorLine.propTypes = {
  isTopLevel: PropTypes.bool
};

SeparatorLine.defaultProps = {
  isTopLevel: false
};

export default SeparatorLine;