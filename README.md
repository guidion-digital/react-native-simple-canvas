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