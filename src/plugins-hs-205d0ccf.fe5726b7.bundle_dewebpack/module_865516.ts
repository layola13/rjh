import React, { useState, useEffect } from 'react';
import { queryArticleByPeriod } from './api';

interface Article {
  period: string;
  [key: string]: unknown;
}

interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

interface PeriodGroup {
  period: string;
  articles: Article[];
  isNew?: boolean;
}

interface QueryResponse {
  items: Article[];
  total: number;
}

interface PeriodPageProps {
  backIcon?: React.ReactNode;
  close?: () => void;
}

const DEFAULT_PAGE_SIZE = 50;

function groupArticlesByPeriod(articles: Article[] | null | undefined): PeriodGroup[] | undefined {
  if (!articles?.length) {
    return undefined;
  }

  const groupMap: Record<string, Article[]> = {};
  
  articles.forEach((article) => {
    const period = article.period;
    if (!groupMap[period]) {
      groupMap[period] = [];
    }
    groupMap[period].push(article);
  });

  return Object.entries(groupMap).map(([period, articles]) => ({
    period,
    articles
  }));
}

function PeriodPage(props: PeriodPageProps): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [periodGroups, setPeriodGroups] = useState<PeriodGroup[] | undefined>();
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    total: 0,
    pageSize: DEFAULT_PAGE_SIZE,
    onChange: (page: number) => {
      fetchArticles(page);
    }
  });

  const fetchArticles = async (page: number): Promise<void> => {
    const { pageSize } = pagination;
    setLoading(true);

    try {
      const response: QueryResponse = await queryArticleByPeriod({
        offset: page,
        limit: pageSize || DEFAULT_PAGE_SIZE
      });

      const groups = groupArticlesByPeriod(response.items);

      if (page === 1 && groups?.length) {
        groups[0].isNew = true;
      }

      setPeriodGroups(groups);
      setPagination((prev) => ({
        ...prev,
        current: page,
        total: response.total
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, []);

  const headerComponent = React.createElement('Header', {
    left: props.backIcon,
    hiddenSearchBtn: true,
    close: props.close
  });

  return React.createElement('Layout', {
    top: headerComponent,
    loading,
    showPagination: true,
    paginationProps: pagination
  }, periodGroups?.map((group) => 
    React.createElement('PeriodArticleList', {
      key: group.period,
      style: { marginBottom: 20 },
      ...group,
      from: {
        id: group.period,
        name: group.period
      }
    })
  ));
}

PeriodPage.pageInfo = {
  name: 'PeriodPage',
  text: '周期页面'
};

export default PeriodPage;