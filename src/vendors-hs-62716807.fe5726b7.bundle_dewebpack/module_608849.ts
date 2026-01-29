import React, { forwardRef, CSSProperties, Ref } from 'react';
import Upload from './Upload';

interface DraggerProps {
  style?: CSSProperties;
  height?: string | number;
  [key: string]: unknown;
}

type DraggerRef = HTMLDivElement;

const Dragger = forwardRef<DraggerRef, DraggerProps>(
  (props, ref: Ref<DraggerRef>) => {
    const { style, height, ...restProps } = props;

    return (
      <Upload
        ref={ref}
        {...restProps}
        type="drag"
        style={{
          ...style,
          height
        }}
      />
    );
  }
);

Dragger.displayName = 'Dragger';

export default Dragger;