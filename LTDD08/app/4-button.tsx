import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ButtonDemo() {
  const [pressCount, setPressCount] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🔘 Button Component Demo</Text>
        <Text style={styles.subtitle}>
          Button là component tương tác - có nhiều cách để tạo button trong React Native
        </Text>
      </View>

      {/* Giải thích về Button components */}
      <View style={styles.explanationSection}>
        <Text style={styles.explanationTitle}>📚 Các loại Button trong React Native:</Text>
        <Text style={styles.explanationText}>
          • <Text style={styles.boldText}>Button</Text>: Component cơ bản, chỉ có title và onPress{'\n'}
          • <Text style={styles.boldText}>Pressable</Text>: Component hiện đại, linh hoạt nhất{'\n'}
          • <Text style={styles.boldText}>TouchableOpacity</Text>: Button với hiệu ứng fade{'\n'}
          • <Text style={styles.boldText}>TouchableHighlight</Text>: Button với hiệu ứng highlight{'\n'}
          • <Text style={styles.boldText}>TouchableWithoutFeedback</Text>: Button không có hiệu ứng
        </Text>
      </View>

      {/* Ví dụ 1: Pressable cơ bản */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Pressable cơ bản</Text>
        <Pressable 
          style={styles.basicPressable}
          onPress={() => Alert.alert('Button Pressed!', 'Pressable cơ bản đã được nhấn')}
        >
          <Text style={styles.basicPressableText}>Nhấn tôi</Text>
        </Pressable>
      </View>

      {/* Ví dụ 2: Pressable với trạng thái pressed */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Pressable với trạng thái pressed</Text>
        <Pressable 
          style={({ pressed }) => [
            styles.statePressable,
            pressed && styles.statePressablePressed
          ]}
          onPress={() => console.log('State Pressable pressed!')}
        >
          <Text style={styles.statePressableText}>Nhấn và giữ để thấy hiệu ứng</Text>
        </Pressable>
      </View>

      {/* Ví dụ 3: TouchableOpacity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. TouchableOpacity</Text>
        <TouchableOpacity 
          style={styles.touchableOpacity}
          onPress={() => Alert.alert('TouchableOpacity!', 'Button với hiệu ứng fade')}
          activeOpacity={0.6}
        >
          <Text style={styles.touchableOpacityText}>TouchableOpacity Button</Text>
        </TouchableOpacity>
      </View>

      {/* Ví dụ 4: Button với màu sắc khác nhau */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Button với màu sắc khác nhau</Text>
        
        <View style={styles.colorContainer}>
          <Pressable 
            style={[styles.colorButton, { backgroundColor: '#F44336' }]}
            onPress={() => console.log('Red button pressed')}
          >
            <Text style={styles.colorButtonText}>Đỏ</Text>
          </Pressable>

          <Pressable 
            style={[styles.colorButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => console.log('Green button pressed')}
          >
            <Text style={styles.colorButtonText}>Xanh lá</Text>
          </Pressable>

          <Pressable 
            style={[styles.colorButton, { backgroundColor: '#2196F3' }]}
            onPress={() => console.log('Blue button pressed')}
          >
            <Text style={styles.colorButtonText}>Xanh dương</Text>
          </Pressable>
        </View>
      </View>

      {/* Ví dụ 5: Button với kích thước khác nhau */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Button với kích thước khác nhau</Text>
        
        <View style={styles.sizeContainer}>
          <Pressable 
            style={[styles.sizeButton, styles.smallButton]}
            onPress={() => console.log('Small button pressed')}
          >
            <Text style={styles.smallButtonText}>Nhỏ</Text>
          </Pressable>

          <Pressable 
            style={[styles.sizeButton, styles.mediumButton]}
            onPress={() => console.log('Medium button pressed')}
          >
            <Text style={styles.mediumButtonText}>Trung bình</Text>
          </Pressable>

          <Pressable 
            style={[styles.sizeButton, styles.largeButton]}
            onPress={() => console.log('Large button pressed')}
          >
            <Text style={styles.largeButtonText}>Lớn</Text>
          </Pressable>
        </View>
      </View>

      {/* Ví dụ 6: Button với border và borderRadius */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Button với border và borderRadius</Text>
        
        <View style={styles.borderContainer}>
          <Pressable 
            style={styles.borderButton}
            onPress={() => console.log('Border button pressed')}
          >
            <Text style={styles.borderButtonText}>Button với border</Text>
          </Pressable>

          <Pressable 
            style={styles.roundedButton}
            onPress={() => console.log('Rounded button pressed')}
          >
            <Text style={styles.roundedButtonText}>Button bo tròn</Text>
          </Pressable>

          <Pressable 
            style={styles.pillButton}
            onPress={() => console.log('Pill button pressed')}
          >
            <Text style={styles.pillButtonText}>Pill Button</Text>
          </Pressable>
        </View>
      </View>

      {/* Ví dụ 7: Button với disabled state */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Button với disabled state</Text>
        
        <View style={styles.disabledContainer}>
          <Pressable 
            style={styles.enabledButton}
            onPress={() => console.log('Enabled button pressed')}
          >
            <Text style={styles.enabledButtonText}>Enabled Button</Text>
          </Pressable>

          <Pressable 
            style={styles.disabledButton}
            disabled={true}
            onPress={() => console.log('This should not fire')}
          >
            <Text style={styles.disabledButtonText}>Disabled Button</Text>
          </Pressable>
        </View>
      </View>

      {/* Ví dụ 8: Button với counter */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Button với counter (state)</Text>
        
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>Số lần nhấn: {pressCount}</Text>
          <Pressable 
            style={styles.counterButton}
            onPress={() => setPressCount(pressCount + 1)}
          >
            <Text style={styles.counterButtonText}>Tăng số</Text>
          </Pressable>
        </View>
      </View>

      {/* Ví dụ 9: Button với onLongPress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>9. Button với onLongPress</Text>
        
        <View style={styles.longPressContainer}>
          <Text style={styles.counterText}>Số lần long press: {longPressCount}</Text>
          <Pressable 
            style={styles.longPressButton}
            onPress={() => console.log('Normal press')}
            onLongPress={() => setLongPressCount(longPressCount + 1)}
            delayLongPress={1000}
          >
            <Text style={styles.longPressButtonText}>Nhấn và giữ 1 giây</Text>
          </Pressable>
        </View>
      </View>

      {/* Ví dụ 10: Button với icon (text emoji) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>10. Button với icon (emoji)</Text>
        
        <View style={styles.iconContainer}>
          <Pressable 
            style={styles.iconButton}
            onPress={() => Alert.alert('❤️', 'Button với icon trái tim')}
          >
            <Text style={styles.iconButtonIcon}>❤️</Text>
            <Text style={styles.iconButtonText}>Like</Text>
          </Pressable>

          <Pressable 
            style={styles.iconButton}
            onPress={() => Alert.alert('📤', 'Button với icon share')}
          >
            <Text style={styles.iconButtonIcon}>📤</Text>
            <Text style={styles.iconButtonText}>Share</Text>
          </Pressable>

          <Pressable 
            style={styles.iconButton}
            onPress={() => Alert.alert('⚙️', 'Button với icon settings')}
          >
            <Text style={styles.iconButtonIcon}>⚙️</Text>
            <Text style={styles.iconButtonText}>Settings</Text>
          </Pressable>
        </View>
      </View>

      {/* Ví dụ 11: Button với shadow */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>11. Button với shadow</Text>
        
        <Pressable 
          style={styles.shadowButton}
          onPress={() => console.log('Shadow button pressed')}
        >
          <Text style={styles.shadowButtonText}>Button với shadow</Text>
        </Pressable>
      </View>

      {/* Ví dụ 12: Button với gradient effect (simulated) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>12. Button với gradient effect</Text>
        
        <Pressable 
          style={styles.gradientButton}
          onPress={() => console.log('Gradient button pressed')}
        >
          <Text style={styles.gradientButtonText}>Gradient Button</Text>
        </Pressable>
      </View>

      {/* Thông tin quan trọng */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>⚠️ Lưu ý quan trọng:</Text>
        <Text style={styles.infoText}>
          • React Native không có Button component styled sẵn{'\n'}
          • Sử dụng Pressable cho các trường hợp hiện đại{'\n'}
          • TouchableOpacity phù hợp cho hiệu ứng fade đơn giản{'\n'}
          • Luôn set disabled state khi button không thể sử dụng{'\n'}
          • onLongPress có delay mặc định là 500ms{'\n'}
          • Hỗ trợ accessibility với accessibilityLabel và accessibilityHint
        </Text>
      </View>

      {/* Kiến thức bổ sung */}
      <View style={styles.knowledgeSection}>
        <Text style={styles.knowledgeTitle}>💡 Kiến thức bổ sung:</Text>
        <Text style={styles.knowledgeText}>
          • Pressable trên iOS → UIControl{'\n'}
          • Pressable trên Android → TouchableNativeFeedback{'\n'}
          • TouchableOpacity sử dụng Animated API{'\n'}
          • Có thể tạo custom button với animation{'\n'}
          • Hỗ trợ haptic feedback trên iOS{'\n'}
          • Có thể sử dụng react-native-vector-icons cho icon
        </Text>
      </View>

      {/* Best practices */}
      <View style={styles.practicesSection}>
        <Text style={styles.practicesTitle}>✨ Best Practices:</Text>
        <Text style={styles.practicesText}>
          • Sử dụng Pressable cho button mới{'\n'}
          • Set minHeight 44px cho accessibility{'\n'}
          • Cung cấp feedback visual khi pressed{'\n'}
          • Sử dụng consistent styling trong app{'\n'}
          • Test trên cả iOS và Android{'\n'}
          • Thêm loading state cho async actions
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
    backgroundColor: '#FF9800',
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

  // Giải thích về Button components
  explanationSection: {
    margin: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1976D2',
  },

  // Ví dụ 1: Pressable cơ bản
  basicPressable: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  basicPressableText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Ví dụ 2: Pressable với trạng thái
  statePressable: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statePressablePressed: {
    backgroundColor: '#45a049',
    transform: [{ scale: 0.95 }],
  },
  statePressableText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Ví dụ 3: TouchableOpacity
  touchableOpacity: {
    backgroundColor: '#9C27B0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  touchableOpacityText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Ví dụ 4: Button với màu sắc
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  colorButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    marginVertical: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  colorButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Ví dụ 5: Button với kích thước
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sizeButton: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  mediumButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  largeButton: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  smallButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mediumButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  largeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Ví dụ 6: Button với border
  borderContainer: {
    gap: 12,
  },
  borderButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  borderButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  roundedButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  roundedButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pillButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  pillButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Ví dụ 7: Button disabled
  disabledContainer: {
    gap: 12,
  },
  enabledButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  enabledButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Ví dụ 8: Counter button
  counterContainer: {
    alignItems: 'center',
    gap: 12,
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  counterButton: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  counterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Ví dụ 9: Long press button
  longPressContainer: {
    alignItems: 'center',
    gap: 12,
  },
  longPressButton: {
    backgroundColor: '#673AB7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  longPressButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Ví dụ 10: Icon buttons
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    backgroundColor: '#607D8B',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  iconButtonIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  iconButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Ví dụ 11: Shadow button
  shadowButton: {
    backgroundColor: '#795548',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  shadowButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Ví dụ 12: Gradient button (simulated)
  gradientButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF5252',
  },
  gradientButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Thông tin quan trọng
  infoSection: {
    margin: 16,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },

  // Kiến thức bổ sung
  knowledgeSection: {
    margin: 16,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  knowledgeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  knowledgeText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },

  // Best practices
  practicesSection: {
    margin: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  practicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 12,
  },
  practicesText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
});
