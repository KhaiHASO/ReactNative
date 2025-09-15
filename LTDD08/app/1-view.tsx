import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ViewDemo() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎯 View Component Demo</Text>
        <Text style={styles.subtitle}>
          View là component cơ bản nhất - một container để tổ chức layout
        </Text>
      </View>

      {/* Ví dụ 1: View cơ bản với màu nền */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. View cơ bản với màu nền</Text>
        <View style={styles.basicView}>
          <Text style={styles.viewText}>Đây là một View đơn giản</Text>
        </View>
      </View>

      {/* Ví dụ 2: View với border và padding */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. View với border và padding</Text>
        <View style={styles.borderView}>
          <Text style={styles.viewText}>View có border và padding</Text>
        </View>
      </View>

      {/* Ví dụ 3: View với margin */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. View với margin</Text>
        <View style={styles.marginView}>
          <Text style={styles.viewText}>View có margin xung quanh</Text>
        </View>
      </View>

      {/* Ví dụ 4: View lồng nhau (Nested Views) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. View lồng nhau</Text>
        <View style={styles.parentView}>
          <View style={styles.childView1}>
            <Text style={styles.viewText}>Child 1</Text>
          </View>
          <View style={styles.childView2}>
            <Text style={styles.viewText}>Child 2</Text>
          </View>
          <View style={styles.childView3}>
            <Text style={styles.viewText}>Child 3</Text>
          </View>
        </View>
      </View>

      {/* Ví dụ 5: View với flexbox */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. View với Flexbox Layout</Text>
        <View style={styles.flexContainer}>
          <View style={styles.flexItem1}>
            <Text style={styles.viewText}>Flex 1</Text>
          </View>
          <View style={styles.flexItem2}>
            <Text style={styles.viewText}>Flex 2</Text>
          </View>
        </View>
      </View>

      {/* Ví dụ 6: View với các góc bo tròn */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. View với góc bo tròn</Text>
        <View style={styles.roundedView}>
          <Text style={styles.viewText}>View có góc bo tròn</Text>
        </View>
      </View>

      {/* Ví dụ 7: View với shadow (iOS) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. View với shadow</Text>
        <View style={styles.shadowView}>
          <Text style={styles.viewText}>View có shadow</Text>
        </View>
      </View>

      {/* Ví dụ 8: View với opacity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. View với opacity</Text>
        <View style={styles.opacityView}>
          <Text style={styles.viewText}>View có opacity 50%</Text>
        </View>
      </View>

      {/* Thông tin bổ sung */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>💡 Kiến thức bổ sung:</Text>
        <Text style={styles.infoText}>
          • View trên iOS → UIView{'\n'}
          • View trên Android → android.view{'\n'}
          • View có thể chứa Text, Image, hoặc View khác{'\n'}
          • View hỗ trợ tất cả thuộc tính style của React Native
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
    backgroundColor: '#4CAF50',
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
  viewText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  // Ví dụ 1: View cơ bản
  basicView: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 8,
  },
  // Ví dụ 2: View với border
  borderView: {
    backgroundColor: '#FF9800',
    borderWidth: 3,
    borderColor: '#FF5722',
    padding: 20,
    borderRadius: 8,
  },
  // Ví dụ 3: View với margin
  marginView: {
    backgroundColor: '#9C27B0',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  // Ví dụ 4: View lồng nhau
  parentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#607D8B',
    padding: 16,
    borderRadius: 8,
  },
  childView1: {
    backgroundColor: '#E91E63',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
  },
  childView2: {
    backgroundColor: '#00BCD4',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
  },
  childView3: {
    backgroundColor: '#8BC34A',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
  },
  // Ví dụ 5: Flexbox
  flexContainer: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#795548',
    borderRadius: 8,
    padding: 8,
  },
  flexItem1: {
    flex: 1,
    backgroundColor: '#FF5722',
    marginRight: 8,
    borderRadius: 6,
    justifyContent: 'center',
  },
  flexItem2: {
    flex: 2,
    backgroundColor: '#3F51B5',
    borderRadius: 6,
    justifyContent: 'center',
  },
  // Ví dụ 6: Góc bo tròn
  roundedView: {
    backgroundColor: '#00BCD4',
    padding: 20,
    borderRadius: 25,
  },
  // Ví dụ 7: Shadow
  shadowView: {
    backgroundColor: '#FF9800',
    padding: 20,
    borderRadius: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  // Ví dụ 8: Opacity
  opacityView: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 8,
    opacity: 0.5,
  },
  // Thông tin bổ sung
  infoSection: {
    margin: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
});
