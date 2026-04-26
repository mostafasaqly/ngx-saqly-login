# ngx-saqly-login

A configurable Angular standalone login UI component for building polished authentication screens faster.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Component API](#component-api)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
- [Configuration Reference](#configuration-reference)
  - [SaqlyLoginConfig](#saqlyloginconfig)
  - [Dark & Light Themes](#dark--light-themes)
  - [Colors](#colors-saqlylogincolors)
  - [Theme](#theme-saqlyloginthemeoptions)
  - [Validation Messages](#validation-messages-saqlyloginvalidationmessages)
  - [Social Buttons](#social-buttons-saqlyloginsocialbutton)
- [Global Defaults with forRoot()](#global-defaults-with-forroot)
- [Custom Templates](#custom-templates)
  - [Logo Template](#logo-template)
  - [Footer Template](#footer-template)
- [Full Example](#full-example)
- [All Exported Symbols](#all-exported-symbols)

---

## Installation

```bash
npm install ngx-saqly-login
```

**Peer dependencies** (already in most Angular projects):

```bash
npm install @angular/core @angular/common @angular/forms
```

> **No extra setup required.** The component automatically resets `body { margin: 0; padding: 0 }` so the full-page background fills the viewport correctly — you don't need to add anything to your `styles.scss`.

---

## Quick Start

The fastest way to get a login screen — zero config required:

**app.ts**

```ts
import { Component } from '@angular/core';
import { SaqlyLoginComponent, SaqlyLoginSubmitEvent } from 'ngx-saqly-login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SaqlyLoginComponent],
  template: `
    <ngx-saqly-login
      [loading]="loading"
      (login)="onLogin($event)"
    />
  `,
})
export class App {
  loading = false;

  onLogin(event: SaqlyLoginSubmitEvent): void {
    this.loading = true;
    // call your auth service here
    console.log(event.email, event.password, event.rememberMe);
  }
}
```

That's it. The component works out of the box with sensible defaults.

---

## Component API

### Inputs

| Input     | Type                | Default | Description                                        |
|-----------|---------------------|---------|----------------------------------------------------|
| `config`  | `SaqlyLoginConfig`  | `{}`    | All visual and behavioral settings (all optional). |
| `loading` | `boolean`           | `false` | Shows loading state and disables the form.         |

### Outputs

| Output          | Payload type                  | When emitted                              |
|-----------------|-------------------------------|-------------------------------------------|
| `login`         | `SaqlyLoginSubmitEvent`       | User submits the form successfully.       |
| `forgotPassword`| `void`                        | User clicks the forgot-password link.     |
| `register`      | `SaqlyLoginRegisterEvent`     | User clicks a register link or button.    |
| `socialLogin`   | `string` (provider id)        | User clicks a social login button.        |

**`SaqlyLoginSubmitEvent`**

```ts
{
  email: string;
  password: string;
  rememberMe: boolean;
}
```

**`SaqlyLoginRegisterEvent`**

```ts
{ source: 'link' | 'footer' }
```

`source: 'link'` — inline register link inside the card.  
`source: 'footer'` — register action called from a custom `footerTemplate`.

---

## Configuration Reference

### SaqlyLoginConfig

Every property is optional. Unset properties fall back to the library defaults shown below.

#### Text & Labels

| Property              | Type     | Default                                  | Description                        |
|-----------------------|----------|------------------------------------------|------------------------------------|
| `title?`              | `string` | `'Welcome back'`                         | Card heading.                      |
| `subtitle?`           | `string` | `'Sign in to continue...'`               | Card sub-heading.                  |
| `buttonText?`         | `string` | `'Login'`                                | Submit button label.               |
| `loadingText?`        | `string` | `'Loading...'`                           | Submit button label while loading. |
| `emailLabel?`         | `string` | `'Email'`                                | Email field label.                 |
| `passwordLabel?`      | `string` | `'Password'`                             | Password field label.              |
| `emailPlaceholder?`   | `string` | `'Email'`                                | Email field placeholder.           |
| `passwordPlaceholder?`| `string` | `'Password'`                             | Password field placeholder.        |
| `rememberMeText?`     | `string` | `'Remember me'`                          | Remember-me checkbox label.        |
| `forgotPasswordText?` | `string` | `'Forgot Password?'`                     | Forgot-password link text.         |
| `forgotPasswordLink?` | `string` | `'#'`                                    | Forgot-password `href`.            |
| `registerText?`       | `string` | `'Create account'`                       | Register link text.                |
| `registerLink?`       | `string` | `'#'`                                    | Register `href`.                   |
| `badgeText?`          | `string` | `'ngx-saqly-login'`                      | Small badge text at card top.      |

#### Appearance & Layout

| Property            | Type                    | Default  | Description                                   |
|---------------------|-------------------------|----------|-----------------------------------------------|
| `mode?`             | `'dark' \| 'light' \| 'auto'` | `'dark'` | Color scheme. `'auto'` follows OS preference. |
| `direction?`        | `'ltr' \| 'rtl'`        | `'ltr'`  | Text direction for RTL languages.             |
| `cardMaxWidth?`     | `string`                | `'420px'`| Max width of the login card (any CSS value).  |
| `showBackground?`   | `boolean`               | `true`   | Show the full-page gradient background.       |
| `showBadge?`        | `boolean`               | `true`   | Show the badge at the top of the card.        |
| `showRememberMe?`   | `boolean`               | `false`  | Show the remember-me checkbox.                |
| `showForgotPassword?`| `boolean`              | `false`  | Show the forgot-password link.                |
| `showRegister?`     | `boolean`               | `false`  | Show the inline register link.                |
| `showPasswordToggle?`| `boolean`              | `true`   | Show the password visibility toggle icon.     |
| `showSocialLogin?`  | `boolean`               | `false`  | Show the social login buttons section.        |

#### Behavior

| Property               | Type      | Default           | Description                                 |
|------------------------|-----------|-------------------|---------------------------------------------|
| `autoFocusEmail?`      | `boolean` | `false`           | Auto-focus the email field on mount.        |
| `disabled?`            | `boolean` | `false`           | Disable the entire form.                    |
| `enableAnimations?`    | `boolean` | `true`            | Enable CSS entrance animations.             |
| `emailAutocomplete?`   | `string`  | `'email'`         | `autocomplete` attribute for email input.   |
| `passwordAutocomplete?`| `string`  | `'current-password'` | `autocomplete` for password input.       |

#### Validation

| Property             | Type     | Default | Description                                   |
|----------------------|----------|---------|-----------------------------------------------|
| `passwordMinLength?` | `number` | `6`     | Minimum password length.                      |
| `passwordMaxLength?` | `number` | `100`   | Maximum password length.                      |
| `passwordPattern?`   | `string` | `''`    | Regex pattern for password validation.        |
| `validationMessages?`| [`SaqlyLoginValidationMessages`](#validation-messages-saqlyloginvalidationmessages) | See below | Override individual error messages. |

#### Templates

| Property          | Type                             | Description                       |
|-------------------|----------------------------------|-----------------------------------|
| `logoTemplate?`   | `TemplateRef<SaqlyLoginLogoTemplateContext>`   | Custom logo area above the title. |
| `footerTemplate?` | `TemplateRef<SaqlyLoginFooterTemplateContext>` | Custom content below the button.  |

---

## Dark & Light Themes

Setting `mode` automatically applies a **complete color palette** — no manual color configuration needed.

| `mode`    | Behavior                                            |
|-----------|-----------------------------------------------------|
| `'dark'`  | Deep navy/slate background, indigo/violet accents.  |
| `'light'` | Soft white/lavender background, indigo accents.     |
| `'auto'`  | Follows the OS `prefers-color-scheme` setting.      |

### Switch to light mode

```ts
config: SaqlyLoginConfig = {
  mode: 'light',
};
```

The entire palette (background, card, inputs, buttons, links, badges, errors…) switches automatically.

### Override individual colors

You can override any specific color on top of the theme defaults. Only the colors you specify change — the rest stay at their theme values:

```ts
config: SaqlyLoginConfig = {
  mode: 'light',
  colors: {
    primary: '#0ea5e9',    // override button & focus color only
    secondary: '#6366f1',  // override gradient end only
  },
};
```

```ts
config: SaqlyLoginConfig = {
  mode: 'dark',
  colors: {
    primary: '#f59e0b',
    cardBackground: 'rgba(30, 10, 10, 0.85)',
  },
};
```

### Follow OS preference automatically

```ts
config: SaqlyLoginConfig = {
  mode: 'auto', // dark on dark-OS, light on light-OS
};
```

---

### Colors (`SaqlyLoginColors`)

Pass as `config.colors`. All fields are **optional** — only override what you need on top of the active theme palette.

| Property               | Description                                     |
|------------------------|-------------------------------------------------|
| `primary?`             | Primary accent (button background, focus rings).|
| `secondary?`           | Secondary accent (gradients).                   |
| `background?`          | Full-page background (supports CSS gradients).  |
| `backgroundAccentStart?` | Floating orb start color.                    |
| `backgroundAccentEnd?` | Floating orb end color.                         |
| `cardBackground?`      | Card background color.                          |
| `cardBorder?`          | Card border color.                              |
| `textPrimary?`         | Main text color.                                |
| `textSecondary?`       | Secondary text color.                           |
| `textMuted?`           | Muted/hint text color.                          |
| `inputBackground?`     | Input field background.                         |
| `inputBorder?`         | Input field border.                             |
| `inputPlaceholder?`    | Placeholder text color.                         |
| `focusRing?`           | Input focus ring color.                         |
| `buttonText?`          | Submit button text color.                       |
| `link?`                | Link color.                                     |
| `linkHover?`           | Link hover color.                               |
| `badgeBackground?`     | Badge background.                               |
| `badgeBorder?`         | Badge border.                                   |
| `badgeText?`           | Badge text color.                               |
| `shadow?`              | Card box-shadow.                                |
| `error?`               | Validation error text color.                    |
| `checkbox?`            | Checkbox accent color.                          |

**Dark theme defaults (`SAQLY_LOGIN_DARK_COLORS`)** and **light theme defaults (`SAQLY_LOGIN_LIGHT_COLORS`)** are exported from the library so you can inspect or extend them programmatically.

---

### Theme (`SaqlyLoginThemeOptions`)

Pass as `config.theme`. All fields are optional.

| Property        | Default                    | Description                              |
|-----------------|----------------------------|------------------------------------------|
| `borderRadius?` | `'24px'`                   | Card and input border radius.            |
| `cardPadding?`  | `'2rem'`                   | Card inner padding.                      |
| `inputHeight?`  | `'52px'`                   | Height of input fields.                  |
| `buttonHeight?` | `'52px'`                   | Height of the submit button.             |
| `fontFamily?`   | `Inter, "Segoe UI", ...`   | Font stack applied to the component.     |

---

### Validation Messages (`SaqlyLoginValidationMessages`)

Pass as `config.validationMessages`. All fields are optional.

| Property           | Default                                  |
|--------------------|------------------------------------------|
| `emailRequired?`   | `'Email is required.'`                   |
| `emailInvalid?`    | `'Please enter a valid email address.'`  |
| `passwordRequired?`| `'Password is required.'`               |
| `passwordMinLength?`| `'Password is too short.'`             |
| `passwordMaxLength?`| `'Password is too long.'`              |
| `passwordPattern?` | `'Password format is invalid.'`          |

---

### Social Buttons (`SaqlyLoginSocialButton[]`)

Pass as `config.socialButtons`. Each item:

```ts
{ id: 'google' | 'github' | 'microsoft' | string; label: string }
```

Built-in icon support: `'google'`, `'github'`, `'microsoft'`. Any other `id` renders as a text-only button.

```ts
socialButtons: [
  { id: 'google',    label: 'Continue with Google' },
  { id: 'github',    label: 'Continue with GitHub' },
  { id: 'microsoft', label: 'Continue with Microsoft' },
]
```

Enable the section with `showSocialLogin: true`.

---

## Global Defaults with forRoot()

Use `SaqlyLoginModule.forRoot()` to set defaults once for the entire app instead of repeating config on every component instance.

**app.config.ts** (standalone bootstrap)

```ts
import { ApplicationConfig } from '@angular/core';
import { SaqlyLoginModule } from 'ngx-saqly-login';

export const appConfig: ApplicationConfig = {
  providers: [
    SaqlyLoginModule.forRoot({
      mode: 'light',         // all instances default to light theme
      showRememberMe: true,
      colors: { primary: '#0ea5e9' }, // override one color across all instances
    }).providers!,
  ],
};
```

**app.module.ts** (NgModule bootstrap)

```ts
import { NgModule } from '@angular/core';
import { SaqlyLoginModule } from 'ngx-saqly-login';

@NgModule({
  imports: [
    SaqlyLoginModule.forRoot({
      mode: 'dark',
      showRememberMe: true,
    }),
  ],
})
export class AppModule {}
```

Per-instance `[config]` is deep-merged on top of the global config, so local overrides always win.

---

## Custom Templates

### Logo Template

Rendered above the card title. The template receives the resolved config as context.

```html
<ng-template #logoTpl let-cfg="config">
  <img src="/logo.svg" alt="My App" style="height: 40px; margin-bottom: 1rem;" />
</ng-template>

<ngx-saqly-login [config]="config" />
```

```ts
@ViewChild('logoTpl', { static: true }) logoTpl!: TemplateRef<any>;

ngAfterViewInit() {
  this.config = { ...this.config, logoTemplate: this.logoTpl };
}
```

**Logo template context (`SaqlyLoginLogoTemplateContext`):**

```ts
{
  $implicit: SaqlyLoginResolvedConfig; // same as config
  config: SaqlyLoginResolvedConfig;
}
```

---

### Footer Template

Rendered below the submit button. Receives helpers to trigger register/forgotPassword programmatically.

```html
<ng-template #footerTpl let-register="register" let-disabled="disabled">
  <p style="text-align:center; font-size:0.9rem;">
    Don't have an account?
    <a href="#" (click)="register($event)" [style.opacity]="disabled ? 0.5 : 1">
      Sign up
    </a>
  </p>
</ng-template>
```

**Footer template context (`SaqlyLoginFooterTemplateContext`):**

```ts
{
  $implicit: SaqlyLoginResolvedConfig;
  config: SaqlyLoginResolvedConfig;
  register: (event?: Event) => void;       // emits register output with source:'footer'
  forgotPassword: (event?: Event) => void; // emits forgotPassword output
  loading: boolean;
  disabled: boolean;
}
```

---

## Full Example

### app.ts

```ts
import { AfterViewInit, Component, signal, TemplateRef, ViewChild } from '@angular/core';
import { SaqlyLoginComponent, SaqlyLoginConfig, SaqlyLoginSubmitEvent, SaqlyLoginRegisterEvent } from 'ngx-saqly-login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SaqlyLoginComponent],
  templateUrl: './app.html',
})
export class App implements AfterViewInit {
  @ViewChild('logoTpl', { static: true }) logoTpl!: TemplateRef<any>;
  @ViewChild('footerTpl', { static: true }) footerTpl!: TemplateRef<any>;

  loading = signal(false);

  config: SaqlyLoginConfig = {
    title: 'Login to Dashboard',
    subtitle: 'Sign in to continue and access your account',
    buttonText: 'Sign In',
    loadingText: 'Signing in...',

    // Switch to 'light' or 'auto' to change the full color palette automatically
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
    badgeText: 'MY APP',

    emailLabel: 'Work Email',
    passwordLabel: 'Password',
    emailPlaceholder: 'you@company.com',
    passwordPlaceholder: 'Enter your password',

    rememberMeText: 'Keep me signed in',
    forgotPasswordText: 'Forgot your password?',
    forgotPasswordLink: '/forgot-password',
    registerText: 'Create account',
    registerLink: '/register',

    passwordMinLength: 8,
    passwordMaxLength: 64,
    passwordPattern: '^(?=.*[A-Z])(?=.*[0-9]).+$',

    autoFocusEmail: true,
    enableAnimations: true,

    socialButtons: [
      { id: 'google',    label: 'Continue with Google' },
      { id: 'github',    label: 'Continue with GitHub' },
      { id: 'microsoft', label: 'Continue with Microsoft' },
    ],

    validationMessages: {
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 8 characters',
      passwordMaxLength: 'Password must not exceed 64 characters',
      passwordPattern: 'Must contain at least one uppercase letter and one number',
    },

    // Optional: override specific colors on top of the theme palette
    colors: {
      primary: '#06b6d4',
      secondary: '#8b5cf6',
    },

    theme: {
      borderRadius: '16px',
      inputHeight: '52px',
      buttonHeight: '52px',
    },
  };

  ngAfterViewInit(): void {
    this.config = {
      ...this.config,
      logoTemplate: this.logoTpl,
      footerTemplate: this.footerTpl,
    };
  }

  onLogin(event: SaqlyLoginSubmitEvent): void {
    this.loading.set(true);
    // call your auth service
    console.log('Login:', event.email, '| rememberMe:', event.rememberMe);
    setTimeout(() => this.loading.set(false), 1500);
  }

  onForgotPassword(): void {
    console.log('Forgot password clicked');
  }

  onRegister(event: SaqlyLoginRegisterEvent): void {
    console.log('Register clicked from:', event.source);
  }

  onSocialLogin(providerId: string): void {
    console.log('Social login:', providerId);
  }
}
```

### app.html

```html
<ng-template #logoTpl>
  <div style="display:inline-flex; align-items:center; gap:0.5rem; margin-bottom:1rem; font-weight:800; color:#cffafe;">
    <span style="width:12px; height:12px; border-radius:999px; background:linear-gradient(135deg,#06b6d4,#8b5cf6); display:inline-block;"></span>
    MY APP
  </div>
</ng-template>

<ng-template #footerTpl let-register="register" let-disabled="disabled">
  <p style="font-size:0.9rem; color:#94a3b8; text-align:center;">
    Don't have an account?
    <a href="#" (click)="register($event)"
       [style.pointer-events]="disabled ? 'none' : 'auto'"
       [style.opacity]="disabled ? '0.6' : '1'"
       style="color:#22d3ee; font-weight:600; margin-left:0.3rem; text-decoration:none;">
      Create one
    </a>
  </p>
</ng-template>

<ngx-saqly-login
  [config]="config"
  [loading]="loading()"
  (login)="onLogin($event)"
  (forgotPassword)="onForgotPassword()"
  (register)="onRegister($event)"
  (socialLogin)="onSocialLogin($event)"
/>
```

---

## All Exported Symbols

```ts
// Component
SaqlyLoginComponent

// Module (NgModule users)
SaqlyLoginModule

// Types
SaqlyLoginConfig
SaqlyLoginResolvedConfig
SaqlyLoginGlobalConfig
SaqlyLoginColors
SaqlyLoginThemeOptions
SaqlyLoginValidationMessages
SaqlyLoginSocialButton
SaqlyLoginThemeMode        // 'dark' | 'light' | 'auto'
SaqlyLoginDirection        // 'ltr' | 'rtl'
SaqlyLoginSubmitEvent
SaqlyLoginRegisterEvent
SaqlyLoginLogoTemplateContext
SaqlyLoginFooterTemplateContext

// Token (for advanced DI)
SAQLY_LOGIN_GLOBAL_CONFIG

// Defaults (for extending)
SAQLY_LOGIN_DEFAULT_CONFIG
SAQLY_LOGIN_DARK_COLORS
SAQLY_LOGIN_LIGHT_COLORS
SAQLY_LOGIN_DEFAULT_THEME
SAQLY_LOGIN_DEFAULT_VALIDATION_MESSAGES
SAQLY_LOGIN_DEFAULT_SOCIAL_BUTTONS

// Utilities
mergeSaqlyLoginConfig
```

---

## License

MIT
