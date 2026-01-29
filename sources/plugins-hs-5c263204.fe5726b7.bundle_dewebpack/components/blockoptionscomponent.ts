import React, { useState } from 'react';
import { Pagination } from 'antd';
import { RadioGroup, Radio, IconfontView, Modal } from './components';
import './BlockOptionsComponent.css';

interface BlockOption {
  value: string;
  [key: string]: unknown;
}

interface BlockOptionsComponentProps {
  options: BlockOption[];
  value: string;
  onClick: (value: string) => void;
  ossImageParam?: string;
  isHiddenWatermark?: boolean;
}

const DEFAULT_PAGE_SIZE = 4;
const DEFAULT_OSS_IMAGE_PARAM = 'image/resize,w_100,m_lfit';
const ZOOM_ICON_FONT_SIZE = '16px';
const ZOOM_ICON_COLOR = '#FFFFFF';

export const BlockOptionsComponent: React.FC<BlockOptionsComponentProps> = (props) => {
  const totalPages = Math.ceil(props.options.length / DEFAULT_PAGE_SIZE);
  
  const [displayedOptions, setDisplayedOptions] = useState<BlockOption[]>(
    props.options.slice(0, DEFAULT_PAGE_SIZE)
  );
  
  const [selectedValue, setSelectedValue] = useState<string>(props.value);
  
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleOptionClick = (value: string): void => {
    if (selectedValue !== value) {
      props.onClick(value);
      setSelectedValue(value);
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event?.target?.value;
    if (value !== undefined) {
      handleOptionClick(value);
    }
  };

  const handleZoomIconClick = (imageUrl: string): void => {
    const imageContent = props.isHiddenWatermark 
      ? React.createElement(
          'div',
          { className: 'block-options-zoom-image-content' },
          React.createElement('img', { src: imageUrl }),
          React.createElement('div', { className: 'block-override-logo' })
        )
      : React.createElement('img', { src: imageUrl });

    Modal.basic({
      title: ResourceManager.getString('homegpt_description_View_Image'),
      enableCheckbox: false,
      hideOkButton: true,
      hideCancelButton: true,
      content: imageContent,
      className: props.isHiddenWatermark ? 'block-options-override-watermark' : ''
    });
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    const startIndex = DEFAULT_PAGE_SIZE * (page - 1);
    const endIndex = DEFAULT_PAGE_SIZE * page;
    setDisplayedOptions(props.options.slice(startIndex, endIndex));
  };

  const getImageUrl = (baseUrl: string): string => {
    const ossParam = props.ossImageParam ?? DEFAULT_OSS_IMAGE_PARAM;
    return `${baseUrl}?x-oss-process=${ossParam}`;
  };

  const isOptionChecked = (optionValue: string): boolean => {
    return selectedValue?.includes(optionValue) ?? false;
  };

  return React.createElement(
    'div',
    { className: 'block-options' },
    React.createElement(
      RadioGroup,
      {
        value: selectedValue,
        onChange: handleRadioChange
      },
      displayedOptions.map((option) =>
        React.createElement(
          'div',
          {
            className: `block-option-item ${isOptionChecked(option.value) ? 'block-option-item-checked' : ''}`,
            onClick: () => handleOptionClick(option.value)
          },
          React.createElement(Radio, {
            key: option.value,
            value: option.value
          }),
          React.createElement('img', {
            src: getImageUrl(option.value)
          }),
          React.createElement(
            'div',
            { className: 'block-option-zoom-image' },
            React.createElement(IconfontView, {
              showType: 'hs_xian_sousuo',
              hoverColor: ZOOM_ICON_COLOR,
              customClass: 'zoom-icon',
              customStyle: {
                color: ZOOM_ICON_COLOR,
                fontSize: ZOOM_ICON_FONT_SIZE
              },
              iconOnclick: () => handleZoomIconClick(option.value)
            })
          )
        )
      )
    ),
    totalPages > 1 &&
      React.createElement(
        'div',
        { className: 'block-options-pagination' },
        React.createElement(Pagination, {
          size: 'small',
          simple: true,
          defaultCurrent: currentPage,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          total: props.options.length,
          onChange: handlePageChange
        })
      )
  );
};