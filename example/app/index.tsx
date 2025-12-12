import React, { useRef, useState } from 'react';
import {
  Alert,
  AppRegistry,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { clearCanvas, SimpleCanvas } from '@gdn/react-native-simple-canvas';
import type { SimpleCanvasRef } from '@gdn/react-native-simple-canvas';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

function App (): React.ReactElement {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AppContent />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function AppContent(): React.ReactElement {
  const canvasRef = useRef<SimpleCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const safeAreaInsets = useSafeAreaInsets();

  const handleClear = () => {
    clearCanvas(canvasRef);
    setIsEmpty(true);
  };

  const handleDragEvent = () => {
    setIsEmpty(false);
  };

  const handleExportSVG = () => {
    const svg = canvasRef.current?.getSVG();

    if (svg) {
      Alert.alert('SVG', 'SVG reference obtained - check console for details');
      console.log('SVG Reference:', svg);
    }
  };

  const ColorButton = ({ color, label }: { color: string; label: string }) => (
    <TouchableOpacity
      style={[
        styles.colorButton,
        { backgroundColor: color },
        strokeColor === color && styles.selectedButton,
      ]}
      onPress={() => setStrokeColor(color)}
    >
      <Text style={styles.colorButtonText}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const WidthButton = ({ width, label }: { width: number; label: string }) => (
    <TouchableOpacity
      style={[
        styles.widthButton,
        strokeWidth === width && styles.selectedButton,
      ]}
      onPress={() => setStrokeWidth(width)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.containerView}>

        <SimpleCanvas
          ref={canvasRef}
          onDragEvent={handleDragEvent}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          safeAreaTop={safeAreaInsets.top}
        />
        
        <View style={{ position: 'absolute', top: 350, left: 50, width: 100, height: 100, backgroundColor: 'red' }}/>

        <View>
          <Text style={styles.sectionTitle}>
            Stroke Color
          </Text>
          <View style={styles.colorRow}>
            <ColorButton color="#000000" label="Black" />
            <ColorButton color="#FF0000" label="Red" />
            <ColorButton color="#00FF00" label="Green" />
            <ColorButton color="#0000FF" label="Blue" />
            <ColorButton color="#FF00FF" label="Magenta" />
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>
            Stroke Width
          </Text>
          <View style={styles.widthRow}>
            <WidthButton width={1} label="1px" />
            <WidthButton width={3} label="3px" />
            <WidthButton width={5} label="5px" />
            <WidthButton width={8} label="8px" />
            <WidthButton width={12} label="12px" />
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>
            Actions
          </Text>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, isEmpty && styles.disabledButton]}
              onPress={handleClear}
              disabled={isEmpty}
            >
              <Text style={styles.actionButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, isEmpty && styles.disabledButton]}
              onPress={handleExportSVG}
              disabled={isEmpty}
            >
              <Text style={[styles.actionButtonText, isEmpty && styles.disabledText]}>
                Export SVG
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

AppRegistry.registerComponent('main', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerView: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000000'
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  colorButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedButton: {
    borderColor: '#007AFF',
  },
  colorButtonText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#FFF'
  },
  widthRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  widthButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    margin: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buttonText: {
    fontWeight: '600',
    color: '#333',
    fontSize: 14,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledText: {
    color: '#999',
  },
});
