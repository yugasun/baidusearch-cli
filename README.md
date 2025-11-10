# baidusearch-cli

[![CI](https://github.com/yourusername/baidusearch-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/baidusearch-cli/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/baidusearch-cli.svg)](https://www.npmjs.com/package/baidusearch-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

A TypeScript library for searching Baidu (百度搜索) programmatically. Inspired by library [baidusearch-cli](https://github.com/amazingcoderpro/python-baidusearch-cli)

## Features

- 🚀 Simple and easy-to-use API
- 📦 Support both CommonJS and ES Modules
- 🔍 Get structured search results from Baidu
- 💪 Written in TypeScript with full type definitions
- 🛠️ CLI tool included
- ⚡ Built with modern tools (axios, cheerio)
- 🔄 Automated CI/CD with GitHub Actions
- 📝 Automatic changelog generation

## Installation

```bash
npm install baidusearch-cli
```

## Usage

### As a Library

```typescript
import { search } from 'baidusearch-cli';

// Basic usage
const results = await search('Node.js');
console.log(results);

// With options
const results = await search('TypeScript', {
  numResults: 20,
  debug: true,
});

results.forEach((result) => {
  console.log(`${result.rank}. ${result.title}`);
  console.log(`   ${result.abstract}`);
  console.log(`   ${result.url}\n`);
});
```

### As a CLI Tool

```bash
# Install globally
npm install -g baidusearch-cli

# Basic search
baidusearch-cli "Node.js"

# Specify number of results
baidusearch-cli "TypeScript" 20

# Enable debug mode
baidusearch-cli "JavaScript" 10 1
```

Or use with npx:

```bash
npx baidusearch-cli "Node.js"
```

## API

### `search(keyword: string, options?: SearchOptions): Promise<SearchResult[]>`

Search Baidu with the given keyword.

#### Parameters

- `keyword` (string): The search keyword (required)
- `options` (SearchOptions): Optional configuration
  - `numResults` (number): Number of results to return (default: 10)
  - `debug` (boolean): Enable debug logging (default: false)

#### Returns

Promise of `SearchResult[]`:

```typescript
interface SearchResult {
  title: string; // Result title
  abstract: string; // Result abstract/description
  url: string; // Result URL
  rank: number; // Result ranking
}
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Lint code
npm run lint
npm run lint:fix

# Format code
npm run format
npm run format:check

# Type check
npm run type-check

# Run tests
npm test
```

## Scripts

### Build
- `npm run build` - Build the project
- `npm run dev` - Watch mode for development
- `npm run type-check` - Type check without emitting files

### Code Quality
- `npm run lint` - Lint TypeScript files
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Release
- `npm run release` - Create a new release (auto-detects version bump)
- `npm run release:patch` - Create a patch release (1.0.x)
- `npm run release:minor` - Create a minor release (1.x.0)
- `npm run release:major` - Create a major release (x.0.0)

## CI/CD

This project uses GitHub Actions for continuous integration and deployment:

### Workflows

- **CI** (`.github/workflows/ci.yml`)
  - Runs on every push and pull request
  - Lints code with ESLint
  - Builds the project on Node.js 16, 18, and 20
  - Runs tests
  
- **Release** (`.github/workflows/release.yml`)
  - Triggers on version tags (e.g., `v1.0.0`)
  - Automatically generates changelog
  - Creates GitHub release
  - Publishes to NPM

- **Publish** (`.github/workflows/publish.yml`)
  - Manual workflow for publishing
  - Bumps version
  - Updates CHANGELOG.md
  - Publishes to NPM
  - Creates GitHub release

- **CodeQL** (`.github/workflows/codeql.yml`)
  - Security scanning
  - Runs weekly and on pushes to main

- **Commitlint** (`.github/workflows/commitlint.yml`)
  - Validates commit messages follow conventional commits

### Publishing

#### Option 1: Manual Release

```bash
# Create a new release locally
npm run release:patch  # or minor/major

# Push tags
git push --follow-tags origin main

# The release workflow will automatically publish to NPM
```

#### Option 2: GitHub Actions Workflow

1. Go to Actions tab in GitHub
2. Select "Publish" workflow
3. Click "Run workflow"
4. Choose version bump type (patch/minor/major)
5. The workflow will handle version bump, changelog, and publishing

### Setup Required

To enable automated publishing, add these secrets to your GitHub repository:

- `NPM_TOKEN` - Your NPM automation token (https://www.npmjs.com/settings/~/tokens)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semi colons, etc
refactor: code refactoring
perf: performance improvements
test: add missing tests
chore: maintenance tasks
```

## License

MIT

## Credits

This TypeScript version is based on the original Python implementation.
