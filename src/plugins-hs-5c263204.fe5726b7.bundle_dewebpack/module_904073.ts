import React from 'react';
import { DraggableModal, Icons } from './ComponentLibrary';
import ScrollContainer from './ScrollContainer';
import { hotkeyData, hotkeySymbol } from './hotkeyConstants';
import './styles.css';

interface HotkeyItem {
  key: string;
  value: string[];
  newDot?: boolean;
  noAddIcon?: boolean;
}

type HotkeySection = HotkeyItem[][];

interface HotkeyData {
  [key: string]: HotkeySection;
}

interface HotkeyModalProps {
  close: () => void;
  theme: string;
  selectedCategory?: number;
}

interface HotkeyModalState {
  selectedCategory: number;
}

interface ScrollEvent {
  scrollTop: number;
}

const EXCLUDED_HOTKEY_KEYS = ['toolbar_hotkeys_draw_arc_wall'];

export default class HotkeyModal extends React.Component<HotkeyModalProps, HotkeyModalState> {
  private draggableModal: React.RefObject<typeof DraggableModal>;
  private scrollScopeArr: number[];
  private hotkeyDataKeys: string[];
  private refs: {
    scrollContainer: {
      setScrollTop: (value: number) => void;
    };
  };

  constructor(props: HotkeyModalProps) {
    super(props);

    this.draggableModal = React.createRef();
    
    this.state = {
      selectedCategory: props.selectedCategory ?? 0
    };

    this.handleScrollUp = this.handleScrollUp.bind(this);
    this.handleScrollDown = this.handleScrollDown.bind(this);
    this.updateScrollView = this.updateScrollView.bind(this);

    if (HSApp.Config.TENANT !== 'fp' || HSApp.Config.ENABLE_CW2_GLOBAL) {
      EXCLUDED_HOTKEY_KEYS.push('concealedwork_catalog_model');
    }

    this.hotkeyDataKeys = HSApp.Config.TENANT === 'fp'
      ? Object.keys(hotkeyData).filter(key => !EXCLUDED_HOTKEY_KEYS.includes(key))
      : Object.keys(hotkeyData);

    this.scrollScopeArr = this.getScrollScope();
  }

  componentDidMount(): void {
    const { selectedCategory } = this.state;
    if (selectedCategory > 0) {
      this.refs.scrollContainer.setScrollTop(this.scrollScopeArr[selectedCategory - 1]);
    }
  }

  getScrollScope(): number[] {
    const scopeArray: number[] = [];
    let accumulatedHeight = 0;

    this.hotkeyDataKeys.forEach(key => {
      const section = hotkeyData[key];
      accumulatedHeight += 28;

      section.forEach(itemGroup => {
        const filteredItems = itemGroup.filter(
          item => !EXCLUDED_HOTKEY_KEYS.includes(item?.key)
        );
        accumulatedHeight += 12 + 38 * filteredItems.length;
      });

      scopeArray.push(accumulatedHeight);
    });

    return scopeArray;
  }

  handleScrollUp(event: ScrollEvent): void {
    const { scrollTop } = event;
    const { selectedCategory } = this.state;
    let newCategory = selectedCategory;

    this.scrollScopeArr.some((scopeEnd, index) => {
      if (
        (index === 0 && scrollTop < scopeEnd) ||
        (scrollTop < scopeEnd && 
         scrollTop > this.scrollScopeArr[index - 1] && 
         selectedCategory !== index - 1)
      ) {
        newCategory = index;
        return true;
      }
      return false;
    });

    if (selectedCategory !== newCategory) {
      this.setState({ selectedCategory: newCategory });
    }
  }

  handleScrollDown(event: ScrollEvent): void {
    const { scrollTop } = event;
    const { selectedCategory } = this.state;
    let newCategory = selectedCategory;

    this.scrollScopeArr.some((scopeEnd, index) => {
      if (
        scrollTop > scopeEnd &&
        scrollTop < this.scrollScopeArr[index + 1] &&
        selectedCategory !== index + 1
      ) {
        newCategory = index + 1;
        return true;
      }
      return false;
    });

    if (selectedCategory !== newCategory) {
      this.setState({ selectedCategory: newCategory });
    }
  }

