import {
  SAQLY_LOGIN_DARK_COLORS,
  SAQLY_LOGIN_DEFAULT_CONFIG,
  SAQLY_LOGIN_DEFAULT_SOCIAL_BUTTONS,
  SAQLY_LOGIN_DEFAULT_THEME,
  SAQLY_LOGIN_DEFAULT_VALIDATION_MESSAGES,
  SAQLY_LOGIN_LIGHT_COLORS,
} from '../types/saqly-login.defaults';
import {
  SaqlyLoginColors,
  SaqlyLoginConfig,
  SaqlyLoginThemeMode,
} from '../types/saqly-login.types';

export function resolveMode(mode: SaqlyLoginThemeMode): 'dark' | 'light' {
  if (mode === 'auto') {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'dark';
  }

  return mode;
}

export function mergeSaqlyLoginConfig(
  localConfig: SaqlyLoginConfig = {},
  globalConfig: SaqlyLoginConfig = {}
) {
  const merged = {
    ...SAQLY_LOGIN_DEFAULT_CONFIG,
    ...globalConfig,
    ...localConfig,
  };

  const mode = resolveMode(merged.mode);

  const baseColors: SaqlyLoginColors =
    mode === 'light' ? SAQLY_LOGIN_LIGHT_COLORS : SAQLY_LOGIN_DARK_COLORS;

  return {
    ...merged,
    mode,
    colors: {
      ...baseColors,
      ...(globalConfig.colors ?? {}),
      ...(localConfig.colors ?? {}),
    },
    validationMessages: {
      ...SAQLY_LOGIN_DEFAULT_VALIDATION_MESSAGES,
      ...(globalConfig.validationMessages ?? {}),
      ...(localConfig.validationMessages ?? {}),
    },
    theme: {
      ...SAQLY_LOGIN_DEFAULT_THEME,
      ...(globalConfig.theme ?? {}),
      ...(localConfig.theme ?? {}),
    },
    socialButtons:
      localConfig.socialButtons ??
      globalConfig.socialButtons ??
      SAQLY_LOGIN_DEFAULT_SOCIAL_BUTTONS,
  };
}
