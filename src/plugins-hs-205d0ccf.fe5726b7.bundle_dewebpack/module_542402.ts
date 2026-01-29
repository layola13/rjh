import React from 'react';

interface Language {
  code: string;
  displayName: string;
}

interface LanguageItemProps {
  lang: Language;
  selected?: boolean;
  onSelected?: (code: string) => void;
}

export default class LanguageItem extends React.Component<LanguageItemProps> {
  private onClick(): void {
    const { onSelected, selected, lang } = this.props;
    
    if (onSelected && !selected) {
      onSelected(lang.code);
    }
  }

  public render(): React.ReactElement {
    return (
      <li 
        className="lang-item pointer" 
        onClick={this.onClick.bind(this)}
      >
        <span>{this.props.lang.displayName}</span>
      </li>
    );
  }
}