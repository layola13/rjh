import React, { Component, forwardRef, useRef, useImperativeHandle, RefObject } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
import { getString } from '../utils/i18n';
import { Header } from '../components/Header';
import { Tabs } from '../components/Tabs';
import { TaskViewPanel } from '../components/TaskViewPanel';
import { GridViewerContainer } from '../components/GridViewerContainer';
import { Action } from '../services/Action';
import '../styles/sparkPic.less';

const { Content } = Layout;

interface TabItem {
  value: string;
  label: string;
}

interface AppProps {
  quitImageList?: () => void;
}

interface AppState {
  disable: boolean;
  activeTab: string;
  sparkPicCoupon: number;
  defaultTask?: unknown;
}

interface AppRef {
  disableView: (disable: boolean) => void;
  setDefaultTask: (task: unknown) => void;
}

class AppComponent extends Component<AppProps, AppState> {
  private readonly tabs: TabItem[];

  constructor(props: AppProps) {
    super(props);
    
    this.tabs = [
      {
        value: "1",
        label: ResourceManager.getString("merchant_fav_folder")
      },
      {
        value: "2",
        label: ResourceManager.getString("plugin_spark_pic_all_images")
      }
    ];

    this.state = {
      disable: true,
      activeTab: "1",
      sparkPicCoupon: 0
    };
  }

  private fetchSparkPicCoupon = (): Promise<{ totalNum: number }> => {
    return Action.getCouponNum();
  };

  private updateSparkPicCoupon = (): void => {
    this.fetchSparkPicCoupon().then((response) => {
      this.setState({
        sparkPicCoupon: response.totalNum
      });
    });
  };

  private handleTabChange = (tabValue: string | undefined): void => {
    if (tabValue !== undefined) {
      this.setDefaultTask(undefined);
      this.setState({
        activeTab: tabValue === "0" ? "1" : "2"
      });
    }
  };

  private headerBackClick(): void {
    const { quitImageList } = this.props;
    quitImageList?.();
    this.disableView(true);
  }

  public disableView(disable: boolean): void {
    this.setState({ disable });
    
    if (!disable) {
      this.updateSparkPicCoupon();
      this.setState({ activeTab: "1" });
    }
  }

  public setDefaultTask(task: unknown): void {
    this.setState({ defaultTask: task });
  }

  render(): React.ReactElement {
    const { disable, activeTab, sparkPicCoupon, defaultTask } = this.state;

    return (
      <Layout className={classNames("spark_pic_image_Layout", {
        layout_disable: disable
      })}>
        <Header
          onBackClick={this.headerBackClick}
          title={getString("plugin_spark_pic_header_back")}
        />
        <div className="spark_pic_album_logo">
          <img src={require('../assets/logo.png')} />
        </div>
        <Layout>
          {!disable && (
            <Content>
              <div className="content-header">
                <div className="left-part">
                  <Tabs
                    className="tabs"
                    tabs={this.tabs}
                    size="small"
                    onChange={this.handleTabChange}
                  />
                  <span
                    className="coupon-left-tips"
                    dangerouslySetInnerHTML={{
                      __html: ResourceManager.getString("plugin_spark_pic_coupon_left")
                        .replace("{num}", String(sparkPicCoupon))
                    }}
                  />
                  <div className="image-browser-left-portal" />
                </div>
                <div className="image-browser-bottom-portal" />
              </div>
              <TaskViewPanel
                show={activeTab === "1"}
                updateSparkPicCoupon={this.updateSparkPicCoupon}
                defaultTask={defaultTask}
              />
              <GridViewerContainer
                show={activeTab === "2"}
                updateSparkPicCoupon={this.updateSparkPicCoupon}
              />
            </Content>
          )}
        </Layout>
      </Layout>
    );
  }
}

export const App = forwardRef<AppRef, AppProps>((props, ref) => {
  const componentRef = useRef<AppComponent>(null);

  useImperativeHandle(ref, () => ({
    disableView(disable: boolean): void {
      componentRef.current?.disableView(disable);
    },
    setDefaultTask(task: unknown): void {
      componentRef.current?.setDefaultTask(task);
    }
  }), []);

  return <AppComponent {...props} ref={componentRef} />;
});