# FE Assignment

A clean frontend assignment starter template built with Vite, vanilla JavaScript, and SCSS. Features a two-page application with routing, static layout, and configurable data loading modes.

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Installation

1. Install dependencies:

```bash
npm install
```

## Available Scripts

### Development

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Build

Create a production-ready build:

```bash
npm run build
```

The optimized files will be generated in the `dist/` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Code Quality

**Linting and Formatting:**

```bash
# Run all linters and fix issues (prettier → stylelint → eslint)
npm run lint

# Format code with Prettier
npm run prettier

# Check formatting without making changes
npm run prettier:check

# Lint and fix SCSS files
npm run stylelint

# Lint and fix JavaScript files
npm run eslint

# Check JavaScript without making changes
npm run eslint-dry-run
```

**Configuration Files:**

- `.prettierrc.js` - Prettier configuration (extends @riesenia/fe-configs)
- `.stylelintrc.js` - Stylelint configuration (extends @riesenia/fe-configs)
- `eslint.config.js` - ESLint configuration (extends @riesenia/fe-configs)
- `tsconfig.json` - TypeScript configuration for ESLint type checking

## Project Structure

```
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and scripts
├── vite.config.js              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint configuration
├── .prettierrc.js              # Prettier configuration
├── .stylelintrc.js             # Stylelint configuration
├── .prettierignore             # Files to ignore for Prettier
├── .stylelintignore            # Files to ignore for Stylelint
├── .gitignore                  # Git ignore rules
├── .nvmrc                      # Node version specification
├── src/
│   ├── main.js                # Application entry point
│   ├── router.js              # Simple vanilla JS router
│   ├── config.js              # Application configuration (API URL, dev settings)
│   ├── dataLoader.js          # Data loading with API integration and caching
│   ├── api/
│   │   └── emailApi.js        # Email validation API client
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.svg       # RIESENIA logo
│   │   │   └── gradient.jpg   # Header gradient background
│   │   └── styles/
│   │       ├── import.scss    # Main SCSS entry point
│   │       ├── init/          # Variables, mixins
│   │       ├── common/        # Reset, fonts, layout
│   │       ├── layout/        # Header, footer, layout
│   │       └── pages/         # Page-specific styles
│   ├── components/
│   │   ├── header.js          # Header component
│   │   └── footer.js          # Footer component
│   └── pages/
│       ├── assignment.js      # Assignment description page
│       └── solution.js        # Solution implementation page
└── public/
    └── favicon.ico            # Browser favicon
```

## Features

### Two-Page Application

- **Assignment Page** (`/`) - Displays the assignment description and requirements
- **Solution Page** (`/solution`) - Shows the implementation solution

### Static Layout

- **Header** - Sticky header with logo and navigation links
- **Footer** - Simple footer with copyright information
- Both components remain consistent across all pages

### Routing

- Simple vanilla JavaScript router with browser history support
- No external dependencies
- Supports browser back/forward buttons

### API Integration

The application fetches all data from a remote API:

- **API Base URL**: Configured in `src/config.js`
- **Data Endpoints**: Banner, CTA banner, products, and categories
- **Email Validation**: Separate endpoint for email validation

**Configuration** (`src/config.js`):

```javascript
export const CONFIG = {
    API_BASE_URL: "https://fe-assignment-api.ygnaaac.deno.net",
    DEV_MODE: true, // Enable development features
    DEV_CACHE_DURATION: 24 * 60 * 60 * 1000, // Cache duration (1 day)
};
```

### Development Mode Caching

To optimize development workflow, the app caches API responses locally:

- **DEV_MODE**: When enabled, API responses are cached in localStorage
- **Cache Duration**: Configurable via `DEV_CACHE_DURATION` (default: 1 day)
- **Benefits**: Reduces API calls during development, faster page reloads
- **Clear Cache**: Run `clearCache()` in browser console to fetch fresh data

The cache status is logged to the console on page load. When cached data is used, you'll see: `[Data Loader] Using cached data (DEV mode)`

## Tech Stack

- **Vite** - Fast build tool and dev server
- **Vanilla JavaScript** - Modern ES6+ JavaScript
- **lit-html** - Efficient HTML templating library (~3KB)
- **SCSS** - CSS preprocessor with variables, nesting, and more
- **ESLint** - JavaScript linter with TypeScript support
- **Stylelint** - SCSS/CSS linter
- **Prettier** - Code formatter
- **@riesenia/fe-configs** - Shared linting configurations

## Development Notes

- SCSS files are automatically compiled to CSS by Vite
- Hot Module Replacement (HMR) is enabled for instant updates
- The project supports both dark and light color schemes
- All source files are in the `src/` directory
- Static assets should be placed in the `public/` directory
- Responsive design optimized for mobile and desktop

**API Integration:**

- All data is fetched from the remote API configured in `src/config.js`
- API calls are logged to the browser console
- In DEV mode, API responses are cached locally for 1 day to reduce unnecessary requests
- Use `clearCache()` in the browser console to force fresh data fetch

**Development Mode:**

- Set `DEV_MODE: true` in `src/config.js` to enable caching
- Cache duration can be adjusted via `DEV_CACHE_DURATION` (in milliseconds)
- Console logs show whether cached or fresh data is being used
- Set `DEV_MODE: false` for production to disable caching

### Using lit-html Templates

The project uses **lit-html** for clean, efficient HTML templating. Benefits include:

- **Clean syntax** - Write HTML naturally using template literals
- **Composable** - Break templates into smaller, reusable functions
- **Efficient** - Only updates changed parts of the DOM
- **Event handling** - Use `@click` syntax for inline event handlers
- **Array rendering** - Use `.map()` directly in templates

Example from the codebase:

```javascript
import { html } from "lit-html";

const itemTemplate = (item) => html`
    <li class="item" @click=${handleClick}>
        <span>${item.name}</span>
        <span>${item.value}</span>
    </li>
`;

const list = html`
    <ul>
        ${items.map((item) => itemTemplate(item))}
    </ul>
`;
```
# test_Rie-enia_Dmytro_Ilchenko
