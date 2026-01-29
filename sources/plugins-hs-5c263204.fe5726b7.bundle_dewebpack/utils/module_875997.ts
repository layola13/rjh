import React from 'react';

interface StepInfo {
  key: number;
  title: string;
}

interface GuideHeaderProps {
  stepNum: number;
  stepCount: number;
  stepsTitle: StepInfo[];
  exitGuide: (action: 'skip' | 'finish') => void;
  isFinalStep: boolean;
}

const GuideHeader: React.FC<GuideHeaderProps> = ({
  stepNum,
  stepCount,
  stepsTitle,
  exitGuide,
  isFinalStep
}) => {
  const filteredSteps = [...stepsTitle];
  let adjustedStepCount = stepCount;

  const queryStrings = HSApp.Util.Url.getQueryStrings();
  
  if (HSApp.Config.TENANT === 'fp' && queryStrings.hasAssetId === 'true') {
    filteredSteps.shift();
    adjustedStepCount = filteredSteps.length;
  }

  return (
    <div className="guide-header-container">
      <div className="guide-header-wrapper">
        <span className="guide-header">
          {ResourceManager.getString('plugin_guide_header_title')}
        </span>
        
        {filteredSteps.map((step, index) => {
          const isCurrentStep = stepNum === step.key;
          const isLastStep = adjustedStepCount - 1 !== index;
          const stepNumber = index + 1;
          
          return (
            <div key={step.key} className="guide-header-steps">
              <div
                className={`guide-header-steps-number ${
                  isCurrentStep ? 'guide-header-steps-number-selected' : ''
                }`}
              >
                {stepNumber}
              </div>
              
              {isCurrentStep && (
                <p className="guide-header-steps-desc">
                  {`${ResourceManager.getString('plugin_guide_header_step_the')}${stepNumber}/${adjustedStepCount} ${step.title}`}
                </p>
              )}
              
              {isLastStep && (
                <p className="guide-header-steps-dot">-----</p>
              )}
            </div>
          );
        })}
        
        {!isFinalStep && (
          <span
            className="exit-all"
            onClick={() => exitGuide('skip')}
          >
            {ResourceManager.getString('plugin_guide_header_btn_skip_all')}
          </span>
        )}
        
        {isFinalStep && (
          <span
            className="exit-all finished"
            onClick={() => exitGuide('finish')}
          >
            {ResourceManager.getString('plugin_guide_header_btn_finish')}
          </span>
        )}
      </div>
    </div>
  );
};

export default GuideHeader;