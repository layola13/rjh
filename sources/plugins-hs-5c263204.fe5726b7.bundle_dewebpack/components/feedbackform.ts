import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Checkbox, Radio } from 'antd';
import { AttachmentForm } from './AttachmentForm';
import { showLiveHint, sendFeedback, uploadFileToS3 } from './utils';
import { getAssetId } from './helpers';
import recordIcon from './assets/record-icon.png';

type FeedbackType = 'BUG' | 'SUGGESTION';

type FeedbackModule =
  | 'APARTMENT_DRAW'
  | 'MODEL_MATERIAL'
  | 'WHOLE_HOUSE_HARD_OUTFIT'
  | 'WHOLE_HOUSE_CUSTOM'
  | 'FREE_STYLE'
  | 'RENDER_EFFECT'
  | 'CLIENT_SIDE_PROBLEM'
  | 'SUBSCRIPTION'
  | 'OTHER';

interface FeedbackModuleEnum {
  APARTMENT_DRAW: [string];
  MODEL_MATERIAL: [string];
  WHOLE_HOUSE_HARD_OUTFIT: [string];
  WHOLE_HOUSE_CUSTOM: [string];
  FREE_STYLE: [string];
  RENDER_EFFECT: [string];
  CLIENT_SIDE_PROBLEM: [string];
  SUBSCRIPTION: [string];
  OTHER: [string];
}

interface FeedbackFormProps {
  close?: () => void;
}

interface FeedbackFormState {
  isBtnDisable: boolean;
}

interface AttachmentFile {
  dataUrl: string;
}

interface FeedbackInfo {
  feedbackObject: number;
  feedbackType: FeedbackType;
  feedbackModule: string;
  source: string;
  clientInfo: unknown;
  problemDescription: string;
  imageUrls: string[];
  assetId: string;
  replayLink: string;
}

interface RadioButtonData {
  buttonArr: Array<{
    isChecked: boolean;
    txt: string;
  }>;
  onCheck: (index: number) => void;
}

const STANDARD_FEEDBACK_MODULES: FeedbackModule[] = [
  'APARTMENT_DRAW',
  'MODEL_MATERIAL',
  'WHOLE_HOUSE_HARD_OUTFIT',
  'WHOLE_HOUSE_CUSTOM',
  'FREE_STYLE',
  'RENDER_EFFECT',
  'OTHER',
];

const FP_FEEDBACK_MODULES: FeedbackModule[] = [
  'APARTMENT_DRAW',
  'MODEL_MATERIAL',
  'RENDER_EFFECT',
  'FREE_STYLE',
  'SUBSCRIPTION',
  'OTHER',
];

const FEEDBACK_OBJECT_TYPE = 10;
const MAX_DESCRIPTION_LENGTH = 1000;
const SUCCESS_HINT_DURATION = 5000;
const MIN_CLIENT_VERSION_FOR_RECORDING = 401;

let isScreenRecordingEnabled = false;

export class FeedbackForm extends Component<FeedbackFormProps, FeedbackFormState> {
  private checked: boolean;
  private feedbackType: FeedbackType;
  private feedbackModule: string;
  private feedbackMessage: string;
  private videoUrl: string;
  private feedbackModuleEnum: FeedbackModuleEnum;
  private _attachment: AttachmentFile | null;
  
  refs: {
    attachment?: AttachmentForm & { getFile?: () => AttachmentFile };
    bodymsg?: HTMLTextAreaElement;
    usertag?: HTMLElement;
  };

  constructor(props: FeedbackFormProps) {
    super(props);

    this.state = {
      isBtnDisable: true,
    };

    this.checked = false;
    this.feedbackType = 'BUG';
    this.feedbackModule = '';
    this.feedbackMessage = '';
    this.videoUrl = '';
    this.feedbackModuleEnum = {
      APARTMENT_DRAW: [ResourceManager.getString('plugin_feedback_tag_apartment_drawing')],
      MODEL_MATERIAL: [ResourceManager.getString('plugin_feedback_tag_model_material')],
      WHOLE_HOUSE_HARD_OUTFIT: [ResourceManager.getString('plugin_feedback_tag_hard')],
      WHOLE_HOUSE_CUSTOM: [ResourceManager.getString('plugin_feedback_tag_custom')],
      FREE_STYLE: [ResourceManager.getString('plugin_feedback_tag_diy')],
      RENDER_EFFECT: [ResourceManager.getString('plugin_feedback_tag_render')],
      CLIENT_SIDE_PROBLEM: [ResourceManager.getString('plugin_feedback_tag_client')],
      SUBSCRIPTION: [ResourceManager.getString('plugin_feedback_tag_subscription')],
      OTHER: [ResourceManager.getString('plugin_feedback_tag_others')],
    };

    this._attachment = null;

    this.handleKeyupFeedback = this.handleKeyupFeedback.bind(this);
    this.handleSendFeedback = this.handleSendFeedback.bind(this);
    this.handleModuleChange = this.handleModuleChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.createCheckbox = this.createCheckbox.bind(this);
  }

