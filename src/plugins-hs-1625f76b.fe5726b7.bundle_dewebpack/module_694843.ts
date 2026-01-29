import { useState, useEffect } from 'react';
import { ImageSearchPage } from './ImageSearchPage';
import DefaultTemplate from './DefaultTemplate';
import ModelCollocationProductPage from './ModelCollocationProductPage';
import ApiService from './ApiService';
import ProductBuilder from './ProductBuilder';

interface PageProps {
  type: PageType;
}

type PageType =
  | 'public_styler_template_page'
  | 'my_styler_template'
  | 'enterprise_styler_template_page'
  | 'model_collocation_page'
  | 'model_collocation_product_page';

interface ModelCollocationData {
  name: string;
  image: string;
  models: unknown[];
  roomTypeName: string;
}

interface TooltipConfig {
  icon: string;
  iconHover: string;
  tooltipTitle: string;
}

interface Product {
  isUserUpload?: boolean;
  [key: string]: unknown;
}

declare const HSApp: {
  App: {
    getApp(): {
      userTrackLogger: {
        push(event: string, data: unknown): void;
      };
    };
  };
  Config: {
    TENANT: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

export default function StylerTemplatePage(props: PageProps): JSX.Element {
  const [currentPageType, setCurrentPageType] = useState<PageType>(props.type);
  const [imageData, setImageData] = useState<unknown | null>(null);
  const [imageSearchActiveType, setImageSearchActiveType] = useState<string>('');
  const [collocationData, setCollocationData] = useState<ModelCollocationData>({
    name: '',
    image: '',
    models: [],
    roomTypeName: ''
  });

  useEffect(() => {
    setCurrentPageType(props.type);
    
    if (props.type === 'public_styler_template_page') {
      HSApp.App.getApp().userTrackLogger.push('catalog.styler_room', {
        activeSection: 'styler_room',
        activeSectionName: '点击模型搭配',
        description: '速搭',
        clicksRatio: {
          id: 'public_styler_template',
          name: '点击模型搭配'
        }
      });
    }
  }, [props.type]);

  const toggleImagePage = (data: unknown): void => {
    setImageSearchActiveType(data ? currentPageType : '');
    setImageData(data);
  };

  if (imageData && currentPageType === imageSearchActiveType) {
    return (
      <ImageSearchPage
        imgData={imageData}
        onBack={() => toggleImagePage(null)}
      />
    );
  }

  if (currentPageType === 'my_styler_template') {
    return (
      <DefaultTemplate
        type="my_styler_template"
        key="my_styler_template"
        subTitle={ResourceManager.getString('new_category_styler_my')}
        queryProductApi={ApiService.getMyStylerProduct}
        showTabs={true}
        showCreateTemplateRoomButton={true}
        productBuilder={(product: Product) => {
          product.isUserUpload = true;
          return ProductBuilder.build(product);
        }}
        toggleImagePage={toggleImagePage}
      />
    );
  }

  if (currentPageType === 'model_collocation_product_page') {
    return (
      <ModelCollocationProductPage
        data={collocationData}
        onSwitchPage={() => setCurrentPageType('model_collocation_page')}
      />
    );
  }

  if (currentPageType === 'enterprise_styler_template_page') {
    return (
      <DefaultTemplate
        type="enterprise_styler_template_page"
        key="enterprise_styler_template_page"
        subTitle={ResourceManager.getString('new_category_styler_merchant')}
        queryProductApi={ApiService.getMerchentPublicStylerProduct}
        showTabs={true}
        toggleImagePage={toggleImagePage}
      />
    );
  }

  if (currentPageType === 'model_collocation_page') {
    return (
      <DefaultTemplate
        type="model_collocation_page"
        key="model_collocation_page"
        subTitle={ResourceManager.getString('new_category_styler_model')}
        onSwitchPage={(data: ModelCollocationData) => {
          setCollocationData(data);
          setCurrentPageType('model_collocation_product_page');
        }}
        queryProductApi={ApiService.getModelChannelSearch}
        showTabs={false}
        toggleImagePage={toggleImagePage}
      />
    );
  }

  const isFpTenant = HSApp.Config.TENANT === 'fp';
  const tooltipConfig: TooltipConfig | undefined = isFpTenant
    ? {
        icon: 'hs_shuxingmianban_xiangqing',
        iconHover: 'hs_shuxingmianban_xiangqinghover',
        tooltipTitle: ResourceManager.getString('catalog_autostyler_pageheader_tips')
      }
    : undefined;

  return (
    <DefaultTemplate
      type="public_styler_template_page"
      key="public_styler_template_page"
      subTitle={ResourceManager.getString('new_category_styler_public')}
      queryProductApi={ApiService.getPublicTemplateRoom}
      showTabs={true}
      tooltipContent={tooltipConfig}
      showSurvey={isFpTenant}
      surveyType="autoStyler"
      showApplyEntry={false}
      toggleImagePage={toggleImagePage}
    />
  );
}