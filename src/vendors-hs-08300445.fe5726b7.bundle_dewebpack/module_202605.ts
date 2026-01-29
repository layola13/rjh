import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import TextArea from './TextArea';
import KeyCode from './KeyCode';
import Dropdown from './Dropdown';
import { MentionsContextProvider } from './MentionsContext';
import Option from './Option';
import {
  getBeforeSelectionText,
  getLastMeasureIndex,
  replaceWithMeasure,
  setInputSelection,
  omit,
  validateSearch as defaultValidateSearch,
  filterOption as defaultFilterOption
} from './utils';

interface OptionData {
  value?: string;
  label?: React.ReactNode;
  disabled?: boolean;
  key?: string | number;
  [key: string]: unknown;
}

interface MeasureIndex {
  location: number;
  prefix: string;
}

interface ReplaceResult {
  text: string;
  selectionLocation: number;
}

interface MentionsProps {
  prefixCls?: string;
  prefix?: string | string[];
  split?: string;
  value?: string;
  defaultValue?: string;
  className?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  notFoundContent?: React.ReactNode;
  placement?: 'top' | 'bottom';
  direction?: 'ltr' | 'rtl';
  transitionName?: string;
  rows?: number;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  validateSearch?: (text: string, props: MentionsProps) => boolean;
  filterOption?: (input: string, option: OptionData) => boolean;
  onChange?: (value: string) => void;
  onSelect?: (option: OptionData, prefix: string) => void;
  onSearch?: (text: string, prefix: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onPressEnter?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  children?: React.ReactNode;
}

interface MentionsState {
  value: string;
  measuring: boolean;
  measureLocation: number;
  measureText: string | null;
  measurePrefix: string;
  activeIndex: number;
  isFocus: boolean;
}

class Mentions extends Component<MentionsProps, MentionsState> {
  static Option = Option;

  static defaultProps = {
    prefixCls: 'rc-mentions',
    prefix: '@',
    split: ' ',
    validateSearch: defaultValidateSearch,
    filterOption: defaultFilterOption,
    notFoundContent: 'Not Found',
    rows: 1
  };

  static getDerivedStateFromProps(props: MentionsProps, state: MentionsState): Partial<MentionsState> | null {
    const updates: Partial<MentionsState> = {};
    
    if ('value' in props && props.value !== state.value) {
      updates.value = props.value || '';
    }
    
    return Object.keys(updates).length > 0 ? updates : null;
  }

  private focusId?: number;
  private textarea!: HTMLTextAreaElement;
  private measure!: HTMLDivElement;

  constructor(props: MentionsProps) {
    super(props);
    
    this.state = {
      value: props.defaultValue || props.value || '',
      measuring: false,
      measureLocation: 0,
      measureText: null,
      measurePrefix: '',
      activeIndex: 0,
      isFocus: false
    };
  }

  componentDidUpdate(): void {
    if (this.state.measuring) {
      this.measure.scrollTop = this.textarea.scrollTop;
    }
  }

  private triggerChange = (value: string): void => {
    const { onChange } = this.props;
    
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    
    onChange?.(value);
  };

  private onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = event.target.value;
    this.triggerChange(value);
  };

  private onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { which } = event;
    const { activeIndex, measuring } = this.state;

    if (!measuring) return;

