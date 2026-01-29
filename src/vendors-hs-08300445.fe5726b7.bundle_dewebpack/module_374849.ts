import React, { forwardRef, useState, useEffect, ForwardedRef, ReactElement } from 'react';
import { isMobileDevice } from './utils/deviceDetection';
import PopupOverlay from './PopupOverlay';
import DesktopPopup from './DesktopPopup';
import MobilePopup from './MobilePopup';

interface PopupProps {
  visible: boolean;
  mobile?: boolean;
  [key: string]: unknown;
}

const Popup = forwardRef<HTMLDivElement, PopupProps>(
  (props: PopupProps, ref: ForwardedRef<HTMLDivElement>): ReactElement => {
    const { visible, mobile, ...restProps } = props;

    const [isVisible, setIsVisible] = useState<boolean>(visible);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const popupProps = {
      ...restProps,
      visible: isVisible,
    };

    useEffect(() => {
      setIsVisible(visible);
      if (visible && mobile) {
        setIsMobile(isMobileDevice());
      }
    }, [visible, mobile]);

    const popupComponent = isMobile ? (
      <MobilePopup {...popupProps} mobile={mobile} ref={ref} />
    ) : (
      <DesktopPopup {...popupProps} ref={ref} />
    );

    return (
      <div>
        <PopupOverlay {...popupProps} />
        {popupComponent}
      </div>
    );
  }
);

Popup.displayName = 'Popup';

export default Popup;