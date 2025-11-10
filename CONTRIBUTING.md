# Contributing to baidusearch-cli

Thank you for your interest in contributing to baidusearch-cli! This document provides guidelines for contributing to the project.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yugasun/baidusearch-cli.git
   cd baidusearch-cli
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

## Development Workflow

### Building

- `npm run build` - Build the project (compiles TypeScript to JavaScript)
- `npm run dev` - Watch mode for development

### Code Structure

- `src/index.ts` - Main library code with search functionality
- `src/cli.ts` - Command-line interface implementation
- `dist/` - Compiled JavaScript output (generated, not committed)
- `examples/` - Usage examples

### Making Changes

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Build and test your changes:
   ```bash
   npm run build
   node examples/basic.js
   ```

4. Commit your changes with a descriptive message:
   ```bash
   git commit -m "Add: description of your changes"
   ```

5. Push to your fork and create a pull request

## Code Style

- Use TypeScript for all source code
- Follow the existing code style (2 spaces for indentation)
- Add comments for complex logic
- Keep functions focused and modular

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the CHANGELOG.md following the existing format
3. Ensure the build passes without errors
4. The PR will be merged once reviewed and approved

## Reporting Issues

- Use the GitHub issue tracker
- Provide a clear description of the problem
- Include steps to reproduce if applicable
- Mention your environment (Node.js version, OS, etc.)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
