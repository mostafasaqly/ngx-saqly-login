import { TemplateRef } from '@angular/core';

export type SaqlyLoginThemeMode = 'dark' | 'light' | 'auto';
export type SaqlyLoginDirection = 'ltr' | 'rtl';

export interface SaqlyLoginValidationMessages {
  emailRequired?: string;
  emailInvalid?: string;
  passwordRequired?: string;
  passwordMinLength?: string;
  passwordMaxLength?: string;
  passwordPattern?: string;
}

export interface SaqlyLoginColors {
  primary: string;
  secondary: string;
  background: string;
  backgroundAccentStart: string;
  backgroundAccentEnd: string;
  cardBackground: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  inputBackground: string;
  inputBorder: string;
  inputPlaceholder: string;
  focusRing: string;
  buttonText: string;
  link: string;
  linkHover: string;
  badgeBackground: string;
  badgeBorder: string;
  badgeText: string;
  shadow: string;
  error: string;
  checkbox: string;
}

export interface SaqlyLoginSocialButton {
  id: 'google' | 'github' | 'microsoft' | string;
  label: string;
}

export interface SaqlyLoginThemeOptions {
  borderRadius?: string;
  cardPadding?: string;
  inputHeight?: string;
  buttonHeight?: string;
  fontFamily?: string;
}

export interface SaqlyLoginResolvedConfig {
  title: string;
  subtitle: string;
  buttonText: string;
  loadingText: string;

  mode: 'dark' | 'light';
  direction: SaqlyLoginDirection;

  showBackground: boolean;
  showBadge: boolean;
  showRememberMe: boolean;
  showForgotPassword: boolean;
  showRegister: boolean;
  showPasswordToggle: boolean;
  showSocialLogin: boolean;

  cardMaxWidth: string;

  emailLabel: string;
  passwordLabel: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;

  rememberMeText: string;
  forgotPasswordText: string;
  forgotPasswordLink: string;

  registerText: string;
  registerLink: string;

  badgeText: string;

  passwordMinLength: number;
  passwordMaxLength: number;
  passwordPattern: string;

  emailAutocomplete: string;
  passwordAutocomplete: string;
  autoFocusEmail: boolean;
  disabled: boolean;
  enableAnimations: boolean;

  socialButtons: SaqlyLoginSocialButton[];

  colors: SaqlyLoginColors;
  theme: Required<SaqlyLoginThemeOptions>;
  validationMessages: Required<SaqlyLoginValidationMessages>;

  logoTemplate?: TemplateRef<SaqlyLoginLogoTemplateContext>;
  footerTemplate?: TemplateRef<SaqlyLoginFooterTemplateContext>;
}

export interface SaqlyLoginLogoTemplateContext {
  $implicit: SaqlyLoginResolvedConfig;
  config: SaqlyLoginResolvedConfig;
}

export interface SaqlyLoginFooterTemplateContext {
  $implicit: SaqlyLoginResolvedConfig;
  config: SaqlyLoginResolvedConfig;
  register: (event?: Event) => void;
  forgotPassword: (event?: Event) => void;
  loading: boolean;
  disabled: boolean;
}

export interface SaqlyLoginConfig {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  loadingText?: string;

  mode?: SaqlyLoginThemeMode;
  direction?: SaqlyLoginDirection;

  showBackground?: boolean;
  showBadge?: boolean;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  showRegister?: boolean;
  showPasswordToggle?: boolean;
  showSocialLogin?: boolean;

  cardMaxWidth?: string;

  emailLabel?: string;
  passwordLabel?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;

  rememberMeText?: string;
  forgotPasswordText?: string;
  forgotPasswordLink?: string;

  registerText?: string;
  registerLink?: string;

  badgeText?: string;

  passwordMinLength?: number;
  passwordMaxLength?: number;
  passwordPattern?: string;

  emailAutocomplete?: string;
  passwordAutocomplete?: string;
  autoFocusEmail?: boolean;
  disabled?: boolean;
  enableAnimations?: boolean;

  socialButtons?: SaqlyLoginSocialButton[];

  colors?: Partial<SaqlyLoginColors>;
  theme?: SaqlyLoginThemeOptions;
  validationMessages?: SaqlyLoginValidationMessages;

  logoTemplate?: TemplateRef<SaqlyLoginLogoTemplateContext>;
  footerTemplate?: TemplateRef<SaqlyLoginFooterTemplateContext>;
}

export interface SaqlyLoginSubmitEvent {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SaqlyLoginRegisterEvent {
  source: 'link' | 'footer';
}

export interface SaqlyLoginGlobalConfig extends SaqlyLoginConfig {}
