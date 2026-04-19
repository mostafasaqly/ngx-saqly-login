# ngx-saqly-login

A configurable Angular standalone login UI package for building polished authentication screens faster.

---

## Features

- Standalone-first Angular component
- Optional NgModule support
- Config-driven API
- Full theme customization
- Dark / Light / Auto mode
- Validation messages
- Social login support
- Logo / Footer templates
- RTL support
- Global defaults via forRoot()

---

## Installation

```bash
npm install ngx-saqly-login
```

---

## Peer Dependencies

```bash
npm install @angular/core @angular/common @angular/forms
```

---

## Full Example

### app.ts

```ts

import {
  AfterViewInit,
  Component,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  SaqlyLoginComponent,
  SaqlyLoginConfig,
} from 'ngx-saqly-login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SaqlyLoginComponent],
  templateUrl: './app.html',
})
export class App implements AfterViewInit {
  @ViewChild('logoTpl', { static: true })
  logoTpl!: TemplateRef<any>;

  @ViewChild('footerTpl', { static: true })
  footerTpl!: TemplateRef<any>;

  loading = signal(false);

  config: SaqlyLoginConfig = {
    title: 'Login to Dashboard',
    subtitle: 'Sign in to continue and access your account',
    buttonText: 'Sign In',
    loadingText: 'Signing in...',

    mode: 'dark',
    direction: 'ltr',

    showBackground: true,
    showBadge: true,
    showRememberMe: true,
    showForgotPassword: true,
    showRegister: true,
    showPasswordToggle: true,
    showSocialLogin: true,

    cardMaxWidth: '460px',

    badgeText: 'TEST AUTH',

    emailLabel: 'Work Email',
    passwordLabel: 'Password',
    emailPlaceholder: 'Enter your work email',
    passwordPlaceholder: 'Enter your password',

    rememberMeText: 'Keep me signed in',
    forgotPasswordText: 'Forgot your password?',
    forgotPasswordLink: '#',
    registerText: 'Create account',
    registerLink: '#',

    passwordMinLength: 6,
    passwordMaxLength: 30,
    passwordPattern: '^(?=.*[A-Z])(?=.*[0-9]).+$',

    emailAutocomplete: 'email',
    passwordAutocomplete: 'current-password',

    autoFocusEmail: true,
    disabled: false,
    enableAnimations: true,

    socialButtons: [
      { id: 'google', label: 'Continue with Google' },
      { id: 'github', label: 'Continue with GitHub' },
      { id: 'microsoft', label: 'Continue with Microsoft' },
    ],

    validationMessages: {
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 6 characters',
      passwordMaxLength: 'Password must not exceed 30 characters',
      passwordPattern: 'Password must contain at least one uppercase letter and one number',
    },

    colors: {
      primary: '#06b6d4',
      secondary: '#8b5cf6',
      background: 'linear-gradient(135deg, #0f172a 0%, #111827 50%, #020617 100%)',
      backgroundAccentStart: 'rgba(6, 182, 212, 0.20)',
      backgroundAccentEnd: 'rgba(139, 92, 246, 0.22)',
      cardBackground: 'rgba(15, 23, 42, 0.86)',
      cardBorder: 'rgba(255, 255, 255, 0.08)',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#94a3b8',
      inputBackground: 'rgba(15, 23, 42, 0.78)',
      inputBorder: 'rgba(148, 163, 184, 0.20)',
      inputPlaceholder: '#64748b',
      focusRing: 'rgba(6, 182, 212, 0.22)',
      buttonText: '#ffffff',
      link: '#22d3ee',
      linkHover: '#67e8f9',
      badgeBackground: 'rgba(6, 182, 212, 0.14)',
      badgeBorder: 'rgba(34, 211, 238, 0.24)',
      badgeText: '#cffafe',
      shadow: '0 25px 50px rgba(0, 0, 0, 0.35), 0 10px 25px rgba(6, 182, 212, 0.12)',
      error: '#f87171',
      checkbox: '#06b6d4',
    },

    theme: {
      borderRadius: '24px',
      cardPadding: '2rem',
      inputHeight: '52px',
      buttonHeight: '52px',
      fontFamily: 'Inter, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
  };

  ngAfterViewInit(): void {
    this.config = {
      ...this.config,
      logoTemplate: this.logoTpl,
      footerTemplate: this.footerTpl,
    };
  }

handleLogin(event: {
  email: string;
  password: string;
  rememberMe: boolean;
}): void {
  console.log('login event', event);

  this.loading.set(true);

  setTimeout(() => {
    this.loading.set(false);
    console.log('login finished');
  }, 1500);
}

  handleForgotPassword(): void {
    console.log('forgot password clicked');
    alert('Forgot password clicked');
  }

  handleRegister(event: { source: 'link' | 'footer' }): void {
    console.log('register clicked', event);
    alert(`Register clicked from: ${event.source}`);
  }

  handleSocialLogin(providerId: string): void {
    console.log('social login', providerId);
    alert(`Social login with: ${providerId}`);
  }
}

```

---

### app.html

```html
<ng-template #logoTpl>
  <div
    style="
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      font-weight: 800;
      font-size: 1rem;
      color: #cffafe;
    "
  >
    <span
      style="
        width: 12px;
        height: 12px;
        border-radius: 999px;
        background: linear-gradient(135deg, #06b6d4, #8b5cf6);
        display: inline-block;
      "
    ></span>
    TEST AUTH
  </div>
</ng-template>

<ng-template #footerTpl let-register="register" let-disabled="disabled">
  <div
    style="
      font-size: 0.9rem;
      color: #94a3b8;
      text-align: center;
    "
  >
    Don’t have an account?
    <a
      href="#"
      (click)="register($event)"
      [style.pointer-events]="disabled ? 'none' : 'auto'"
      [style.opacity]="disabled ? '0.7' : '1'"
      style="
        color: #22d3ee;
        text-decoration: none;
        font-weight: 600;
        margin-left: 0.35rem;
      "
    >
      Create one
    </a>
  </div>
</ng-template>

<ngx-saqly-login
  [config]="config"
  [loading]="loading()"
  (login)="handleLogin($event)"
  (forgotPassword)="handleForgotPassword()"
  (register)="handleRegister($event)"
  (socialLogin)="handleSocialLogin($event)"
>
</ngx-saqly-login>

```

## License

MIT

