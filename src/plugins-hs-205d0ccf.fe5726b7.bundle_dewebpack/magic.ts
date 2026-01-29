export enum Environment {
  Default = 'Default',
  CustomizedCeilingModel = 'CustomizedCeilingModel',
  CustomizedBackgroundWall = 'CustomizedBackgroundWall',
  CustomizedPlatform = 'CustomizedPlatform',
  MixPaint = 'MixPaint',
  CustomizedPM = 'CustomizedPM',
  Render = 'Render',
  AtlasRender = 'atlas-render',
  UploadModel = 'upload-model',
  ConcealedWorkV2 = 'ConcealedWorkV2',
  Other = 'other'
}

interface Module {
  name: string;
}

export const modules: Record<string, Module> = {
  [Environment.Default]: {
    name: '通用/户型/模型'
  },
  [Environment.CustomizedCeilingModel]: {
    name: '硬装吊顶'
  },
  [Environment.CustomizedBackgroundWall]: {
    name: '硬装背景墙'
  },
  [Environment.CustomizedPlatform]: {
    name: '硬装地台'
  },
  [Environment.MixPaint]: {
    name: '硬装铺贴'
  },
  [Environment.CustomizedPM]: {
    name: '自由造型'
  },
  [Environment.Render]: {
    name: '渲染'
  },
  [Environment.AtlasRender]: {
    name: '视频渲染'
  },
  [Environment.UploadModel]: {
    name: '上传模型'
  },
  [Environment.ConcealedWorkV2]: {
    name: '水电'
  },
  [Environment.Other]: {
    name: '其他'
  }
};

export const PageSize = 50;

interface PageSizeConfig {
  width: number;
  height: number;
  positionX: 'left' | 'right' | 'center';
}

interface ZoomableConfig {
  used: boolean;
}

interface DragModel {
  pageSize: PageSizeConfig;
  zoomable: ZoomableConfig;
}

export const defaultDragModel: DragModel = {
  pageSize: {
    width: 300,
    height: 470,
    positionX: 'right'
  },
  zoomable: {
    used: false
  }
};

interface MagicConfig {
  new: string;
  old: string;
}

export const Magic: MagicConfig = {
  new: 'u6tklt3u60yg',
  old: '61cd47b78148'
};

interface DomainItem {
  key: string;
  name: string;
}

export const domainList: DomainItem[] = [
  {
    key: '',
    name: '全部'
  },
  {
    key: 'tpzz',
    name: '定制生产'
  },
  {
    key: 'ihomeDecoration',
    name: '装企工作台'
  },
  {
    key: 'ihomeStore',
    name: '智慧门店'
  },
  {
    key: 'ihomeFactory',
    name: '定制工厂'
  },
  {
    key: 'ihomeXmerchant',
    name: '线下工作台'
  },
  {
    key: 'designMerchant',
    name: '躺平工作台'
  },
  {
    key: 'shejishi',
    name: '设计师工作台'
  },
  {
    key: 'icbu',
    name: '国际站'
  },
  {
    key: 'enterprise',
    name: '直营店'
  },
  {
    key: 'ihomeServiceProvider',
    name: '定制软件商'
  },
  {
    key: 'ihomeSupplier',
    name: '定制材料供应商'
  },
  {
    key: 'default',
    name: '公开版'
  }
];

import { HomePage } from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PeriodPage from './pages/PeriodPage';
import ArticlePage from './pages/ArticlePage';

export const PAGES = {
  HomePage,
  SearchPage,
  PeriodPage,
  ArticlePage
};