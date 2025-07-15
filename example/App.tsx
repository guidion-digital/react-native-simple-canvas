import React, { useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { clearCanvas, SimpleCanvas, type SimpleCanvasRef } from '@gdn/react-native-simple-canvas';

function App(): React.ReactElement {
  const isDarkMode = useColorScheme() === 'dark';
  const signatureRef = useRef<SimpleCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [isEmpty, setIsEmpty] = useState<boolean>(!!signatureRef.current?.isEmpty());

  const handleClear = () => {
    clearCanvas(signatureRef);
    setIsEmpty(true);
  };

  const handleDragEvent = () => {
    setIsEmpty(false);
  };

  const handleExportSVG = () => {
    const svg = signatureRef.current?.getSVG();

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
      <Text style={[styles.colorButtonText, { color: color === '#FFFFFF' ? '#000' : '#FFF' }]}>
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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.containerView}>

        <View style={styles.canvasContainer}>
          <SimpleCanvas
            ref={signatureRef}
            onDragEvent={handleDragEvent}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerView: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  canvasContainer: {
    height: 300,
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
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

export default App;
