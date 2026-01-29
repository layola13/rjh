import { useRef, useEffect, createElement } from 'react';
import ReactDOM from 'react-dom';
import { Image } from 'antd';
import { IconfontView } from './IconfontView';

interface CustomizedImageProps {
  src: string;
  alt?: string;
  preview?: boolean | object;
  wrapperClassName?: string;
}

export default function CustomizedAntImage(props: CustomizedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const maskInfo = containerRef.current.querySelector('.ant-image-mask-info');
      
      if (maskInfo) {
        const iconContainer = document.createElement('div');
        
        ReactDOM.render(
          createElement(IconfontView, {
            customClass: 'expand-icon',
            showType: 'hs_xian_zhankai',
            customStyle: {
              color: '#1C1C1C',
              fontSize: '18px'
            }
          }),
          iconContainer
        );
        
        maskInfo.replaceChildren(iconContainer);
      }
    }
  }, []);

  return createElement(
    'div',
    {
      className: 'customized-ant-image',
      ref: containerRef
    },
    createElement(Image, {
      src: props.src,
      alt: props.alt,
      preview: props.preview,
      wrapperClassName: props.wrapperClassName
    })
  );
}