import React from 'react';

interface ResourceManager {
  getString(key: string): string;
}

declare const ResourceManager: ResourceManager;

export const RenewalButton = (): JSX.Element => {
  return React.createElement("div", {
    className: "renewal-button"
  }, ResourceManager.getString("user_vip_renewal"));
};