  updateScrollView(categoryIndex: number): void {
    this.setState({ selectedCategory: categoryIndex });
    this.refs.scrollContainer.setScrollTop(this.scrollScopeArr[categoryIndex - 1]);
  }

  hasDot(section: HotkeySection): boolean {
    return !!section.flat().find(item => item.newDot);
  }

  render(): React.ReactElement {
    const { close, theme } = this.props;
    const { selectedCategory } = this.state;

    const clientWidth = document.documentElement.clientWidth ?? 0;
    const defaultPositionX = Math.max(0, clientWidth - 500 - 50);
    const defaultPositionY = Math.max(0, 50);

    return (
      <DraggableModal
        ref={this.draggableModal}
        className={`hotkey-modal ${theme}`}
        initialWidth={500}
        initialHeight={470}
        defaultPositionX={defaultPositionX}
        defaultPositionY={defaultPositionY}
        draggable={{ handle: 'hotkey-drag-area' }}
        zoomable={{ used: false }}
      >
        <>
          <div className="hotkey-title">
            <div className="hotkey-title-text hotkey-drag-area">
              {ResourceManager.getString('toolbar_hotkeys')}
            </div>
            <div className="close-icon" onClick={() => close()}>
              <Icons className="icon" type="hs_xian_guanbi" />
            </div>
          </div>

          <div className="hotkey-container">
            <div className="hotkey-container-left">
              {this.hotkeyDataKeys.map((key, index) => {
                const selectedClass = index === selectedCategory ? 'selected' : '';
                return (
                  <div
                    className={`hotkey-container-left-item ${selectedClass}`}
                    key={index}
                    onClick={() => this.updateScrollView(index)}
                  >
                    {ResourceManager.getString(key)}
                    {this.hasDot(hotkeyData[key]) && <div className="red-dot" />}
                  </div>
                );
              })}
            </div>

            <ScrollContainer
              className="hotkey-container-right"
              ref="scrollContainer"
              onScrollUp={this.handleScrollUp}
              onScrollDown={this.handleScrollDown}
            >
              {this.hotkeyDataKeys.map(key => {
                const section = hotkeyData[key];
                return (
                  <div className="hotkey-container-right-card" key={key}>
                    <div className="hotkey-container-right-title">
                      {ResourceManager.getString(key)}
                    </div>
                    {section.map((itemGroup, groupIndex) => (
                      <div className="hotkey-container-right-item-wrapper" key={groupIndex}>
                        {itemGroup.map((item, itemIndex) => {
                          if (
                            HSApp.Config.TENANT === 'fp' &&
                            EXCLUDED_HOTKEY_KEYS.includes(item.key)
                          ) {
                            return null;
                          }

                          return (
                            <div className="hotkey-container-right-item" key={itemIndex}>
                              <div>
                                <div className="hotkey-container-right-item-text">
                                  {ResourceManager.getString(item.key)}
                                </div>
                                {item.newDot && (
                                  <div className="new-red-icon">
                                    <span className="new-red-icon-text">NEW</span>
                                  </div>
                                )}
                              </div>
                              <div className="item-box-wrapper">
                                {item.value.map((hotkeyValue, valueIndex) => {
                                  let displayValue = hotkeyValue;

                                  if (Object.keys(hotkeySymbol).includes(hotkeyValue)) {
                                    const platform = HSApp.Util.UserAgent.isMAC() ? 'mac' : 'windows';
                                    displayValue = hotkeySymbol[hotkeyValue][platform];
                                  }

                                  return (
                                    <React.Fragment key={valueIndex}>
                                      <div className="item-box">{displayValue}</div>
                                      {valueIndex !== item.value.length - 1 && !item.noAddIcon && (
                                        <span className="item-box-add">+</span>
                                      )}
                                    </React.Fragment>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                );
              })}
            </ScrollContainer>
          </div>
        </>
      </DraggableModal>
    );
  }
}