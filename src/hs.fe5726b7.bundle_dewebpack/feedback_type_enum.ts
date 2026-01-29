import React from 'react';
import { IconfontView } from './IconfontView';

export enum FEEDBACK_TYPE_ENUM {
  AUTORECOMMEND = 'recommend_autorecommend_feedback_tip',
  ACCESSORIES = 'recommend_accessories_feedback_tip',
  OTHERS = '其他'
}

interface FeedbackDialogProps {
  type: string;
  onClose: () => void;
  onSatisfy?: () => void;
  onUnSatisfy?: () => void;
}

export const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  type,
  onClose,
  onSatisfy,
  onUnSatisfy
}) => {
  const handleUnSatisfyClick = (): void => {
    onUnSatisfy?.();
    onClose();
  };

  const handleSatisfyClick = (): void => {
    onSatisfy?.();
    onClose();
  };

  return (
    <div className="feedback-dialog-wrapper">
      <span className="feedback-dialog-title">
        {ResourceManager.getString(type)}
      </span>
      <div className="feedback-dialog-btn">
        <span onClick={handleUnSatisfyClick}>
          <span className="not-satisfied-icon" />
          <span>{ResourceManager.getString('recommend_unsatisfy')}</span>
        </span>
        <span onClick={handleSatisfyClick}>
          <span className="satisfied-icon" />
          <span>{ResourceManager.getString('recommend_satisfy')}</span>
        </span>
      </div>
      <span className="close-btn" onClick={onClose}>
        <IconfontView
          showType="hs_xian_guanbi"
          customStyle={{ fontSize: '14px' }}
          clickColor="#396EFE"
          hoverBgColor="#f5f5f5"
          bgExtendSize={10}
        />
      </span>
    </div>
  );
};

export const FeedbackDialogFactory = (
  type: string,
  onClose: () => void = () => {},
  onSatisfy: () => void = () => {},
  onUnSatisfy: () => void = () => {}
): React.ReactElement => {
  return (
    <FeedbackDialog
      type={type}
      onClose={onClose}
      onSatisfy={onSatisfy}
      onUnSatisfy={onUnSatisfy}
    />
  );
};