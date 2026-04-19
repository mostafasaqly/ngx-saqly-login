import { InjectionToken } from '@angular/core';
import { SaqlyLoginGlobalConfig } from '../types/saqly-login.types';

export const SAQLY_LOGIN_GLOBAL_CONFIG =
  new InjectionToken<SaqlyLoginGlobalConfig>('SAQLY_LOGIN_GLOBAL_CONFIG');
