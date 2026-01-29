import Cookies from './cookie-module';

interface CookieConfig {
  prefix: string;
  subDomain: string;
  mainDomain: string;
  pageDomain: string;
  secure: boolean;
  sameSite: 'None' | 'Lax' | 'Strict';
  syncCookieMode: boolean;
}

interface TopConfig {
  prefix: string;
  subDomain: string;
  mainDomain: string;
  pageDomain: string;
}

interface ConfigModule {
  TOP_CONFIG: TopConfig;
  MTOP_CONFIG: TopConfig;
  useHomestylerTop?: boolean;
}

const configModule: ConfigModule = Cookies;

const selectedConfig: TopConfig = configModule.useHomestylerTop 
  ? Cookies.TOP_CONFIG 
  : Cookies.MTOP_CONFIG;

const cookieConfig: CookieConfig = {
  prefix: selectedConfig.prefix,
  subDomain: selectedConfig.subDomain,
  mainDomain: selectedConfig.mainDomain,
  pageDomain: selectedConfig.pageDomain,
  secure: true,
  sameSite: 'None',
  syncCookieMode: true
};

const cookieInstance = new Cookies({
  config: cookieConfig
});

export default cookieInstance;