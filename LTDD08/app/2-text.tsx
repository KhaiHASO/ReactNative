import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TextDemo() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📝 Text Component Demo</Text>
        <Text style={styles.subtitle}>
          Text là component cơ bản để hiển thị văn bản - component duy nhất có thể chứa text
        </Text>
      </View>

      {/* Ví dụ 1: Text cơ bản */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Text cơ bản</Text>
        <Text style={styles.basicText}>Đây là text cơ bản</Text>
      </View>

      {/* Ví dụ 2: Text với font size khác nhau */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Text với font size khác nhau</Text>
        <Text style={styles.smallText}>Text nhỏ (12px)</Text>
        <Text style={styles.normalText}>Text bình thường (16px)</Text>
        <Text style={styles.largeText}>Text lớn (20px)</Text>
        <Text style={styles.hugeText}>Text rất lớn (28px)</Text>
      </View>

      {/* Ví dụ 3: Text với màu sắc */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Text với màu sắc khác nhau</Text>
        <Text style={styles.redText}>Text màu đỏ</Text>
        <Text style={styles.blueText}>Text màu xanh dương</Text>
        <Text style={styles.greenText}>Text màu xanh lá</Text>
        <Text style={styles.purpleText}>Text màu tím</Text>
      </View>

      {/* Ví dụ 4: Text với font weight */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Text với font weight khác nhau</Text>
        <Text style={styles.lightText}>Text nhẹ (300)</Text>
        <Text style={styles.normalWeightText}>Text bình thường (400)</Text>
        <Text style={styles.boldText}>Text đậm (700)</Text>
        <Text style={styles.extraBoldText}>Text rất đậm (900)</Text>
      </View>

      {/* Ví dụ 5: Text alignment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Text alignment (căn lề)</Text>
        <View style={styles.alignmentContainer}>
          <Text style={styles.leftAlign}>Text căn trái</Text>
          <Text style={styles.centerAlign}>Text căn giữa</Text>
          <Text style={styles.rightAlign}>Text căn phải</Text>
        </View>
      </View>

      {/* Ví dụ 6: Text với background color */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Text với background color</Text>
        <Text style={styles.backgroundText}>Text có màu nền</Text>
      </View>

      {/* Ví dụ 7: Text với underline và strikethrough */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Text decoration</Text>
        <Text style={styles.underlineText}>Text có gạch chân</Text>
        <Text style={styles.strikethroughText}>Text có gạch ngang</Text>
        <Text style={styles.lineThroughText}>Text có gạch xuyên qua</Text>
      </View>

      {/* Ví dụ 8: Text với line height và letter spacing */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Text spacing</Text>
        <Text style={styles.tightSpacing}>
          Text với line height và letter spacing nhỏ
        </Text>
        <Text style={styles.wideSpacing}>
          Text với line height và letter spacing rộng
        </Text>
      </View>

      {/* Ví dụ 9: Text lồng nhau (Nested Text) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>9. Text lồng nhau (Nested Text)</Text>
        <Text style={styles.nestedContainer}>
          Đây là text bình thường với{' '}
          <Text style={styles.nestedBold}>text đậm</Text>
          {' '}và{' '}
          <Text style={styles.nestedItalic}>text nghiêng</Text>
          {' '}và{' '}
          <Text style={styles.nestedColored}>text màu</Text>
          {' '}bên trong.
        </Text>
      </View>

      {/* Ví dụ 10: Text với numberOfLines và ellipsizeMode */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>10. Text với numberOfLines</Text>
        <Text style={styles.truncatedText} numberOfLines={2}>
          Đây là một đoạn text rất dài sẽ bị cắt ngắn khi vượt quá số dòng cho phép. 
          Text này sẽ hiển thị với dấu ... ở cuối khi bị cắt.
        </Text>
      </View>

      {/* Ví dụ 11: Text với selectable */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>11. Text có thể select</Text>
        <Text style={styles.selectableText} selectable={true}>
          Text này có thể được select và copy
        </Text>
      </View>

      {/* Ví dụ 12: Text với onPress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>12. Text có thể nhấn</Text>
        <Text 
          style={styles.pressableText} 
          onPress={() => alert('Text đã được nhấn!')}
        >
          Nhấn vào text này (có thể nhấn)
        </Text>
      </View>

      {/* Thông tin quan trọng */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>⚠️ Lưu ý quan trọng:</Text>
        <Text style={styles.infoText}>
          • Text là component DUY NHẤT có thể chứa văn bản{'\n'}
          • Mọi string phải được đặt trong Text component{'\n'}
          • Không kế thừa style từ component cha (trừ một số thuộc tính){'\n'}
          • Text chỉ có thể chứa text hoặc Text khác, không chứa View{'\n'}
          • Có thể lồng Text để áp dụng style khác nhau cho từng phần
        </Text>
      </View>

      {/* Kiến thức bổ sung */}
      <View style={styles.knowledgeSection}>
        <Text style={styles.knowledgeTitle}>💡 Kiến thức bổ sung:</Text>
        <Text style={styles.knowledgeText}>
          • Text trên iOS → UILabel{'\n'}
          • Text trên Android → TextView{'\n'}
          • Hỗ trợ emoji và unicode{'\n'}
          • Có thể tương tác (onPress, selectable){'\n'}
          • Hỗ trợ accessibility cho người khuyết tật
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
    backgroundColor: '#FF5722',
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
  
  // Ví dụ 1: Text cơ bản
  basicText: {
    fontSize: 16,
    color: '#333',
  },
  
  // Ví dụ 2: Font size
  smallText: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  normalText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 2,
  },
  largeText: {
    fontSize: 20,
    color: '#333',
    marginVertical: 2,
  },
  hugeText: {
    fontSize: 28,
    color: '#333',
    marginVertical: 2,
  },
  
  // Ví dụ 3: Màu sắc
  redText: {
    fontSize: 16,
    color: '#F44336',
    marginVertical: 2,
  },
  blueText: {
    fontSize: 16,
    color: '#2196F3',
    marginVertical: 2,
  },
  greenText: {
    fontSize: 16,
    color: '#4CAF50',
    marginVertical: 2,
  },
  purpleText: {
    fontSize: 16,
    color: '#9C27B0',
    marginVertical: 2,
  },
  
  // Ví dụ 4: Font weight
  lightText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#333',
    marginVertical: 2,
  },
  normalWeightText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginVertical: 2,
  },
  boldText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginVertical: 2,
  },
  extraBoldText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#333',
    marginVertical: 2,
  },
  
  // Ví dụ 5: Alignment
  alignmentContainer: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 8,
  },
  leftAlign: {
    fontSize: 16,
    textAlign: 'left',
    color: '#333',
    marginVertical: 2,
  },
  centerAlign: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginVertical: 2,
  },
  rightAlign: {
    fontSize: 16,
    textAlign: 'right',
    color: '#333',
    marginVertical: 2,
  },
  
  // Ví dụ 6: Background
  backgroundText: {
    fontSize: 16,
    color: 'white',
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
  },
  
  // Ví dụ 7: Text decoration
  underlineText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#333',
    marginVertical: 2,
  },
  strikethroughText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#333',
    marginVertical: 2,
  },
  lineThroughText: {
    fontSize: 16,
    textDecorationLine: 'underline line-through',
    color: '#333',
    marginVertical: 2,
  },
  
  // Ví dụ 8: Spacing
  tightSpacing: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.5,
    color: '#333',
    marginVertical: 2,
  },
  wideSpacing: {
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: 2,
    color: '#333',
    marginVertical: 2,
  },
  
  // Ví dụ 9: Nested text
  nestedContainer: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  nestedBold: {
    fontWeight: 'bold',
    color: '#E91E63',
  },
  nestedItalic: {
    fontStyle: 'italic',
    color: '#2196F3',
  },
  nestedColored: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  
  // Ví dụ 10: Truncated text
  truncatedText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  
  // Ví dụ 11: Selectable text
  selectableText: {
    fontSize: 16,
    color: '#FF5722',
    backgroundColor: '#FFF3E0',
    padding: 10,
    borderRadius: 8,
  },
  
  // Ví dụ 12: Pressable text
  pressableText: {
    fontSize: 16,
    color: '#4CAF50',
    backgroundColor: '#E8F5E8',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
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
});
