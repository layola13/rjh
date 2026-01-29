import React from 'react';

export const modalContext = React.createContext<undefined | any>(undefined);

export class PageComponent extends React.Component {
  static pageInfo = {
    name: "BasePage",
    text: "Page基类"
  };
  
  static dragModel: any = undefined;
}

export enum AwakeTypeEnum {
  ImageModal = 1,
  TitleModal = 2,
  CardTips = 3,
  BallonTips = 4,
  TeachingModal = 5
}

export enum ConfigTypeEnum {
  labels = 1,
  functions = 2
}

export enum Magic {
  new = "u6tklt3u60yg",
  old = "61cd47b78148"
}