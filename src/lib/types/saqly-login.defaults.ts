import {
  SaqlyLoginColors,
  SaqlyLoginConfig,
  SaqlyLoginSocialButton,
} from './saqly-login.types';

export const SAQLY_LOGIN_DEFAULT_SOCIAL_BUTTONS: SaqlyLoginSocialButton[] = [
  { id: 'google', label: 'Continue with Google' },
  { id: 'github', label: 'Continue with GitHub' },
];

export const SAQLY_LOGIN_DARK_COLORS: SaqlyLoginColors = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  background: 'linear-gradient(135deg, #0f172a 0%, #111827 50%, #0b1120 100%)',
  backgroundAccentStart: 'rgba(99, 102, 241, 0.25)',
  backgroundAccentEnd: 'rgba(168, 85, 247, 0.20)',
  cardBackground: 'rgba(15, 23, 42, 0.82)',
  cardBorder: 'rgba(255, 255, 255, 0.08)',
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  inputBackground: 'rgba(15, 23, 42, 0.75)',
  inputBorder: 'rgba(148, 163, 184, 0.20)',
  inputPlaceholder: '#64748b',
  focusRing: 'rgba(99, 102, 241, 0.25)',
  buttonText: '#ffffff',
  link: '#a5b4fc',
  linkHover: '#c7d2fe',
  badgeBackground: 'rgba(99, 102, 241, 0.12)',
  badgeBorder: 'rgba(129, 140, 248, 0.28)',
  badgeText: '#c7d2fe',
  shadow: '0 25px 50px rgba(0, 0, 0, 0.35), 0 10px 25px rgba(99, 102, 241, 0.15)',
  error: '#f87171',
  checkbox: '#6366f1',
};

export const SAQLY_LOGIN_LIGHT_COLORS: SaqlyLoginColors = {
  primary: '#4f46e5',
  secondary: '#7c3aed',
  background: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 55%, #f5f3ff 100%)',
  backgroundAccentStart: 'rgba(79, 70, 229, 0.18)',
  backgroundAccentEnd: 'rgba(124, 58, 237, 0.14)',
  cardBackground: 'rgba(255, 255, 255, 0.88)',
  cardBorder: 'rgba(15, 23, 42, 0.08)',
  textPrimary: '#0f172a',
  textSecondary: '#334155',
  textMuted: '#64748b',
  inputBackground: 'rgba(255, 255, 255, 0.92)',
  inputBorder: 'rgba(148, 163, 184, 0.28)',
  inputPlaceholder: '#94a3b8',
  focusRing: 'rgba(79, 70, 229, 0.18)',
  buttonText: '#ffffff',
  link: '#4f46e5',
  linkHover: '#4338ca',
  badgeBackground: 'rgba(79, 70, 229, 0.08)',
  badgeBorder: 'rgba(79, 70, 229, 0.18)',
  badgeText: '#4338ca',
  shadow: '0 18px 40px rgba(15, 23, 42, 0.12), 0 8px 22px rgba(79, 70, 229, 0.08)',
  error: '#dc2626',
  checkbox: '#4f46e5',
};

export const SAQLY_LOGIN_DEFAULT_CONFIG: Required<
  Omit<
    SaqlyLoginConfig,
    | 'colors'
    | 'theme'
    | 'validationMessages'
    | 'logoTemplate'
    | 'footerTemplate'
    | 'socialButtons'
  >
> = {
  title: 'Welcome back',
  subtitle: 'Sign in to continue and access your account',
  buttonText: 'Login',
  loadingText: 'Loading...',
  mode: 'dark',
  direction: 'ltr',
  showBackground: true,
  showBadge: true,
  showRememberMe: false,
  showForgotPassword: false,
  showRegister: false,
  showPasswordToggle: true,
  showSocialLogin: false,
  cardMaxWidth: '420px',
  emailLabel: 'Email',
  passwordLabel: 'Password',
  emailPlaceholder: 'Email',
  passwordPlaceholder: 'Password',
  rememberMeText: 'Remember me',
  forgotPasswordText: 'Forgot Password?',
  forgotPasswordLink: '#',
  registerText: 'Create account',
  registerLink: '#',
  badgeText: 'ngx-saqly-login',
  passwordMinLength: 6,
  passwordMaxLength: 100,
  passwordPattern: '',
  emailAutocomplete: 'email',
  passwordAutocomplete: 'current-password',
  autoFocusEmail: false,
  disabled: false,
  enableAnimations: true,
};

export const SAQLY_LOGIN_DEFAULT_VALIDATION_MESSAGES = {
  emailRequired: 'Email is required.',
  emailInvalid: 'Please enter a valid email address.',
  passwordRequired: 'Password is required.',
  passwordMinLength: 'Password is too short.',
  passwordMaxLength: 'Password is too long.',
  passwordPattern: 'Password format is invalid.',
};

export const SAQLY_LOGIN_DEFAULT_THEME = {
  borderRadius: '24px',
  cardPadding: '2rem',
  inputHeight: '52px',
  buttonHeight: '52px',
  fontFamily: `Inter, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
};
