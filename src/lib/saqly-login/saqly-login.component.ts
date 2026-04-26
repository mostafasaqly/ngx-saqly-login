import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SAQLY_LOGIN_GLOBAL_CONFIG } from './saqly-login.tokens';
import { mergeSaqlyLoginConfig } from './saqly-login.utils';
import {
  SaqlyLoginConfig,
  SaqlyLoginFooterTemplateContext,
  SaqlyLoginLogoTemplateContext,
  SaqlyLoginRegisterEvent,
  SaqlyLoginResolvedConfig,
  SaqlyLoginSocialButton,
  SaqlyLoginSubmitEvent,
} from '../types/saqly-login.types';

const GLOBAL_STYLE_ID = 'ngx-saqly-login-reset';

@Component({
  selector: 'ngx-saqly-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './saqly-login.component.html',
  styleUrl: './saqly-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaqlyLoginComponent implements OnInit {
  @Input() config: SaqlyLoginConfig = {};
  @Input() loading = false;

  @Output() login = new EventEmitter<SaqlyLoginSubmitEvent>();
  @Output() forgotPassword = new EventEmitter<void>();
  @Output() register = new EventEmitter<SaqlyLoginRegisterEvent>();
  @Output() socialLogin = new EventEmitter<string>();

  email = '';
  password = '';
  rememberMe = false;
  isPasswordVisible = false;

  constructor(
    @Optional()
    @Inject(SAQLY_LOGIN_GLOBAL_CONFIG)
    private readonly globalConfig: SaqlyLoginConfig | null,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngOnInit(): void {
    if (!this.document.getElementById(GLOBAL_STYLE_ID)) {
      const style = this.document.createElement('style');
      style.id = GLOBAL_STYLE_ID;
      style.textContent = 'body{margin:0;padding:0;box-sizing:border-box}';
      this.document.head.appendChild(style);
    }
  }

  get mergedConfig(): SaqlyLoginResolvedConfig {
    return mergeSaqlyLoginConfig(this.config, this.globalConfig ?? {});
  }

  get hostStyles(): Record<string, string> {
    const c = this.mergedConfig.colors;
    const t = this.mergedConfig.theme;

    return {
      '--sl-primary': c.primary,
      '--sl-secondary': c.secondary,
      '--sl-bg': c.background,
      '--sl-bg-accent-start': c.backgroundAccentStart,
      '--sl-bg-accent-end': c.backgroundAccentEnd,
      '--sl-card-bg': c.cardBackground,
      '--sl-card-border': c.cardBorder,
      '--sl-text-primary': c.textPrimary,
      '--sl-text-secondary': c.textSecondary,
      '--sl-text-muted': c.textMuted,
      '--sl-input-bg': c.inputBackground,
      '--sl-input-border': c.inputBorder,
      '--sl-input-placeholder': c.inputPlaceholder,
      '--sl-focus-ring': c.focusRing,
      '--sl-button-text': c.buttonText,
      '--sl-link': c.link,
      '--sl-link-hover': c.linkHover,
      '--sl-badge-bg': c.badgeBackground,
      '--sl-badge-border': c.badgeBorder,
      '--sl-badge-text': c.badgeText,
      '--sl-shadow': c.shadow,
      '--sl-error': c.error,
      '--sl-checkbox': c.checkbox,
      '--sl-card-max-width': this.mergedConfig.cardMaxWidth,
      '--sl-radius': t.borderRadius,
      '--sl-card-padding': t.cardPadding,
      '--sl-input-height': t.inputHeight,
      '--sl-button-height': t.buttonHeight,
      '--sl-font-family': t.fontFamily,
    };
  }

  get isDisabled(): boolean {
    return this.loading || this.mergedConfig.disabled;
  }

  get passwordPatternValue(): string {
    return this.mergedConfig.passwordPattern || '';
  }

  get logoTemplateContext(): SaqlyLoginLogoTemplateContext {
    return {
      $implicit: this.mergedConfig,
      config: this.mergedConfig,
    };
  }

  get footerTemplateContext(): SaqlyLoginFooterTemplateContext {
    return {
      $implicit: this.mergedConfig,
      config: this.mergedConfig,
      register: (event?: Event) => this.onFooterRegister(event),
      forgotPassword: (event?: Event) => this.onForgotPassword(event),
      loading: this.loading,
      disabled: this.isDisabled,
    };
  }

  trackSocialButton(_: number, button: SaqlyLoginSocialButton): string {
    return button.id;
  }

  togglePasswordVisibility(): void {
    if (this.isDisabled || !this.mergedConfig.showPasswordToggle) return;
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onForgotPassword(event?: Event): void {
    event?.preventDefault();
    if (this.isDisabled) return;
    this.forgotPassword.emit();
  }

  onRegister(event?: Event): void {
    event?.preventDefault();
    if (this.isDisabled) return;
    this.register.emit({ source: 'link' });
  }

  onFooterRegister(event?: Event): void {
    event?.preventDefault();
    if (this.isDisabled) return;
    this.register.emit({ source: 'footer' });
  }

  onSocialLogin(providerId: string): void {
    if (this.isDisabled) return;
    this.socialLogin.emit(providerId);
  }

  onSubmit(form: NgForm): void {
    if (this.isDisabled || form.invalid) return;

    this.login.emit({
      email: this.email.trim(),
      password: this.password,
      rememberMe: this.rememberMe,
    });
  }
}
