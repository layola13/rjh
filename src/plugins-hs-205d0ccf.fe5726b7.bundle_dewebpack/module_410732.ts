import React from 'react';

interface Language {
  code: string;
  displayName?: string;
}

interface Region {
  code: string;
  displayName: string;
  langs: Language[];
}

interface CurrentSelection {
  regioncode: string;
  langcode: string;
}

interface RegionItemProps {
  region: Region;
  selected: boolean;
  current: CurrentSelection;
  onSelectedChange?: (regionCode: string, langCode?: string) => void;
}

interface RegionItemState {
  selected: string;
}

class RegionItem extends React.Component<RegionItemProps, RegionItemState> {
  constructor(props: RegionItemProps) {
    super(props);
    this.state = {
      selected: ''
    };
    this.onClick = this.onClick.bind(this);
    this.onLangSelected = this.onLangSelected.bind(this);
  }

  onClick(): void {
    if (this.props.onSelectedChange && !this.props.selected) {
      this.props.onSelectedChange(this.props.region.code);
    }
  }

  onLangSelected(langCode: string): void {
    if (this.props.onSelectedChange) {
      this.props.onSelectedChange(this.props.region.code, langCode);
    }
  }

  renderLangItems(): React.ReactElement {
    return (
      <ul className="lang-list">
        {this.props.region.langs.map((lang) => (
          <LangItem
            key={lang.code}
            lang={lang}
            selected={
              this.props.region.code === this.props.current.regioncode &&
              lang.code === this.props.current.langcode
            }
            onSelected={this.onLangSelected}
          />
        ))}
      </ul>
    );
  }

  render(): React.ReactElement {
    return (
      <li
        className={this.props.selected ? 'selected region-item' : 'region-item pointer'}
        onClick={this.onClick}
      >
        <span>{this.props.region.displayName}</span>
        <Icon src={iconSource} />
        {this.props.selected ? this.renderLangItems() : null}
      </li>
    );
  }
}

export default RegionItem;