# Contributing to React Native Simple Canvas

This document explains how to contribute to the React Native Simple Canvas project.

### Development Setup

1. **Install dependencies**
   After checking out the repo, to install:
   ```bash
   npm install
   ```

2. **Build the library**
   ```bash
   npm run build
   ```

3. **Set up the example project**
   ```bash
   cd example
   npm install
   ```

### Code Quality

1. **Lint your code**
   ```bash
   npm run lint
   ```

2. **Type check**
   ```bash
   npm run tsc
   ```

### Testing with the Example App

The `example/` folder contains a React Native app that demonstrates the library's capabilities.

1. **Make sure the library is built**
   ```bash
   npm run build
   ```

### Commit Message Format

We follow conventional commits for automatic release generation:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example: `feat: add support for custom brush shapes`

### Pull Request Guidelines

- Fill out the pull request template completely
- Include screenshots or GIFs for UI changes
- Reference any related issues
- Ensure all tests pass
- Update documentation for API changes
- Keep pull requests focused on a single feature/fix

## Development Tips

### Working with the Example App

- The example app uses the built library from `../dist`
- Always rebuild the library after making changes: `npm run build`
- The example app is a great place to test new features

Thank you for contributing to React Native Simple Canvas! 🎨 