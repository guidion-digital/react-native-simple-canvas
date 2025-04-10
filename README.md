# React Native Simple Canvas

A simple and customizable signature canvas component for React Native applications.

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
# or
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
import SignatureCanvas, { SignatureCanvasRef } from 'react-native-simple-canvas';

const App = () => {
  const signatureRef = useRef<SignatureCanvasRef>(null);

  const handleSave = () => {
    if (signatureRef.current) {
      const svg = signatureRef.current.getSVG();
      const points = signatureRef.current.getPoints();
      const isEmpty = signatureRef.current.isEmpty();
      
      console.log('Signature data:', { svg, points, isEmpty });
    }
  };

  const handleClear = () => {
    signatureRef.current?.clear();
  };

  return (
    <View style={{ flex: 1 }}>
      <SignatureCanvas
        ref={signatureRef}
        strokeColor="blue"
        strokeWidth={3}
        backgroundColor="white"
        onSignatureChange={(isEmpty) => console.log('Signature changed:', isEmpty)}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
        <Button title="Save" onPress={handleSave} />
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
| `onSignatureChange` | (isEmpty: boolean) => void | undefined | Callback when signature state changes |

## Methods

All methods are accessible through the component ref:

```tsx
const signatureRef = useRef<SignatureCanvasRef>(null);
```

| Method | Description |
|--------|-------------|
| `getSVG()` | Returns the SVG reference of the signature |
| `resetImage()` | Clears the canvas and resets all points |
| `isEmpty()` | Returns true if the canvas is empty |
| `getPoints()` | Returns an array of raw signature points |
| `setPoints(points: Point[])` | Sets the signature from existing points |
| `clear()` | Clears the canvas |

## Types

```tsx
interface Point {
  x: number;
  y: number;
}

interface SignatureCanvasProps {
  onDragEvent?: () => void;
  onSignatureChange?: (isEmpty: boolean) => void;
  strokeColor?: string;
  strokeWidth?: number;
  backgroundColor?: string;
  style?: ViewStyle;
  minPoints?: number;
}

interface SignatureCanvasRef {
  resetImage: () => void;
  getSVG: () => RefObject<Svg>;
  isEmpty: () => boolean;
  getPoints: () => Point[];
  setPoints: (points: Point[]) => void;
  clear: () => void;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
