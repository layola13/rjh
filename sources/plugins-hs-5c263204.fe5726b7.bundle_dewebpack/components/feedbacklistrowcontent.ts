import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';

interface FeedbackListRowContentProps {
  text: string;
  showImageIcon?: boolean;
  extended?: boolean;
  onExtend?: () => void;
}

export const FeedbackListRowContent: React.FC<FeedbackListRowContentProps> = ({
  text,
  showImageIcon = false,
  extended = false,
  onExtend
}) => {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const scrollWidth = element.scrollWidth || 0;
    const offsetWidth = element.offsetWidth || 0;

    if (scrollWidth > offsetWidth) {
      setIsOverflowing(true);
    }
  }, []);

  return (
    <span className="feedback-list-row-content">
      <span 
        className="feedback-list-row-content-text" 
        ref={textRef}
      >
        {text}
      </span>
      <span className="feedback-list-row-content-icons">
        {showImageIcon && (
          <span className="feedback-list-row-content-img-icon">
            <Icons type="hs_xian_tupiancankao" />
          </span>
        )}
        {(isOverflowing || showImageIcon) && (
          <span 
            className="feedback-list-row-content-extend-icon" 
            onClick={onExtend}
          >
            <Icons 
              type={extended ? "hs_xiao_danjiantou_shang" : "hs_xiao_danjiantou_xia"} 
            />
          </span>
        )}
      </span>
    </span>
  );
};