# SimpleCanvas

A simple canvas component for React Native that allows drawing and signature capture.

## Features

- Smooth signature drawing
- Customizable stroke color and width
- Get signature as SVG
- Get raw signature points
- Set signature from existing points
- Clear and reset functionality
- TypeScript support
- Lightweight and performant

## Demo

<img src="https://private-user-images.githubusercontent.com/5255330/437026438-cc1973ff-88d0-46ec-ad8f-1faae985ac4d.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDU0OTkzNzgsIm5iZiI6MTc0NTQ5OTA3OCwicGF0aCI6Ii81MjU1MzMwLzQzNzAyNjQzOC1jYzE5NzNmZi04OGQwLTQ2ZWMtYWQ4Zi0xZmFhZTk4NWFjNGQuZ2lmP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI1MDQyNCUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA0MjRUMTI1MTE4WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NWQ3YzQzYzU2YmI4MzdjMDFiYmUyMjdjMzJjZDMzYWNhYjNlODg4MTAwMzFjYjRjZDQzZjI4ZTk3ZGRjZmNmMCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.pJLApYjAmx7GChhQNilSskiVyz1WSrIJmZWjfsBnVZ8" alt="SimpleCanvas Demo" width="50%">
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

## Usage

```tsx
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { SimpleCanvas, SimpleCanvasRef, clearCanvas } from 'react-native-simple-canvas';

const App = () => {
  const signatureRef = useRef<SimpleCanvasRef>(null);

  const handleClear = () => {
    clearCanvas(signatureRef);
  };

  return (
    <View style={{ flex: 1 }}>
      <SimpleCanvas
        ref={signatureRef}
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
| `strokeColor` | string | 'black' | Color of the signature stroke |
| `strokeWidth` | number | 3 | Width of the signature stroke |
| `backgroundColor` | string | 'transparent' | Background color of the canvas |
| `style` | ViewStyle | undefined | Custom styles for the container |
| `minPoints` | number | 2 | Minimum points required for a valid signature |
| `onDragEvent` | () => void | undefined | Callback when user starts drawing |
| `onCanvasChange` | (isEmpty: boolean) => void | undefined | Callback when canvas state changes |
| `clearCanvas` | boolean | false | Set to true to clear the canvas |

## Methods

All methods are accessible through the component ref:

```tsx
const signatureRef = useRef<SimpleCanvasRef>(null);
```

| Method | Description |
|--------|-------------|
| `getSVG()` | Returns the SVG reference of the signature |
| `resetImage()` | Clears the canvas and resets all points |
| `isEmpty()` | Returns true if the canvas is empty |
| `getPoints()` | Returns an array of raw signature points |
| `setPoints(points: Point[])` | Sets the signature from existing points |

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
