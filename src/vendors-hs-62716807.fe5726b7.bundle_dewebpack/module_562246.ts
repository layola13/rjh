import * as LayoutModule from './Layout';
import Sider from './Sider';

interface LayoutComponent {
  Header: typeof LayoutModule.Header;
  Footer: typeof LayoutModule.Footer;
  Content: typeof LayoutModule.Content;
  Sider: typeof Sider;
}

const Layout = LayoutModule.default as typeof LayoutModule.default & LayoutComponent;

Layout.Header = LayoutModule.Header;
Layout.Footer = LayoutModule.Footer;
Layout.Content = LayoutModule.Content;
Layout.Sider = Sider;

export default Layout;