import React from 'react';
import { Icons, Button } from './icons-and-buttons';
import { FeedbackRadioBlock } from './FeedbackRadioBlock';
import { FeedbackCheckboxBlock } from './FeedbackCheckboxBlock';
import { FeedbackTextareaBlock } from './FeedbackTextareaBlock';
import { FeedbackTextareaEditBlock } from './FeedbackTextareaEditBlock';
import { FeedbackUploaderBlock } from './FeedbackUploaderBlock';
import { FeedbackTextBlock } from './FeedbackTextBlock';
import { FeedbackSwitchBlock } from './FeedbackSwitchBlock';
import { FeedbackValueBlock } from './FeedbackValueBlock';
import { FeedbackButtonItemBlock } from './FeedbackButtonItemBlock';
import { CheckboxList } from './CheckboxList';
import { FeedbackUploadVideo } from './FeedbackUploadVideo';

enum BlockTypeEnum {
  radioBlock = 'radioBlock',
  checkboxBlock = 'checkboxBlock',
  textareaBlock = 'textareaBlock',
  textareaeditBlock = 'textareaeditBlock',
  uploadBlock = 'uploadBlock',
  textBlock = 'textBlock',
  switchBlock = 'switchBlock',
  valueBlock = 'valueBlock',
  buttonItemBlock = 'buttonItemBlock',
  multipleCategoryOptions = 'multipleCategoryOptions',
  uploadVideoBlock = 'uploadVideoBlock'
}

interface BlockData {
  type: BlockTypeEnum;
  name: string;
  label: string;
  [key: string]: unknown;
}

interface BlockRef {
  getValue(): Promise<unknown>;
  isEmpty(): boolean;
  dataExtend?(): boolean;
}

interface FeedbackEntryProps {
  data: BlockData[];
  onSubmit?: (formResult: Record<string, unknown>) => Promise<boolean> | void;
  onClose?: () => void;
  onNavtoFeedbackList?: () => void;
  enableNavtoFeedbackList?: boolean;
}

interface FeedbackEntryState {
  disableSubmit: boolean;
}

interface GetValueResult {
  formResult: Record<string, unknown>;
  emptyField: string[];
}

type FieldHandler = (value: unknown) => unknown;

const BLOCK_TYPE_COMPONENT_MAP: Record<BlockTypeEnum, React.ComponentType<any>> = {
  [BlockTypeEnum.radioBlock]: FeedbackRadioBlock,
  [BlockTypeEnum.checkboxBlock]: FeedbackCheckboxBlock,
  [BlockTypeEnum.textareaBlock]: FeedbackTextareaBlock,
  [BlockTypeEnum.textareaeditBlock]: FeedbackTextareaEditBlock,
  [BlockTypeEnum.uploadBlock]: FeedbackUploaderBlock,
  [BlockTypeEnum.textBlock]: FeedbackTextBlock,
  [BlockTypeEnum.switchBlock]: FeedbackSwitchBlock,
  [BlockTypeEnum.valueBlock]: FeedbackValueBlock,
  [BlockTypeEnum.buttonItemBlock]: FeedbackButtonItemBlock,
  [BlockTypeEnum.multipleCategoryOptions]: CheckboxList,
  [BlockTypeEnum.uploadVideoBlock]: FeedbackUploadVideo
};

export class FeedbackEntry extends React.Component<FeedbackEntryProps, FeedbackEntryState> {
  private blockRefs: Record<string, BlockRef | null>;
  private handleFields: Record<string, FieldHandler>;

  constructor(props: FeedbackEntryProps) {
    super(props);
    
    this.blockRefs = {};
    this.handleFields = {
      type: (value: unknown): unknown => {
        return typeof value === 'string' ? [value] : value;
      }
    };
    
    this.initBlockRefs(props.data);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.navToFeedbackList = this.navToFeedbackList.bind(this);
    
    this.state = {
      disableSubmit: false
    };
  }

