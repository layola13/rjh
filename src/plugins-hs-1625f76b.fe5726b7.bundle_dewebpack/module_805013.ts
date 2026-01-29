import React from 'react';

interface TagItem {
  dispName: string;
  needInput?: boolean;
  inputFieldLabel?: string;
  textExpression?: string;
}

interface TagGroup {
  label: string;
  hasTagField: boolean;
  items: (TagItem | string)[];
}

interface TagInfoData {
  items: TagGroup[];
  emptyDesc: string;
}

interface TagInfoProps {
  data: TagInfoData;
}

interface TagInfoState {
  items: TagGroup[];
  emptyDesc: string;
}

export default class TagInfo extends React.Component<TagInfoProps, TagInfoState> {
  constructor(props: TagInfoProps) {
    super(props);
    
    const { items, emptyDesc } = props.data;
    
    this.state = {
      items,
      emptyDesc
    };
  }

  static getDerivedStateFromProps(props: TagInfoProps, state: TagInfoState): Partial<TagInfoState> | null {
    const { items, emptyDesc } = props.data;
    
    if (items !== state.items || emptyDesc !== state.emptyDesc) {
      return {
        items,
        emptyDesc
      };
    }
    
    return null;
  }

  render(): React.ReactElement {
    const { items } = this.state;
    const tagElements: React.ReactElement[] = [];

    items.forEach((group: TagGroup) => {
      const itemElements: React.ReactElement[] = [];

      if (group.hasTagField) {
        group.items.forEach((item) => {
          const tagItem = item as TagItem;
          
          if (tagItem.needInput) {
            itemElements.push(
              <span className="tagItemName" key={`name-${tagItem.dispName}`}>
                {tagItem.dispName}
              </span>
            );
            itemElements.push(
              <span className="tagItemLabel" key={`label-${tagItem.dispName}`}>
                {tagItem.inputFieldLabel}:
              </span>
            );
            itemElements.push(
              <span key={`expr-${tagItem.dispName}`}>
                {tagItem.textExpression}
              </span>
            );
          } else {
            itemElements.push(
              <span className="tagItemName" key={`name-${tagItem.dispName}`}>
                {tagItem.dispName}
              </span>
            );
          }
        });
      } else if (group.items.length > 0) {
        const concatenatedItems = (group.items as string[]).join(', ');
        itemElements.push(
          <span className="tagItemName" key={`concat-${group.label}`}>
            {concatenatedItems}
          </span>
        );
      }

      tagElements.push(
        <div className="tagItem" key={group.label}>
          <span className="tagItemLabelFixWidth">{group.label}:</span>
          {itemElements}
        </div>
      );
    });

    const emptyLabel = items.length === 0 ? (
      <div className="emptyLabel">{this.state.emptyDesc}</div>
    ) : null;

    return (
      <div className="tagInfo">
        {tagElements}
        <div className="tagBtnItem">{emptyLabel}</div>
      </div>
    );
  }
}