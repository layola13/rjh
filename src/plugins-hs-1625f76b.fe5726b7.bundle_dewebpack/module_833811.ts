import { ImageSearchButton } from './759438';
import { ImageSearchPage } from './645587';
import BaseClass from './9038';

export default class ImageSearchModule extends BaseClass {
  get imageSearchIcon(): typeof ImageSearchButton {
    return ImageSearchButton;
  }

  get imageSearchPage(): typeof ImageSearchPage {
    return ImageSearchPage;
  }
}