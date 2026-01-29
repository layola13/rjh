import React, { useMemo } from 'react';
import { Signal } from './Signal';
import { WithViewProps } from './WithViewProps';
import ArticleViewPage from './ArticleViewPage';
import { useTheme } from './useTheme';

export enum TagType {
  // Define your tag types here based on your application logic
}

interface TagData {
  type: string;
  name: string;
  color: string;
}

interface ArticleItemProps {
  tag?: string | TagData;
  articleTitle: string;
  keywords?: string[];
  keys?: string[];
  articleUrl: string;
  from?: string;
  push?: (params: { Page: React.ComponentType; data: Record<string, unknown> }) => void;
}

interface KeywordItemProps {
  keywords?: string[];
  keys?: string[];
}

interface TagSpanProps {
  name: string;
  color: string;
}

interface HighlightTextParams {
  keys?: string[];
  text: string;
}

interface ArticleViewOpenPayload extends ArticleItemProps {
  from?: string;
}

function highlightText(params: HighlightTextParams): string {
  const { keys, text } = params;
  let result = text;

  keys?.forEach((key) => {
    if (!key.includes('em')) {
      const regex = new RegExp(`((?<!<em>)${key})`, 'ig');
      result = result.replace(regex, '<em>$1</em>');
    }
  });

  return result;
}

function KeywordList(props: KeywordItemProps): JSX.Element | null {
  const { keywords, keys } = props;

  if (!keywords) {
    return null;
  }

  const highlightedKeywords = useMemo(() => {
    return keywords.map((keyword) => ({
      _html: `#${highlightText({ keys, text: keyword })}`
    }));
  }, [keywords, keys]);

  return (
    <div className="key-word-wrapper">
      {highlightedKeywords.map((keyword, index) => (
        <span
          key={index}
          className="key-word"
          dangerouslySetInnerHTML={{ __html: keyword._html }}
        />
      ))}
    </div>
  );
}

function TagSpan(props: TagSpanProps): JSX.Element {
  const { name, color } = props;

  return (
    <div style={{ color }} className="tag-span">
      {name}
    </div>
  );
}

export function ArticleItem(props: ArticleItemProps): JSX.Element {
  const { tag, articleTitle, keywords, keys, onClick } = props;

  const parsedTag = useMemo<TagData | undefined>(() => {
    let tagData: TagData | undefined;

    if (typeof tag === 'string') {
      try {
        tagData = JSON.parse(tag);
      } catch (error) {
        tagData = undefined;
      }
    } else if (tag?.type) {
      tagData = tag as TagData;
    }

    return tagData?.type ? tagData : undefined;
  }, [tag]);

  const highlightedTitle = useMemo(() => {
    return highlightText({ keys, text: articleTitle });
  }, [articleTitle, keys]);

  const theme = useTheme();

  return (
    <div onClick={onClick} className={`item-wrapper ${theme}`}>
      <span className="dian">•</span>
      <div className="content">
        <div className="title">
          {parsedTag && <TagSpan {...parsedTag} />}
          {parsedTag && <span>｜</span>}
          <span
            className="title-content"
            dangerouslySetInnerHTML={{ __html: highlightedTitle }}
          />
        </div>
        <KeywordList keywords={keywords} keys={keys} />
      </div>
    </div>
  );
}

export const signalArticleViewOpen = new Signal<ArticleViewOpenPayload>();

export default WithViewProps<ArticleItemProps>((props) => {
  const handleClick = (): void => {
    signalArticleViewOpen.dispatch({
      ...props,
      from: props.from
    });

    const isFpTenant = (window as any).HSApp?.Config?.TENANT === 'fp';
    const finalUrl = isFpTenant
      ? (window as any).HSApp.Util.Url.addParams(props.articleUrl, { source: '3d' })
      : props.articleUrl;

    props.push?.({
      Page: ArticleViewPage,
      data: {
        url: finalUrl,
        title: props.articleTitle
      }
    });
  };

  return <ArticleItem {...props} onClick={handleClick} />;
});