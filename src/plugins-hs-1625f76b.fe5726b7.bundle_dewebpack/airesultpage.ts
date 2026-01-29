import React, { useState, useEffect } from 'react';
import { HSApp } from './HSApp';
import PageTitle from './PageTitle';
import { AIPagePanelId } from './AIPagePanelId';
import { MyAiModelerPage } from './MyAiModelerPage';
import { MyAiMoodboardPage } from './MyAiMoodboardPage';

interface Category {
  name: string;
  thumbnail: string;
  categoryTypes: string[];
}

interface CatalogData {
  categories?: Category[];
}

interface AIResultPageProps {
  entryText: string;
  title: string;
  catalogData: CatalogData;
  subPageId?: string;
  refreshNum?: number;
}

type PageType = 'mainPage' | string;

export const AIResultPage: React.FC<AIResultPageProps> = ({
  entryText,
  title,
  catalogData,
  subPageId,
  refreshNum
}) => {
  const [currentPage, setCurrentPage] = useState<PageType>('mainPage');
  const [isRefreshModeler, setRefreshModeler] = useState<boolean>(false);

  const customAttributeIds = HSApp.Catalog.DataConfig.CustomAttributeIdEnum;
  const AI_MODELER_ID = customAttributeIds.aiModeler;
  const AI_MOODBOARD_ID = customAttributeIds.aiMoodboard;
  const AI_MATERIAL_ID = customAttributeIds.aiMaterial;

  const MODELER_CATEGORY_ID = '4f0facde-9e79-4df4-9c0c-e337de5bd69f';
  const MATERIAL_CATEGORY_ID = '1ce13832-a2b0-4461-a88e-7c740753cd23';

  useEffect(() => {
    if (subPageId) {
      setCurrentPage(subPageId);
      setRefreshModeler(true);
    }
  }, [refreshNum, subPageId]);

  const handleBackToMainPage = (): void => {
    setCurrentPage('mainPage');
  };

  const handleOpenPagePanel = (): void => {
    const catalogPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.Catalog
    );

    const pagePanelMap: Record<string, string> = {
      [AI_MODELER_ID]: AIPagePanelId.AiModeler,
      [AI_MOODBOARD_ID]: AIPagePanelId.AiMoodboard,
      [AI_MATERIAL_ID]: AIPagePanelId.AiMaterial
    };

    if (catalogPlugin) {
      catalogPlugin.openPagePanel(pagePanelMap[currentPage]);
    }
  };

  const handleCategoryClick = (category: Category): void => {
    const sparkPicPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.SparkPicImage
    );

    if (category.categoryTypes.includes(AI_MODELER_ID)) {
      setCurrentPage(AI_MODELER_ID);
    } else if (category.categoryTypes.includes(AI_MOODBOARD_ID)) {
      setCurrentPage(AI_MOODBOARD_ID);
    } else if (category.categoryTypes.includes('aistyler')) {
      sparkPicPlugin.openImageList();
    } else if (category.categoryTypes.includes(AI_MATERIAL_ID)) {
      setCurrentPage(AI_MATERIAL_ID);
    }

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      'ai_result_event',
      { category: category.name }
    );
  };

  return (
    <>
      {currentPage === 'mainPage' && (
        <div className="ai-result-page">
          <PageTitle mainTitle={entryText} secondTitle={title} />
          <div className="category-items">
            {catalogData?.categories?.map((category) => (
              <div
                key={category.name}
                className="category-item"
                onClick={() => handleCategoryClick(category)}
              >
                <img className="category-image" src={category.thumbnail} />
                <label className="text">{category.name}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentPage === AI_MODELER_ID && (
        <MyAiModelerPage
          isRefreshModeler={isRefreshModeler}
          setRefreshModeler={setRefreshModeler}
          showBack={true}
          backClick={handleBackToMainPage}
          noResultHint={ResourceManager.getString('ai_modeler_empty_result').replace(
            '{ai}',
            'AI Modeler'
          )}
          noResultHintAction={handleOpenPagePanel}
          categoryId={MODELER_CATEGORY_ID}
        />
      )}

      {currentPage === AI_MOODBOARD_ID && (
        <MyAiMoodboardPage
          isRefreshModeler={isRefreshModeler}
          setRefreshModeler={setRefreshModeler}
          showBack={true}
          backClick={handleBackToMainPage}
        />
      )}

      {currentPage === AI_MATERIAL_ID && (
        <MyAiModelerPage
          isRefreshModeler={isRefreshModeler}
          setRefreshModeler={setRefreshModeler}
          showBack={true}
          backClick={handleBackToMainPage}
          noResultHint={ResourceManager.getString('ai_modeler_empty_result').replace(
            '{ai}',
            'AI Texturer'
          )}
          noResultHintAction={handleOpenPagePanel}
          categoryId={MATERIAL_CATEGORY_ID}
        />
      )}
    </>
  );
};