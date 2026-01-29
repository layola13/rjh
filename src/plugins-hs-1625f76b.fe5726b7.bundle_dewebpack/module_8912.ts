import React from 'react';
import PropTypes from 'prop-types';
import { IconfontView } from './IconFont';
import CheckboxItem from './CheckboxItem';
import ImageUpload from './ImageUpload';
import PanelFooter from './PanelFooter';
import asteriskIcon from './assets/asterisk.png';
import ApiService from './ApiService';

const REPORT_3D_REASON_OTHERS = 'report-3d-reason-others';
const REPORT_2D_REASON_OTHERS = 'report-2d-reason-others';

interface ReportPanelProps {
  seekId: string;
  is2d: boolean;
  feedbackObject?: string;
  problemList: string[];
}

interface FeedbackData {
  feedbackObject: string;
  feedbackType: string;
  feedbackModule: string;
  source: string;
  problemList: string[];
  clientInfo: unknown;
  imageUrls: string[];
  problemDescription?: string;
}

interface PanelFooterHandle {
  setState: (state: { disabled: string }) => void;
}

interface ImageUploadHandle {
  state: {
    pictureUrl: string;
  };
}

export default class ReportPanel extends React.Component<ReportPanelProps> {
  static propTypes = {
    seekId: PropTypes.string,
    is2d: PropTypes.bool,
  };

  static defaultProps = {
    seekId: '',
    is2d: true,
  };

  private problemList: string[] = [];
  private textReason: string = '';
  private pictureUrl: string = '';
  private footer: PanelFooterHandle | null = null;
  private picture: ImageUploadHandle | null = null;

  constructor(props: ReportPanelProps) {
    super(props);
    this.uploadData = this.uploadData.bind(this);
    this.closePanel = this.closePanel.bind(this);
  }

  /**
   * Upload feedback data to server
   */
  async uploadData(): Promise<void> {
    try {
      const clientInfo = await HSApp.Util.Feedback.collectFeedbackInfo();
      const source = HSApp.Util.Url.getQueryStrings()?.env || 'sjj';

      const feedbackData: FeedbackData = {
        feedbackObject: this.props.feedbackObject || '',
        feedbackType: 'BUG',
        feedbackModule: 'MODEL_MATERIAL',
        source,
        problemList: this.problemList,
        clientInfo,
        imageUrls: [this.picture?.state.pictureUrl || ''],
      };

      this.problemList.forEach((problem) => {
        if (problem === REPORT_3D_REASON_OTHERS || problem === REPORT_2D_REASON_OTHERS) {
          feedbackData.problemDescription = this.textReason;
        }
      });

      await ApiService.addReportData(this.props.seekId, feedbackData);
      
      this.closePanel();
      LiveHint.show(
        ResourceManager.getString('report_panel_reportpanel_report_success'),
        2500,
        undefined,
        {
          canclose: true,
          status: LiveHint.statusEnum.completed,
        }
      );
    } catch (error) {
      this.closePanel();
      LiveHint.show(
        ResourceManager.getString('report_panel_reportpanel_report_fail'),
        2500,
        undefined,
        {
          canclose: true,
          status: LiveHint.statusEnum.warning,
        }
      );
      throw error;
    }
  }

  /**
   * Close the report panel
   */
  closePanel(): void {
    const panelElement = document.querySelector('#catalog_popup_panel_collection');
    if (panelElement) {
      ReactDOM.unmountComponentAtNode(panelElement);
      $('#catalog_popup_panel_collection').addClass('hide');
    }
  }

  /**
   * Handle checkbox state change
   */
  onChangeChecked(isChecked: boolean, index: number): void {
    const problemItem = this.props.problemList[index];

    if (isChecked && !this.problemList.includes(problemItem)) {
      this.problemList.push(problemItem);
    } else if (!isChecked) {
      this.problemList = this.problemList.filter((item) => item !== problemItem);
    }

    this.updateSubmitButton();
  }

  /**
   * Handle text reason input change
   */
  onChangeTextReason(text: string): void {
    this.textReason = text;
    this.updateSubmitButton();
  }

  /**
   * Update submit button disabled state
   */
  updateSubmitButton(): void {
    const hasNoProblems = this.problemList.length === 0;
    const needsTextReason =
      (this.problemList.includes(REPORT_3D_REASON_OTHERS) ||
        this.problemList.includes(REPORT_2D_REASON_OTHERS)) &&
      !this.textReason;

    if (hasNoProblems || needsTextReason) {
      this.footer?.setState({ disabled: 'disabled' });
    } else {
      this.footer?.setState({ disabled: '' });
    }
  }

  render(): React.ReactElement {
    const checkboxItems: React.ReactElement[] = [];

    this.props.problemList.forEach((problem, index) => {
      const isLastFlag = index === this.props.problemList.length - 1;
      
      checkboxItems.push(
        <CheckboxItem
          key={problem}
          text={ResourceManager.getString(problem)}
          onChangeChecked={this.onChangeChecked.bind(this)}
          index={index}
          isLastFlag={isLastFlag}
          onChangeTextReason={this.onChangeTextReason.bind(this)}
        />
      );
    });

    const splitIndex = this.props.is2d ? 5 : 6;
    const leftColumnItems = checkboxItems.splice(0, splitIndex);
    const rightColumnItems = checkboxItems;

    return (
      <div id="report_panel_mask" className="common_mask">
        <div className="catalog_popup_panel_collection_body">
          <div className="header">
            <label>
              {ResourceManager.getString('report_panel_reportpanel_report_reason')}
            </label>
            <span className="closeBtn" onClick={this.closePanel}>
              <IconfontView
                showType="hs_xian_guanbi"
                customStyle={{ fontSize: '20px' }}
                clickColor="#396EFE"
                hoverBgColor="#f5f5f5"
                bgExtendSize={10}
              />
            </span>
          </div>
          <div className="reportpanel">
            <div className="report_title">
              <img width="6px" height="7px" src={asteriskIcon} />
              <label>
                {ResourceManager.getString('report_panel_reportpanel_report_question_decribe')}
              </label>
            </div>
            <table>
              <tr>
                <td>
                  <ul className="reason_items1">{leftColumnItems}</ul>
                </td>
                <td>
                  <ul className="reason_items2">{rightColumnItems}</ul>
                </td>
              </tr>
            </table>
            <ImageUpload ref={(ref) => { this.picture = ref; }} />
          </div>
          <PanelFooter
            ref={(ref) => { this.footer = ref; }}
            uploadData={this.uploadData}
            cancel={this.closePanel}
          />
        </div>
      </div>
    );
  }
}