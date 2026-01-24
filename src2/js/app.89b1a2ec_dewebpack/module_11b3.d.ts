/**
 * Localization strings for authentication and user interface
 * @module AuthLocalization
 */

/**
 * Authentication and UI localization interface
 * Contains all text strings for login, registration, and common UI elements
 */
export interface AuthLocalizationStrings {
  /** Button text for user registration */
  register: string;
  
  /** Button text to send verification code */
  sendcode: string;
  
  /** Prompt text for existing users to login */
  gologin: string;
  
  /** Label for nickname input field */
  nickname: string;
  
  /** Label for phone number input field */
  phone_number: string;
  
  /** Label for password confirmation field */
  checkpassword: string;
  
  /** Label for password input field */
  password: string;
  
  /** Button text for password-based login */
  pwdlogin: string;
  
  /** Button text for SMS code-based login */
  msglogin: string;
  
  /** Button text for login action */
  login: string;
  
  /** Error message when verification code is missing */
  coderequire: string;
  
  /** Error message when nickname is missing */
  nicknamerequire: string;
  
  /** Error message when nickname exceeds 16 characters */
  nickname16: string;
  
  /** Error message for invalid phone number format */
  correctphonenumber: string;
  
  /** Error message when phone number is missing */
  phone_numberrequire: string;
  
  /** Error message when phone numbers don't match */
  phone_not_same: string;
  
  /** Error message when password is missing */
  passwordrequire: string;
  
  /** Error message for invalid password length (must be 8-18 chars) */
  correctpassword: string;
  
  /** Error message when passwords don't match */
  passwordnotequal: string;
  
  /** Success message after successful registration */
  registerok: string;
  
  /** Button text to refresh content */
  refresh: string;
  
  /** Notification about new version availability */
  newversvail: string;
  
  /** Checkbox label to remember login credentials */
  remember_password: string;
  
  /** Link text for password recovery */
  forgot_password: string;
  
  /** Prompt text for users without an account */
  no_account: string;
  
  /** Label for WeChat login option */
  wechat: string;
  
  /** Label for Facebook login option */
  facebook: string;
  
  /** Label for Google login option */
  google: string;
  
  /** Button text to confirm an action */
  confirm: string;
  
  /** Title for password retrieval page */
  retrieve_password: string;
  
  /** Alternative remember password prompt */
  remember_password1: string;
  
  /** Label for optional invitation code field */
  invited_code: string;
  
  /** Error message when phone already exists in system */
  phoneexistgologin: string;
  
  /** Application title describing main functionality */
  title: string;
  
  /** Section title for third-party login options */
  thirdwaylogin: string;
  
  /** Error message when username is missing */
  usernamerequire: string;
  
  /** Error message when registration code is missing */
  sncoderequire: string;
  
  /** Error message when space name is missing */
  spacenamerequired: string;
  
  /** Error message for invalid registration code */
  sncode_err: string;
  
  /** Error message prompting company selection */
  selectCompanyRequired: string;
  
  /** Message displayed when no data is available */
  noData: string;
  
  /** Welcome message for forms */
  formtitle: string;
  
  /** Header link to official website */
  head_r_title1: string;
  
  /** Header link to help documentation */
  head_r_title2: string;
  
  /** Header description of main features */
  head_l_title1: string;
  
  /** Title for account registration section */
  regster_title: string;
  
  /** Footer text about privacy agreement */
  footer_agreement: string;
  
  /** Link text for user license agreement */
  license: string;
  
  /** Link text for privacy policy */
  privacy: string;
  
  /** Link text to revert to old version */
  back_version: string;
  
  /** Label for total user count display */
  user_count: string;
  
  /** Label for today's active user count */
  login_users: string;
  
  /** Checkbox text for agreement acceptance */
  agree: string;
  
  /** Button text for Apple ID login */
  apple_login: string;
}

/**
 * Default English localization strings
 * Exported as the module's default value
 */
declare const authLocalization: AuthLocalizationStrings;

export default authLocalization;