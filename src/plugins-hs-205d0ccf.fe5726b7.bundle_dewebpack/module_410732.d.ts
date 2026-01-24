import React from 'react';
import PropTypes from 'prop-types';

/**
 * Language information interface
 */
interface Language {
  /** Language code (e.g., 'en', 'zh', 'ja') */
  code: string;
  /** Display name of the language */
  displayName?: string;
  [key: string]: unknown;
}

/**
 * Region information interface
 */
interface Region {
  /** Region code (e.g., 'US', 'CN', 'JP') */
  code: string;
  /** Display name of the region */
  displayName: string;
  /** Available languages in this region */
  langs: Language[];
  [key: string]: unknown;
}

/**
 * Current selection state interface
 */
interface CurrentSelection {
  /** Currently selected region code */
  regioncode: string;
  /** Currently selected language code */
  langcode: string;
  [key: string]: unknown;
}

/**
 * Component props interface
 */
interface RegionItemProps {
  /** Region data to display */
  region: Region;
  /** Whether this region item is currently selected */
  selected?: boolean;
  /** Current active region and language selection */
  current: CurrentSelection;
  /** Callback fired when selection changes */
  onSelectedChange?: (regionCode: string, langCode?: string) => void;
}

/**
 * Component state interface
 */
interface RegionItemState {
  /** Internal selected state */
  selected: string;
}

/**
 * RegionItem component for displaying and selecting regions and their languages
 * @class RegionItem
 * @extends {React.Component<RegionItemProps, RegionItemState>}
 */
export default class RegionItem extends React.Component<RegionItemProps, RegionItemState> {
  static propTypes = {
    region: PropTypes.object,
    selected: PropTypes.bool,
    current: PropTypes.object,
    onSelectedChange: PropTypes.func
  };

  constructor(props: RegionItemProps) {
    super(props);
    
    this.state = {
      selected: ""
    };
    
    this.onClick = this.onClick.bind(this);
    this.onLangSelected = this.onLangSelected.bind(this);
  }

  /**
   * Handles click event on region item
   * Triggers selection callback if not already selected
   */
  onClick(): void {
    if (this.props.onSelectedChange && !this.props.selected) {
      this.props.onSelectedChange(this.props.region.code);
    }
  }

  /**
   * Handles language selection within the region
   * @param {string} langCode - The selected language code
   */
  onLangSelected(langCode: string): void {
    if (this.props.onSelectedChange) {
      this.props.onSelectedChange(this.props.region.code, langCode);
    }
  }

  /**
   * Renders the list of available languages for the region
   * @returns {React.ReactElement} Language list element
   */
  renderLangItems(): React.ReactElement {
    return (
      <ul className="lang-list">
        {this.props.region.langs.map((lang: Language) => (
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

  /**
   * Renders the region item component
   * @returns {React.ReactElement} Region item element
   */
  render(): React.ReactElement {
    const className = this.props.selected 
      ? "selected region-item" 
      : "region-item pointer";

    return (
      <li className={className} onClick={this.onClick}>
        <span>{this.props.region.displayName}</span>
        <Icon src={iconSource} />
        {this.props.selected ? this.renderLangItems() : null}
      </li>
    );
  }
}

/**
 * LangItem component props (referenced but not defined in source)
 */
interface LangItemProps {
  lang: Language;
  selected: boolean;
  onSelected: (langCode: string) => void;
}

/**
 * Icon component props (referenced but not defined in source)
 */
interface IconProps {
  src: string;
}

/** Placeholder for LangItem component import */
declare const LangItem: React.ComponentType<LangItemProps>;

/** Placeholder for Icon component import */
declare const Icon: React.ComponentType<IconProps>;

/** Placeholder for icon source import */
declare const iconSource: string;