import { useContext, useMemo, createElement, ReactNode, ComponentType } from 'react';
import Cell from './Cell';
import Context from './Context';

interface ExpandedRowProps {
  prefixCls: string;
  children: ReactNode;
  component: ComponentType<any>;
  cellComponent: ComponentType<any>;
  fixHeader: boolean;
  fixColumn: boolean;
  horizonScroll: boolean;
  className?: string;
  expanded: boolean;
  componentWidth: number;
  colSpan: number;
}

interface ContextValue {
  scrollbarSize: number;
}

export default function ExpandedRow(props: ExpandedRowProps): JSX.Element {
  const {
    prefixCls,
    children,
    component: Component,
    cellComponent,
    fixHeader,
    fixColumn,
    horizonScroll,
    className,
    expanded,
    componentWidth,
    colSpan
  } = props;

  const { scrollbarSize } = useContext<ContextValue>(Context);

  return useMemo(() => {
    let content = children;

    if (fixColumn) {
      const fixedWidth = componentWidth - (fixHeader ? scrollbarSize : 0);
      
      content = createElement('div', {
        style: {
          width: fixedWidth,
          position: 'sticky' as const,
          left: 0,
          overflow: 'hidden'
        },
        className: `${prefixCls}-expanded-row-fixed`
      }, content);
    }

    return createElement(Component, {
      className,
      style: {
        display: expanded ? null : 'none'
      }
    }, createElement(Cell, {
      component: cellComponent,
      prefixCls,
      colSpan
    }, content));
  }, [
    children,
    Component,
    fixHeader,
    horizonScroll,
    className,
    expanded,
    componentWidth,
    colSpan,
    scrollbarSize
  ]);
}