  private initBlockRefs(data: BlockData[]): void {
    data.forEach((block) => {
      this.blockRefs[block.name] = null;
    });
  }

  private async getValue(): Promise<GetValueResult> {
    const formResult: Record<string, unknown> = {};
    const emptyField: string[] = [];
    const blockNames = Object.keys(this.blockRefs);

    for (const blockName of blockNames) {
      const blockRef = this.blockRefs[blockName];
      let value = await blockRef?.getValue();

      if (this.handleFields[blockName]) {
        value = this.handleFields[blockName](value);
      }

      if (value instanceof Array || typeof value !== 'object' || !blockRef?.dataExtend?.()) {
        if (formResult[blockName] instanceof Array && value instanceof Array) {
          (formResult[blockName] as unknown[]).push(...value);
        } else {
          formResult[blockName] = value;
        }
      } else {
        Object.keys(value as Record<string, unknown>).forEach((key) => {
          const valueObj = value as Record<string, unknown>;
          if (formResult[key] instanceof Array) {
            (formResult[key] as unknown[]).push(...(valueObj[key] as unknown[]));
          } else {
            formResult[key] = valueObj[key];
          }
        });
      }

      if (blockRef?.isEmpty()) {
        emptyField.push(blockName);
      }
    }

    return {
      formResult,
      emptyField
    };
  }

  private blockCreator(blockData: BlockData): React.ReactElement {
    const BlockComponent = BLOCK_TYPE_COMPONENT_MAP[blockData.type];
    
    return React.createElement(BlockComponent, {
      ...blockData,
      ref: (ref: BlockRef | null) => {
        this.blockRefs[blockData.name] = ref;
      }
    });
  }

  private async onSubmit(): Promise<void> {
    const { formResult, emptyField } = await this.getValue();

    if (emptyField && emptyField.length > 0) {
      const emptyLabels = this.props.data
        .filter((block) => emptyField.includes(block.name))
        .map((block) => block.label);
      
      LiveHint.show(
        `${emptyLabels[0]}${ResourceManager.getString('plugin_feedback_modal_commit_tip')}`,
        3000
      );
      return;
    }

    if (!this.props.onSubmit) {
      return;
    }

    this.setState({ disableSubmit: true });
    
    const submitPromise = this.props.onSubmit(formResult);
    submitPromise
      ?.then((success) => {
        if (success) {
          this.closeModal();
        }
      })
      .finally(() => {
        this.setState({ disableSubmit: false });
      });
  }

  private closeModal(): void {
    this.props.onClose?.();
  }

  private navToFeedbackList(): void {
    this.props.onNavtoFeedbackList?.();
  }

  render(): React.ReactElement {
    const { data, enableNavtoFeedbackList } = this.props;
    const { disableSubmit } = this.state;

    return (
      <div className="feedback-entry-wrapper">
        <div className="feedback-entry-blocks">
          {data.map((blockData) => this.blockCreator(blockData))}
        </div>
        <div
          className="feedback-entry-footer"
          style={{
            justifyContent: enableNavtoFeedbackList ? 'space-between' : 'flex-end'
          }}
        >
          {enableNavtoFeedbackList && (
            <div
              className="feedback-entry-footer-record"
              onClick={this.navToFeedbackList}
            >
              <Icons
                type="hs_mian_tuli"
                className="feedback-entry-footer-record-icon"
              />
              <span className="feedback-entry-footer-record-tip">
                {ResourceManager.getString('plugin_feedback_my_list')}
              </span>
            </div>
          )}
          <div className="feedback-entry-footer-actions">
            <Button type="normal" onClick={this.closeModal}>
              {ResourceManager.getString('cancel')}
            </Button>
            <Button
              type="primary"
              onClick={this.onSubmit}
              disabled={disableSubmit}
            >
              {ResourceManager.getString('plugin_feedback_send')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}