import { useContext, createElement, ReactElement } from 'react';
import type { GenerateConfig } from './generate';
import Header from './Header';
import { DECADE_DISTANCE_COUNT } from './constants';
import PanelContext from './PanelContext';

interface DecadeHeaderProps<DateType> {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  viewDate: DateType;
  onPrevDecades?: () => void;
  onNextDecades?: () => void;
}

export default function DecadeHeader<DateType>(
  props: DecadeHeaderProps<DateType>
): ReactElement | null {
  const {
    prefixCls,
    generateConfig,
    viewDate,
    onPrevDecades,
    onNextDecades
  } = props;

  const { hideHeader } = useContext(PanelContext);

  if (hideHeader) {
    return null;
  }

  const headerPrefixCls = `${prefixCls}-header`;
  const currentYear = generateConfig.getYear(viewDate);
  const startDecade = Math.floor(currentYear / DECADE_DISTANCE_COUNT) * DECADE_DISTANCE_COUNT;
  const endDecade = startDecade + DECADE_DISTANCE_COUNT - 1;

  return createElement(
    Header,
    {
      ...props,
      prefixCls: headerPrefixCls,
      onSuperPrev: onPrevDecades,
      onSuperNext: onNextDecades
    },
    `${startDecade}-${endDecade}`
  );
}