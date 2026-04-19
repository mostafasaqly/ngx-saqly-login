import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SAQLY_LOGIN_GLOBAL_CONFIG } from './saqly-login.tokens';
import { mergeSaqlyLoginConfig } from './saqly-login.utils';
import {
  SaqlyLoginConfig,
  SaqlyLoginRegisterEvent,
  SaqlyLoginSocialButton,
  SaqlyLoginSubmitEvent,
} from '../types/saqly-login.types';

@Component({
  selector: 'ngx-saqly-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './saqly-login.component.html',
  styleUrl: './saqly-login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaqlyLoginComponent {
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
    private readonly globalConfig: SaqlyLoginConfig | null
  ) {}

  get mergedConfig() {
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
      '--sl-radius': t.borderRadius ?? '24px',
      '--sl-card-padding': t.cardPadding ?? '2rem',
      '--sl-input-height': t.inputHeight ?? '52px',
      '--sl-button-height': t.buttonHeight ?? '52px',
      '--sl-font-family':
        t.fontFamily ?? `Inter, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
    };
  }

  get isDisabled(): boolean {
    return this.loading || this.mergedConfig.disabled;
  }

  get passwordPatternValue(): string  {
    return this.mergedConfig.passwordPattern || '';
  }

  trackSocialButton(_: number, button: SaqlyLoginSocialButton): string {
    return button.id;
  }

  togglePasswordVisibility(): void {
    if (this.isDisabled || !this.mergedConfig.showPasswordToggle) return;
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onForgotPassword(event: Event): void {
    event.preventDefault();
    this.forgotPassword.emit();
  }

  onRegister(event: Event): void {
    event.preventDefault();
    this.register.emit({ source: 'link' });
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
