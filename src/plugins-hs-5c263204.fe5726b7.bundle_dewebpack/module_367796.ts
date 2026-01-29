import React, { useState, useEffect } from 'react';
import { Icons, Button, Modal, IconfontView } from 'some-ui-library';

interface NetworkStatus {
  name: string;
  subTitle: string;
  type: string;
}

interface NetworkStatuses {
  [key: string]: NetworkStatus;
}

interface NetworkDetectionResult {
  grade: NetworkGrade;
  gradeName: string;
  statuses: NetworkStatuses;
}

type NetworkGrade = 'excellent' | 'good' | 'poor' | 'offLine' | 'others';

interface ThemeConfig {
  fontColor: string;
  bgColor: string;
  icon: string;
  smallIcon: string;
}

interface LanguageMap {
  [key: string]: string;
}

interface FeedbackListProps {
  data: NetworkStatuses;
  theme: string;
  color: ThemeConfig;
  text: string;
  setTextInfo: (text: string) => void;
  setColorInfo: (grade: NetworkGrade) => void;
  detectToolNetwork: () => Promise<NetworkDetectionResult>;
  setNetworkOverviewInfo: (result: NetworkDetectionResult) => void;
}

interface NetworkResultProps {
  data: {
    detectToolNetwork: () => Promise<NetworkDetectionResult>;
    languageMap?: LanguageMap;
    className?: string;
  };
  theme: string;
  setValue: (value: { internalNetwork: NetworkDetectionResult }) => void;
}

const THEME_CONFIG: Record<NetworkGrade, ThemeConfig> = {
  excellent: {
    fontColor: '#48CBB4',
    bgColor: 'rgba(72, 203, 180, 0.12)',
    icon: '/path/to/excellent-icon.png',
    smallIcon: '/path/to/excellent-small-icon.png',
  },
  good: {
    fontColor: '#FFA023',
    bgColor: '#FFF7E2',
    icon: '/path/to/good-icon.png',
    smallIcon: '/path/to/good-small-icon.png',
  },
  poor: {
    fontColor: '#FF5B45',
    bgColor: 'rgba(255, 91, 69, 0.10)',
    icon: '/path/to/poor-icon.png',
    smallIcon: '/path/to/poor-small-icon.png',
  },
  offLine: {
    fontColor: '#FF5B45',
    bgColor: 'rgba(255, 91, 69, 0.10)',
    icon: '/path/to/offline-icon.png',
    smallIcon: '/path/to/offline-small-icon.png',
  },
  others: {
    fontColor: '#48CBB4',
    bgColor: '#ffffff',
    icon: '/path/to/others-icon.png',
    smallIcon: '/path/to/others-small-icon.png',
  },
};

