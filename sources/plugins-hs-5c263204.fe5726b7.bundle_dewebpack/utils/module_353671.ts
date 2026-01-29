import { useContext, useMemo, createElement } from 'react';
import { Divider } from 'antd';
import { ThemeContext } from './ThemeContext';

interface FeedbackItem {
  name: string;
  count: number;
}

interface FeedbackStatisticsProps {
  data: FeedbackItem[];
}

export default function FeedbackStatistics({ data }: FeedbackStatisticsProps): JSX.Element {
  const theme = useContext(ThemeContext);
  
  const statisticsElements = useMemo(() => {
    const totalItems = data.length;
    
    return data.map((item, index) => {
      const isLastItem = index === totalItems - 1;
      
      return createElement(
        'div',
        {
          key: index,
          className: 'feedback-statistics'
        },
        createElement(
          'div',
          { className: 'feedback-statistic' },
          createElement(
            'div',
            { className: 'feedback-statistic-title' },
            item.name
          ),
          createElement(
            'div',
            { className: 'feedback-statistic-count' },
            item.count
          )
        ),
        !isLastItem
          ? createElement(Divider, {
              type: 'vertical',
              style: {
                height: '21px',
                margin: 'unset'
              }
            })
          : ''
      );
    });
  }, [data]);

  return createElement(
    'div',
    {
      className: `feedback-statistics-wrapper ${theme}`
    },
    statisticsElements
  );
}