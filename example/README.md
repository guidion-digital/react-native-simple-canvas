# SimpleCanvas Example App

This is a React Native example app that demonstrates the `@gdn/react-native-simple-canvas` library.

## Features Demonstrated

- **Drawing**: Draw smooth lines on the canvas with touch gestures
- **Stroke Customization**: Change stroke color and width
- **Canvas Management**: Clear the canvas and check if it's empty
- **SVG Export**: Export the canvas as SVG
- **Path Persistence**: Save and load drawing paths
- **Dark Mode Support**: Automatically adapts to system theme

## Requirements

- Node.js >= 18
- React Native development environment set up
- iOS Simulator or Android Emulator
- For iOS: Xcode and CocoaPods installed

## Installation

1. Dependencies are already installed. If you need to reinstall:
   ```bash
   npm install
   ```

2. For iOS, pods are already installed. If you need to reinstall:
   ```bash
   cd ios && pod install
   ```

## Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Metro Bundler
To start the Metro bundler separately:
```bash
npm start
```

## Usage

1. **Drawing**: Use your finger (or mouse in simulator) to draw on the canvas
2. **Change Colors**: Tap the color buttons to change stroke color
3. **Change Width**: Tap the width buttons to change stroke thickness
4. **Clear**: Tap "Clear" to remove all drawings
5. **Export SVG**: Tap "Export SVG" to get the SVG reference (check console)
6. **Save/Load**: Save current paths and load them later

## Code Structure

- `App.tsx`: Main component demonstrating all SimpleCanvas features
- Demonstrates proper usage of:
  - `SimpleCanvas` component
  - `clearCanvas` helper function
  - `SimpleCanvasRef` interface
  - SVG path management

## Parent Library

This example uses the `@gdn/react-native-simple-canvas` library located in the parent directory (`../..`).

## Troubleshooting

If you encounter issues:

1. **Build errors**: Clean and rebuild
   ```bash
   # iOS
   cd ios && rm -rf build && cd ..
   npm run ios
   
   # Android
   cd android && ./gradlew clean && cd ..
   npm run android
   ```

2. **Metro cache issues**: Reset Metro cache
   ```bash
   npm start -- --reset-cache
   ```

3. **Dependency issues**: Reinstall dependencies
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
