import React from 'react';

interface RenderItemProps {
  data: unknown;
  entity: unknown;
}

function getRenderItem(data: unknown, entity: unknown): React.ReactElement {
  return React.createElement<RenderItemProps>(
    React.Component,
    {
      data,
      entity
    }
  );
}

export default getRenderItem;