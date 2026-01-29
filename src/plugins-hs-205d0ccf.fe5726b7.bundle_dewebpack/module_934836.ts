import React, { useContext } from 'react';
import { Icons } from './Icons';
import { ThemeContext } from './ThemeContext';
import ArticleItem from './ArticleItem';
import './styles.css';

interface Article {
  [key: string]: unknown;
}

interface PeriodItemProps {
  from: string;
  className?: string;
  style?: React.CSSProperties;
  period: string;
  articles: Article[];
  isNew?: boolean;
  showMore?: boolean;
  onMoreClick?: () => void;
}

function NewBadge(): JSX.Element {
  return <span className="new-span">NEW</span>;
}

export default function PeriodItem(props: PeriodItemProps): JSX.Element {
  const {
    from,
    className = '',
    style,
    period,
    articles,
    isNew,
    showMore,
    onMoreClick,
  } = props;

  const moreText = ResourceManager.getString('plugin_teaching_ability_more');
  const theme = useContext(ThemeContext);

  return (
    <div className={`period-item-wrapper ${className} ${theme}`} style={style}>
      <div className="period-name">
        <span className="title">{period}</span>
        {isNew && <NewBadge />}
        {showMore && (
          <span className="period-more" onClick={onMoreClick}>
            <span className="period-more-text">{moreText}</span>
            <Icons type="hs_xiao_danjiantou_you" className="period-more_you" />
          </span>
        )}
      </div>
      {articles.map((article) => (
        <ArticleItem key={article.id} {...article} from={from} />
      ))}
    </div>
  );
}