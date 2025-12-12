# SimpleCanvas

A simple canvas component for React Native that allows drawing and signature capture.

## Features

- Smooth canvas drawing
- Customizable stroke color and width
- Get canvas as SVG
- Get raw canvas points
- Set canvas from existing points
- Clear and reset functionality
- TypeScript support
- Lightweight and performant

## Installation

```bash
npm install react-native-simple-canvas
```

or

```bash
yarn add react-native-simple-canvas
```

## Peer Dependencies

This package requires the following peer dependencies:
- react: ^18.2.0
- react-native: ^0.74.2
- react-native-svg: ^15.4.0

## Demo

<img src="https://github.com/guidion-digital/react-native-simple-canvas/blob/prod/screenshot/simple-canvas-demo.gif?raw=true" alt="SimpleCanvas Demo" width="50%">

## Usage

```tsx
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { SimpleCanvas, SimpleCanvasRef, clearCanvas } from '@gdn/react-native-simple-canvas';

const App = () => {
  const canvasRef = useRef<SimpleCanvasRef>(null);

  const handleClear = () => {
    clearCanvas(canvasRef);
  };

  return (
    <View style={{ flex: 1 }}>
      <SimpleCanvas
        ref={canvasRef}
        strokeColor="blue"
        strokeWidth={3}
        backgroundColor="white"
        onCanvasChange={(isEmpty) => console.log('Canvas changed:', isEmpty)}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
        <Button title="Clear" onPress={handleClear} />
      </View>
    </View>
  );
};

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `safeAreaTop` | number | 0 | SafeArea top value. You can use a library of your choice like `react-native-safe-area-context`
| `strokeColor` | string | 'black' | Color of the line stroke |
| `strokeWidth` | number | 3 | Width of the line stroke |
| `backgroundColor` | string | 'transparent' | Background color of the canvas |
| `style` | ViewStyle | undefined | Custom styles for the container |
| `minPoints` | number | 2 | Minimum points required for a valid drawing |
| `onDragEvent` | () => void | undefined | Callback when user starts drawing |
| `onCanvasChange` | (isEmpty: boolean) => void | undefined | Callback when canvas state changes |
| `clearCanvas` | boolean | false | Set to true to clear the canvas |

## Methods

All methods are accessible through the component ref:

```tsx
const canvasRef = useRef<SimpleCanvasRef>(null);
```

| Method | Description |
|--------|-------------|
| `getSVG()` | Returns the SVG reference of the vanvas |
| `resetImage()` | Clears the canvas and resets all points |
| `isEmpty()` | Returns true if the canvas is empty |
| `getPoints()` | Returns an array of raw canvas points |
| `setPoints(points: Point[])` | Sets the canvas from existing points |

## Types

```tsx
interface Point {
  x: number;
  y: number;
}

interface SimpleCanvasProps {
  onDragEvent?: () => void;
  onCanvasChange?: (isEmpty: boolean) => void;
  strokeColor?: string;
  strokeWidth?: number;
  backgroundColor?: string;
  style?: ViewStyle;
  minPoints?: number;
}

interface SimpleCanvasRef {
  resetImage: () => void;
  getSVG: () => RefObject<Svg>;
  isEmpty: () => boolean;
  getPoints: () => Point[];
  setPoints: (points: Point[]) => void;
}
```

## Troubleshooting

### Invalid Hook Call Error

If you encounter an error like: `Invalid hook call. Hooks can only be called inside of the body of a function component` or `Cannot read property 'useState' of null`, this is typically due to React dependency conflicts. To fix this:

1. **Ensure React versions match**: Make sure your project and all dependencies use compatible React versions.

2. **Fix duplicate React installations**: This error often occurs when multiple versions of React exist in your node_modules. Run this in your main project:

   ```bash
   npm ls react
   ```

   If you see multiple versions, consider using npm/yarn resolutions to force a single version:

   ```json
   "resolutions": {
     "react": "18.2.0",
     "react-dom": "18.2.0"
   }
   ```

3. **Set up proper module resolution**: If using this library in a monorepo or via local path, ensure your bundler (Metro) is configured to resolve React correctly for all packages:

   ```js
   // metro.config.js
   module.exports = {
     resolver: {
       extraNodeModules: {
         'react': path.resolve(__dirname, 'node_modules/react'),
         'react-native': path.resolve(__dirname, 'node_modules/react-native')
       }
     }
   };
   ```

4. **Check for peer dependency mismatches**: Verify that this library's peer dependencies align with your project versions.

### Drawing is shifted small distance from a place where you put your finger
Check `safeAreaTop` property and pass value from a library that manages SafeArea in your app.
