import React, { useMemo } from 'react';

interface UserVipInfo {
  expireTime: number | string | Date;
}

interface ExpireTimeDescProps {
  userVipInfo: UserVipInfo;
}

interface UserInfoBaseProps {
  className?: string;
}

type DateFormatToken = 'YYYY' | 'MM' | 'DD';

type DateFormatter = (date: Date) => string;

const DATE_FORMATTERS: Record<DateFormatToken, DateFormatter> = {
  YYYY: (date: Date): string => date.getFullYear().toString(),
  MM: (date: Date): string => String(date.getMonth() + 1).padStart(2, '0'),
  DD: (date: Date): string => String(date.getDate()).padStart(2, '0'),
};

function formatDate(
  timestamp: number | string | Date,
  format: string = 'YYYY/MM/DD'
): string {
  const date = new Date(timestamp);
  let formattedString = format;

  (Object.entries(DATE_FORMATTERS) as [DateFormatToken, DateFormatter][]).forEach(
    ([token, formatter]) => {
      formattedString = formattedString.replace(token, formatter(date));
    }
  );

  return formattedString;
}

export function ExpireTimeDesc({ userVipInfo }: ExpireTimeDescProps): JSX.Element {
  const formattedExpireTime = useMemo(
    () => formatDate(userVipInfo.expireTime),
    [userVipInfo.expireTime]
  );

  return (
    <div className="expire-time-desc">
      <span>{formattedExpireTime}</span>
      <span className="time-desc">
        {ResourceManager.getString('user_vip_expiration')}
      </span>
    </div>
  );
}

export function UserInfoBase({ className = '' }: UserInfoBaseProps): JSX.Element {
  return <div className={`user-info-base ${className}`} />;
}