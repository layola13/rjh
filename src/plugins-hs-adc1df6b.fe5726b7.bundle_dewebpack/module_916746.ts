import React from 'react';
import { SmartText } from './SmartText';
import { Icons } from './Icons';

interface CompleteEnvBtnData {
  handleClick: () => void;
  envName: string;
  secondName?: string;
  secondClass?: string;
}

interface CompleteEnvBtnProps {
  data: CompleteEnvBtnData;
}

export default function CompleteEnvBtn({ data }: CompleteEnvBtnProps): JSX.Element {
  return (
    <div className="compelete-env-btn-customized">
      <div className="compelete-btn" onClick={() => data.handleClick()}>
        <div className="complete-arrow">
          <Icons
            type="hs_xian_fanhui"
            style={{ fontSize: "20px" }}
            className="arrow-icon"
          />
        </div>
        <SmartText className="complete-name">
          {data.envName}
        </SmartText>
      </div>
      {data.secondName && (
        <>
          <span className="vdivider" />
          <span className={`complete-second-name ${data.secondClass ?? ''}`}>
            {data.secondName}
          </span>
        </>
      )}
    </div>
  );
}