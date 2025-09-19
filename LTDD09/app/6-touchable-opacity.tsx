import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TouchableOpacityDemo() {
  const [lastPressed, setLastPressed] = useState<string | null>(null);

  const handlePress = (label: string) => {
    setLastPressed(label);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🫧 TouchableOpacity Demo</Text>
        <Text style={styles.subtitle}>
          Button đơn giản với hiệu ứng mờ dần (fade) khi nhấn
        </Text>
      </View>

      {/* 1. Cơ bản */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Button cơ bản</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => handlePress('Primary')}
          activeOpacity={0.6}
        >
          <Text style={styles.primaryButtonText}>Nhấn tôi</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Kích thước khác nhau */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Kích thước khác nhau</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.sizeButton, styles.small]} onPress={() => handlePress('Small')}>
            <Text style={styles.sizeText}>Nhỏ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sizeButton, styles.medium]} onPress={() => handlePress('Medium')}>
            <Text style={styles.sizeText}>Trung bình</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sizeButton, styles.large]} onPress={() => handlePress('Large')}>
            <Text style={styles.sizeText}>Lớn</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. Màu sắc */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Màu sắc</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#F44336' }]} onPress={() => handlePress('Đỏ')}>
            <Text style={styles.colorText}>Đỏ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#4CAF50' }]} onPress={() => handlePress('Xanh lá')}>
            <Text style={styles.colorText}>Xanh lá</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.colorButton, { backgroundColor: '#2196F3' }]} onPress={() => handlePress('Xanh dương')}>
            <Text style={styles.colorText}>Xanh dương</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Disabled state */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Disabled state</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.enabledButton} onPress={() => handlePress('Enabled')}>
            <Text style={styles.enabledText}>Enabled</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.disabledButton} disabled>
            <Text style={styles.disabledText}>Disabled</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 5. Lần nhấn gần nhất */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Lần nhấn gần nhất</Text>
        <Text style={styles.preview}>
          {lastPressed ? `Bạn vừa nhấn: ${lastPressed}` : 'Chưa có tương tác'}
        </Text>
      </View>

      {/* Tips */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>💡 Tips</Text>
        <Text style={styles.infoText}>
          • Dùng activeOpacity ~0.6 để có hiệu ứng tự nhiên{"\n"}
          • Luôn đảm bảo kích thước tối thiểu 44px cho accessibility{"\n"}
          • Với logic phức tạp, cân nhắc dùng Pressable thay thế
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#8E24AA',
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#7B1FA2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },
  sizeButton: {
    backgroundColor: '#CE93D8',
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  small: { paddingVertical: 6 },
  medium: { paddingVertical: 10 },
  large: { paddingVertical: 14 },
  sizeText: { color: 'white', fontWeight: 'bold' },
  colorButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  colorText: { color: 'white', fontWeight: 'bold' },
  enabledButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  enabledText: { color: 'white', fontWeight: 'bold' },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  disabledText: { color: '#666', fontWeight: 'bold' },
  preview: {
    fontSize: 16,
    color: '#333',
  },
  infoSection: {
    margin: 16,
    backgroundColor: '#F3E5F5',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8E24AA',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
});


