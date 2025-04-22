import React, {
  forwardRef,
  MutableRefObject,
  RefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { PanResponder, StyleSheet, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import { Point } from '../interfaces/Point';
import { spline } from '../helpers/signature';

interface SimpleCanvasProps {
  onDragEvent?: () => void;
  onCanvasChange?: (isEmpty: boolean) => void;
  strokeColor?: string;
  strokeWidth?: number;
  backgroundColor?: string;
  style?: ViewStyle;
  minPoints?: number;
}

export interface SimpleCanvasRef {
  resetImage: () => void;
  getSVG: () => RefObject<Svg>;
  isEmpty: () => boolean;
  getPoints: () => Point[];
  setPoints: (points: Point[]) => void;
}

export const clearCanvas = (ref: MutableRefObject<SimpleCanvasRef | null>) => {
  ref.current?.resetImage();
};

export const SimpleCanvas = forwardRef<SimpleCanvasRef, SimpleCanvasProps>(
  ({
    onDragEvent,
    onCanvasChange,
    strokeColor = 'black',
    strokeWidth = 3,
    backgroundColor = 'transparent',
    style,
    minPoints = 2
  }, ref) => {
    const [paths, setPaths] = useState<string[]>([]);
    const pointsRef = useRef<Point[]>([]);
    const svgRef = useRef(null);
    const isDrawing = useRef(false);

    const canvasRef = useRef<View>(null);
    const canvasOffset = useRef({ x: 0, y: 0 });

    const addPoint = useCallback((point: Point) => {
      pointsRef.current.push(point);
      return true;
    }, []);

    const resetImage = useCallback(() => {
      setPaths([]);
      pointsRef.current = [];
      onCanvasChange?.(true);
    }, [onCanvasChange]);

    const isEmpty = useCallback(() => {
      return paths.length === 0;
    }, [paths]);

    const getPoints = useCallback(() => {
      return [...pointsRef.current];
    }, []);

    const setPoints = useCallback((newPoints: Point[]) => {
      if (newPoints.length < minPoints) return;

      pointsRef.current = newPoints;
      const path = spline(newPoints, 1, false);
      setPaths([path]);
      onCanvasChange?.(false);
    }, [minPoints, onCanvasChange]);

    const onLayout = useCallback(() => {
      canvasRef.current?.measureInWindow((x, y) => {
        canvasOffset.current = { x, y };
      });
    }, []);

    const panResponder = useMemo(
      () =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: (event) => {
            const { pageX, pageY } = event.nativeEvent;
            const point = {
              x: pageX - canvasOffset.current.x,
              y: pageY - canvasOffset.current.y
            };
            isDrawing.current = true;
            pointsRef.current = [point];
            setPaths(prevPaths => [...prevPaths, `M ${point.x} ${point.y}`]);
            onDragEvent?.();
          },
          onPanResponderMove: (event) => {
            if (!isDrawing.current) return;
            const { pageX, pageY } = event.nativeEvent;
            const point = {
              x: pageX - canvasOffset.current.x,
              y: pageY - canvasOffset.current.y
            };

            if (addPoint(point)) {
              if (pointsRef.current.length >= minPoints) {
                const path = spline(pointsRef.current, 1, false);
                setPaths(prevPaths => {
                  const newPaths = [...prevPaths];
                  newPaths[newPaths.length - 1] = path;
                  return newPaths;
                });
                onCanvasChange?.(false);
              }
            }
          },
          onPanResponderRelease: () => {
            isDrawing.current = false;
          },
        }),
      [onDragEvent, addPoint, minPoints, onCanvasChange]
    );

    useImperativeHandle(
      ref,
      () => ({
        getSVG: () => svgRef as unknown as RefObject<Svg>,
        resetImage,
        isEmpty,
        getPoints,
        setPoints
      }),
      [resetImage, isEmpty, getPoints, setPoints]
    );

    const pathElements = useMemo(
      () =>
        paths.map((path, index) => (
          <Path
            key={index}
            d={path}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )),
      [paths, strokeColor, strokeWidth]
    );

    return (
      <View style={[styles.container, style]}>
        <View
          ref={canvasRef}
          onLayout={onLayout}
          style={[styles.signatureBox, { backgroundColor }]}
          {...panResponder.panHandlers}
        >
          <Svg ref={svgRef} height="100%" width="100%">
            {pathElements}
          </Svg>
        </View>
      </View>
    );
  }
);

SimpleCanvas.displayName = 'SimpleCanvas';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signatureBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