  private getAttachment(): AttachmentFile | undefined {
    if (!this.refs.attachment) {
      return undefined;
    }
    return this.refs.attachment.getFile?.();
  }

  private handleSendFeedback(): void {
    this._attachment = this.getAttachment() ?? null;

    if (window.electron && this.checked === true) {
      const ipcChannelName = 'ClientRecording';
      const ipcRenderer = window.electron.ipcRenderer;

      showLiveHint(
        ResourceManager.getString('plugin_feedback_send_success'),
        SUCCESS_HINT_DURATION
      );

      ipcRenderer.send(ipcChannelName);
      ipcRenderer.once(ipcChannelName, (_event: unknown, videoPath: string) => {
        if (videoPath) {
          this.videoUrl = videoPath;
        }
        this.sendFeedback();
      });
    } else {
      showLiveHint(
        ResourceManager.getString('plugin_feedback_sending'),
        SUCCESS_HINT_DURATION,
        LiveHint.statusEnum.loading
      );
      this.sendFeedback();
    }

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Feedback,
      'submit_event',
      {
        sUploadingClipTicked: this.checked,
      }
    );

    this.props.close?.();
  }

  private async sendFeedback(): Promise<void> {
    let imageUrl = '';

    const clientInfo = await HSApp.Util.Feedback.collectFeedbackInfo();

    const submitFeedback = (): void => {
      const feedbackData: FeedbackInfo = {
        feedbackObject: FEEDBACK_OBJECT_TYPE,
        feedbackType: this.feedbackType,
        feedbackModule: this.feedbackModule,
        source: HSApp.Util.Url.getQueryStrings().env ?? 'sjj',
        clientInfo,
        problemDescription:
          this.feedbackMessage.length >= MAX_DESCRIPTION_LENGTH
            ? this.feedbackMessage.slice(0, MAX_DESCRIPTION_LENGTH)
            : this.feedbackMessage,
        imageUrls: [imageUrl],
        assetId: getAssetId(),
        replayLink: this.videoUrl,
      };

      sendFeedback(feedbackData)
        .then(() => {
          if (this.checked && this.videoUrl) {
            showLiveHint(
              ResourceManager.getString('plugin_feedback_video_send_success'),
              SUCCESS_HINT_DURATION
            );
          }
          if (!this.checked) {
            showLiveHint(
              ResourceManager.getString('plugin_feedback_send_success'),
              SUCCESS_HINT_DURATION
            );
          }
        })
        .catch(() => {
          showLiveHint(
            ResourceManager.getString('plugin_feedback_send_failed'),
            SUCCESS_HINT_DURATION
          );
        });
    };

    if (this._attachment) {
      imageUrl = await uploadFileToS3(this._attachment.dataUrl);
      submitFeedback();
    } else {
      submitFeedback();
    }
  }

  private verify(): void {
    if (this.feedbackModule === '' || this.feedbackMessage === '') {
      this.setState({ isBtnDisable: true });
    } else {
      this.setState({ isBtnDisable: false });
    }
  }

  private handleKeyupFeedback(): void {
    const bodyMsgNode = ReactDOM.findDOMNode(this.refs.bodymsg) as HTMLTextAreaElement;
    this.feedbackMessage = bodyMsgNode.value;
    this.verify();
  }

  private handleModuleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.feedbackModule = event.target.value;
    this.verify();
  }

  private onCheckboxChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.checked = event.target.checked;
  }

  private createCheckbox(): ReactNode {
    try {
      if (!window.electron || HSApp.Config.TENANT === 'fp') {
        return null;
      }

      const clientVersion = HSApp.Util.Url.getQueryStrings().clientVersion;
      if (!clientVersion) {
        return null;
      }

      const versionNumber = parseInt(clientVersion.replace(/\./g, ''), 10);
      if (versionNumber <= MIN_CLIENT_VERSION_FOR_RECORDING || isNaN(versionNumber)) {
        return null;
      }
    } catch (error) {
      return null;
    }

    return (
      <div className="form-title form-row">
        <label className="form-label form-labal-feedback">
          <span className="label-required"></span>
          {ResourceManager.getString('plugin_feedback_video_attachment')}
        </label>
        <div className="form-row-content">
          <Checkbox
            onChange={this.onCheckboxChange}
            className="include-video"
            disabled={!isScreenRecordingEnabled}
          >
            {ResourceManager.getString('plugin_feedback_video_hint')}
          </Checkbox>
          {!isScreenRecordingEnabled && (
            <div className="include-video-tips-row-disabled">
              <span className="include-video-tips-content">
                您尚未支持录屏功能，可在客户端右上角
              </span>
              <img className="include-video-tips-image" src={recordIcon} />
              <span className="include-video-tips-content">中开启</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  render(): ReactNode {
    const radioButtonData: RadioButtonData = {
      buttonArr: [
        {
          isChecked: this.feedbackType === 'BUG',
          txt: ResourceManager.getString('plugin_feedback_selector_bug'),
        },
        {
          isChecked: this.feedbackType === 'SUGGESTION',
          txt: ResourceManager.getString('plugin_feedback_selector_advice'),
        },
      ],
      onCheck: (index: number) => {
        this.feedbackType = index === 0 ? 'BUG' : 'SUGGESTION';
      },
    };

    const moduleList =
      HSApp.Config.TENANT === 'fp' ? FP_FEEDBACK_MODULES : STANDARD_FEEDBACK_MODULES;

    return (
      <div className="feedbackform noselect">
        <div className="mainfields">
          <div className="form-title form-row">
            <label className="form-label form-labal-feedback">
              <span className="label-required">*</span>
              {ResourceManager.getString('plugin_feedback_type')}
            </label>
            <div className="form-row-content">
              <RadioButtonCard
                className="radio-button-card-wrapper-feedback"
                data={radioButtonData}
              />
            </div>
          </div>

          <div className="form-title form-row">
            <label className="form-label form-labal-feedback">
              <span className="label-required">*</span>
              {ResourceManager.getString('plugin_feedback_module')}
            </label>
            <div className="form-row-content">
              <Radio.Group onChange={this.handleModuleChange} ref="usertag">
                {moduleList.map((module) => (
                  <Radio.Button key={module} value={module}>
                    {this.feedbackModuleEnum[module]}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>
          </div>

          <div className="form-title form-row">
            <label className="form-label form-labal-feedback">
              <span className="label-required">*</span>
              {ResourceManager.getString('plugin_feedback_describe')}
            </label>
            <div className="form-row-content">
              <textarea
                ref="bodymsg"
                onKeyUp={this.handleKeyupFeedback}
                style={{
                  width: 316,
                  height: 80,
                  padding: '12px 18px',
                }}
                placeholder={ResourceManager.getString('plugin_feedback_text_placeholder')}
              />
            </div>
          </div>

          <div className="form-title form-row">
            <label className="form-label form-labal-feedback">
              <span className="label-required"></span>
              {ResourceManager.getString('plugin_feedback_attachment')}
            </label>
            <div className="form-row-content">
              <AttachmentForm ref="attachment" />
            </div>
          </div>
        </div>

        {HSApp.Config.TENANT !== 'fp' ? (
          <div className="join">
            <i className="dingding"></i>
            <div style={{ lineHeight: '14px' }}>
              {ResourceManager.getString('plugin_feedback_join_communication_group')}
            </div>
          </div>
        ) : (
          <div className="feedback-form-link-wrapper">
            <a
              className="feedback-form-link"
              href={`${HSApp.PartnerConfig.USERCENTER_URL}/learn-help`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find an answer or start a discussion in Homestyler community.
            </a>
          </div>
        )}

        {this.createCheckbox()}

        <div className="actionbuttons">
          <button
            type="button"
            onClick={this.handleSendFeedback}
            className="btn btn-primary sendfeedback"
            disabled={this.state.isBtnDisable}
          >
            {ResourceManager.getString('plugin_feedback_send')}
          </button>
        </div>
      </div>
    );
  }
}

if (window.electron) {
  window.electron.ipcRenderer.on('showCheckbox', (_event: unknown, value: string) => {
    if (value === 'true') {
      isScreenRecordingEnabled = true;
    }
    if (value === 'false') {
      isScreenRecordingEnabled = false;
    }
  });
}