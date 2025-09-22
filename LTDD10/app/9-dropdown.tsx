import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DropdownDemo() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('vi');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>9. Dropdown</Text>
      <Text style={styles.label}>Ngôn ngữ</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          dropdownIconColor="#1565C0"
        >
          <Picker.Item label="Tiếng Việt" value="vi" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="日本語" value="ja" />
        </Picker>
      </View>

      <View style={styles.preview}>
        <Text style={styles.previewText}>Đã chọn: {selectedLanguage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#1565C0' },
  label: { marginBottom: 8, color: '#333', fontWeight: '600' },
  pickerWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  preview: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  previewText: { fontWeight: '700' },
});


