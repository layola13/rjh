const FIT_CHROME_VERSION_NUMBER = 58;
const FIT_SAFARI_VERSION_NUMBER = 11;

type BrowserType = 'mobile' | 'chrome' | 'firefox' | 'opera' | 'safari' | 'msie' | 'camino' | 'gecko' | null;

/**
 * Get URL parameter value by name
 * @param paramName - The parameter name to retrieve
 * @returns The decoded parameter value or null if not found
 */
function getURLParameter(paramName: string): string | null {
    const regex = new RegExp(`[?|&]${paramName}=([^&;]+?)(&|#|;|$)`);
    const match = regex.exec(location.search);
    const value = match ? match[1] : '';
    return decodeURIComponent(value.replace(/\+/g, '%20')) || null;
}

const checkBrowser = getURLParameter('checkBrowser');
const isJumpFromQianniuClient = window.navigator.appVersion.includes('Qianniu');

let coupon = getURLParameter('coupon');
const env = getURLParameter('env');

coupon = coupon || (env && env.toLowerCase() === 'ihome' ? 'ysjj' : '');

let urlQueryStrings = coupon ? `?coupon=${coupon}` : '';

const fromUrl = encodeURIComponent(window.location.href);

if (urlQueryStrings) {
    urlQueryStrings += `&fromUrl=${fromUrl}`;
} else {
    urlQueryStrings = `?fromUrl=${fromUrl}`;
}

const ua = window.navigator.userAgent.toLowerCase();

/**
 * Check if the current device is a mobile device
 * @returns true if mobile device, false otherwise
 */
function isMobile(): boolean {
    return !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

/**
 * Detect the browser type from user agent
 * @returns The detected browser type
 */
function getBrowserType(): BrowserType {
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        urlQueryStrings += '&browserType=mobile';
        return 'mobile';
    }
    
    if (ua.indexOf('chrome') > 0) return 'chrome';
    if (ua.indexOf('firefox') > 0) return 'firefox';
    if (ua.indexOf('opera') > 0) return 'opera';
    if (ua.indexOf('safari') > 0) return 'safari';
    if (ua.indexOf('msie') > 0) return 'msie';
    if (ua.indexOf('camino') > 0) return 'camino';
    if (ua.indexOf('gecko') > 0) return 'gecko';
    
    return null;
}

const browserType = getBrowserType();

const unsupportedBrowserTypes: BrowserType[] = ['opera', 'msie', 'gecko', 'mobile'];
const shouldRedirectToBrowserCheck = checkBrowser !== 'false' && 
    (unsupportedBrowserTypes.includes(browserType) || isJumpFromQianniuClient);

if (shouldRedirectToBrowserCheck) {
    window.location.href = `./browsercheck.html${urlQueryStrings}`;
}