    if (which === KeyCode.UP || which === KeyCode.DOWN) {
      const optionsLength = this.getOptions().length;
      const offset = which === KeyCode.UP ? -1 : 1;
      const newActiveIndex = (activeIndex + offset + optionsLength) % optionsLength;
      
      this.setState({ activeIndex: newActiveIndex });
      event.preventDefault();
    } else if (which === KeyCode.ESC) {
      this.stopMeasure();
    } else if (which === KeyCode.ENTER) {
      event.preventDefault();
      
      const options = this.getOptions();
      if (!options.length) {
        this.stopMeasure();
        return;
      }
      
      const selectedOption = options[activeIndex];
      this.selectOption(selectedOption);
    }
  };

  private onKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { key, which } = event;
    const { measureText, measuring } = this.state;
    const { prefix = '', onSearch, validateSearch } = this.props;

    const target = event.target as HTMLTextAreaElement;
    const beforeText = getBeforeSelectionText(target);
    const { location, prefix: matchedPrefix } = getLastMeasureIndex(beforeText, prefix);

    const ignoreKeys = [KeyCode.ESC, KeyCode.UP, KeyCode.DOWN, KeyCode.ENTER];
    if (ignoreKeys.includes(which)) return;

    if (location !== -1) {
      const searchText = beforeText.slice(location + matchedPrefix.length);
      const isValid = validateSearch?.(searchText, this.props) ?? true;
      const hasOptions = !!this.getOptions(searchText).length;

      if (isValid) {
        const shouldStart = key === matchedPrefix || 
                          key === 'Shift' || 
                          measuring || 
                          (searchText !== measureText && hasOptions);
        
        if (shouldStart) {
          this.startMeasure(searchText, matchedPrefix, location);
        }
      } else if (measuring) {
        this.stopMeasure();
      }

      if (onSearch && isValid) {
        onSearch(searchText, matchedPrefix);
      }
    } else if (measuring) {
      this.stopMeasure();
    }
  };

  private onPressEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { measuring } = this.state;
    const { onPressEnter } = this.props;

    if (!measuring && onPressEnter) {
      onPressEnter(event);
    }
  };

  private onInputFocus = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
    this.onFocus(event);
  };

  private onInputBlur = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
    this.onBlur(event);
  };

  private onDropdownFocus = (): void => {
    this.onFocus();
  };

  private onDropdownBlur = (): void => {
    this.onBlur();
  };

  private onFocus = (event?: React.FocusEvent<HTMLTextAreaElement>): void => {
    window.clearTimeout(this.focusId);
    
    const { isFocus } = this.state;
    const { onFocus } = this.props;

    if (!isFocus && event && onFocus) {
      onFocus(event);
    }

    this.setState({ isFocus: true });
  };

  private onBlur = (event?: React.FocusEvent<HTMLTextAreaElement>): void => {
    this.focusId = window.setTimeout(() => {
      const { onBlur } = this.props;
      
      this.setState({ isFocus: false });
      this.stopMeasure();
      
      if (onBlur && event) {
        onBlur(event);
      }
    }, 0);
  };

  private selectOption = (option: OptionData): void => {
    const { value, measureLocation, measurePrefix } = this.state;
    const { split, onSelect } = this.props;
    
    const targetText = option.value ?? '';
    const { text, selectionLocation }: ReplaceResult = replaceWithMeasure(value, {
      measureLocation,
      targetText,
      prefix: measurePrefix,
      selectionStart: this.textarea.selectionStart,
      split
    });

    this.triggerChange(text);
    this.stopMeasure(() => {
      setInputSelection(this.textarea, selectionLocation);
    });

    onSelect?.(option, measurePrefix);
  };

  private setActiveIndex = (index: number): void => {
    this.setState({ activeIndex: index });
  };

  private setTextAreaRef = (element: typeof TextArea | null): void => {
    if (element) {
      this.textarea = element.resizableTextArea?.textArea;
    }
  };

  private setMeasureRef = (element: HTMLDivElement | null): void => {
    if (element) {
      this.measure = element;
    }
  };

  private getOptions = (searchText?: string): OptionData[] => {
    const text = searchText ?? this.state.measureText ?? '';
    const { children, filterOption } = this.props;

    const childArray = React.Children.toArray(children) as ReactElement[];
    
    const options: OptionData[] = childArray.map(child => ({
      ...child.props,
      key: child.key ?? child.props.value
    }));

    if (filterOption === false) {
      return options;
    }

    return options.filter(option => filterOption?.(text, option) ?? true);
  };

  private startMeasure(text: string, prefix: string, location: number): void {
    this.setState({
      measuring: true,
      measureText: text,
      measurePrefix: prefix,
      measureLocation: location,
      activeIndex: 0
    });
  }

  private stopMeasure(callback?: () => void): void {
    this.setState({
      measuring: false,
      measureLocation: 0,
      measureText: null
    }, callback);
  }

  focus(): void {
    this.textarea.focus();
  }

  blur(): void {
    this.textarea.blur();
  }

  render(): React.ReactNode {
    const { value, measureLocation, measurePrefix, measuring, activeIndex } = this.state;
    const {
      prefixCls,
      placement,
      direction,
      transitionName,
      className,
      style,
      autoFocus,
      notFoundContent,
      getPopupContainer,
      ...restProps
    } = this.props;

    const textAreaProps = omit(restProps, 
      'value', 'defaultValue', 'prefix', 'split', 'children', 
      'validateSearch', 'filterOption', 'onSelect', 'onSearch'
    );

    const options = measuring ? this.getOptions() : [];

    return (
      <div className={classNames(prefixCls, className)} style={style}>
        <TextArea
          autoFocus={autoFocus}
          ref={this.setTextAreaRef}
          value={value}
          {...textAreaProps}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onPressEnter={this.onPressEnter}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
        />
        {measuring && (
          <div ref={this.setMeasureRef} className={`${prefixCls}-measure`}>
            {value.slice(0, measureLocation)}
            <MentionsContextProvider
              value={{
                notFoundContent,
                activeIndex,
                setActiveIndex: this.setActiveIndex,
                selectOption: this.selectOption,
                onFocus: this.onDropdownFocus,
                onBlur: this.onDropdownBlur
              }}
            >
              <Dropdown
                prefixCls={prefixCls}
                transitionName={transitionName}
                placement={placement}
                direction={direction}
                options={options}
                visible={true}
                getPopupContainer={getPopupContainer}
              >
                <span>{measurePrefix}</span>
              </Dropdown>
            </MentionsContextProvider>
            {value.slice(measureLocation + measurePrefix.length)}
          </div>
        )}
      </div>
    );
  }
}

export default Mentions;