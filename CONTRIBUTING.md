# Contributing to React Native Simple Canvas

We love contributions! This document explains how to contribute to the React Native Simple Canvas project.

## Getting Started

### Prerequisites

- Node.js >= 18
- npm
- React Native development environment (for testing)
- For iOS development: Xcode and CocoaPods
- For Android development: Android Studio and SDK

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/react-native-simple-canvas.git
   cd react-native-simple-canvas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the library**
   ```bash
   npm run build
   ```

4. **Set up the example project**
   ```bash
   cd example
   npm install
   ```

5. **For iOS (if developing on macOS)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

## Development Workflow

### Testing Your Changes

1. **Build the library after making changes**
   ```bash
   npm run build
   ```

2. **Run tests**
   ```bash
   npm test
   ```

3. **Run tests in watch mode during development**
   ```bash
   npm run test-watch
   ```

4. **Check test coverage**
   ```bash
   npm run coverage
   ```

### Testing with the Example App

The `example/` folder contains a React Native app that demonstrates the library's capabilities.

1. **Make sure the library is built**
   ```bash
   npm run build
   ```

2. **Start Metro bundler**
   ```bash
   cd example
   npm start
   ```

3. **Run on iOS**
   ```bash
   npm run ios
   ```

4. **Run on Android**
   ```bash
   npm run android
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

## Code Style

- We use ESLint with TypeScript support
- Follow the existing code style in the project
- Use TypeScript for all new code
- Add proper JSDoc comments for public APIs
- Keep functions focused and testable

### File Structure

- `src/` - Main library source code
  - `SimpleCanvas.tsx` - Main component
  - `interfaces/` - Type definitions
  - `helpers/` - Utility functions
- `__tests__/` - Test files
- `example/` - Example React Native app

## Submitting Changes

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, focused commits
   - Add or update tests for your changes
   - Update documentation if needed

3. **Test thoroughly**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

4. **Test with the example app**
   - Make sure your changes work in the example app
   - Test on both iOS and Android if possible

5. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

6. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
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

## Reporting Issues

### Bug Reports

When reporting bugs, include:

- React Native version
- iOS/Android version
- Library version
- Minimal code example that reproduces the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Feature Requests

When suggesting features:

- Describe the use case
- Explain why this feature would be valuable
- Provide examples of how it would work
- Consider backward compatibility

## Release Process

This project uses semantic-release for automated releases:

- Releases are automatically created from the `prod` branch
- Version numbers follow semantic versioning
- Releases are triggered by conventional commit messages
- The library is published to npm automatically

## Development Tips

### Working with the Example App

- The example app uses the built library from `../dist`
- Always rebuild the library after making changes: `npm run build`
- The example app is a great place to test new features

### Debugging

- Use React Native debugging tools
- Test on real devices when possible
- Use the React Native performance monitor
- Check for memory leaks with longer drawing sessions

### Testing Strategy

- Write unit tests for utility functions
- Write component tests for React Native components
- Test edge cases (empty canvas, single point, etc.)
- Test performance with large numbers of points

## Getting Help

- Check existing issues and discussions
- Read the project documentation
- Look at the example app for usage patterns
- Feel free to ask questions in issues

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow GitHub's community guidelines

Thank you for contributing to React Native Simple Canvas! 🎨 