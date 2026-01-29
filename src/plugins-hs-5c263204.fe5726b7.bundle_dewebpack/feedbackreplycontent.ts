import React from 'react';
import { ThemeContext } from './ThemeContext';
import { getTime } from './utils';

interface FeedbackReplyContentProps {
  images?: string[];
  date: number | string;
  content: string;
  onShowCarouselModal: (images: string[]) => void;
  title: string;
}

/**
 * Feedback reply content component that displays reply information including
 * title, date, content, and optional images with carousel support.
 */
export class FeedbackReplyContent extends React.Component<FeedbackReplyContentProps> {
  static contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;

  render(): React.ReactElement {
    const { images, date, content, onShowCarouselModal, title } = this.props;

    return (
      <div className={`feedback-list-row-reply ${this.context}`}>
        <div>
          <div className="feedback-list-row-reply-header">
            <span className="feedback-list-row-reply-title">{title}</span>
            <span className="feedback-list-divider" />
            <span className="feedback-list-row-reply-time">{getTime(date)}</span>
          </div>
          <div className="feedback-list-row-reply-content">{content}</div>
        </div>
        {images && images.length > 0 && (
          <div className="feedback-list-row-reply-images">
            {images.map((imageUrl, index) =>
              index < 3 ? (
                <div
                  key={index}
                  className="feedback-list-row-reply-image"
                  onClick={() => onShowCarouselModal(images)}
                >
                  <img src={imageUrl} alt={`Reply image ${index + 1}`} />
                  {index === 2 && images.length > 3 && (
                    <div className="feedback-list-row-reply-image-mask">
                      <span className="feedback-list-row-reply-image-mask-count">
                        {images.length - 2}
                      </span>
                      <span className="feedback-list-row-reply-image-mask-tip">更多</span>
                    </div>
                  )}
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    );
  }
}