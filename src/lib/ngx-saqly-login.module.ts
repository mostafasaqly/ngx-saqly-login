import { ModuleWithProviders, NgModule } from '@angular/core';
import { SaqlyLoginComponent } from './saqly-login/saqly-login.component';
import { SAQLY_LOGIN_GLOBAL_CONFIG } from './saqly-login/saqly-login.tokens';
import { SaqlyLoginGlobalConfig } from './types/saqly-login.types';

@NgModule({
  imports: [SaqlyLoginComponent],
  exports: [SaqlyLoginComponent],
})
export class SaqlyLoginModule {
  static forRoot(
    config: SaqlyLoginGlobalConfig
  ): ModuleWithProviders<SaqlyLoginModule> {
    return {
      ngModule: SaqlyLoginModule,
      providers: [
        {
          provide: SAQLY_LOGIN_GLOBAL_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
