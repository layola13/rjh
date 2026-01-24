/**
 * Internationalization language resource module
 * Contains UI text translations for authentication and user management
 * @module LocalizationStrings
 */

/**
 * Language resource strings for user authentication and registration
 * Provides localized text for login, registration, and account management features
 */
interface LocalizationStrings {
  /** Button text for user registration */
  register: string;
  
  /** Button text for sending verification code */
  sendcode: string;
  
  /** Link text prompting existing users to login */
  gologin: string;
  
  /** Label for nickname input field */
  nickname: string;
  
  /** Label for phone number input field (Vietnamese: "điện thoại") */
  phone_number: string;
  
  /** Label for password confirmation field */
  checkpassword: string;
  
  /** Label for password input field */
  password: string;
  
  /** Option text for password-based login */
  pwdlogin: string;
  
  /** Option text for SMS/message-based login */
  msglogin: string;
  
  /** Button text for login action */
  login: string;
  
  /** Validation error: verification code is required */
  coderequire: string;
  
  /** Validation error: nickname is required */
  nicknamerequire: string;
  
  /** Validation error: nickname length constraint */
  nickname16: string;
  
  /** Validation error: phone number format is incorrect */
  correctphonenumber: string;
  
  /** Validation error: phone number is required */
  phone_numberrequire: string;
  
  /** Validation error: phone numbers do not match */
  phone_not_same: string;
  
  /** Validation error: password is required */
  passwordrequire: string;
  
  /** Validation error: password length constraint (8-18 characters) */
  correctpassword: string;
  
  /** Validation error: password and confirmation do not match */
  passwordnotequal: string;
  
  /** Success message after registration */
  registerok: string;
  
  /** Button text to refresh content */
  refresh: string;
  
  /** Notification message for new version availability */
  newversvail: string;
  
  /** Checkbox label for remember password feature */
  remember_password: string;
  
  /** Link text for password recovery */
  forgot_password: string;
  
  /** Link text prompting users without account to register */
  no_account: string;
  
  /** Third-party login option: WeChat */
  wechat: string;
  
  /** Third-party login option: Facebook */
  facebook: string;
  
  /** Third-party login option: Google */
  google: string;
  
  /** Button text for confirmation action (Vietnamese: "Xác nhận") */
  confirm: string;
  
  /** Title text for password retrieval page */
  retrieve_password: string;
  
  /** Alternative remember password text with trailing context */
  remember_password1: string;
  
  /** Label for optional invitation code field */
  invited_code: string;
  
  /** Error message when phone number already exists */
  phoneexistgologin: string;
  
  /** Application title describing main functionality */
  title: string;
  
  /** Section title for third-party authentication options */
  thirdwaylogin: string;
  
  /** Validation error: username is required */
  usernamerequire: string;
  
  /** Validation error: registration code is required */
  sncoderequire: string;
  
  /** Validation error: workspace/space name is required */
  spacenamerequired: string;
  
  /** Error message for invalid registration code */
  sncode_err: string;
  
  /** Validation prompt: company selection is required */
  selectCompanyRequired: string;
  
  /** Empty state message when no data is available */
  noData: string;
  
  /** Form header welcome text */
  formtitle: string;
  
  /** Header navigation: official website link */
  head_r_title1: string;
  
  /** Header navigation: help documentation link */
  head_r_title2: string;
  
  /** Header tagline describing core functionality */
  head_l_title1: string;
  
  /** Registration page title */
  regster_title: string;
  
  /** Footer text for privacy agreement checkbox */
  footer_agreement: string;
  
  /** Link text for user license agreement */
  license: string;
  
  /** Link text for privacy policy */
  privacy: string;
  
  /** Link text to revert to previous version */
  back_version: string;
  
  /** Label for total registered users count */
  user_count: string;
  
  /** Label for daily active users count */
  login_users: string;
  
  /** Checkbox label for terms acceptance */
  agree: string;
  
  /** Third-party login option: Apple Sign In */
  apple_login: string;
}

/**
 * Default export containing localized strings
 * Parsed from JSON configuration
 */
declare const localizationStrings: LocalizationStrings;

export default localizationStrings;