const FeedbackList: React.FC<FeedbackListProps> = ({
  data,
  theme,
  color,
  text,
  setTextInfo,
  setColorInfo,
  detectToolNetwork,
  setNetworkOverviewInfo,
}) => {
  const [statuses, setStatuses] = useState<NetworkStatuses>(data);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>(text);
  const [themeColor, setThemeColor] = useState<ThemeConfig>(color);

  const isFpTenant = (window as any).HSApp?.Config?.TENANT === 'fp';

  const statusItems = Object.values(statuses).map((status) => (
    <div key={status.type} className="status-item">
      <Icons
        style={{
          fontSize: '18px',
          color: 'white',
          verticalAlign: 'sub',
        }}
        className="dropdownlist-label-tooltip"
        type="hs_shuxingmianban_xiangqing_jingshi"
      />
      <span className="name">{status.name}</span>
      {!isFpTenant && <span className="subTitle">({status.subTitle})</span>}
    </div>
  ));

  const handleRetest = async (): Promise<void> => {
    setIsTesting(true);
    setDisplayText((window as any).ResourceManager?.getString('network_detect_is_testing') ?? 'Testing...');
    setThemeColor(THEME_CONFIG.others);
    setTextInfo('');
    setColorInfo('others');

    try {
      const result = await detectToolNetwork();
      setIsTesting(false);
      const testLabel = (window as any).ResourceManager?.getString('network_detect_test') ?? 'Test';
      setDisplayText(`${testLabel}: ${result.gradeName}`);
      setThemeColor(THEME_CONFIG[result.grade]);
      setColorInfo(result.grade);
      setTextInfo(result.gradeName);
      setStatuses(result.statuses);
      setNetworkOverviewInfo(result);
    } catch (error) {
      setIsTesting(false);
      console.error('Network detection failed:', error);
    }
  };

  return (
    <div className={`feedback-list-wrapper ${theme}`}>
      <div className="feedback-network">
        <div className="feedback-network-header">
          <img src={themeColor.icon} alt="Network status" />
          <div className="result" style={{ color: themeColor.fontColor }}>
            {displayText}
            {!isTesting && `, ${(window as any).ResourceManager?.getString('network_detect_test_effect_info') ?? ''}`}
          </div>
        </div>
        <div className="feedback-network-body">{statusItems}</div>
      </div>
      <div className="feedback-network-footer">
        <div className="feedback-network-footer-actions">
          <Button type="primary" disabled={isTesting} onClick={handleRetest}>
            {isTesting
              ? (window as any).ResourceManager?.getString('network_detect_testing_btn') ?? 'Testing...'
              : (window as any).ResourceManager?.getString('network_detect_reset_test_btn') ?? 'Retest'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const NetworkResult: React.FC<NetworkResultProps> = ({ data, theme, setValue }) => {
  const [isClickable, setIsClickable] = useState<boolean>(false);
  const [networkStatuses, setNetworkStatuses] = useState<NetworkStatuses | null>(null);
  const [displayText, setDisplayText] = useState<string>(
    (window as any).ResourceManager?.getString('network_detect_is_testing') ?? 'Testing...'
  );
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(THEME_CONFIG.others);

  useEffect(() => {
    const initializeNetworkDetection = async (): Promise<void> => {
      try {
        const result = await data.detectToolNetwork();
        updateLanguageMapping(result);
        setNetworkStatuses(result.statuses);
        updateThemeByGrade(result.grade);
        updateDisplayText(result.gradeName);
        updateNetworkOverview(result);

        if (result.grade && result.grade !== 'excellent') {
          setIsClickable(true);
        }
      } catch (error) {
        console.error('Failed to detect network:', error);
      }
    };

    initializeNetworkDetection();
  }, []);

  const updateLanguageMapping = (result: NetworkDetectionResult): void => {
    if (!data.languageMap || !result.statuses) return;

    for (const key in result.statuses) {
      const statusType = result.statuses[key].type;
      const languageKey = `newtwork_detect_${statusType}`;

      if (data.languageMap[languageKey]) {
        result.statuses[key].name = data.languageMap[languageKey];
        result.statuses[key].subTitle = data.languageMap[languageKey];
      }
    }
  };

  const updateDisplayText = (gradeName: string): void => {
    const testLabel = (window as any).ResourceManager?.getString('network_detect_test') ?? 'Test';
    const testingLabel = (window as any).ResourceManager?.getString('network_detect_is_testing') ?? 'Testing...';
    setDisplayText(gradeName ? `${testLabel}: ${gradeName}` : testingLabel);
  };

  const updateThemeByGrade = (grade: NetworkGrade): void => {
    setThemeConfig(THEME_CONFIG[grade] ?? THEME_CONFIG.others);
  };

  const updateNetworkOverview = (result: NetworkDetectionResult): void => {
    setValue({ internalNetwork: result });
  };

  const handleClick = (): void => {
    if (!isClickable || !networkStatuses) return;

    Modal.simple({
      key: 'network-list-dialog',
      title: '',
      className: data.className,
      content: (
        <FeedbackList
          data={networkStatuses}
          text={displayText}
          color={themeConfig}
          theme={theme}
          setTextInfo={updateDisplayText}
          setColorInfo={updateThemeByGrade}
          detectToolNetwork={data.detectToolNetwork}
          setNetworkOverviewInfo={updateNetworkOverview}
        />
      ),
      onClose: () => {},
      enableCheckbox: false,
      showFooter: false,
    });
  };

  return (
    <div
      className="feedback-network-result"
      style={{
        background: themeConfig.bgColor,
        cursor: isClickable ? 'pointer' : 'unset',
      }}
      onClick={handleClick}
    >
      <span className="text" style={{ color: themeConfig.fontColor }}>
        {displayText}
      </span>
      <span className="icon">
        {isClickable && (
          <IconfontView
            customClass="arrow-icon"
            customStyle={{
              fontSize: '12px',
              color: themeConfig.fontColor,
            }}
            showType="hs_xiao_danjiantou_you"
          />
        )}
        <img className="detect-icon" src={themeConfig.smallIcon} alt="Status icon" />
      </span>
    </div>
  );
};

export default NetworkResult;