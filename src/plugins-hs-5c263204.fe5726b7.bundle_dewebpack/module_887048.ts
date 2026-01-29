export interface SearchResult {
  totalNumber: number;
  total: number;
  [key: string]: unknown;
}

export interface SearchCriteria {
  targetCity: string;
  [key: string]: unknown;
}

export class PublicTemplateService {
  /**
   * Search public templates with specified criteria
   * @param searchTerm - Search term for template name
   * @param category - Template category
   * @param subcategory - Template subcategory
   * @param criteria - Search criteria including target city
   * @param offset - Pagination offset (default: 0)
   * @param limit - Number of results per page (default: 16)
   * @param excludeNeighborName - Whether to exclude neighbor name search
   * @returns Promise resolving to search results
   */
  static async searchPublicTemplates(
    searchTerm: string,
    category: string,
    subcategory: string,
    criteria: SearchCriteria,
    offset: number = 0,
    limit: number = 16,
    excludeNeighborName?: boolean
  ): Promise<SearchResult> {
    const targetCity = criteria.targetCity;

    if (targetCity && targetCity.toLowerCase().search('id') !== -1) {
      const cityId = targetCity.split('_')[1];
      const searchCriteriaList: unknown[] = [];

      if (!excludeNeighborName && searchTerm) {
        searchCriteriaList.push(NWTK.api.design.SearchCriteriaEnum.neighborName);
      }

      try {
        const result = await NWTK.api.design.searchMiniPublicTemplatesV2(
          searchTerm,
          category,
          subcategory,
          cityId,
          searchCriteriaList,
          offset,
          limit
        );

        const maxTotal = 15 * limit;
        result.totalNumber = result.total;

        if (result.total > maxTotal) {
          result.total = maxTotal;
        }

        return result;
      } catch (error) {
        throw error;
      }
    }

    return {};
  }

  /**
   * Submit public templates
   * @param templateId - Template identifier
   * @param data - Template data to submit
   * @returns Promise resolving to submission result
   */
  static submitPublicTemplates(templateId: string, data: unknown): Promise<unknown> {
    return NWTK.api.design.submitPublicTemplates(templateId, data);
  }

  /**
   * Get China address information
   * @returns Promise resolving to address info
   */
  static getAddressInfo(): Promise<unknown> {
    return NWTK.api.general.getChinaAddressInfoV2();
  }
}