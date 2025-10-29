# Contributing to Evera Protocol Landing Page

Thank you for your interest in contributing! This document provides guidelines and best practices for contributing to the Evera Protocol landing page.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Component Guidelines](#component-guidelines)
- [Testing Requirements](#testing-requirements)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 🤝 Code of Conduct

Be respectful, inclusive, and professional. We're building something great together.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- Git
- VS Code (recommended)

### Setup

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/evera-landing.git
cd evera-landing

# Install dependencies
pnpm install

# Create feature branch
git checkout -b feature/your-feature-name

# Set up environment
cp .env.example .env.local
```

## 🔄 Development Workflow

1. **Pick an issue** or create one for discussion
2. **Create a branch** from `main` with descriptive name
3. **Make changes** following code style guidelines
4. **Write tests** for new features
5. **Test locally** with `pnpm dev` and `pnpm test`
6. **Commit changes** with conventional commit messages
7. **Push to your fork** and create a Pull Request

## 📝 Code Style Guidelines

### TypeScript

**Always:**
- Use explicit return types for functions
- Define interfaces for component props
- Use `type` for unions, `interface` for objects
- Avoid `any` type—use `unknown` with type guards
- Enable strict mode

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ variant, onClick, children }: ButtonProps): JSX.Element {
  return <button onClick={onClick}>{children}</button>;
}

// ❌ Avoid
export function Button(props: any) {
  return <button>{props.children}</button>;
}
```

### React Components

**Server Components (Default):**
Use Server Components for static content and data fetching.

```typescript
// ✅ Server Component (no 'use client')
export function StaticSection({ data }: Props): JSX.Element {
  return <section>{data}</section>;
}
```

**Client Components:**
Only use `'use client'` when you need:
- Event handlers (onClick, onChange)
- React hooks (useState, useEffect)
- Browser APIs (localStorage, window)

```typescript
// ✅ Client Component (has 'use client')
'use client';

import { useState } from 'react';

export function InteractiveForm(): JSX.Element {
  const [value, setValue] = useState('');
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

### Tailwind CSS

**Do:**
- Use utility classes directly in JSX
- Use responsive prefixes: `sm:`, `md:`, `lg:`
- Use state variants: `hover:`, `focus:`, `active:`
- Use brand colors from config

```tsx
// ✅ Good
<button className="bg-gold hover:bg-gold/90 px-6 py-3 rounded-lg">
  Click me
</button>

// ❌ Avoid inline styles
<button style={{ backgroundColor: '#E4B363' }}>
  Click me
</button>
```

### File Naming

- **Components**: PascalCase (`EmailCaptureForm.tsx`)
- **Pages**: lowercase (`page.tsx`, `app/whitepaper/page.tsx`)
- **API Routes**: lowercase (`route.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`EmailSubscription.ts`)

### Import Order

```typescript
// 1. React and Next.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { z } from 'zod';

// 3. Local components
import { Button } from '@/components/shared/Button';

// 4. Local utilities
import { trackEvent } from '@/lib/analytics';

// 5. Types
import type { EmailSubscription } from '@/types';

// 6. Assets
import logoSrc from '@/public/images/logo.png';
```

## 🧩 Component Guidelines

### Component Structure

```typescript
'use client'; // Only if needed

import statements...

// Props interface
interface ComponentProps {
  required: string;
  optional?: number;
  children?: React.ReactNode;
}

// Component with docstring
/**
 * Brief description of what component does
 */
export function Component({
  required,
  optional = 0,
  children,
}: ComponentProps): JSX.Element {
  // Hooks (if client component)
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {
    // Logic here
  };
  
  // Early returns for loading/error states
  if (loading) return <Spinner />;
  
  // Main render
  return (
    <div className="...">
      {children}
    </div>
  );
}
```

### Accessibility Requirements

All components must:
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`)
- Include ARIA labels for icon buttons and complex widgets
- Support keyboard navigation (Tab, Enter, Escape)
- Maintain color contrast ≥4.5:1 (WCAG AA)
- Include focus indicators

```tsx
// ✅ Good accessibility
<button
  onClick={handleClose}
  aria-label="Close modal"
  className="focus:ring-2 focus:ring-gold"
>
  <CloseIcon />
</button>

// ❌ Poor accessibility
<div onClick={handleClose}>
  <CloseIcon />
</div>
```

## 🧪 Testing Requirements

### Write Tests For

- New components
- New API routes
- Complex business logic
- User interactions

### Test Structure

```typescript
// Component tests
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Run Tests

```bash
# All tests
pnpm test

# Specific test file
pnpm test EmailCaptureForm

# Watch mode
pnpm test --watch

# Coverage
pnpm test --coverage
```

## 📝 Commit Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <description>

# Types:
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation only
style:    # Code style (formatting, missing semi-colons, etc.)
refactor: # Code change that neither fixes a bug nor adds a feature
test:     # Adding or updating tests
chore:    # Maintenance tasks

# Examples:
feat(email): add retry logic to email capture form
fix(analytics): respect do-not-track setting
docs(readme): update installation instructions
style(button): fix hover state color
refactor(api): simplify error handling
test(form): add validation tests
chore(deps): update next.js to 14.2.5
```

## 🔀 Pull Request Process

### Before Submitting

1. **Run all checks**
   ```bash
   pnpm lint
   pnpm test
   pnpm build
   ```

2. **Update documentation** if needed

3. **Test manually** in browser (mobile + desktop)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Tested on mobile/tablet/desktop

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex logic
- [ ] Updated documentation
- [ ] No console.log statements
- [ ] Lighthouse score maintained
```

### Review Process

1. **Automated checks** run (linting, tests, build)
2. **Code review** by maintainer
3. **Changes requested** or approved
4. **Merge** to main branch
5. **Automatic deployment** to staging

## 🎨 Brand Guidelines

### Colors

Use only brand colors from Tailwind config:

```typescript
colors: {
  charcoal: '#313638',  // Primary dark
  gold: '#E4B363',      // Accent/CTA
  stone: '#E0DFD5',     // Light background
  coral: '#EF6461',     // Error/accent
}
```

### Typography

- Font: Inter (already configured)
- Weights: 400, 600, 700, 800
- Scale: Base 16px, responsive sizing

### Spacing

Use Tailwind's spacing scale (4px base):
- `p-4` = 16px
- `mb-8` = 32px
- `gap-6` = 24px

## 🐛 Bug Reports

When reporting bugs, include:

- **Description**: What happened vs. what you expected
- **Steps to reproduce**: Detailed steps
- **Environment**: Browser, OS, screen size
- **Screenshots**: If applicable
- **Console errors**: Copy any error messages

## 💡 Feature Requests

When suggesting features:

- **Use case**: Why is this feature needed?
- **Proposed solution**: How should it work?
- **Alternatives**: Other approaches considered?
- **Additional context**: Mockups, examples, etc.

## 📞 Questions?

- Open a [GitHub Discussion](https://github.com/evera-protocol/evera-landing/discussions)
- Join our [Discord](https://discord.gg/evera)
- Email: dev@evera.network

---

**Thank you for contributing to Evera Protocol!** 🚀
